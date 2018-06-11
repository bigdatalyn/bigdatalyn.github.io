---
layout: post
title: "Oracle Query 基础知识"
category: Oracle
tags: Oracle select 
---

* content
{:toc}


Oracle Query 基础知识

汇总Oracle查询基础知识

什么是子查询？


### 测试Schema-scott

	SCOTT@orcl11g> select table_name from user_tables;
	TABLE_NAME
	------------------------------
	SALGRADE
	BONUS
	EMP
	DEPT
	SCOTT@orcl11g> select * from dept;

		DEPTNO DNAME          LOC
	---------- -------------- -------------
			10 ACCOUNTING     NEW YORK
			20 RESEARCH       DALLAS
			30 SALES          CHICAGO
			40 OPERATIONS     BOSTON
	SCOTT@orcl11g> select * from emp;
		EMPNO ENAME      JOB              MGR HIREDATE                   SAL       COMM     DEPTNO
	---------- ---------- --------- ---------- ------------------- ---------- ---------- ----------
		7369 SMITH      CLERK           7902 1980-12-17 00:00:00        800                    20
		7499 ALLEN      SALESMAN        7698 1981-02-20 00:00:00       1600        300         30
		7521 WARD       SALESMAN        7698 1981-02-22 00:00:00       1250        500         30
		7566 JONES      MANAGER         7839 1981-04-02 00:00:00       2975                    20
		7654 MARTIN     SALESMAN        7698 1981-09-28 00:00:00       1250       1400         30
		7698 BLAKE      MANAGER         7839 1981-05-01 00:00:00       2850                    30
		7782 CLARK      MANAGER         7839 1981-06-09 00:00:00       2450                    10
		7788 SCOTT      ANALYST         7566 1987-04-19 00:00:00       3000                    20
		7839 KING       PRESIDENT            1981-11-17 00:00:00       5000                    10
		7844 TURNER     SALESMAN        7698 1981-09-08 00:00:00       1500          0         30
		7876 ADAMS      CLERK           7788 1987-05-23 00:00:00       1100                    20
		7900 JAMES      CLERK           7698 1981-12-03 00:00:00        950                    30
		7902 FORD       ANALYST         7566 1981-12-03 00:00:00       3000                    20
		7934 MILLER     CLERK           7782 1982-01-23 00:00:00       1300                    10
	14 rows selected.
	SCOTT@orcl11g> select * from SALGRADE;

		GRADE      LOSAL      HISAL
	---------- ---------- ----------
			1        700       1200
			2       1201       1400
			3       1401       2000
			4       2001       3000
			5       3001       9999

	SCOTT@orcl11g> 



### 子查询

oracle中子查询

	就是指查询中嵌套查询。
	子查询可以出现在很多位置，比如: 当列、当表、当条件等
	典型的联接运算，使用像 =  或 <> 之类的比较运算符
	包括相等联接和自然联接

语法：
	SELECT (子查询)
	FROM (子查询)
	WHERE (子查询)
	GROUP BY 子句
	HAVING (子查询)
	ORDER BY 子句

注：子查询要用括号括起来。

Example:

找出跟allen相同部门的员工

分三步：找到allen的部门号，根据部门号找相应的员工，把allen员工去掉..

	SCOTT@orcl11g> select deptno from emp where ename = 'ALLEN';
		DEPTNO
	----------
			30
	SCOTT@orcl11g> select ename from emp where deptno=30;
	ENAME
	----------
	ALLEN
	WARD
	MARTIN
	BLAKE
	TURNER
	JAMES
	6 rows selected.
	SCOTT@orcl11g> select ename from emp where deptno=30 and ename != 'ALLEN';
	ENAME
	----------
	WARD
	MARTIN
	BLAKE
	TURNER
	JAMES
	SCOTT@orcl11g> 

通过一个SQL:

	select ename from emp where deptno = (select deptno from emp where ename = 'ALLEN') and ename != 'ALLEN';

