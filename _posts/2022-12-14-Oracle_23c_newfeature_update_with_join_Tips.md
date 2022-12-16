---
layout: post
title: "Oracle 23c New features - Update Using Direct Join Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - Update Using Direct Join Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	









### Update Using Direct Join

The following example sets 147/180/200 employee_id - employee's salary to the max salary for their job:
* postgres sql has the same feature.

```
HR@pdb1> select * from hr.jobs;

JOB_ID	   JOB_TITLE			       MIN_SALARY MAX_SALARY
---------- ----------------------------------- ---------- ----------
AD_PRES    President				    20080      40000
AD_VP	   Administration Vice President	    15000      30000
AD_ASST    Administration Assistant		     3000	6000
FI_MGR	   Finance Manager			     8200      16000
FI_ACCOUNT Accountant				     4200	9000
AC_MGR	   Accounting Manager			     8200      16000
AC_ACCOUNT Public Accountant			     4200	9000
SA_MAN	   Sales Manager			    10000      20080
SA_REP	   Sales Representative 		     6000      12008
PU_MAN	   Purchasing Manager			     8000      15000
PU_CLERK   Purchasing Clerk			     2500	5500
ST_MAN	   Stock Manager			     5500	8500
ST_CLERK   Stock Clerk				     2008	5000
SH_CLERK   Shipping Clerk			     2500	5500
IT_PROG    Programmer				     4000      10000
MK_MAN	   Marketing Manager			     9000      15000
MK_REP	   Marketing Representative		     4000	9000
HR_REP	   Human Resources Representative	     4000	9000
PR_REP	   Public Relations Representative	     4500      10500

19 rows selected.

HR@pdb1>
HR@pdb1> create table hr.emp_1 as select * from hr.employees;

Table created.

HR@pdb1> select * from hr.emp_1 fetch first 10 rows only;

 EMPLOYEE_ID FIRST_NAME  LAST_NAME   EMAIL    PHONE_NUMBER	 HIRE_DATE	     JOB_ID	 SALARY     COMMISSION_PCT  MANAGER_ID	DEPARTMENT_ID
------------ ----------- ----------- -------- ------------------ ------------------- ---------- ------- ------------------ ----------- --------------
	 198 Donald	 OConnell    DOCONNEL 650.507.9833	 2007-06-21 00:00:00 SH_CLERK	   2600 			   124		   50
	 199 Douglas	 Grant	     DGRANT   650.507.9844	 2008-01-13 00:00:00 SH_CLERK	   2600 			   124		   50
	 200 Jennifer	 Whalen      JWHALEN  515.123.4444	 2003-09-17 00:00:00 AD_ASST	   4400 			   101		   10
	 201 Michael	 Hartstein   MHARTSTE 515.123.5555	 2004-02-17 00:00:00 MK_MAN	  13000 			   100		   20
	 202 Pat	 Fay	     PFAY     603.123.6666	 2005-08-17 00:00:00 MK_REP	   6000 			   201		   20
	 203 Susan	 Mavris      SMAVRIS  515.123.7777	 2002-06-07 00:00:00 HR_REP	   6500 			   101		   40
	 204 Hermann	 Baer	     HBAER    515.123.8888	 2002-06-07 00:00:00 PR_REP	  10000 			   101		   70
	 205 Shelley	 Higgins     SHIGGINS 515.123.8080	 2002-06-07 00:00:00 AC_MGR	  12008 			   101		  110
	 206 William	 Gietz	     WGIETZ   515.123.8181	 2002-06-07 00:00:00 AC_ACCOUNT    8300 			   205		  110
	 100 Steven	 King	     SKING    515.123.4567	 2003-06-17 00:00:00 AD_PRES	  24000 					   90

10 rows selected.

HR@pdb1> 
HR@pdb1> select * from hr.emp_1 where employee_id in (147,180,200);

 EMPLOYEE_ID FIRST_NAME  LAST_NAME   EMAIL    PHONE_NUMBER	 HIRE_DATE	     JOB_ID	 SALARY     COMMISSION_PCT  MANAGER_ID	DEPARTMENT_ID
------------ ----------- ----------- -------- ------------------ ------------------- ---------- ------- ------------------ ----------- --------------
	 200 Jennifer	 Whalen      JWHALEN  515.123.4444	 2003-09-17 00:00:00 AD_ASST	   4400 			   101		   10
	 147 Alberto	 Errazuriz   AERRAZUR 011.44.1344.429278 2005-03-10 00:00:00 SA_MAN	  12000 	       .30	   100		   80
	 180 Winston	 Taylor      WTAYLOR  650.507.9876	 2006-01-24 00:00:00 SH_CLERK	   3200 			   120		   50

HR@pdb1> 
HR@pdb1> select * from hr.emp_1 where employee_id in (147,180,200);

 EMPLOYEE_ID FIRST_NAME  LAST_NAME   EMAIL    PHONE_NUMBER	 HIRE_DATE	     JOB_ID	 SALARY     COMMISSION_PCT  MANAGER_ID	DEPARTMENT_ID
------------ ----------- ----------- -------- ------------------ ------------------- ---------- ------- ------------------ ----------- --------------
	 200 Jennifer	 Whalen      JWHALEN  515.123.4444	 2003-09-17 00:00:00 AD_ASST	   4400 			   101		   10
	 147 Alberto	 Errazuriz   AERRAZUR 011.44.1344.429278 2005-03-10 00:00:00 SA_MAN	  12000 	       .30	   100		   80
	 180 Winston	 Taylor      WTAYLOR  650.507.9876	 2006-01-24 00:00:00 SH_CLERK	   3200 			   120		   50

HR@pdb1> 
UPDATE hr.emp_1 e
  2      SET e.salary = j.max_salary
  3      FROM hr.jobs j    
  4      WHERE e.job_id = j.job_id and e.employee_id in (147,180,200);

3 rows updated.

HR@pdb1> select * from hr.emp_1 where employee_id in (147,180,200);

 EMPLOYEE_ID FIRST_NAME  LAST_NAME   EMAIL    PHONE_NUMBER	 HIRE_DATE	     JOB_ID	 SALARY     COMMISSION_PCT  MANAGER_ID	DEPARTMENT_ID
------------ ----------- ----------- -------- ------------------ ------------------- ---------- ------- ------------------ ----------- --------------
	 200 Jennifer	 Whalen      JWHALEN  515.123.4444	 2003-09-17 00:00:00 AD_ASST	   6000 			   101		   10
	 147 Alberto	 Errazuriz   AERRAZUR 011.44.1344.429278 2005-03-10 00:00:00 SA_MAN	  20080 	       .30	   100		   80
	 180 Winston	 Taylor      WTAYLOR  650.507.9876	 2006-01-24 00:00:00 SH_CLERK	   5500 			   120		   50

HR@pdb1> 

```

