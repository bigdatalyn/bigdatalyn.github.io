---
layout: post
title: "Oracle Basic SQL 014 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}

Oracle Basic SQL 014 Study Tips

Sub-queries in select can be converted to left join (use_hj/use_nl)

Tips: The execution plan has the `OUTER` keyword

标量子查询可以转left join外连接（use_hj/use_nl)

Tips:
- 执行计划有`OUTER`关键字
- 如果有group by,先汇总，后关联
- MySQL slave 状态说明







### Env

```
SQL> select banner from v$version;

BANNER
----------------------------------------------------------------------
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production

SQL> select banner_full from v$version;

BANNER_FULL
-----------------------------------------------------------------------------------------
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0


SQL> !cat /etc/redhat-release
Red Hat Enterprise Linux release 8.4 (Ootpa)

SQL> !uname -r
5.4.17-2102.201.3.el8uek.x86_64

SQL>
SQL> show user
USER is "HR"
SQL>

grant dba to hr;

```


### 


```
No1.
select employee_id,first_name,job_id,salary,department_id,
(select d.department_name from departments d where d.department_id = e.department_id) as dept_name 
from employees e 
where department_id in (100,110);

No2.
select e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.department_name 
from employees e left join departments d on (e.department_id = d.department_id) 
where e.department_id in (100,110);

No3.

select /*+ use_hj(e,d) */ e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.department_name 
from employees e left join departments d on (e.department_id = d.department_id) 
where e.department_id in (100,110);

select /*+ use_nl(e,d) */ e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.department_name 
from employees e left join departments d on (e.department_id = d.department_id) 
where e.department_id in (100,110);
```


