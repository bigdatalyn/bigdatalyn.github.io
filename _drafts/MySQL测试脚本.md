
https://www.cnblogs.com/YangJiaXin/p/11234591.html

```
 cat sysbench_test_mysql5.7_8.0_tps_qps.sh
#!/bin/bash
#用于sysbench 测试在读写模式、只读模式、只写模式下 mysql5.7和mysql8.0 的tps,qps
#nohup bash $0 >/tmp/sysbench_test 2>& 1 &
#

user=admin
passwd=admin
ports="8015 57222"
host=127.0.0.1
sysbench_test_mode="oltp_read_write oltp_read_only oltp_write_only"
sysbench_test_info_path=/tmp/sysbench-test

function red_echo () {

        local what="$*"
        echo -e "$(date +%F-%T) \e[1;31m ${what} \e[0m"
}

function check_las_comm(){
    if [ $1 -ne 0 ];then
        red_echo $2
        exit 1
    fi
}

function  restart_mysqld(){
  service mysqld${1} restart
  sleep 2
}

function  purge_binlog(){
port=$1
mysql -u$user -p$passwd -P$port -h$host<<EOF
purge binary logs before now();
EOF
}


function clean_os_cache(){
  echo 3 > /proc/sys/vm/drop_caches
}

function  sysbench_with_diff_thread(){


thread_num=$1
port=$2
order=$3
test_mode=$4
sysbench /usr/local/share/sysbench/${test_mode}.lua --mysql_storage_engine=innodb  --table-size=100000 --tables=20 --mysql-db=test_1 --mysql-user=$user --mysql-password=$passwd --mysql-port=$port  --mysql-host=$host --threads=$thread_num  --time=60 --report-interval=2 --db-ps-mode=disable --events=0 --db-driver=mysql $order

}

function  main(){
for test_mode in $sysbench_test_mode;do

  for port in $ports;do
    for thread_num in {5,10,20,30,40,80,120,200};do
      restart_mysqld "$port"
      check_las_comm  "$?" "restart mysqld${port} failed "
      clean_os_cache
      purge_binlog "$port"

      red_echo "sysbench $thread_num  threads cleanup mysqld${port}"
      sysbench_with_diff_thread "$thread_num" "$port" "cleanup" "$test_mode">/dev/null

      red_echo "sysbench $thread_num  threads prepare mysqld${port}"
      sysbench_with_diff_thread "$thread_num" "$port" "prepare" "$test_mode">/dev/null

      mkdir -p $sysbench_test_info_path
      red_echo "sysbench $thread_num  threads run mysqld${port} $test_mode"
      sysbench_with_diff_thread "$thread_num" "$port" "run" "$test_mode" > $sysbench_test_info_path/${test_mode}_${thread_num}_$port

      # service mysqld{port} stop
    done
  done
done

}

main
```