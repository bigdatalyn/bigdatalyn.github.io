---
layout: post
title: "Oracle Basic SQL 011 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}

Oracle Basic SQL 011 Study Tips

Delete the same contents.

1. delete via EXISTS
2. delete via rowid
   






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


### TEST Data

```
drop table test_dup purge;
create table test_dup(id number, text varchar2(20));
insert into test_dup values(1,'NO1_TEST');
insert into test_dup values(2,'NO2_TEST');
insert into test_dup values(3,'NO3_TEST');
insert into test_dup values(4,'NO4_TEST');
insert into test_dup values(5,'NO5_TEST');
insert into test_dup values(6,'NO6_TEST');
insert into test_dup values(7,'NO7_TEST');
insert into test_dup values(8,'NO8_TEST');
insert into test_dup values(9,'NO9_TEST');
insert into test_dup values(10,'N10_TEST');
insert into test_dup values(11,'N10_TEST');
commit;
select * from test_dup;

```

### DELETE with EXISTS


```
delete from test_dup t1
where exists (select null from test_dup t2 where t1.text = t2.text and t2.id > t1.id);
```

```sql
SQL>
delete from test_dup t1
  2  where exists (select null from test_dup t2 where t1.text = t2.text and t2.id > t1.id);

1 row deleted.

SQL> select * from test_dup;

	ID TEXT
---------- --------------------
	 1 NO1_TEST
	 2 NO2_TEST
	 3 NO3_TEST
	 4 NO4_TEST
	 5 NO5_TEST
	 6 NO6_TEST
	 7 NO7_TEST
	 8 NO8_TEST
	 9 NO9_TEST
	11 N10_TEST

10 rows selected.

SQL>
```

```
SQL_ID	3jvwxkm017tx5, child number 0
-------------------------------------
delete from test_dup t1 where exists (select null from test_dup t2
where t1.text = t2.text and t2.id > t1.id)

Plan hash value: 2711009490

------------------------------------------------------------------------------------------------------------------
| Id  | Operation	    | Name     | Starts | E-Rows | Cost (%CPU)| E-Time	 | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------------
|   0 | DELETE STATEMENT    |	       |      1 |	 |     6 (100)| 	 |	0 |00:00:00.01 |      17 |
|   1 |  DELETE 	    | TEST_DUP |      1 |	 |	      | 	 |	0 |00:00:00.01 |      17 |
|*  2 |   HASH JOIN SEMI    |	       |      1 |      1 |     6   (0)| 00:00:01 |	1 |00:00:00.01 |      14 |
|   3 |    TABLE ACCESS FULL| TEST_DUP |      1 |     11 |     3   (0)| 00:00:01 |     11 |00:00:00.01 |       7 |
|   4 |    TABLE ACCESS FULL| TEST_DUP |      1 |     11 |     3   (0)| 00:00:01 |     11 |00:00:00.01 |       7 |
------------------------------------------------------------------------------------------------------------------
```

Need to create index with name and id columns.

```
create index idx_test_dup on test_dup(text,id);
```

```sql
SQL> select * from test_dup;

	ID TEXT
---------- --------------------
	 1 NO1_TEST
	 2 NO2_TEST
	 3 NO3_TEST
	 4 NO4_TEST
	 5 NO5_TEST
	 6 NO6_TEST
	 7 NO7_TEST
	 8 NO8_TEST
	 9 NO9_TEST
	10 N10_TEST
	11 N10_TEST

11 rows selected.

SQL> create index idx_test_dup on test_dup(text,id);

Index created.

delete from test_dup t1
  2  where exists (select null from test_dup t2 where t1.text = t2.text and t2.id > t1.id);

1 row deleted.

SQL> 

```

```
SQL_ID	3jvwxkm017tx5, child number 0
-------------------------------------
delete from test_dup t1 where exists (select null from test_dup t2
where t1.text = t2.text and t2.id > t1.id)

Plan hash value: 3087637895

--------------------------------------------------------------------------------------------------------------------
| Id  | Operation	  | Name	 | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers |
--------------------------------------------------------------------------------------------------------------------
|   0 | DELETE STATEMENT  |		 |	1 |	   |	 2 (100)|	   |	  0 |00:00:00.01 |	 7 |
|   1 |  DELETE 	  | TEST_DUP	 |	1 |	   |		|	   |	  0 |00:00:00.01 |	 7 |
|*  2 |   HASH JOIN SEMI  |		 |	1 |	 1 |	 2   (0)| 00:00:01 |	  1 |00:00:00.01 |	 2 |
|   3 |    INDEX FULL SCAN| IDX_TEST_DUP |	1 |	11 |	 1   (0)| 00:00:01 |	 11 |00:00:00.01 |	 1 |
|   4 |    INDEX FULL SCAN| IDX_TEST_DUP |	1 |	11 |	 1   (0)| 00:00:01 |	 11 |00:00:00.01 |	 1 |
--------------------------------------------------------------------------------------------------------------------
```

