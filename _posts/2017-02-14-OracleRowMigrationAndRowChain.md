---
layout: post
title: "Oracle 行连接/行迁移实验测试"
category: Oracle
tags: Oracle RowMigration RowChain
---

* content
{:toc}


### Oracle 行连接/行迁移

行链接(Row chain) 与行迁移(Row Migration) 

当一行的数据过长而不能插入一个单个数据块中时，可能发生两种事情：

* 行链接(Row chain)

* 行迁移(row migration)





#### 行迁移(Row Migration)

*原因：*

当发出update导致记录行长增加，block的剩余空间不足以存放这条记录，就会产生行迁移，发生行迁移时rowid不会改变，原来的block中会用一个指针存放这条记录在新的block中的地址，发生行迁移会对性能产生影响，因为读这条记录会读两个BLOCK。

*后果：*

因为需要访问更多的数据块，性能下降。

*预防：*

* 将数据块的PCTFREE调大；
* 针对表空间扩大数据块大小；

*检查：*

用dbms_stats不能查出行链接或行迁移

```
select table_name,chain_cnt from user_tables where table_name in 'TABLENAME';
``` 

需要通过

```
analyze table 表名 validate structure cascade into chained_rows;
```

*测试：*

行连接脚本的执行测试：


	HR> show parameter db_block_size

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	db_block_size                        integer     8192
	HR> create table test01(col1 varchar2(4000),col2 varchar2(4000),col3 varchar2(4000));

	Table created.

	HR> insert into test01 values('a','b','c');

	1 row created.

	HR> commit;                                                         

	Commit complete.

	HR> select table_name,chain_cnt from user_tables where table_name='TEST01';

	TABLE_NAME                      CHAIN_CNT
	------------------------------ ----------
	TEST01

	HR> exec dbms_stats.gather_table_stats(user,'test01',cascade=>true);

	PL/SQL procedure successfully completed.

	HR> select table_name,chain_cnt from user_tables where table_name='TEST01';

	TABLE_NAME                      CHAIN_CNT
	------------------------------ ----------
	TEST01                                  0

	HR> select rpad('a',20,'*') from dual;

	RPAD('A',20,'*')
	--------------------
	a*******************

	HR> update test01 set col1=rpad('a','4000','*'); 

	1 row updated.

	HR> commit;

	Commit complete.

	HR> update test01 set col2=rpad('b','4000','*');

	1 row updated.

	HR> commit;

	Commit complete.

	HR> update test01 set col3=rpad('c',4000,'*');

	1 row updated.

	HR> commit;                                

	Commit complete.

	HR> analyze table test01 list chained rows;
	analyze table test01 list chained rows
	*
	ERROR at line 1:
	ORA-01495: specified chain row table not found


	HR> !ls -ltr $ORACLE_HOME/rdbms/admin/utlchain.sql
	-rw-r--r-- 1 oracle oinstall 1160 Jun 24  1998 /u01/app/oracle/product/11.2.0/dbhome_1/rdbms/admin/utlchain.sql

	HR> @$ORACLE_HOME/rdbms/admin/utlchain.sql

	Table created.

	HR> analyze table test01 list chained rows;

	Table analyzed.

	HR> exec dbms_stats.gather_table_stats(user,'test01',cascade=>true);

	PL/SQL procedure successfully completed.

	HR> select table_name,chain_cnt from user_tables where table_name='TEST01';

	TABLE_NAME                      CHAIN_CNT
	------------------------------ ----------
	TEST01                                  0

	HR> select * from chained_rows;

	OWNER_NAME                     TABLE_NAME
	------------------------------ ------------------------------
	CLUSTER_NAME                   PARTITION_NAME
	------------------------------ ------------------------------
	SUBPARTITION_NAME              HEAD_ROWID         ANALYZE_T
	------------------------------ ------------------ ---------
	HR                             TEST01

	N/A                            AAAS98AAEAAACvrAAA 23-FEB-17


	HR> 


