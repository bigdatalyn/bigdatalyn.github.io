---
layout: post
title: "Oracle Basic SQL 006 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}

Oracle Basic SQL 006 Study Tips

list employee infor and list the manager's name.








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


### Test Data

The employee table have manager_id (NOT manager name...).

```sql
SQL> select * from employees where rownum <=10;

EMPLOYEE_ID FIRST_NAME		 LAST_NAME		   EMAIL		     PHONE_NUMBER	  HIRE_DATE JOB_ID	   SALARY COMMISSION_PCT MANAGER_ID DEPARTMENT_ID
----------- -------------------- ------------------------- ------------------------- -------------------- --------- ---------- ---------- -------------- ---------- -------------
	198 Donald		 OConnell		   DOCONNEL		     650.507.9833	  21-JUN-07 SH_CLERK	     2600			124	       50
	199 Douglas		 Grant			   DGRANT		     650.507.9844	  13-JAN-08 SH_CLERK	     2600			124	       50
	200 Jennifer		 Whalen 		   JWHALEN		     515.123.4444	  17-SEP-03 AD_ASST	     4400			101	       10
	201 Michael		 Hartstein		   MHARTSTE		     515.123.5555	  17-FEB-04 MK_MAN	    13000			100	       20
	202 Pat 		 Fay			   PFAY 		     603.123.6666	  17-AUG-05 MK_REP	     6000			201	       20
	203 Susan		 Mavris 		   SMAVRIS		     515.123.7777	  07-JUN-02 HR_REP	     6500			101	       40
	204 Hermann		 Baer			   HBAER		     515.123.8888	  07-JUN-02 PR_REP	    10000			101	       70
	205 Shelley		 Higgins		   SHIGGINS		     515.123.8080	  07-JUN-02 AC_MGR	    12008			101	      110
	206 William		 Gietz			   WGIETZ		     515.123.8181	  07-JUN-02 AC_ACCOUNT	     8300			205	      110
	100 Steven		 King			   SKING		     515.123.4567	  17-JUN-03 AD_PRES	    24000				       90

10 rows selected.

SQL>

```

### self-association

```
select e.employee_id,e.last_name||' '||e.first_name as name,m.last_name||' '||m.first_name as manager_name
from employees e left join employees m on (e.manager_id=m.employee_id) order by 1,2;
```

