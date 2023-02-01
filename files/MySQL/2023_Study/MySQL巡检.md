

-- https://www.yuque.com/xuchenliang/scripts/sgdat8

Python3 
```
#!/usr/bin/env python
#-*- coding:utf-8 -*-
import os
import pymysql
pymysql.install_as_MySQLdb()
import MySQLdb as mdb
from time import time
from datetime import datetime
import re
#from passde import encrypt, decrypt

## conn = mdb.connect(host='127.0.0.1', port=3306, user='root', passwd=decrypt('776ebdb8d0430e24b5bb751476c01417'), db='jumpmysql', charset='utf8')
conn = mdb.connect(host='127.0.0.1', port=8032, user='lin', passwd='mysql', db='test', charset='utf8')

cursor = conn.cursor()

print ("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
print ("++                                          MySQL Check report                                                ++")
print ("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

print ("start time: %s" %datetime.now())
#table_check

print ('''
----------------------------------------------------------------------------------------------------------------
start table check
1.size
2.much indexes
3.fragment
4.rows
5.charset
6.big column
7.long column
8.no indexes
----------------------------------------------------------------------------------------------------------------
''')
#get tables more than 10G
cursor.execute("select table_schema,table_name,concat(round((data_length+index_length)/1024/1024,2),'M') FROM \
information_schema.tables where (DATA_LENGTH+INDEX_LENGTH) > 10*1024*1024*1024  and table_schema not in \
('information_schema','mysql','performance_schema','sys')")
table_size = cursor.fetchall()

print ("\033[1;33;44m 1: result of table is more than 10G\033[0m")
if table_size:
    for table in table_size:
        table_schema = table[0]
        table_name = table[1]
        size = table[2]
        print (" table_schema: %-20s  table_name : %-20s size: %10s " %(table_schema, table_name, size))
else:
    print ("no table is more than 10G")

#get tables which have more than 6 indexes
cursor.execute("select t1.name,t2.num from information_schema.innodb_tables t1, (select table_id,count(*) as num from \
information_schema.innodb_indexes group by table_id having count(*) >=6) t2 where t1.table_id =t2.table_id")
table_index = cursor.fetchall()

print ("\033[1;33;44m 2: result of table more than 6 indexes\033[0m")
if table_index:
    for table in table_index:
        table_name = table[0]
        index_num = table[1]
        print (" table_name: %-50s  index_num: %10d " %(table_name, index_num))
else:
    print ("no table has more than 6 indexes")


#get tables which have big fragment
cursor.execute("select table_schema,table_name,DATA_FREE from \
information_schema.TABLES where table_schema not in ('information_schema','mysql','performance_schema','sys') \
and data_free > 1*1024*1024*1024 order by DATA_FREE desc;")
table_fragment = cursor.fetchall()

print ("\033[1;33;44m 3: result of table has big fragment\033[0m")
if table_fragment:
    for table in table_fragment:
        table_schema = table[0]
        table_name = table[1]
        data_free = table[2]
        print (" table_schema: %-20s  table_name : %-20s fragment: %10s " %(table_schema, table_name, data_free))
else:
    print ("no table has big fragment")

#get tables which have 20000000 rows
cursor.execute("select table_schema,table_name,table_rows from \
information_schema.TABLES where table_schema not in ('information_schema','mysql','performance_schema','sys') \
and table_rows > 20000000 order by table_rows desc;")
table_fragment = cursor.fetchall()

print ("\033[1;33;44m 4: result of table has more than 20000000 rows\033[0m")
if table_fragment:
    for table in table_fragment:
        table_schema = table[0]
        table_name = table[1]
        table_rows = table[2]
        print (" table_schema: %-20s  table_name : %-20s table_rows: %10d " %(table_schema, table_name, table_rows))
else:
    print ("no table has has more than 20000000 rows")

#get table charset not default
cursor.execute("show variables like 'character_set_server';")
default_charset = str(cursor.fetchone()[1])
default_charset = default_charset+"_general_ci"
sql = "select table_schema,table_name,table_collation from information_schema.tables where table_schema not \
in ('information_schema','mysql','performance_schema','sys') and table_collation !='"+default_charset+"';"
cursor.execute(sql)
table_charset = cursor.fetchall()

print ("\033[1;33;44m 5: result of table is not in default charset\033[0m")
if table_charset:
    for table in table_charset:
        table_schema = table[0]
        table_name = table[1]
        charset = table[2]
        print (" table_schema: %-20s  table_name : %-20s charset: %10s " %(table_schema, table_name, charset))
else:
    print ("no table is not in default charset")

#get tables which have big columns
cursor.execute("select table_schema,table_name,column_name,data_type from information_schema.columns where data_type in \
('blob','clob','text','medium text','long text') and table_schema not in \
('information_schema','performance_schema','mysql','sys')")
table_big_cols = cursor.fetchall()

print ("\033[1;33;44m 6: result of table has big columns\033[0m")
if table_big_cols:
    for table in table_big_cols:
        table_schema = table[0]
        table_name = table[1]
        column_name = table[2]
        data_type = table[3]
        print (" table_schema: %-20s  table_name : %-20s column_name: %-20s data_type: %-20s" %(table_schema, table_name, column_name, data_type))
else:
    print ("no table has has big columns")

#get tables which have long varchar columns
cursor.execute("select table_schema,table_name,column_name,data_type,CHARACTER_MAXIMUM_LENGTH from information_schema.columns \
where DATA_TYPE='varchar' and CHARACTER_MAXIMUM_LENGTH > 500 and table_schema not in \
('information_schema','performance_schema','mysql','sys');")
table_long_cols = cursor.fetchall()

print ("\033[1;33;44m 7: result of table has long columns\033[0m")
if table_long_cols:
    for table in table_long_cols:
        table_schema = table[0]
        table_name = table[1]
        column_name = table[2]
        data_type = table[3]
        CHARACTER_MAXIMUM_LENGTH = table[4]
        print (" table_schema: %-20s  table_name : %-20s column_name: %-20s data_type: %-20s length: %-5s" %(table_schema, table_name, column_name, data_type, CHARACTER_MAXIMUM_LENGTH))
else:
    print ("no table has has big columns")

#get tables which have not indexes
cursor.execute("SELECT t.table_schema,t.table_name FROM information_schema.tables AS t LEFT JOIN \
(SELECT DISTINCT table_schema, table_name FROM information_schema.`KEY_COLUMN_USAGE` ) AS kt ON \
kt.table_schema=t.table_schema AND kt.table_name = t.table_name WHERE t.table_schema NOT IN \
('mysql', 'information_schema', 'performance_schema', 'sys') AND kt.table_name IS NULL;")
table_not_indexes = cursor.fetchall()

print ("\033[1;33;44m 8: result of table has not indexes\033[0m")
if table_not_indexes:
    for table in table_not_indexes:
        table_schema = table[0]
        table_name = table[1]
        print (" table_schema: %-20s  table_name : %-20s " %(table_schema, table_name))
else:
    print ("all tables have indexes")

# time.sleep(5)

# index check
print ('''
----------------------------------------------------------------------------------------------------------------
start index check
1.redundant indexes
2.to much columns indexes
3.unused indexes
----------------------------------------------------------------------------------------------------------------
''')

#redundant indexes
cursor.execute("select table_schema,table_name,redundant_index_name,redundant_index_columns \
from sys.schema_redundant_indexes;")
redundant_indexes = cursor.fetchall()

print ("\033[1;33;44m 1: result of redundant indexes\033[0m")
if redundant_indexes:
    for index in redundant_indexes:
        table_schema = index[0]
        table_name = index[1]
        index_name = index[2]
        column_name = index[3]
        print (" table_schema: %-20s  table_name: %-20s index_name: %-20s column_name:%-20s" %(table_schema, table_name, index_name, column_name))
else:
    print ("no redundant indexes")

#to much columns indexes
cursor.execute("select s.table_schema,s.table_name,s.index_name,s.column_name from information_schema.STATISTICS s,\
(select table_name,index_name,count(*) from information_schema.STATISTICS where table_schema not in \
('information_schema','performance_schema','mysql','sys') group by table_name,index_name having count(*)>5)t where \
s.table_name=t.table_name and s.index_name=t.index_name;")
to_much_columns_indexes = cursor.fetchall()

print ("\033[1;33;44m 2: result of to much columns indexes\033[0m")
if to_much_columns_indexes:
    for index in to_much_columns_indexes:
        table_schema = index[0]
        table_name = index[1]
        index_name = index[2]
        column_name = index[3]
        print (" table_schema: %-20s  table_name: %-20s index_name: %-20s column_name:%-20s" %(table_schema, table_name, index_name, column_name))
else:
    print ("all index have column under 5")

#unused indexes
cursor.execute("select * from sys.schema_unused_indexes;")
unused_indexes = cursor.fetchall()

print ("\033[1;33;44m 3: result of redundant indexes\033[0m")
if unused_indexes:
    for index in unused_indexes:
        table_schema = index[0]
        table_name = index[1]
        index_name = index[2]
        print (" table_schema: %-20s  table_name: %-20s index_name: %-20s" %(table_schema, table_name, index_name))
else:
    print ("no unused indexes")


print ('''
----------------------------------------------------------------------------------------------------------------
start variables check
1.version
2.innodb_buffer_pool_size
3.innodb_flush_log_at_trx_commit
4.innodb_log_file_size
5.innodb_log_files_in_group
6.innodb_file_per_table
7.innodb_open_files
8.innodb_data_home_dir 
9.innodb_flush_method
10.innodb_max_dirty_pages_pct 
11.sync_binlog
12.max_connections 
13.query_cache_type 
14.sort_buffer_size 
15.read_buffer_size 
16.max_allowed_packet
17.table_open_cache
18.thread_cache_size 
19.key_buffer_size
20.charset
21.time_zone
22.default storage engine
----------------------------------------------------------------------------------------------------------------
''')

#1.mysql_version
sql_version = "select version();"
cursor.execute(sql_version)
data = cursor.fetchone()
mysql_version = data[0]
print ("mysql_version: %-30s" %mysql_version)

#2.innodb_buffer_pool_size
sql_innodb_buffer_pool_size = "show global variables like 'innodb_buffer_pool_size'"
cursor.execute(sql_innodb_buffer_pool_size)
data = cursor.fetchone()
innodb_buffer_pool_size = int(data[1])/1024/1024
print ("innodb_buffer_pool_size: %f M" %innodb_buffer_pool_size)

#3.innodb_flush_log_at_trx_commit
sql_innodb_flush_log_at_trx_commit = "show global variables like 'innodb_flush_log_at_trx_commit'"
cursor.execute(sql_innodb_flush_log_at_trx_commit)
data = cursor.fetchone()
innodb_flush_log_at_trx_commit = data[1]
print ("innodb_flush_log_at_trx_commit: %s" %innodb_flush_log_at_trx_commit)

#4.innodb_log_file_size
sql_innodb_log_file_size = "show global variables like 'innodb_log_file_size'"
cursor.execute(sql_innodb_log_file_size)
data = cursor.fetchone()
innodb_log_file_size = int(data[1])/1024/1024
print ("innodb_log_file_size: %s M" %innodb_log_file_size)

#5.innodb_log_files_in_group
sql_innodb_log_files_in_group = "show global variables like 'innodb_log_files_in_group'"
cursor.execute(sql_innodb_log_files_in_group)
data = cursor.fetchone()
innodb_log_files_in_group = data[1]
print ("innodb_log_files_in_group: %s" %innodb_log_files_in_group)

#6.innodb_file_per_table
sql_innodb_file_per_table = "show global variables like 'innodb_file_per_table'"
cursor.execute(sql_innodb_file_per_table)
data = cursor.fetchone()
innodb_file_per_table = data[1]
print ("innodb_file_per_table: %s" %innodb_file_per_table)

#7.innodb_open_files
sql_innodb_open_files = "show global variables like 'innodb_open_files'"
cursor.execute(sql_innodb_open_files)
data = cursor.fetchone()
innodb_open_files = data[1]
print ("innodb_open_files: %s" %innodb_open_files)

#8.innodb_data_home_dir
sql_innodb_data_home_dir = "show global variables like 'datadir'"
cursor.execute(sql_innodb_data_home_dir)
data = cursor.fetchone()
datadir = data[1]
print ("innodb_data_home_dir: %s" %datadir)

#9.innodb_flush_method
sql_innodb_flush_method = "show global variables like 'innodb_flush_method'"
cursor.execute(sql_innodb_flush_method)
data = cursor.fetchone()
innodb_flush_method = data[1]
print ("innodb_flush_method: %s" %innodb_flush_method)

#10.innodb_max_dirty_pages_pct
sql_innodb_max_dirty_pages_pct = "show global variables like 'innodb_max_dirty_pages_pct'"
cursor.execute(sql_innodb_max_dirty_pages_pct)
data = cursor.fetchone()
innodb_max_dirty_pages_pct = data[1]
print ("innodb_max_dirty_pages_pct: %s" %innodb_max_dirty_pages_pct)

#11.sync_binlog
sql_sync_binlog = "show global variables like 'sync_binlog'"
cursor.execute(sql_sync_binlog)
data = cursor.fetchone()
sync_binlog = data[1]
print ("sync_binlog: %s" %sync_binlog)

#12.max_connections
sql_max_connections = "show global variables like 'max_connections'"
cursor.execute(sql_max_connections)
data = cursor.fetchone()
max_connections = data[1]
print ("max_connections: %s" %max_connections)

## #13.query_cache_type
## sql_query_cache_type = "show global variables like 'query_cache_type'"
## cursor.execute(sql_query_cache_type)
## data = cursor.fetchone()
## query_cache_type = data[1]
## print ("query_cache_type: %s" %query_cache_type)

#14.sort_buffer_size
sql_sort_buffer_size = "show global variables like 'sort_buffer_size'"
cursor.execute(sql_sort_buffer_size)
data = cursor.fetchone()
sort_buffer_size = float(data[1])/1024/1024
print ("sort_buffer_size: %f M" %sort_buffer_size)

#15.read_buffer_size
sql_read_buffer_size = "show global variables like 'read_buffer_size'"
cursor.execute(sql_read_buffer_size)
data = cursor.fetchone()
read_buffer_size = float(data[1])/1024/1024
print ("read_buffer_size: %f M" %read_buffer_size)

#16.max_allowed_packet
sql_max_allowed_packet = "show global variables like 'max_allowed_packet'"
cursor.execute(sql_max_allowed_packet)
data = cursor.fetchone()
max_allowed_packet = float(data[1])/1024/1024
print ("max_allowed_packet: %f M" %max_allowed_packet)

#17.table_open_cache
sql_table_open_cache = "show global variables like 'table_open_cache'"
cursor.execute(sql_table_open_cache)
data = cursor.fetchone()
table_open_cache = data[1]
print ("table_open_cache: %s" %table_open_cache)

#18.thread_cache_size
sql_thread_cache_size = "show global variables like 'thread_cache_size'"
cursor.execute(sql_thread_cache_size)
data = cursor.fetchone()
thread_cache_size = data[1]
print ("thread_cache_size: %s" %thread_cache_size)


#19.key_buffer_size
sql_key_buffer_size = "show global variables like 'key_buffer_size'"
cursor.execute(sql_key_buffer_size)
data = cursor.fetchone()
key_buffer_size = float(data[1])/1024/1024
print ("key_buffer_size: %f M" %key_buffer_size)

#20.charset
sql_character_set_server = "show global variables like 'character_set_server'"
cursor.execute(sql_character_set_server)
data = cursor.fetchone()
character_set_server = data[1]
print ("character_set_server: %s" %character_set_server)

#21.time_zone
sql_time_zone = "show global variables like 'time_zone'"
cursor.execute(sql_time_zone)
data = cursor.fetchone()
time_zone = data[1]
print ("time_zone: %s" %time_zone)

#22.default_storage_engine
sql_default_storage_engine = "show global variables like 'default_storage_engine'"
cursor.execute(sql_default_storage_engine)
data = cursor.fetchone()
default_storage_engine = data[1]
print ("default_storage_engine: %s" %default_storage_engine)

print ('''
----------------------------------------------------------------------------------------------------------------
start status check
1.opened files
2.Opened_table_definitions
3.opened tables
4.max_used_connections
----------------------------------------------------------------------------------------------------------------
''')

#1.opened files
sql_Opened_files = "show global status like 'Opened_files'"
cursor.execute(sql_Opened_files)
data = cursor.fetchone()
Opened_files = data[1]
print ("Opened_files: %s" %Opened_files)

#2.Opened_table_definitions files
sql_Opened_table_definitions = "show global status like 'Opened_table_definitions'"
cursor.execute(sql_Opened_table_definitions)
data = cursor.fetchone()
Opened_table_definitions = data[1]
print ("Opened_table_definitions: %s" %Opened_table_definitions)

#3.Opened_tables
sql_Opened_tables = "show global status like 'Opened_tables'"
cursor.execute(sql_Opened_tables)
data = cursor.fetchone()
Opened_tables = data[1]
print ("Opened_tables: %s" %Opened_tables)

#4.Max_used_connections
sql_Max_used_connections = "show global status like 'Max_used_connections'"
cursor.execute(sql_Max_used_connections)
data = cursor.fetchone()
Max_used_connections = data[1]
print ("Max_used_connections: %s" %Max_used_connections)

print ('''
----------------------------------------------------------------------------------------------------------------
start user check
1.no name user
2.no pass user
3.any where user
4.high privileges user
----------------------------------------------------------------------------------------------------------------
''')

#1.no name user

cursor.execute("select user,host from mysql.user where user='';")
no_name_user = cursor.fetchall()

print ("\033[1;33;44m 1: result of no name users\033[0m")
if no_name_user:
    for user in no_name_user:
        username = user[0]
        host = user[1]
        print (" user_name: %-20s  host: %-20s" %(username, host))
else:
    print ("all users have name")

#2.no pass user

cursor.execute("select user,host from mysql.user where authentication_string='';")
no_pass_user = cursor.fetchall()

print ("\033[1;33;44m 1: result of no pass users\033[0m")
if no_pass_user:
    for user in no_pass_user:
        username = user[0]
        host = user[1]
        print (" user_name: %-20s  host: %-20s" %(username, host))
else:
    print ("all users have password")

#3.any where user

cursor.execute("select user,host from mysql.user where host='%';")
anywhere_user = cursor.fetchall()

print ("\033[1;33;44m 3: result of %users\033[0m")
if anywhere_user:
    for user in anywhere_user:
        username = user[0]
        host = user[1]
        print (" user_name: %-20s  host: %-20s" %(username, host))
else:
    print ("no %user")

#4.high privileges user

cursor.execute("select user,host from mysql.user where user not in ('mysql.session','mysql.sys','mysql.infoschema');")
mysql_user = cursor.fetchall()

print ("\033[1;33;44m 3: result of %users\033[0m")
if mysql_user:
    for user in mysql_user:
        username = user[0]
        host = user[1]
        user_sql = "show grants for %s@'%s';" %(username, host)
        cursor.execute(user_sql)
        priv = []
        for i in cursor:
            priv.append(tuple(re.split(r' TO ', str(*i))[0].split(r' ON ')))
        print ("username: %s priv: %s" %(username, priv))
else:
    print ("no %user")



```