消除行迁移实验测试：

	=== 创建测试表，修改表结构，update数据

	HR> DROP TABLE EMPLOYEES_TEMP PURGE;

	Table dropped.

	HR> CREATE TABLE EMPLOYEES_TEMP AS SELECT * FROM HR.EMPLOYEES ;

	Table created.

	HR> desc EMPLOYEES_TEMP;
	 Name                                      Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 EMPLOYEE_ID                                        NUMBER(6)
	 FIRST_NAME                                         VARCHAR2(20)
	 LAST_NAME                                 NOT NULL VARCHAR2(25)
	 EMAIL                                     NOT NULL VARCHAR2(25)
	 PHONE_NUMBER                                       VARCHAR2(20)
	 HIRE_DATE                                 NOT NULL DATE
	 JOB_ID                                    NOT NULL VARCHAR2(10)
	 SALARY                                             NUMBER(8,2)
	 COMMISSION_PCT                                     NUMBER(2,2)
	 MANAGER_ID                                         NUMBER(6)
	 DEPARTMENT_ID                                      NUMBER(4)

	HR> create index idx_emp_id on EMPLOYEES_TEMP(employee_id);

	Index created.

	HR> alter table EMPLOYEES_TEMP modify FIRST_NAME VARCHAR2(1000);

	Table altered.

	HR> alter table EMPLOYEES_TEMP modify LAST_NAME  VARCHAR2(1000);

	Table altered.

	HR> alter table EMPLOYEES_TEMP modify EMAIL VARCHAR2(1000);

	HR> alter table EMPLOYEES_TEMP modify EMAIL VARCHAR2(1000);

	Table altered.

	HR> alter table EMPLOYEES_TEMP modify PHONE_NUMBER  VARCHAR2(1000);

	Table altered.

	HR> desc EMPLOYEES_TEMP;
	 Name                                      Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 EMPLOYEE_ID                                        NUMBER(6)
	 FIRST_NAME                                         VARCHAR2(1000)
	 LAST_NAME                                 NOT NULL VARCHAR2(1000)
	 EMAIL                                     NOT NULL VARCHAR2(1000)
	 PHONE_NUMBER                                       VARCHAR2(1000)
	 HIRE_DATE                                 NOT NULL DATE
	 JOB_ID                                    NOT NULL VARCHAR2(10)
	 SALARY                                             NUMBER(8,2)
	 COMMISSION_PCT                                     NUMBER(2,2)
	 MANAGER_ID                                         NUMBER(6)
	 DEPARTMENT_ID                                      NUMBER(4)

	HR> 


	==== Update数据之后：

	HR> UPDATE EMPLOYEES_TEMP
	  SET FIRST_NAME = LPAD('1', 1000, '*'), LAST_NAME = LPAD('1', 1000, '*'), EMAIL = LPAD('1', 1000, '*'),
	  PHONE_NUMBER = LPAD('1', 1000, '*');
	COMMIT;  2    3  
	107 rows updated.

	HR> 

	Commit complete.

	==== 发生行迁移后的执行计划

	HR> SET AUTOTRACE traceonly statistics
	set linesize 1000HR> 
	HR> 
	HR> select /*+index(EMPLOYEES_TEMP,idx_emp_id)*/ * from EMPLOYEES_TEMP  where employee_id>0;

	107 rows selected.


	Statistics
	----------------------------------------------------------
		 16  recursive calls
		  0  db block gets
		297  consistent gets
		  0  physical reads
		  0  redo size
	     437663  bytes sent via SQL*Net to client
		496  bytes received via SQL*Net from client
		  9  SQL*Net roundtrips to/from client
		  0  sorts (memory)
		  0  sorts (disk)
		107  rows processed

	HR> 

	==== 分析行迁移信息	

	HR> analyze table EMPLOYEES_TEMP list chained rows into chained_rows;

	Table analyzed.

	HR> analyze table EMPLOYEES_TEMP compute statistics;

	Table analyzed.

	HR> set autot off

	HR> select count(*)  from chained_rows where table_name='EMPLOYEES_TEMP';

	  COUNT(*)
	----------
	       105

	HR> 


	==== 发生行迁移对策步骤

	HR> create table EMPLOYEES_TEMP_TMP as select * from EMPLOYEES_TEMP where rowid in (select head_rowid from chained_rows);

	Table created.

	HR> Delete from EMPLOYEES_TEMP where rowid in (select head_rowid from chained_rows);

	105 rows deleted.

	HR> Insert into EMPLOYEES_TEMP select * from EMPLOYEES_TEMP_TMP;

	105 rows created.

	HR> delete from chained_rows ;

	106 rows deleted.

	HR> commit;

	Commit complete.

	HR> analyze table EMPLOYEES_TEMP list chained rows into chained_rows;

	Table analyzed.

	HR> select count(*)  from chained_rows where table_name='EMPLOYEES_TEMP'; 

	  COUNT(*)
	----------
		 0

	HR> 

	==== count为0，用这种方法做行迁移消除
	
	==== 行迁移优化后，该语句逻辑读情况

	HR> SET AUTOTRACE traceonly statistics
	HR> set linesize 1000 
	HR> select /*+index(EMPLOYEES_TEMP,idx_emp_id)*/ * from EMPLOYEES_TEMP  where employee_id>0;

	107 rows selected.


	Statistics
	----------------------------------------------------------
		  0  recursive calls
		  0  db block gets
		116  consistent gets
		  0  physical reads
		  0  redo size
	     437033  bytes sent via SQL*Net to client
		496  bytes received via SQL*Net from client
		  9  SQL*Net roundtrips to/from client
		  0  sorts (memory)
		  0  sorts (disk)
		107  rows processed

	HR> 