```sql
SQL>
select e.employee_id,e.last_name||' '||e.first_name as name,m.last_name||' '||m.first_name as manager_name
  2  from employees e left join employees m on (e.manager_id=m.employee_id) order by 1,2;

EMPLOYEE_ID NAME					   MANAGER_NAME
----------- ---------------------------------------------- ----------------------------------------------
	100 King Steven
	101 Kochhar Neena				   King Steven
	102 De Haan Lex 				   King Steven
	103 Hunold Alexander				   De Haan Lex
	104 Ernst Bruce 				   Hunold Alexander
	105 Austin David				   Hunold Alexander
	106 Pataballa Valli				   Hunold Alexander
	107 Lorentz Diana				   Hunold Alexander
	108 Greenberg Nancy				   Kochhar Neena
	109 Faviet Daniel				   Greenberg Nancy
	110 Chen John					   Greenberg Nancy
	111 Sciarra Ismael				   Greenberg Nancy
	112 Urman Jose Manuel				   Greenberg Nancy
	113 Popp Luis					   Greenberg Nancy
	114 Raphaely Den				   King Steven
	115 Khoo Alexander				   Raphaely Den
	116 Baida Shelli				   Raphaely Den
	117 Tobias Sigal				   Raphaely Den
	118 Himuro Guy					   Raphaely Den
	119 Colmenares Karen				   Raphaely Den
	120 Weiss Matthew				   King Steven
	121 Fripp Adam					   King Steven
	122 Kaufling Payam				   King Steven
	123 Vollman Shanta				   King Steven
	124 Mourgos Kevin				   King Steven
	125 Nayer Julia 				   Weiss Matthew
	126 Mikkilineni Irene				   Weiss Matthew
	127 Landry James				   Weiss Matthew
	128 Markle Steven				   Weiss Matthew
	129 Bissot Laura				   Fripp Adam
	130 Atkinson Mozhe				   Fripp Adam
	131 Marlow James				   Fripp Adam
	132 Olson TJ					   Fripp Adam
	133 Mallin Jason				   Kaufling Payam
	134 Rogers Michael				   Kaufling Payam
	135 Gee Ki					   Kaufling Payam
	136 Philtanker Hazel				   Kaufling Payam
	137 Ladwig Renske				   Vollman Shanta
	138 Stiles Stephen				   Vollman Shanta
	139 Seo John					   Vollman Shanta
	140 Patel Joshua				   Vollman Shanta
	141 Rajs Trenna 				   Mourgos Kevin
	142 Davies Curtis				   Mourgos Kevin
	143 Matos Randall				   Mourgos Kevin
	144 Vargas Peter				   Mourgos Kevin
	145 Russell John				   King Steven
	146 Partners Karen				   King Steven
	147 Errazuriz Alberto				   King Steven
	148 Cambrault Gerald				   King Steven
	149 Zlotkey Eleni				   King Steven
	150 Tucker Peter				   Russell John
	151 Bernstein David				   Russell John
	152 Hall Peter					   Russell John
	153 Olsen Christopher				   Russell John
	154 Cambrault Nanette				   Russell John
	155 Tuvault Oliver				   Russell John
	156 King Janette				   Partners Karen
	157 Sully Patrick				   Partners Karen
	158 McEwen Allan				   Partners Karen
	159 Smith Lindsey				   Partners Karen
	160 Doran Louise				   Partners Karen
	161 Sewall Sarath				   Partners Karen
	162 Vishney Clara				   Errazuriz Alberto
	163 Greene Danielle				   Errazuriz Alberto
	164 Marvins Mattea				   Errazuriz Alberto
	165 Lee David					   Errazuriz Alberto
	166 Ande Sundar 				   Errazuriz Alberto
	167 Banda Amit					   Errazuriz Alberto
	168 Ozer Lisa					   Cambrault Gerald
	169 Bloom Harrison				   Cambrault Gerald
	170 Fox Tayler					   Cambrault Gerald
	171 Smith William				   Cambrault Gerald
	172 Bates Elizabeth				   Cambrault Gerald
	173 Kumar Sundita				   Cambrault Gerald
	174 Abel Ellen					   Zlotkey Eleni
	175 Hutton Alyssa				   Zlotkey Eleni
	176 Taylor Jonathon				   Zlotkey Eleni
	177 Livingston Jack				   Zlotkey Eleni
	178 Grant Kimberely				   Zlotkey Eleni
	179 Johnson Charles				   Zlotkey Eleni
	180 Taylor Winston				   Weiss Matthew
	181 Fleaur Jean 				   Weiss Matthew
	182 Sullivan Martha				   Weiss Matthew
	183 Geoni Girard				   Weiss Matthew
	184 Sarchand Nandita				   Fripp Adam
	185 Bull Alexis 				   Fripp Adam
	186 Dellinger Julia				   Fripp Adam
	187 Cabrio Anthony				   Fripp Adam
	188 Chung Kelly 				   Kaufling Payam
	189 Dilly Jennifer				   Kaufling Payam
	190 Gates Timothy				   Kaufling Payam
	191 Perkins Randall				   Kaufling Payam
	192 Bell Sarah					   Vollman Shanta
	193 Everett Britney				   Vollman Shanta
	194 McCain Samuel				   Vollman Shanta
	195 Jones Vance 				   Vollman Shanta
	196 Walsh Alana 				   Mourgos Kevin
	197 Feeney Kevin				   Mourgos Kevin
	198 OConnell Donald				   Mourgos Kevin
	199 Grant Douglas				   Mourgos Kevin
	200 Whalen Jennifer				   Kochhar Neena
	201 Hartstein Michael				   King Steven
	202 Fay Pat					   Hartstein Michael
	203 Mavris Susan				   Kochhar Neena
	204 Baer Hermann				   Kochhar Neena
	205 Higgins Shelley				   Kochhar Neena
	206 Gietz William				   Higgins Shelley

107 rows selected.

SQL>
```

```
SQL_ID	5urcb941xymy1, child number 0
-------------------------------------
select e.employee_id,e.last_name||' '||e.first_name as
name,m.last_name||' '||m.first_name as manager_name from employees e
left join employees m on (e.manager_id=m.employee_id) order by 1,2

Plan hash value: 2679428685

-------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		 | Name 	    | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	 |		    |	   1 |	      |     6 (100)|	      |    107 |00:00:00.01 |	   14 |
|   1 |  SORT ORDER BY		 |		    |	   1 |	  107 |     6  (17)| 00:00:01 |    107 |00:00:00.01 |	   14 |
|*  2 |   HASH JOIN OUTER	 |		    |	   1 |	  107 |     5	(0)| 00:00:01 |    107 |00:00:00.01 |	   14 |
|   3 |    TABLE ACCESS FULL	 | EMPLOYEES	    |	   1 |	  107 |     3	(0)| 00:00:01 |    107 |00:00:00.01 |	    6 |
|   4 |    VIEW 		 | index$_join$_002 |	   1 |	  107 |     2	(0)| 00:00:01 |    107 |00:00:00.01 |	    8 |
|*  5 |     HASH JOIN		 |		    |	   1 |	      | 	   |	      |    107 |00:00:00.01 |	    8 |
|   6 |      INDEX FAST FULL SCAN| EMP_NAME_IX	    |	   1 |	  107 |     1	(0)| 00:00:01 |    107 |00:00:00.01 |	    4 |
|   7 |      INDEX FAST FULL SCAN| EMP_EMP_ID_PK    |	   1 |	  107 |     1	(0)| 00:00:01 |    107 |00:00:00.01 |	    4 |
-------------------------------------------------------------------------------------------------------------------------------
```



### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

