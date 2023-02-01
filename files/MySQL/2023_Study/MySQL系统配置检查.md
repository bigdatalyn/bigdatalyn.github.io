https://www.yuque.com/xuchenliang/scripts/da5lt9

脚本:

```
#! /bin/bash
echo -e "\033[31m ++++++++++MySQL Standardized Check++++++++++++ \033[0m"
echo -e "\n"
echo -e "\033[31m ----------1.File System--------------- \033[0m"
df -Th|awk '{print $1,$2}'|grep -v 'tmpfs'
echo -e "\033[33m 输出建议：数据分区为xfs \033[0m"

echo -e "\n"
echo -e "\033[31m ----------2.IO scheduling algorithm--------------- \033[0m"
cat /sys/block/sda/queue/scheduler
echo -e "\033[33m 输出建议：普通硬盘采用deadline算法，不要用cfg算法;SSD采用noop算法 \033[0m"

echo -e "\n"
echo -e "\033[31m ----------3.max open files--------------- \033[0m"
ulimit -a|grep 'open files'
echo -e "\033[33m 输出建议：建议设置为系统最大65535 \033[0m"

echo -e "\n"
echo -e "\033[31m ----------4.max user processes--------------- \033[0m"
ulimit -a|grep 'processes'
echo -e "\033[33m 输出建议：建议设置为系统最大65535 \033[0m"

echo -e "\n"
echo -e "\033[31m ----------5.numa enable--------------- \033[0m"
grep -i numa /var/log/dmesg
echo -e "\033[33m 输出建议：强烈建议关闭NUMA \033[0m"

echo -e "\n"
echo -e "\033[31m ----------6.swappiness ratio--------------- \033[0m"
sysctl -a | grep swappiness
echo -e "\033[33m 输出建议：建议值设置为1-10 \033[0m"

echo -e "\n"
echo -e "\033[31m ----------7.dirty_ratio--------------- \033[0m"
sysctl -a | grep dirty_ratio
echo -e "\033[33m 设置为10比较好 \033[0m"

echo -e "\n"
echo -e "\033[31m ----------8.dirty_background_ratio--------------- \033[0m"
sysctl -a | grep dirty_background_ratio
echo -e "\033[33m 输出建议：设置为5比较好 \033[0m"

function IO_scheduler()
{
  echo -e "\n" 
  read -t 10 -p "IO scheduling optimization[Y/N]:" need
  need_U=$(echo $need | tr '[a-z]' '[A-Z]')
  if [ "$need_U" = 'Y' ]; then
    echo "deadline" > /sys/block/sda/queue/scheduler
    if [ $? = 0 ];then
      echo -e "\033[33m IO scheduling changed \033[0m"
    else
      echo -e "\033[33m error please check manually \033[0m"
    fi
  fi
}

function open_file()
{
  echo -e "\n" 
  read -t 10 -p "change max open files[Y/N]:" need
  need_U=$(echo $need | tr '[a-z]' '[A-Z]')
  if [ "$need_U" = 'Y' ]; then
    echo '* soft nofile 65536' >>/etc/security/limits.conf
    if [ $? = 0 ];then
      echo -e "\033[33m soft file changed \033[0m"
    else
      echo -e "\033[33m error please check manually \033[0m"
    fi
    echo '* hard nofile 65536' >>/etc/security/limits.conf
    if [ $? = 0 ];then
      echo -e "\033[33m hard file changed \033[0m"
    else
      echo -e "\033[33m error please check manually \033[0m"
    fi
    ulimit -HSn 65535
    if [ $? = 0 ];then
      echo -e "\033[33m open files changed online \033[0m"
    else
      echo -e "\033[33m error please check manually \033[0m"
    fi

  fi
}

function user_process()
{
  read -t 10 -p "change max user processes[Y/N]:" need
  need_U=$(echo $need | tr '[a-z]' '[A-Z]')
  if [ "$need_U" = 'Y' ]; then
    echo '* soft nproc 65536' >>/etc/security/limits.conf
    if [ $? = 0 ];then
      echo -e "\033[33m max user processes changed \033[0m"
    else
      echo -e "\033[33m error please check manually \033[0m"
    fi
    ulimit -HSu 65535
    if [ $? = 0 ];then
      echo -e "\033[33m max user processess changed online \033[0m"
    else
      echo -e "\033[33m error please check manually \033[0m"
    fi
  fi
}

function disable_numa()
{
  echo -e "\n" 
  read -t 10 -p "disabled NUMA[Y/N]:" need
  need_U=$(echo $need | tr '[a-z]' '[A-Z]')
  if [ "$need_U" = 'Y' ]; then
    yum install numactl -y
    if [ $? = 0 ];then
      echo -e "\033[33m numactl is installed successfully \033[0m"
    else
      echo -e "\033[33m error please check manually \033[0m"
    fi
    echo -e "\033[33m please use numactl --interleave=all mysqld to start MySQL \033[0m"
  fi
}

function swappiness_ratio()
{
  read -t 10 -p "change swappiness_ratio[Y/N]:" need
  need_U=$(echo $need | tr '[a-z]' '[A-Z]')
  if [ "$need_U" = 'Y' ]; then
    echo 'vm.swappiness = 10'>>/etc/sysctl.conf
    if [ $? = 0 ];then
      echo -e "\033[33m swappiness_ratio changed \033[0m"
    else
      echo -e "\033[33m error please check manually \033[0m"
    fi
  fi
}



function dirty_ratio()
{
  echo -e "\n" 
  read -t 10 -p "change dirty_ratio[Y/N]:" need
  need_U=$(echo $need | tr '[a-z]' '[A-Z]')
  if [ "$need_U" = 'Y' ]; then
    echo 'vm.dirty_background_ratio = 5' >>/etc/sysctl.conf
    if [ $? = 0 ];then
      echo -e "\033[33m dirty_background_ratio changed \033[0m"
    else
      echo -e "\033[33m error please check manually \033[0m"
    fi
    echo 'vm.dirty_ratio = 10' >>/etc/sysctl.conf
    if [ $? = 0 ];then
      echo -e "\033[33m dirty_ratio changed \033[0m"
    else
      echo -e "\033[33m error please check manually \033[0m"
    fi
    /sbin/sysctl -p
    if [ $? = 0 ];then
      echo -e "\033[33m changes successfully \033[0m"
    else
      echo -e "\033[33m error please check manually \033[0m"
    fi
  fi
}

IO_scheduler
open_file
user_process
disable_numa
swappiness_ratio
dirty_ratio
echo -e "\n"
echo -e "\033[33m restart system and check again！ \033[0m"
```