上面就是在where条件中使用了子查询

	SCOTT@orcl11g> select d.dname,e.ename from (select deptno,dname from dept) d,(select deptno,ename from emp) e where d.deptno = e.deptno order by 1,2;

	DNAME          ENAME
	-------------- ----------
	ACCOUNTING     CLARK
	ACCOUNTING     KING
	ACCOUNTING     MILLER
	RESEARCH       ADAMS
	RESEARCH       FORD
	RESEARCH       JONES
	RESEARCH       SCOTT
	RESEARCH       SMITH
	SALES          ALLEN
	SALES          BLAKE
	SALES          JAMES
	SALES          MARTIN
	SALES          TURNER
	SALES          WARD

	14 rows selected.

	SCOTT@orcl11g>

### 内连接，左连接，右连接

举例说明：

内连接: inner join

	SCOTT@orcl11g> select a.dname,b.ename,b.mgr from dept a, emp b where a.deptno=b.deptno;
	DNAME          ENAME             MGR
	-------------- ---------- ----------
	ACCOUNTING     CLARK            7839
	ACCOUNTING     KING
	ACCOUNTING     MILLER           7782
	RESEARCH       JONES            7839
	RESEARCH       FORD             7566
	RESEARCH       ADAMS            7788
	RESEARCH       SMITH            7902
	RESEARCH       SCOTT            7566
	SALES          WARD             7698
	SALES          TURNER           7698
	SALES          ALLEN            7698
	SALES          JAMES            7698
	SALES          BLAKE            7839
	SALES          MARTIN           7698

	14 rows selected.
	SCOTT@orcl11g> 

外连接 outer join - 左连接 左边集合的全集 left join

注意Operations部门没有员工

	SCOTT@orcl11g> select a.dname,b.ename,b.mgr from dept a, emp b where a.deptno=b.deptno(+);
	DNAME          ENAME             MGR
	-------------- ---------- ----------
	ACCOUNTING     CLARK            7839
	ACCOUNTING     KING
	ACCOUNTING     MILLER           7782
	RESEARCH       JONES            7839
	RESEARCH       FORD             7566
	RESEARCH       ADAMS            7788
	RESEARCH       SMITH            7902
	RESEARCH       SCOTT            7566
	SALES          WARD             7698
	SALES          TURNER           7698
	SALES          ALLEN            7698
	SALES          JAMES            7698
	SALES          BLAKE            7839
	SALES          MARTIN           7698
	OPERATIONS
	15 rows selected.
	SCOTT@orcl11g> 


外连接 outer join - 右连接 右边集合的全集 right join

	SCOTT@orcl11g> select a.dname,b.ename,b.mgr from dept a, emp b where a.deptno(+)=b.deptno;
	DNAME          ENAME             MGR
	-------------- ---------- ----------
	ACCOUNTING     MILLER           7782
	ACCOUNTING     KING
	ACCOUNTING     CLARK            7839
	RESEARCH       FORD             7566
	RESEARCH       ADAMS            7788
	RESEARCH       SCOTT            7566
	RESEARCH       JONES            7839
	RESEARCH       SMITH            7902
	SALES          JAMES            7698
	SALES          TURNER           7698
	SALES          BLAKE            7839
	SALES          MARTIN           7698
	SALES          WARD             7698
	SALES          ALLEN            7698
	14 rows selected.
	SCOTT@orcl11g> 

### 标量子查询

