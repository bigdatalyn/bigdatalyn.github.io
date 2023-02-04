#!/bin/bash

######################################

# Author:Bertram #

# Created Time:2020/9/28 #

# Describe:Mysql patrol script! #

######################################

host="127.0.0.1" #数据库IP

port="8302" #数据库端口

userName="root" #用户名

password="mysql" #密码

dbname="test" #数据库 名称

dbset="--default-character-set=utf8 -A" # 字符集

echo

echo -e "\033[1;32;31m================= Salve_IO_Running 和 Salve_SQL_Running SQL线程状态 ======================\033[0m"

MS="show slave status\G"

STATUS=$(/usr/bin/mysql -u${userName} -p${password} -e "${MS}" 2>/dev/null | grep -i "running:")

IO_env=`echo "$STATUS" | grep IO | awk ' {print $2}'`

SQL_env=`echo "$STATUS" | grep SQL | awk '{print $2}'`

if [ "$IO_env" = "Yes" -a "$SQL_env" = "Yes" ]

then

echo "SQL线程正常!"

else

echo "SQL线程出现异常!"

fi

echo

echo -e "\033[1;32;31m==================== 内存配置情况 ===============================\033[0m"

mem_dis_1="show variables like 'innodb_buffer_pool_size';"

mem_dis_1_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_1}" 2>/dev/null )

mem_dis_1_val_1=`echo ${mem_dis_1_val} | cut -d' ' -f4`

mem_dis_1_val_2=`echo | awk "{print $mem_dis_1_val_1/1024/1024}"`

echo "InnoDB 数据和索引缓存：" $mem_dis_1_val_1

mem_dis_2="show variables like 'innodb_log_buffer_size';"

mem_dis_2_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_2}" 2>/dev/null )

mem_dis_2_val_1=`echo ${mem_dis_2_val} | cut -d' ' -f4`

mem_dis_2_val_2=`echo | awk "{print $mem_dis_2_val_1/1024/1024}"`

echo "InnoDB 日志缓冲区：" $mem_dis_2_val_1

mem_dis_3="show variables like 'binlog_cache_size';"

mem_dis_3_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_3}" 2>/dev/null )

mem_dis_3_val_1=`echo ${mem_dis_3_val} | cut -d' ' -f4`

mem_dis_3_val_2=`echo | awk "{print $mem_dis_3_val_1/1024/1024}"`

echo "二进制日志缓冲区：" $mem_dis_3_val_1

mem_dis_4="show variables like 'thread_cache_size';"

mem_dis_4_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_4}" 2>/dev/null )

echo "连接线程缓存：" `echo $mem_dis_4_val | cut -d' ' -f4`

mem_dis_5="show variables like 'query_cache_size';"

mem_dis_5_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_5}" 2>/dev/null )

echo "查询缓存：" `echo ${mem_dis_5_val} | cut -d' ' -f4`

mem_dis_6="show variables like 'table_open_cache';"

mem_dis_6_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_6}" 2>/dev/null )

echo "表缓存：" `echo ${mem_dis_6_val} | cut -d' ' -f4`

mem_dis_7="show variables like 'table_definition_cache';"

mem_dis_7_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_7}" 2>/dev/null )

echo "表定义缓存：" `echo ${mem_dis_7_val} | cut -d' ' -f4`

mem_dis_8="show variables like 'max_connections';"

mem_dis_8_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_8}" 2>/dev/null )

echo "最大线程数：" `echo ${mem_dis_8_val} | cut -d' ' -f4`

mem_dis_9="show variables like 'thread_stack';"

mem_dis_9_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_9}" 2>/dev/null )

echo "线程栈信息使用内存：" `echo ${mem_dis_9_val} | cut -d' ' -f4`

mem_dis_10="show variables like 'sort_buffer_size';"

mem_dis_10_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_10}" 2>/dev/null )

echo "排序使用内存：" `echo ${mem_dis_10_val} | cut -d' ' -f4`

mem_dis_11="show variables like 'join_buffer_size';"

mem_dis_11_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_11}" 2>/dev/null )

echo "Join操作使用内存：" `echo ${mem_dis_11_val} | cut -d' ' -f4`

mem_dis_12="show variables like 'read_buffer_size';"

mem_dis_12_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_12}" 2>/dev/null )

echo "顺序读取数据缓冲区使用内存：" `echo ${mem_dis_12_val} | cut -d' ' -f4`

mem_dis_13="show variables like 'read_rnd_buffer_size';"

mem_dis_13_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_13}" 2>/dev/null )

echo "随机读取数据缓冲区使用内存：" `echo ${mem_dis_13_val} | cut -d' ' -f4`

mem_dis_14="show variables like 'tmp_table_size';"

mem_dis_14_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${mem_dis_14}" 2>/dev/null )

echo "临时表使用内存：" `echo ${mem_dis_14_val} | cut -d' ' -f4`

echo

echo -e "\033[1;32;31m================= 数据库磁盘占用量 ===========================\033[0m"

_disk_used="select sum((data_length+index_length)/1024/1024) M from information_schema.tables where table_schema=\"grade\""

_disk_used_val=$(/usr/bin/mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e "${_disk_used}" 2>/dev/null)

echo "磁盘占用量(单位：M)：" `echo ${_disk_used_val} | cut -d' ' -f2`

echo

_time=$(date -d '6 days ago' +%Y-%m-%d)\|$(date -d '5 days ago' +%Y-%m-%d)\|$(date -d '4 days ago' +%Y-%m-%d)\|$(date -d '3 days ago' +%Y-%m-%d)\|$(date -d '2 days ago' +%Y-%m-%d)\|$(date -d '1 days ago' +%Y-%m-%d)\|$(date -d '0 days ago' +%Y-%m-%d)

echo -e "\033[1;32;31m==================最近一周的错误日志 ==========================\033[0m"

grep -i -E 'error' /data/logs/mysql/error.log | grep -E \'$_time\'