### DELETE via rowid.


```
drop table test_dup purge;
create table test_dup(id number, text varchar2(20));
insert into test_dup values(1,'NO1_TEST');
insert into test_dup values(2,'NO2_TEST');
insert into test_dup values(3,'NO3_TEST');
insert into test_dup values(4,'NO4_TEST');
insert into test_dup values(5,'NO5_TEST');
insert into test_dup values(6,'NO6_TEST');
insert into test_dup values(7,'NO7_TEST');
insert into test_dup values(8,'NO8_TEST');
insert into test_dup values(9,'NO9_TEST');
insert into test_dup values(10,'N10_TEST');
insert into test_dup values(11,'N10_TEST');
commit;
select * from test_dup;

create index idx_test_dup_text on test_dup(text);

delete from test_dup t1
where exists (select null from test_dup t2 where t1.text = t2.text and t2.rowid > t1.rowid);

delete from test_dup t1
where exists (select /*+ hash_sj */ null from test_dup t2 where t1.text = t2.text and t2.rowid > t1.rowid);

```

```sql
SQL> select * from test_dup;

	ID TEXT
---------- --------------------
	 1 NO1_TEST
	 2 NO2_TEST
	 3 NO3_TEST
	 4 NO4_TEST
	 5 NO5_TEST
	 6 NO6_TEST
	 7 NO7_TEST
	 8 NO8_TEST
	 9 NO9_TEST
	10 N10_TEST
	11 N10_TEST

11 rows selected.

SQL> create index idx_test_dup_text on test_dup(text);

Index created.

delete from test_dup t1
  2  where exists (select null from test_dup t2 where t1.text = t2.text and t2.rowid > t1.rowid);

1 row deleted.

SQL>
```

```
SQL_ID	771mq9arhuytf, child number 0
-------------------------------------
delete from test_dup t1 where exists (select null from test_dup t2
where t1.text = t2.text and t2.rowid > t1.rowid)

Plan hash value: 3201111247

--------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name	       | Starts | E-Rows | Cost (%CPU)| E-Time	 | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------
|   0 | DELETE STATEMENT   |		       |      1 |	 |     1 (100)| 	 |	0 |00:00:00.01 |       9 |
|   1 |  DELETE 	   | TEST_DUP	       |      1 |	 |	      | 	 |	0 |00:00:00.01 |       9 |
|   2 |   NESTED LOOPS SEMI|		       |      1 |      1 |     1   (0)| 00:00:01 |	1 |00:00:00.01 |       4 |
|   3 |    INDEX FULL SCAN | IDX_TEST_DUP_TEXT |      1 |     11 |     1   (0)| 00:00:01 |     11 |00:00:00.01 |       1 |
|*  4 |    INDEX RANGE SCAN| IDX_TEST_DUP_TEXT |     11 |      1 |     0   (0)| 	 |	1 |00:00:00.01 |       3 |
--------------------------------------------------------------------------------------------------------------------------
```

```sql
SQL> create index idx_test_dup_text on test_dup(text);

Index created.

delete from test_dup t1
  2  where exists (select /*+ hash_sj */ null from test_dup t2 where t1.text = t2.text and t2.rowid > t1.rowid);

1 row deleted.

SQL>
SQL>


SQL_ID	csh06ux2nv8hn, child number 0
-------------------------------------
delete from test_dup t1 where exists (select /*+ hash_sj */ null from
test_dup t2 where t1.text = t2.text and t2.rowid > t1.rowid)

Plan hash value: 4236069856

-------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	  | Name	      | Starts | E-Rows | Cost (%CPU)| E-Time	| A-Rows |   A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------------------
|   0 | DELETE STATEMENT  |		      |      1 |	|     2 (100)|		|      0 |00:00:00.01 |       7 |
|   1 |  DELETE 	  | TEST_DUP	      |      1 |	|	     |		|      0 |00:00:00.01 |       7 |
|*  2 |   HASH JOIN SEMI  |		      |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
|   3 |    INDEX FULL SCAN| IDX_TEST_DUP_TEXT |      1 |     11 |     1   (0)| 00:00:01 |     11 |00:00:00.01 |       1 |
|   4 |    INDEX FULL SCAN| IDX_TEST_DUP_TEXT |      1 |     11 |     1   (0)| 00:00:01 |     11 |00:00:00.01 |       1 |
-------------------------------------------------------------------------------------------------------------------------
```

### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