所以通过下面步骤可以消除行迁移：

	（以EMPLOYEES_TEMP表为例，如果涉及到该表有主键，并且有别的表的外键REFERENCE关联到本表，必须要执行步骤2和步骤7，否则不必执行）：

	1.执行$ORACLE_HOME/rdbms/admin目录下的utlchain.sql脚本创建chained_rows表。

	2.禁用所有其它表上关联到此表上的所有限制(假想EMPLOYEES_TEMP表有主键PK_EMPLOYEES_TEMP_ID，假想test表有外键f_EMPLOYEES_TEMP_id关联reference到EMPLOYEES_TEMP表）。

	  select index_name,index_type,table_name from user_indexes where table_name='EMPLOYEES_TEMP';
	  select  CONSTRAINT_NAME,CONSTRAINT_TYPE,TABLE_NAME from USER_CONSTRAINTS where R_CONSTRAINT_NAME='PK_EMPLOYEES_TEMP_ID';
	  alter table test disable constraint f_EMPLOYEES_TEMP_id;

	3.将存在有行迁移的表（用table_name代替）中的产生行迁移的行的rowid放入到chained_rows表中。

	4.将表中的行迁移的row id放入临时表中保存。

	5.删除原来表中存在的行迁移的记录行。

	6.从临时表中取出并重新插入那些被删除了的数据到原来的表中，并删除临时表。

	7.启用所有其它表上关联到此表上的所有限制。

	     alter table test enable constraint f_EMPLOYEES_TEMP_id;

`另外,也可以使用expdp/impdp方式或者alter table move 命令消除行迁移，以及降低HWM，不过这个时候这个应用不能访问该表，而且该表上的index会无效，因为move之后的ROWID变了，此时需要重新创建索引（rebulid）。`

`此外，在线冲定义到其他大表空间等手段也可以，而且不影响服务情况使用，只是构造实践稍微要复杂点，之后再实验测试下。`


#### 行链接(Row chain)

当一个BLOCK不足以存放下一条记录的时候，就会发生行连接，这个时候oracle会把这条记录分成几个部分，分别存放在几个block中，然后把这几个block chain起来。行连接同样会影响性能，因为读一条记录至少会读两个BLOCK.

上面用消除行迁移的方法根本无法消除行链接。只能通过move到大表空间或者在线冲定义move到大表空方式可以消除。



#### 参考：

[row migeration and row chain](http://blog.csdn.net/robinson1988/article/details/4728717) 

[Oracle行迁移和行链接详解(原创)](http://czmmiao.iteye.com/blog/2185542)