```
#!/usr/bin/env python
#-*- coding:utf-8 -*-
import os
import MySQLdb as mdb
import time,datetime
import re
from passde import encrypt, decrypt

## conn = mdb.connect(host='127.0.0.1', port=3306, user='root', passwd=decrypt('776ebdb8d0430e24b5bb751476c01417'), db='jumpmysql', charset='utf8')
conn = mdb.connect(host='127.0.0.1', port=8302, user='lin', passwd='mysql', db='test', charset='utf8')

cursor = conn.cursor()

print "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
print "++                                          MySQL Check report                                                ++"
print "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"

print "start time: %s" % datetime.datetime.now()
#table_check

print '''
----------------------------------------------------------------------------------------------------------------
start table check
1.size
2.much indexes
3.fragment
4.rows
5.charset
6.big column
7.long column
8.no indexes
----------------------------------------------------------------------------------------------------------------
'''
#get tables more than 10G
cursor.execute("select table_schema,table_name,concat(round((data_length+index_length)/1024/1024,2),'M') FROM \
information_schema.tables where (DATA_LENGTH+INDEX_LENGTH) > 10*1024*1024*1024  and table_schema not in \
('information_schema','mysql','performance_schema','sys')")
table_size = cursor.fetchall()

print "\033[1;33;44m 1: result of table is more than 10G\033[0m"
if table_size:
    for table in table_size:
        table_schema = table[0]
        table_name = table[1]
        size = table[2]
        print " table_schema: %-20s  table_name : %-20s size: %10s " % \
              (table_schema, table_name, size)
else:
    print "no table is more than 10G"

#get tables which have more than 6 indexes
cursor.execute("select t1.name,t2.num from information_schema.innodb_sys_tables t1, (select table_id,count(*) as num from \
information_schema.innodb_sys_indexes group by table_id having count(*) >=6) t2 where t1.table_id =t2.table_id")
table_index = cursor.fetchall()

print "\033[1;33;44m 2: result of table more than 6 indexes\033[0m"
if table_index:
    for table in table_index:
        table_name = table[0]
        index_num = table[1]
        print " table_name: %-50s  index_num: %10d " % \
              (table_name, index_num)
else:
    print "no table has more than 6 indexes"


#get tables which have big fragment
cursor.execute("select table_schema,table_name,DATA_FREE from \
information_schema.TABLES where table_schema not in ('information_schema','mysql','performance_schema','sys') \
and data_free > 1*1024*1024*1024 order by DATA_FREE desc;")
table_fragment = cursor.fetchall()

print "\033[1;33;44m 3: result of table has big fragment\033[0m"
if table_fragment:
    for table in table_fragment:
        table_schema = table[0]
        table_name = table[1]
        data_free = table[2]
        print " table_schema: %-20s  table_name : %-20s fragment: %10s " % \
              (table_schema, table_name, data_free)
else:
    print "no table has big fragment"

#get tables which have 20000000 rows
cursor.execute("select table_schema,table_name,table_rows from \
information_schema.TABLES where table_schema not in ('information_schema','mysql','performance_schema','sys') \
and table_rows > 20000000 order by table_rows desc;")
table_fragment = cursor.fetchall()

print "\033[1;33;44m 4: result of table has more than 20000000 rows\033[0m"
if table_fragment:
    for table in table_fragment:
        table_schema = table[0]
        table_name = table[1]
        table_rows = table[2]
        print " table_schema: %-20s  table_name : %-20s table_rows: %10d " % \
              (table_schema, table_name, table_rows)
else:
    print "no table has has more than 20000000 rows"

#get table charset not default
cursor.execute("show variables like 'character_set_server';")
default_charset = str(cursor.fetchone()[1])
default_charset = default_charset+"_general_ci"
sql = "select table_schema,table_name,table_collation from information_schema.tables where table_schema not \
in ('information_schema','mysql','performance_schema','sys') and table_collation !='"+default_charset+"';"
cursor.execute(sql)
table_charset = cursor.fetchall()

print "\033[1;33;44m 5: result of table is not in default charset\033[0m"
if table_charset:
    for table in table_charset:
        table_schema = table[0]
        table_name = table[1]
        charset = table[2]
        print " table_schema: %-20s  table_name : %-20s charset: %10s " % \
              (table_schema, table_name, charset)
else:
    print "no table is not in default charset"

#get tables which have big columns
cursor.execute("select table_schema,table_name,column_name,data_type from information_schema.columns where data_type in \
('blob','clob','text','medium text','long text') and table_schema not in \
('information_schema','performance_schema','mysql','sys')")
table_big_cols = cursor.fetchall()

print "\033[1;33;44m 6: result of table has big columns\033[0m"
if table_big_cols:
    for table in table_big_cols:
        table_schema = table[0]
        table_name = table[1]
        column_name = table[2]
        data_type = table[3]
        print " table_schema: %-20s  table_name : %-20s column_name: %-20s data_type: %-20s" % \
              (table_schema, table_name, column_name, data_type)
else:
    print "no table has has big columns"

#get tables which have long varchar columns
cursor.execute("select table_schema,table_name,column_name,data_type,CHARACTER_MAXIMUM_LENGTH from information_schema.columns \
where DATA_TYPE='varchar' and CHARACTER_MAXIMUM_LENGTH > 500 and table_schema not in \
('information_schema','performance_schema','mysql','sys');")
table_long_cols = cursor.fetchall()

print "\033[1;33;44m 7: result of table has long columns\033[0m"
if table_long_cols:
    for table in table_long_cols:
        table_schema = table[0]
        table_name = table[1]
        column_name = table[2]
        data_type = table[3]
        CHARACTER_MAXIMUM_LENGTH = table[4]
        print " table_schema: %-20s  table_name : %-20s column_name: %-20s data_type: %-20s length: %-5s" % \
              (table_schema, table_name, column_name, data_type, CHARACTER_MAXIMUM_LENGTH)
else:
    print "no table has has big columns"

#get tables which have not indexes
cursor.execute("SELECT t.table_schema,t.table_name FROM information_schema.tables AS t LEFT JOIN \
(SELECT DISTINCT table_schema, table_name FROM information_schema.`KEY_COLUMN_USAGE` ) AS kt ON \
kt.table_schema=t.table_schema AND kt.table_name = t.table_name WHERE t.table_schema NOT IN \
('mysql', 'information_schema', 'performance_schema', 'sys') AND kt.table_name IS NULL;")
table_not_indexes = cursor.fetchall()

print "\033[1;33;44m 8: result of table has not indexes\033[0m"
if table_not_indexes:
    for table in table_not_indexes:
        table_schema = table[0]
        table_name = table[1]
        print " table_schema: %-20s  table_name : %-20s " % \
              (table_schema, table_name)
else:
    print "all tables have indexes"

# time.sleep(5)

# index check
print '''
----------------------------------------------------------------------------------------------------------------
start index check
1.redundant indexes
2.to much columns indexes
3.unused indexes
----------------------------------------------------------------------------------------------------------------
'''

#redundant indexes
cursor.execute("select table_schema,table_name,redundant_index_name,redundant_index_columns \
from sys.schema_redundant_indexes;")
redundant_indexes = cursor.fetchall()

print "\033[1;33;44m 1: result of redundant indexes\033[0m"
if redundant_indexes:
    for index in redundant_indexes:
        table_schema = index[0]
        table_name = index[1]
        index_name = index[2]
        column_name = index[3]
        print " table_schema: %-20s  table_name: %-20s index_name: %-20s column_name:%-20s" % \
              (table_schema, table_name, index_name, column_name)
else:
    print "no redundant indexes"

#to much columns indexes
cursor.execute("select s.table_schema,s.table_name,s.index_name,s.column_name from information_schema.STATISTICS s,\
(select table_name,index_name,count(*) from information_schema.STATISTICS where table_schema not in \
('information_schema','performance_schema','mysql','sys') group by table_name,index_name having count(*)>5)t where \
s.table_name=t.table_name and s.index_name=t.index_name;")
to_much_columns_indexes = cursor.fetchall()

print "\033[1;33;44m 2: result of to much columns indexes\033[0m"
if to_much_columns_indexes:
    for index in to_much_columns_indexes:
        table_schema = index[0]
        table_name = index[1]
        index_name = index[2]
        column_name = index[3]
        print " table_schema: %-20s  table_name: %-20s index_name: %-20s column_name:%-20s" % \
              (table_schema, table_name, index_name, column_name)
else:
    print "all index have column under 5"

#unused indexes
cursor.execute("select * from sys.schema_unused_indexes;")
unused_indexes = cursor.fetchall()

print "\033[1;33;44m 3: result of redundant indexes\033[0m"
if unused_indexes:
    for index in unused_indexes:
        table_schema = index[0]
        table_name = index[1]
        index_name = index[2]
        print " table_schema: %-20s  table_name: %-20s index_name: %-20s" % \
              (table_schema, table_name, index_name)
else:
    print "no unused indexes"


print '''
----------------------------------------------------------------------------------------------------------------
start variables check
1.version
2.innodb_buffer_pool_size
3.innodb_flush_log_at_trx_commit
4.innodb_log_file_size
5.innodb_log_files_in_group
6.innodb_file_per_table
7.innodb_open_files
8.innodb_data_home_dir 
9.innodb_flush_method
10.innodb_max_dirty_pages_pct 
11.sync_binlog
12.max_connections 
13.query_cache_type 
14.sort_buffer_size 
15.read_buffer_size 
16.max_allowed_packet
17.table_open_cache
18.thread_cache_size 
19.key_buffer_size
20.charset
21.time_zone
22.default storage engine
----------------------------------------------------------------------------------------------------------------
'''

#1.mysql_version
sql_version = "select version();"
cursor.execute(sql_version)
data = cursor.fetchone()
mysql_version = data[0]
print "mysql_version: %-30s" % mysql_version

#2.innodb_buffer_pool_size
sql_innodb_buffer_pool_size = "show global variables like 'innodb_buffer_pool_size'"
cursor.execute(sql_innodb_buffer_pool_size)
data = cursor.fetchone()
innodb_buffer_pool_size = int(data[1])/1024/1024
print "innodb_buffer_pool_size: %f M" % innodb_buffer_pool_size

#3.innodb_flush_log_at_trx_commit
sql_innodb_flush_log_at_trx_commit = "show global variables like 'innodb_flush_log_at_trx_commit'"
cursor.execute(sql_innodb_flush_log_at_trx_commit)
data = cursor.fetchone()
innodb_flush_log_at_trx_commit = data[1]
print "innodb_flush_log_at_trx_commit: %s" % innodb_flush_log_at_trx_commit

#4.innodb_log_file_size
sql_innodb_log_file_size = "show global variables like 'innodb_log_file_size'"
cursor.execute(sql_innodb_log_file_size)
data = cursor.fetchone()
innodb_log_file_size = int(data[1])/1024/1024
print "innodb_log_file_size: %s M" % innodb_log_file_size

#5.innodb_log_files_in_group
sql_innodb_log_files_in_group = "show global variables like 'innodb_log_files_in_group'"
cursor.execute(sql_innodb_log_files_in_group)
data = cursor.fetchone()
innodb_log_files_in_group = data[1]
print "innodb_log_files_in_group: %s" % innodb_log_files_in_group

#6.innodb_file_per_table
sql_innodb_file_per_table = "show global variables like 'innodb_file_per_table'"
cursor.execute(sql_innodb_file_per_table)
data = cursor.fetchone()
innodb_file_per_table = data[1]
print "innodb_file_per_table: %s" % innodb_file_per_table

#7.innodb_open_files
sql_innodb_open_files = "show global variables like 'innodb_open_files'"
cursor.execute(sql_innodb_open_files)
data = cursor.fetchone()
innodb_open_files = data[1]
print "innodb_open_files: %s" % innodb_open_files

#8.innodb_data_home_dir
sql_innodb_data_home_dir = "show global variables like 'datadir'"
cursor.execute(sql_innodb_data_home_dir)
data = cursor.fetchone()
datadir = data[1]
print "innodb_data_home_dir: %s" % datadir

#9.innodb_flush_method
sql_innodb_flush_method = "show global variables like 'innodb_flush_method'"
cursor.execute(sql_innodb_flush_method)
data = cursor.fetchone()
innodb_flush_method = data[1]
print "innodb_flush_method: %s" % innodb_flush_method

#10.innodb_max_dirty_pages_pct
sql_innodb_max_dirty_pages_pct = "show global variables like 'innodb_max_dirty_pages_pct'"
cursor.execute(sql_innodb_max_dirty_pages_pct)
data = cursor.fetchone()
innodb_max_dirty_pages_pct = data[1]
print "innodb_max_dirty_pages_pct: %s" % innodb_max_dirty_pages_pct

#11.sync_binlog
sql_sync_binlog = "show global variables like 'sync_binlog'"
cursor.execute(sql_sync_binlog)
data = cursor.fetchone()
sync_binlog = data[1]
print "sync_binlog: %s" % sync_binlog

#12.max_connections
sql_max_connections = "show global variables like 'max_connections'"
cursor.execute(sql_max_connections)
data = cursor.fetchone()
max_connections = data[1]
print "max_connections: %s" % max_connections

#13.query_cache_type
sql_query_cache_type = "show global variables like 'query_cache_type'"
cursor.execute(sql_query_cache_type)
data = cursor.fetchone()
query_cache_type = data[1]
print "query_cache_type: %s" % query_cache_type

#14.sort_buffer_size
sql_sort_buffer_size = "show global variables like 'sort_buffer_size'"
cursor.execute(sql_sort_buffer_size)
data = cursor.fetchone()
sort_buffer_size = float(data[1])/1024/1024
print "sort_buffer_size: %f M" % sort_buffer_size

#15.read_buffer_size
sql_read_buffer_size = "show global variables like 'read_buffer_size'"
cursor.execute(sql_read_buffer_size)
data = cursor.fetchone()
read_buffer_size = float(data[1])/1024/1024
print "read_buffer_size: %f M" % read_buffer_size

#16.max_allowed_packet
sql_max_allowed_packet = "show global variables like 'max_allowed_packet'"
cursor.execute(sql_max_allowed_packet)
data = cursor.fetchone()
max_allowed_packet = float(data[1])/1024/1024
print "max_allowed_packet: %f M" % max_allowed_packet

#17.table_open_cache
sql_table_open_cache = "show global variables like 'table_open_cache'"
cursor.execute(sql_table_open_cache)
data = cursor.fetchone()
table_open_cache = data[1]
print "table_open_cache: %s" % table_open_cache

#18.thread_cache_size
sql_thread_cache_size = "show global variables like 'thread_cache_size'"
cursor.execute(sql_thread_cache_size)
data = cursor.fetchone()
thread_cache_size = data[1]
print "thread_cache_size: %s" % thread_cache_size


#19.key_buffer_size
sql_key_buffer_size = "show global variables like 'key_buffer_size'"
cursor.execute(sql_key_buffer_size)
data = cursor.fetchone()
key_buffer_size = float(data[1])/1024/1024
print "key_buffer_size: %f M" % key_buffer_size

#20.charset
sql_character_set_server = "show global variables like 'character_set_server'"
cursor.execute(sql_character_set_server)
data = cursor.fetchone()
character_set_server = data[1]
print "character_set_server: %s" % character_set_server

#21.time_zone
sql_time_zone = "show global variables like 'time_zone'"
cursor.execute(sql_time_zone)
data = cursor.fetchone()
time_zone = data[1]
print "time_zone: %s" % time_zone

#22.default_storage_engine
sql_default_storage_engine = "show global variables like 'default_storage_engine'"
cursor.execute(sql_default_storage_engine)
data = cursor.fetchone()
default_storage_engine = data[1]
print "default_storage_engine: %s" % default_storage_engine

print '''
----------------------------------------------------------------------------------------------------------------
start status check
1.opened files
2.Opened_table_definitions
3.opened tables
4.max_used_connections
----------------------------------------------------------------------------------------------------------------
'''

#1.opened files
sql_Opened_files = "show global status like 'Opened_files'"
cursor.execute(sql_Opened_files)
data = cursor.fetchone()
Opened_files = data[1]
print "Opened_files: %s" % Opened_files

#2.Opened_table_definitions files
sql_Opened_table_definitions = "show global status like 'Opened_table_definitions'"
cursor.execute(sql_Opened_table_definitions)
data = cursor.fetchone()
Opened_table_definitions = data[1]
print "Opened_table_definitions: %s" % Opened_table_definitions

#3.Opened_tables
sql_Opened_tables = "show global status like 'Opened_tables'"
cursor.execute(sql_Opened_tables)
data = cursor.fetchone()
Opened_tables = data[1]
print "Opened_tables: %s" % Opened_tables

#4.Max_used_connections
sql_Max_used_connections = "show global status like 'Max_used_connections'"
cursor.execute(sql_Max_used_connections)
data = cursor.fetchone()
Max_used_connections = data[1]
print "Max_used_connections: %s" % Max_used_connections

print '''
----------------------------------------------------------------------------------------------------------------
start user check
1.no name user
2.no pass user
3.any where user
4.high privileges user
----------------------------------------------------------------------------------------------------------------
'''

#1.no name user

cursor.execute("select user,host from mysql.user where user='';")
no_name_user = cursor.fetchall()

print "\033[1;33;44m 1: result of no name users\033[0m"
if no_name_user:
    for user in no_name_user:
        username = user[0]
        host = user[1]
        print " user_name: %-20s  host: %-20s" % \
              (username, host)
else:
    print "all users have name"

#2.no pass user

cursor.execute("select user,host from mysql.user where authentication_string='';")
no_pass_user = cursor.fetchall()

print "\033[1;33;44m 1: result of no pass users\033[0m"
if no_pass_user:
    for user in no_pass_user:
        username = user[0]
        host = user[1]
        print " user_name: %-20s  host: %-20s" % \
              (username, host)
else:
    print "all users have password"

#3.any where user

cursor.execute("select user,host from mysql.user where host='%';")
anywhere_user = cursor.fetchall()

print "\033[1;33;44m 3: result of % users\033[0m"
if anywhere_user:
    for user in anywhere_user:
        username = user[0]
        host = user[1]
        print " user_name: %-20s  host: %-20s" % \
              (username, host)
else:
    print "no % user"

#4.high privileges user

cursor.execute("select user,host from mysql.user where user not in ('mysql.session','mysql.sys');")
mysql_user = cursor.fetchall()

print "\033[1;33;44m 3: result of % users\033[0m"
if mysql_user:
    for user in mysql_user:
        username = user[0]
        host = user[1]
        user_sql = "show grants for %s@'%s';" % (username, host)
        cursor.execute(user_sql)
        priv = []
        for i in cursor:
            priv.append(tuple(re.split(r' TO ', str(*i))[0].split(r' ON ')))
        print "username: %s priv: %s" % (username, priv)
else:
    print "no % user"

```