```sql
No1.
SQL>
select employee_id,first_name,job_id,salary,department_id,
(select d.department_name from departments d where d.department_id = e.department_id) as dept_name
  3  from employees e
  4  where department_id in (100,110);

 EMPLOYEE_ID FIRST_NAME  JOB_ID      SALARY  DEPARTMENT_ID DEPT_NAME
------------ ----------- ---------- ------- -------------- ----------
	 108 Nancy	 FI_MGR       12008	       100 Finance
	 109 Daniel	 FI_ACCOUNT    9000	       100 Finance
	 110 John	 FI_ACCOUNT    8200	       100 Finance
	 111 Ismael	 FI_ACCOUNT    7700	       100 Finance
	 112 Jose Manuel FI_ACCOUNT    7800	       100 Finance
	 113 Luis	 FI_ACCOUNT    6900	       100 Finance
	 205 Shelley	 AC_MGR       12008	       110 Accounting
	 206 William	 AC_ACCOUNT    8300	       110 Accounting

8 rows selected.

SQL>


SQL_ID	a46hz73nz73nz, child number 0
-------------------------------------
select employee_id,first_name,job_id,salary,department_id, (select
d.department_name from departments d where d.department_id =
e.department_id) as dept_name from employees e where department_id in
(100,110)

Plan hash value: 1690697063

--------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			     | Name		 | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers |
--------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		     |			 |	1 |	   |	 4 (100)|	   |	  8 |00:00:00.01 |	 6 |
|   1 |  TABLE ACCESS BY INDEX ROWID	     | DEPARTMENTS	 |	2 |	 1 |	 1   (0)| 00:00:01 |	  2 |00:00:00.01 |	 4 |
|*  2 |   INDEX UNIQUE SCAN		     | DEPT_ID_PK	 |	2 |	 1 |	 0   (0)|	   |	  2 |00:00:00.01 |	 2 |
|   3 |  INLIST ITERATOR		     |			 |	1 |	   |		|	   |	  8 |00:00:00.01 |	 6 |
|   4 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES	 |	2 |	 7 |	 2   (0)| 00:00:01 |	  8 |00:00:00.01 |	 6 |
|*  5 |    INDEX RANGE SCAN		     | EMP_DEPARTMENT_IX |	2 |	 8 |	 1   (0)| 00:00:01 |	  8 |00:00:00.01 |	 3 |
--------------------------------------------------------------------------------------------------------------------------------------------


No2.

SQL>
select e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.department_name
from employees e left join departments d on (e.department_id = d.department_id)
  3  where e.department_id in (100,110);

 EMPLOYEE_ID FIRST_NAME  JOB_ID      SALARY  DEPARTMENT_ID DEPARTMENT_NAME
------------ ----------- ---------- ------- -------------- ------------------------------
	 108 Nancy	 FI_MGR       12008	       100 Finance
	 109 Daniel	 FI_ACCOUNT    9000	       100 Finance
	 110 John	 FI_ACCOUNT    8200	       100 Finance
	 111 Ismael	 FI_ACCOUNT    7700	       100 Finance
	 112 Jose Manuel FI_ACCOUNT    7800	       100 Finance
	 113 Luis	 FI_ACCOUNT    6900	       100 Finance
	 205 Shelley	 AC_MGR       12008	       110 Accounting
	 206 William	 AC_ACCOUNT    8300	       110 Accounting

8 rows selected.

SQL>

SQL_ID	5m1bkyzzfp7uf, child number 0
-------------------------------------
select e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.de
partment_name from employees e left join departments d on
(e.department_id = d.department_id) where e.department_id in (100,110)

Plan hash value: 1425487419

---------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			      | Name		  | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
---------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		      | 		  |	 1 |	    |	  4 (100)|	    |	   8 |00:00:00.01 |	  8 |
|*  1 |  HASH JOIN OUTER		      | 		  |	 1 |	  7 |	  4   (0)| 00:00:01 |	   8 |00:00:00.01 |	  8 |
|   2 |   INLIST ITERATOR		      | 		  |	 1 |	    |		 |	    |	   8 |00:00:00.01 |	  4 |
|   3 |    TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES	  |	 2 |	  7 |	  2   (0)| 00:00:01 |	   8 |00:00:00.01 |	  4 |
|*  4 |     INDEX RANGE SCAN		      | EMP_DEPARTMENT_IX |	 2 |	  8 |	  1   (0)| 00:00:01 |	   8 |00:00:00.01 |	  2 |
|   5 |   INLIST ITERATOR		      | 		  |	 1 |	    |		 |	    |	   2 |00:00:00.01 |	  4 |
|   6 |    TABLE ACCESS BY INDEX ROWID	      | DEPARTMENTS	  |	 2 |	  2 |	  2   (0)| 00:00:01 |	   2 |00:00:00.01 |	  4 |
|*  7 |     INDEX UNIQUE SCAN		      | DEPT_ID_PK	  |	 2 |	  2 |	  1   (0)| 00:00:01 |	   2 |00:00:00.01 |	  2 |
---------------------------------------------------------------------------------------------------------------------------------------------

No3.

SQL>
select /*+ use_hj(e,d) */ e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.department_name
from employees e left join departments d on (e.department_id = d.department_id)
  3  where e.department_id in (100,110);

 EMPLOYEE_ID FIRST_NAME  JOB_ID      SALARY  DEPARTMENT_ID DEPARTMENT_NAME
------------ ----------- ---------- ------- -------------- ------------------------------
	 108 Nancy	 FI_MGR       12008	       100 Finance
	 109 Daniel	 FI_ACCOUNT    9000	       100 Finance
	 110 John	 FI_ACCOUNT    8200	       100 Finance
	 111 Ismael	 FI_ACCOUNT    7700	       100 Finance
	 112 Jose Manuel FI_ACCOUNT    7800	       100 Finance
	 113 Luis	 FI_ACCOUNT    6900	       100 Finance
	 205 Shelley	 AC_MGR       12008	       110 Accounting
	 206 William	 AC_ACCOUNT    8300	       110 Accounting

8 rows selected.

SQL>
select /*+ use_nl(e,d) */ e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.department_name
from employees e left join departments d on (e.department_id = d.department_id)
  3  where e.department_id in (100,110);

 EMPLOYEE_ID FIRST_NAME  JOB_ID      SALARY  DEPARTMENT_ID DEPARTMENT_NAME
------------ ----------- ---------- ------- -------------- ------------------------------
	 108 Nancy	 FI_MGR       12008	       100 Finance
	 109 Daniel	 FI_ACCOUNT    9000	       100 Finance
	 110 John	 FI_ACCOUNT    8200	       100 Finance
	 111 Ismael	 FI_ACCOUNT    7700	       100 Finance
	 112 Jose Manuel FI_ACCOUNT    7800	       100 Finance
	 113 Luis	 FI_ACCOUNT    6900	       100 Finance
	 205 Shelley	 AC_MGR       12008	       110 Accounting
	 206 William	 AC_ACCOUNT    8300	       110 Accounting

8 rows selected.

SQL>

SQL_ID	7v6m33dkx4n75, child number 0
-------------------------------------
select /*+ use_nl(e,d) */ e.employee_id,e.first_name,e.job_id,e.salary,e
.department_id,d.department_name from employees e left join departments
d on (e.department_id = d.department_id) where e.department_id in
(100,110)

Plan hash value: 970600241

---------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			      | Name		  | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
---------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		      | 		  |	 1 |	    |	  9 (100)|	    |	   8 |00:00:00.01 |	 18 |
|   1 |  NESTED LOOPS OUTER		      | 		  |	 1 |	  7 |	  9   (0)| 00:00:01 |	   8 |00:00:00.01 |	 18 |
|   2 |   INLIST ITERATOR		      | 		  |	 1 |	    |		 |	    |	   8 |00:00:00.01 |	  6 |
|   3 |    TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES	  |	 2 |	  7 |	  2   (0)| 00:00:01 |	   8 |00:00:00.01 |	  6 |
|*  4 |     INDEX RANGE SCAN		      | EMP_DEPARTMENT_IX |	 2 |	  8 |	  1   (0)| 00:00:01 |	   8 |00:00:00.01 |	  3 |
|   5 |   TABLE ACCESS BY INDEX ROWID	      | DEPARTMENTS	  |	 8 |	  1 |	  1   (0)| 00:00:01 |	   8 |00:00:00.01 |	 12 |
|*  6 |    INDEX UNIQUE SCAN		      | DEPT_ID_PK	  |	 8 |	  1 |	  0   (0)|	    |	   8 |00:00:00.01 |	  4 |
---------------------------------------------------------------------------------------------------------------------------------------------

```