#### Sample from PostgreSQL

```
drop table product_segment purge;

drop table product purge;

CREATE TABLE product_segment (
    id NUMBER(10) PRIMARY KEY,
    segment VARCHAR2(4000) NOT NULL,
    discount NUMBER (4, 2)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE product_segment_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER product_segment_seq_tr
 BEFORE INSERT ON product_segment FOR EACH ROW
 WHEN (NEW.id IS NULL)
BEGIN
 SELECT product_segment_seq.NEXTVAL INTO :NEW.id FROM DUAL;
END;
/


 
CREATE TABLE product(
    id NUMBER(10) PRIMARY KEY,
    name VARCHAR2(4000) NOT NULL,
    price NUMBER(10,2),
    net_price NUMBER(10,2),
    segment_id NUMBER(10) NOT NULL,
    FOREIGN KEY(segment_id) REFERENCES product_segment(id)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE product_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER product_seq_tr
 BEFORE INSERT ON product FOR EACH ROW
 WHEN (NEW.id IS NULL)
BEGIN
 SELECT product_seq.NEXTVAL INTO :NEW.id FROM DUAL;
END;
/


INSERT INTO 
    product_segment (segment, discount)
VALUES
    ('Grand Luxury', 0.05),
    ('Luxury', 0.06),
    ('Mass', 0.1);

INSERT INTO 
    product (name, price, segment_id) 
VALUES 
    ('diam', 804.89, 1),
    ('vestibulum aliquet', 228.55, 3),
    ('lacinia erat', 366.45, 2),
    ('scelerisque quam turpis', 145.33, 3),
    ('justo lacinia', 551.77, 2),
    ('ultrices mattis odio', 261.58, 3),
    ('hendrerit', 519.62, 2),
    ('in hac habitasse', 843.31, 1),
    ('orci eget orci', 254.18, 3),
    ('pellentesque', 427.78, 2),
    ('sit amet nunc', 936.29, 1),
    ('sed vestibulum', 910.34, 1),
    ('turpis eget', 208.33, 3),
    ('cursus vestibulum', 985.45, 1),
    ('orci nullam', 841.26, 1),
    ('est quam pharetra', 896.38, 1),
    ('posuere', 575.74, 2),
    ('ligula', 530.64, 2),
    ('convallis', 892.43, 1),
    ('nulla elit ac', 161.71, 3);

COMMIT;

select * from product_segment;
select * from product;



UPDATE 
    product p
SET 
    net_price = price - price * discount
FROM 
    product_segment s
WHERE 
    p.segment_id = s.id;


    HONG@pdb1> select * from product;

 ID NAME			PRICE	  NET_PRICE  SEGMENT_ID
--- ----------------------- --------- ------------- -----------
 41 diam		       804.89			      1
 42 vestibulum aliquet	       228.55			      3
 43 lacinia erat	       366.45			      2
 44 scelerisque quam turpis    145.33			      3
 45 justo lacinia	       551.77			      2
 46 ultrices mattis odio       261.58			      3
 47 hendrerit		       519.62			      2
 48 in hac habitasse	       843.31			      1
 49 orci eget orci	       254.18			      3
 50 pellentesque	       427.78			      2
 51 sit amet nunc	       936.29			      1
 52 sed vestibulum	       910.34			      1
 53 turpis eget 	       208.33			      3
 54 cursus vestibulum	       985.45			      1
 55 orci nullam 	       841.26			      1
 56 est quam pharetra	       896.38			      1
 57 posuere		       575.74			      2
 58 ligula		       530.64			      2
 59 convallis		       892.43			      1
 60 nulla elit ac	       161.71			      3

20 rows selected.

UPDATE 
  2      product p
  3  SET 
  4      net_price = price - price * discount
  5  FROM 
  6      product_segment s
  7  WHERE 
  8      p.segment_id = s.id;

20 rows updated.

HONG@pdb1> commit;

Commit complete.

HONG@pdb1> select * from product;

 ID NAME			PRICE	  NET_PRICE  SEGMENT_ID
--- ----------------------- --------- ------------- -----------
 41 diam		       804.89	     764.65	      1
 42 vestibulum aliquet	       228.55	     205.70	      3
 43 lacinia erat	       366.45	     344.46	      2
 44 scelerisque quam turpis    145.33	     130.80	      3
 45 justo lacinia	       551.77	     518.66	      2
 46 ultrices mattis odio       261.58	     235.42	      3
 47 hendrerit		       519.62	     488.44	      2
 48 in hac habitasse	       843.31	     801.14	      1
 49 orci eget orci	       254.18	     228.76	      3
 50 pellentesque	       427.78	     402.11	      2
 51 sit amet nunc	       936.29	     889.48	      1
 52 sed vestibulum	       910.34	     864.82	      1
 53 turpis eget 	       208.33	     187.50	      3
 54 cursus vestibulum	       985.45	     936.18	      1
 55 orci nullam 	       841.26	     799.20	      1
 56 est quam pharetra	       896.38	     851.56	      1
 57 posuere		       575.74	     541.20	      2
 58 ligula		       530.64	     498.80	      2
 59 convallis		       892.43	     847.81	      1
 60 nulla elit ac	       161.71	     145.54	      3

20 rows selected.

HONG@pdb1> 
```


### Reference 

[Oracle Database 23c / SQL Language Reference / Update](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/sqlrf/UPDATE.html#GUID-027A462D-379D-4E35-8611-410F3AC8FDA5)


[PostgreSQL UPDATE Join with Practical Examples](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-update-join/)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


