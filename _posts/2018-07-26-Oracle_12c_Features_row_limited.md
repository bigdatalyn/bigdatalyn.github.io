---
layout: post
title: "Oracle 12c 新特性 SQL row limited  Tips"
category: Oracle
tags: Oracle 12c
---

* content
{:toc}



Oracle 12c 新特性 SQL row limited  Tips









分页排序，top-N结果集的使用 fetch first xxx rows only/offset xxx rows fetch next xxx rows only;

之前都是通过子查询，rownum来进行结果集的获取。这个新特性Oracle来的比较慢，其他厂商，如DB2很早就有了这检索语句选项。

	HR@PDB1> create table emp as select * from employees;

	Table created.

	HR@PDB1> select count(*) from emp;

	  COUNT(*)
	----------
		   107

	HR@PDB1> select employee_id,last_name,hire_date from emp order by hire_date fetch first 10 rows only;

	EMPLOYEE_ID LAST_NAME                 HIRE_DATE
	----------- ------------------------- ---------
			102 De Haan                   13-JAN-01
			203 Mavris                    07-JUN-02
			206 Gietz                     07-JUN-02
			205 Higgins                   07-JUN-02
			204 Baer                      07-JUN-02
			109 Faviet                    16-AUG-02
			108 Greenberg                 17-AUG-02
			114 Raphaely                  07-DEC-02
			122 Kaufling                  01-MAY-03     =====================> 另外一个终端连接测试删除此行
			115 Khoo                      18-MAY-03

	10 rows selected.

	HR@PDB1> 

	HR@PDB1> select employee_id,last_name,hire_date from emp order by hire_date offset 10 rows fetch next 5 rows only;

	EMPLOYEE_ID LAST_NAME                 HIRE_DATE
	----------- ------------------------- ---------
			100 King                      17-JUN-03
			137 Ladwig                    14-JUL-03
			200 Whalen                    17-SEP-03
			141 Rajs                      17-OCT-03
			184 Sarchand                  27-JAN-04

	HR@PDB1> 

另外一个终端连接，删除122的员工信息之后，排序结果则变化。

	HR@TERMINAL002> delete emp where employee_id=122;

	1 row deleted.

	HR@TERMINAL002> commit;

	Commit complete.

	HR@TERMINAL002> 


	HR@PDB1> select employee_id,last_name,hire_date from emp order by hire_date offset 10 rows fetch next 5 rows only;

	EMPLOYEE_ID LAST_NAME                 HIRE_DATE
	----------- ------------------------- ---------
			137 Ladwig                    14-JUL-03
			200 Whalen                    17-SEP-03
			141 Rajs                      17-OCT-03
			184 Sarchand                  27-JAN-04
			156 King                      30-JAN-04

	HR@PDB1> 



To be continue....

Have a good life! 2018/07 via LinHong