标量子查询也是子查询。

	Oracle允许在select子句中包含单行子查询，这个也就是oracle的标量子查询，标量子查询有点类似于外连接，当使用到外连接时我们可以灵活的将其转化为标量子查询。

	select d.dname,e.ename from (select deptno,dname from dept) d,(select deptno,ename from emp) e where d.deptno = e.deptno order by 1,2;
	--->
	select (select dname from dept b where b.deptno=a.deptno),ename from emp a order by 1,2;

	SCOTT@orcl11g> select (select dname from dept b where b.deptno=a.deptno),ename from emp a order by 1,2;
	(SELECTDNAMEFR ENAME
	-------------- ----------
	ACCOUNTING     CLARK
	ACCOUNTING     KING
	ACCOUNTING     MILLER
	RESEARCH       ADAMS
	RESEARCH       FORD
	RESEARCH       JONES
	RESEARCH       SCOTT
	RESEARCH       SMITH
	SALES          ALLEN
	SALES          BLAKE
	SALES          JAMES
	SALES          MARTIN
	SALES          TURNER
	SALES          WARD
	14 rows selected.
	SCOTT@orcl11g> 

关于标量子查询和表关联的性能：
	如果主查询返回的数据较多，而子查询中又没有高效的索引，关联列对应的主查询表又没有较多的重复值，
	那么这个标量子查询的执行成本是很大的,标量子查询和外连接的sql语句中可以看出外连接IO成本要明显小于标量子查询。
	但是标量子查询oracle内部确是有优化的，优化器cache了中间的结果。
	如果结果集不大，子查询中又有高效的索引，那么这个标量子查询可能会比常规的表关联更加高效。

### with语句

with as 也叫子查询部分（subquery factoring）
	在真正进行查询之前预先构造了一个临时表，之后便可多次使用它做进一步的分析和处理
	“一次分析，多次使用”

找出工资大于平均工资的员工,不用with

	SCOTT@orcl11g> select ename,sal from emp;
	ENAME             SAL
	---------- ----------
	SMITH             800
	ALLEN            1600
	WARD             1250
	JONES            2975
	MARTIN           1250
	BLAKE            2850
	CLARK            2450
	SCOTT            3000
	KING             5000
	TURNER           1500
	ADAMS            1100
	JAMES             950
	FORD             3000
	MILLER           1300
	14 rows selected.
	SCOTT@orcl11g> select ename, sum(sal) from emp group by ename having sum(sal)>=(select sum(sal)/14 from emp);
	ENAME        SUM(SAL)
	---------- ----------
	JONES            2975
	FORD             3000
	CLARK            2450
	SCOTT            3000
	BLAKE            2850
	KING             5000
	6 rows selected.
	SCOTT@orcl11g> 

使用with语句:

	SCOTT@orcl11g> with t as (select ename, sal from emp)
	2  select ename,sal from t where sal>=(select sum(sal)/14 from emp);
	ENAME             SAL
	---------- ----------
	JONES            2975
	BLAKE            2850
	CLARK            2450
	SCOTT            3000
	KING             5000
	FORD             3000
	6 rows selected.
	SCOTT@orcl11g> 

或者

	SCOTT@orcl11g> with t as (select ename,sum(sal) sal from emp group by ename)
	2  select ename,sal from t where sal>=(select sum(sal)/14 from emp);
	ENAME             SAL
	---------- ----------
	JONES            2975
	FORD             3000
	CLARK            2450
	SCOTT            3000
	BLAKE            2850
	KING             5000
	6 rows selected.
	SCOTT@orcl11g> 

### 行列转换

行列转换之前看看decode和case语句的使用：

case语句:

	++++++++++++++++++++++++++++++++++++++++++++++
	select 
		case 
			when deptno=10 then 'ACCOUNTING'
			when deptno=20 then 'RESEARCH'
			when deptno=30 then 'SALES'
		end,
		sum(sal) from emp
		group by deptno;
	++++++++++++++++++++++++++++++++++++++++++++++

	SCOTT@orcl11g> select * from dept;
		DEPTNO DNAME          LOC
	---------- -------------- -------------
			10 ACCOUNTING     NEW YORK
			20 RESEARCH       DALLAS
			30 SALES          CHICAGO
			40 OPERATIONS     BOSTON
	SCOTT@orcl11g> 
	SCOTT@orcl11g> 
	select 
	case 
	when deptno=10 then 'ACCOUNTING'
	when deptno=20 then 'RESEARCH'
	when deptno=30 then 'SALES'
	end,
	sum(sal) from emp
	8  group by deptno;
	CASEWHENDE   SUM(SAL)
	---------- ----------
	SALES            9400
	RESEARCH        10875
	ACCOUNTING       8750
	SCOTT@orcl11g> 

decode语句:

	++++++++++++++++++++++++++++++++++++++++++++++
	select 
		decode(deptno,10,'ACCOUNTING',20,'RESEARCH',30,'SALES'),
		sum(sal) from emp
		group by deptno;
	++++++++++++++++++++++++++++++++++++++++++++++

	SCOTT@orcl11g> 
	select 
	decode(deptno,10,'ACCOUNTING',20,'RESEARCH',30,'SALES'),
	sum(sal) from emp
	4  group by deptno;
	DECODE(DEP   SUM(SAL)
	---------- ----------
	SALES            9400
	RESEARCH        10875
	ACCOUNTING       8750
	SCOTT@orcl11g> 

行列转换:

	++++++++++++++++++++++++++++++++++++++++++++++
	select job,ename,sal from emp where job='MANAGER';
	select job, 
		sum(decode(ename,'JONES',SAL)) JONES,
		sum(decode(ename,'BLAKE',SAL)) BLAKE,
		sum(decode(ename,'CLARK',SAL)) CLARK
	from emp
		where job='MANAGER' group by job;
	++++++++++++++++++++++++++++++++++++++++++++++

	SCOTT@orcl11g> select job,ename,sal from emp where job='MANAGER';
	JOB       ENAME             SAL
	--------- ---------- ----------
	MANAGER   JONES            2975
	MANAGER   BLAKE            2850
	MANAGER   CLARK            2450
	SCOTT@orcl11g> 
	select job, 
	sum(decode(ename,'JONES',SAL)) JONES,
	sum(decode(ename,'BLAKE',SAL)) BLAKE,
	sum(decode(ename,'CLARK',SAL)) CLARK
	from emp
	6  where job='MANAGER' group by job;
	JOB            JONES      BLAKE      CLARK
	--------- ---------- ---------- ----------
	MANAGER         2975       2850       2450
	SCOTT@orcl11g> 

### 存储过程

写一个打印dept表的全部内容
注意：编译查看存储过程出错进行debug，可以通过show err命令来debug

	++++++++++++++++++++++++++++++++++++++++++++++
	create or replace procedure print_dept is 
	begin
		for i in (select * from scott.dept) loop
			dbms_output.put_line(i.deptno ||','||i.dname||','||i.loc);
		end loop;
	end;
	/
	++++++++++++++++++++++++++++++++++++++++++++++

	SCOTT@orcl11g> show err
	No errors.
	create or replace procedure print_dept() is 
	begin
	for i in (select * from scott.dept) loop
	dbms_output.put_line(i.deptno ||','||i.dname||','||i.loc);
	end loop;
	end;
	7  /
	Warning: Procedure created with compilation errors.
	SCOTT@orcl11g> show err
	Errors for PROCEDURE PRINT_DEPT:
	LINE/COL ERROR
	-------- -----------------------------------------------------------------
	1/22     PLS-00103: Encountered the symbol ")" when expecting one of the
			following:
			<an identifier> <a double-quoted delimited-identifier>
			current delete exists prior
	SCOTT@orcl11g> 
	SCOTT@orcl11g> 
	create or replace procedure print_dept is 
	begin
	for i in (select * from scott.dept) loop
	dbms_output.put_line(i.deptno ||','||i.dname||','||i.loc);
	end loop;
	end;
	7  /
	Procedure created.
	SCOTT@orcl11g> set serverout on
	SCOTT@orcl11g> exec print_dept
	10,ACCOUNTING,NEW YORK
	20,RESEARCH,DALLAS
	30,SALES,CHICAGO
	40,OPERATIONS,BOSTON
	PL/SQL procedure successfully completed.
	SCOTT@orcl11g> 


写一个删除表的存储过程（传入一个表名）

	++++++++++++++++++++++++++++++++++++++++++++++
	create or replace procedure drop_table (v_tablename varchar2) is
	begin
	execute immediate 'drop table ' || v_tablename ||' purge';
	end;
	/
	++++++++++++++++++++++++++++++++++++++++++++++

	SCOTT@orcl11g> create table scott.test as select * from emp;

	Table created.

	create or replace procedure drop_table (v_tablename varchar2) is
	begin
	execute immediate 'drop table ' || v_tablename ||' purge';
	end;
	5  /

	Procedure created.

	SCOTT@orcl11g> exec drop_table('scott.test');

	PL/SQL procedure successfully completed.

	SCOTT@orcl11g> 

### To be continue....


Have a good life! 2018/06 via LinHong
	






