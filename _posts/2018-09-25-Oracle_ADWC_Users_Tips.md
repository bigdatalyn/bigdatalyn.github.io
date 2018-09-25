---
layout: post
title: "Oracle ADWC Users Tips"
category: ADWC
tags: Oracle ADWC Tips
---

* content
{:toc}




Oracle ADWC Users Tips





ADWC Manager users in ADWC Tips

Reference document:

[Managing Users on Autonomous Data Warehouse](https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/manage.html#GUID-AD7ACC07-AAF7-482A-8845-9C726B1BA86D)

create user:

	CREATE USER hong IDENTIFIED BY oracle;
	GRANT CREATE SESSION TO hong;

	ALTER USER hong IDENTIFIED BY oracle ACCOUNT UNLOCK;
	DROP USER hong CASCADE;


Error starting at line : 1 in command -
CREATE USER hong IDENTIFIED BY oracle
	Error report -
	ORA-28003: password verification for the specified password failed
	ORA-20001: Password length less than 12
	28003. 00000 -  "password verification for the specified password failed"
	*Cause:    The new password did not meet the necessary complexity
			   specifications and the password_verify_function failed
	*Action:   Enter a different password. Contact the DBA to know the rules for
			   choosing the new password
		   
		   
	CREATE USER hong IDENTIFIED BY "zaq1@WSXzaq1";

Grant roles:

	GRANT DWROLE TO user;

Regarding the dwrole, it has the following privileges.

		CREATE ANALYTIC VIEW
		CREATE ATTRIBUTE DIMENSION
		ALTER SESSION
		CREATE HIERARCHY
		CREATE JOB
		CREATE MINING MODEL
		CREATE PROCEDURE
		CREATE SEQUENCE
		CREATE SESSION
		CREATE SYNONYM
		CREATE TABLE
		CREATE TRIGGER
		CREATE TYPE
		CREATE VIEW
		READ,WRITE ON directory DATA_PUMP_DIR
		EXECUTE privilege on the PL/SQL package DBMS_CLOUD
	
	
The data sets are provided as Oracle Database schemas SH and SSB respectively. 

Any user can query these data sets without any manual configuration.
	
However the sh/ssb cannot unlock or set a password just like the following sql,it will be an error.

	select username,lock_date,account_status from dba_users where username in ('SH','SSB');

	account status are both "LOCKED".

Unlock/set password for sh/ssb user:

		alter user sh identified by "zaq1@WSXzaq1" account unlock;

![account_reset_error]({{ "/files/Oracle/ADWC/account_reset_error.png"}})	


The sample sql:
	
	SELECT channel_desc, TO_CHAR(SUM(amount_sold), '9,999,999,999') SALES$,
	   RANK() OVER (ORDER BY SUM(amount_sold)) AS default_rank,
	   RANK() OVER (ORDER BY SUM(amount_sold) DESC NULLS LAST) AS custom_rank
	FROM sh.sales, sh.products, sh.customers, sh.times, sh.channels, sh.countries
	WHERE sales.prod_id=products.prod_id AND sales.cust_id=customers.cust_id
	  AND customers.country_id = countries.country_id AND sales.time_id=times.time_id
	  AND sales.channel_id=channels.channel_id
	  AND times.calendar_month_desc IN ('2000-09', '2000-10')
	  AND country_iso_code='US'
	GROUP BY channel_desc;		
		
![sample_sql_sh]({{ "/files/Oracle/ADWC/sample_sql_sh.png"}})	





Have a good life! 2018/09 via LinHong



