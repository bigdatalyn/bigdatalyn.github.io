---
layout: post
title: "Oracle 12c 新特性 validate_convertion  Tips"
category: Oracle
tags: Oracle 12c
---

* content
{:toc}



Oracle 12c 新特性 validate_conversion  Tips

12cR2引入validate_conversion 函数的使用注意点










测试表test的创建和插入测试数据

	HR@PDB1> create table test( c_to_varchar2 varchar2(10),c_to_char number, c_to_date char(40));

	Table created.

	HR@PDB1> insert into test values('A',100,'2018-07-28 10:11:12');

	1 row created.

	HR@PDB1> insert into test values('1',100,'2018-07-28 10:11:12');

	1 row created.

	HR@PDB1> select * from test;

	C_TO_VARCH  C_TO_CHAR C_TO_DATE
	---------- ---------- ----------------------------------------
	A                 100 2018-07-28 10:11:12
	1                 100 2018-07-28 10:11:12

	HR@PDB1> desc test;
	 Name                                      Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 C_TO_VARCHAR2                                      VARCHAR2(10)
	 C_TO_CHAR                                          NUMBER
	 C_TO_DATE                                          CHAR(40)

	HR@PDB1>

在创建test01时候报错,因为c_to_nvarchar2字段内容含有非number，转换不了number的数据

	HR@PDB1> create table test01 as select to_number(c_to_nvarchar2) nbr from test;
	create table test01 as select to_number(c_to_nvarchar2) nbr from test
											*
	ERROR at line 1:
	ORA-00904: "C_TO_NVARCHAR2": invalid identifier


	HR@PDB1> 

通过validate_conversion()函数条件进行判断是否可以转换。

	HR@PDB1> create table test01 as select to_number(c_to_varchar2) nbr from test where validate_conversion(test.c_to_varchar2 as number) = 1;

	Table created.

	HR@PDB1> 
	HR@PDB1> select * from test01;

		   NBR
	----------
			 1

	HR@PDB1> 
	HR@PDB1> desc test01;
	 Name                                      Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 NBR                                                NUMBER

	HR@PDB1> 




另外需要注意的是 validate_conversion 判断类型转换对象范围如下，不然报 ORA-43908
转换number类型为char一直以来都是OK的，提供这个函数是为了判断能否转换为 number等类型


	HR@PDB1> select * from test where validate_conversion(test.c_to_char as char) = 0;
	select * from test where validate_conversion(test.c_to_char as char) = 0
												 *
	ERROR at line 1:
	ORA-43908: invalid output data type
	HR@PDB1> !oerr ora 43908
	43908, 0000, "invalid output data type"
	// *Document: YES
	// *Cause:    An invalid output data type was provided.
	//            The valid output data types for VALIDATE_CONVERSION operator and
	//            the operators supporting DEFAULT ON CONVERSION ERROR syntax are:
	//            NUMBER, BINARY_FLOAT, BINARY_DOUBLE, DATE, TIMESTAMP,  
	//            TIMESTAMP WITH TIME ZONE, INTERVAL DAY TO SECOND, 
	//            INTERVAL YEAR TO MONTH.        
	// *Action:   Provide a valid output data type.

	HR@PDB1> 

时间字段的判断，注意写法

2月份没有30日，所以最后一行记录判断为不是正确date

	HR@PDB1> select * from test;

	C_TO_VARCH  C_TO_CHAR C_TO_DATE
	---------- ---------- ----------------------------------------
	A                 100 2018-07-28 10:11:12
	1                 100 2018-07-28 10:11:12
	B                 200 February 20, 2018, 10:30
	B                 200 February 30, 2018, 10:30

	HR@PDB1> desc test;
	 Name                                      Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 C_TO_VARCHAR2                                      VARCHAR2(10)
	 C_TO_CHAR                                          NUMBER
	 C_TO_DATE                                          CHAR(40)

	HR@PDB1> select * from test where validate_conversion(c_to_date as date) = 1;

	no rows selected

	HR@PDB1> select * from test where validate_conversion(c_to_date as date, 'Month dd, YYYY, HH24:MI','NLS_DATE_LANGUAGE = American') = 1;

	C_TO_VARCH  C_TO_CHAR C_TO_DATE
	---------- ---------- ----------------------------------------
	B                 200 February 20, 2018, 10:30

	HR@PDB1> select * from test where validate_conversion(c_to_date as date, 'yyyy-mm-dd hh24:mi:ss','NLS_DATE_LANGUAGE = American') = 1;

	C_TO_VARCH  C_TO_CHAR C_TO_DATE
	---------- ---------- ----------------------------------------
	A                 100 2018-07-28 10:11:12
	1                 100 2018-07-28 10:11:12

	HR@PDB1> 




To be continue....

Have a good life! 2018/07 via LinHong