### MySQL slave 状态说明

dbdeployer 创建 5.7 一主两从环境

```
[root@ol8mysql01]# dbdeployer deploy replication 5.7
# 5.7 => 5.7.26
Installing and starting master
. sandbox server started
Installing and starting slave1
. sandbox server started
Installing and starting slave2
. sandbox server started
$HOME/sandboxes/rsandbox_5_7_26/initialize_slaves
initializing slave 1
initializing slave 2
Replication directory installed in $HOME/sandboxes/rsandbox_5_7_26
run 'dbdeployer usage multiple' for basic instructions'
[root@ol8mysql01]# 
```

```
cd /root/sandboxes/rsandbox_5_7_26/node1
./use
```

状态说明:

```
slave1 [localhost:19328] {msandbox} ((none)) > show slave status \G
*************************** 1. row ***************************
               Slave_IO_State: Waiting for master to send event ### 表示IO线程的状态
                  Master_Host: 127.0.0.1                        ### Master的IP地址
                  Master_User: rsandbox                         ### 主从复制的用户
                  Master_Port: 19327                            ### Master的端口
                Connect_Retry: 60                               ### IO thread重连次数
              Master_Log_File: mysql-bin.000001                 ### IO thread正在读取的master上的binlog文件
          Read_Master_Log_Pos: 4089								### 正在读取的master上的binlog文件位置
               Relay_Log_File: mysql-relay.000002				### 执行的本地relay log文件名
                Relay_Log_Pos: 4302								### 执行的本地relay log位置
        Relay_Master_Log_File: mysql-bin.000001					### SQL线程正在执行的master binlog file
             Slave_IO_Running: Yes								### IO thread状态
            Slave_SQL_Running: Yes								### SQL thread状态
              Replicate_Do_DB: 									### 指定复制DB
          Replicate_Ignore_DB: 									### 指定复制忽略
           Replicate_Do_Table: 									### 指定复制表
       Replicate_Ignore_Table: 									### 指定忽略表
      Replicate_Wild_Do_Table: 									### 指定复制表，解决跨库的问题
  Replicate_Wild_Ignore_Table: 									### 指定忽略表，解决跨库的问题
                   Last_Errno: 0								### 最近的复制错误
                   Last_Error: 									### 最近一次错误信息
                 Skip_Counter: 0								### 跳过复制数
          Exec_Master_Log_Pos: 4089								### 执行masterbinlog的位置
              Relay_Log_Space: 4505								### 所有relay log字节数总和
              Until_Condition: None								### 指定复制条件
               Until_Log_File: 									### 指定复制到某个文件
                Until_Log_Pos: 0								### 指定复制到某个位置
           Master_SSL_Allowed: No								### SSL配置
           Master_SSL_CA_File: 
           Master_SSL_CA_Path: 
              Master_SSL_Cert: 
            Master_SSL_Cipher: 
               Master_SSL_Key: 
        Seconds_Behind_Master: 0								### 从库落后主库时间，单位秒，不准确
Master_SSL_Verify_Server_Cert: No								### MASTER SSL配置
                Last_IO_Errno: 0								### 最近一次IO thread错误
                Last_IO_Error: 									### 最近一次IO thread错误详细信息
               Last_SQL_Errno: 0								### 最近一次sql thread错误
               Last_SQL_Error: 									### 最近一次sql thread错误详细信息
  Replicate_Ignore_Server_Ids: 									### 复制忽略server_id为xxx的实例
             Master_Server_Id: 100								### master server_id
                  Master_UUID: 00019327-1111-1111-1111-111111111111 ### master uuid
             Master_Info_File: /root/sandboxes/rsandbox_5_7_26/node1/data/master.info	### 记录master信息文件
                    SQL_Delay: 0								### sql延迟多少时间，延迟复制会用到
          SQL_Remaining_Delay: NULL								### 当sql thread状态为Waiting until MASTER_DELAY seconds after master executed event，那么该值表示剩下延迟多少时间
      Slave_SQL_Running_State: Slave has read all relay log; waiting for more updates ### sql thread状态
           Master_Retry_Count: 86400							### 主从复制断开时slave最多能尝试重新连接的次数
                  Master_Bind: 									### 绑定网卡
      Last_IO_Error_Timestamp: 									### io thread 最近一次的错误时间
     Last_SQL_Error_Timestamp: 									### sql thread 最近一次的错误时间
               Master_SSL_Crl: 
           Master_SSL_Crlpath: 
           Retrieved_Gtid_Set: 
            Executed_Gtid_Set: 
                Auto_Position: 0								### 使用auto_position，建议还是开启比较方便
         Replicate_Rewrite_DB: 									### 复制DB对应关系
                 Channel_Name: 									### 多源复制的channel name
           Master_TLS_Version: 
1 row in set (0.00 sec)

slave1 [localhost:19328] {msandbox} ((none)) > 
```


### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

