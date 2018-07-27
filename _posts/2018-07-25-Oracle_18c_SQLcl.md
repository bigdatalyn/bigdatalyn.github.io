---
layout: post
title: "Oracle SQLcl Tips"
category: Oracle
tags: Oracle Tools
---

* content
{:toc}




Oracle SQLcl Tips


SQLcl is a Java-based command-line.

Support EZConnect,TNS,LDAP without Oracle client installed.

[SQLcl ](http://www.oracle.com/technetwork/developer-tools/sqlcl/index.html)
	July 3, 2018 - Update 18.2


	
	
	
	
	
	
### Tips
	
	help
	clear
	ddl table_name
	history/hist 1 run/hist 2 delete/hist 1 edit
	history time/history clear
	help set sqlformat
	alias
	info
	load
	net
	repeat
	sshtunnel
	tnsping
	help ctas
	

Sample:

	SQL> select employee_id,first_name,salary from employees fetch first 5 rows only;

	EMPLOYEE_ID FIRST_NAME               SALARY
	----------- -------------------- ----------
			100 Steven                    24000
			101 Neena                     17000
			102 Lex                       17000
			103 Alexander                  9000
			104 Bruce                      6000

	SQL> show sqlformat
	SQL 格式: Default
	SQL> set sqlformat csv

	SQL> show sqlformatSQL 格式: csv

	SQL> select employee_id,first_name,salary from employees fetch first 5 rows only;
	"EMPLOYEE_ID","FIRST_NAME","SALARY"
	100,"Steven",24000
	101,"Neena",17000
	102,"Lex",17000
	103,"Alexander",9000
	104,"Bruce",6000

	SQL> set head off
	SQL> select * from employees fetch first 5 rows only;
	100,"Steven","King","SKING","515.123.4567",17-JUN-03,"AD_PRES",24000,,,90
	101,"Neena","Kochhar","NKOCHHAR","515.123.4568",21-SEP-05,"AD_VP",17000,,100,90
	102,"Lex","De Haan","LDEHAAN","515.123.4569",13-JAN-01,"AD_VP",17000,,100,90
	103,"Alexander","Hunold","AHUNOLD","590.423.4567",03-JAN-06,"IT_PROG",9000,,102,60
	104,"Bruce","Ernst","BERNST","590.423.4568",21-MAY-07,"IT_PROG",6000,,103,60

	SQL>




To be continue....

Have a good life! 2018/07 via LinHong


