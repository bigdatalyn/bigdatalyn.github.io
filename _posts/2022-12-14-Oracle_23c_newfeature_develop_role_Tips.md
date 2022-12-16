---
layout: post
title: "Oracle 23c New features - Develop role Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - Develop role Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	









### Develop role

The DEVELOPER role provides most of the system privileges, object privileges, predefined roles, PL/SQL package privileges, and tracing privileges that an application developer needs.

An application developer needs a large number of these privileges to design, develop, and deploy applications. 

Oracle recommends that you grant the application developer the DEVELOPER role, rather than individually granting these privileges or granting the user the DBA role. 

Granting the application user the DEVELOPER role not only adheres to least-privilege principles and ensures greater security for the development environment, it facilitates the management of role grants and revokes for application users. The DEVELOPER role can be used in either the CDB root or the PDB.

You cannot modify the DEVELOPER role. It can only be modified during an Oracle Database upgrade or downgrade.

--> Can grant new privs to developer role and the new privs also can be revoked.

--> Can NOT revoke the original privs from developer role.

```
SYS@cdb1> select * from dba_roles where role = 'DEVELOPER';

ROLE				    ROLE_ID PASSWORD_REQUIRED AUTHENTICATION_TYPE COMMON ORACLE_MAINTAINED INHERITED IMPLICIT EXTERNAL_NAME
------------------------------- ----------- ----------------- ------------------- ------ ----------------- --------- -------- -------------
DEVELOPER				 98 NO		      NONE		  YES	 Y		   NO	     NO

SYS@cdb1> select * from role_sys_privs where role='DEVELOPER';

ROLE				PRIVILEGE				 ADM COMMON INHERITED
------------------------------- ---------------------------------------- --- ------ ---------
DEVELOPER			CREATE DOMAIN				 NO  YES    NO
DEVELOPER			CREATE MLE				 NO  YES    NO
DEVELOPER			CREATE ANALYTIC VIEW			 NO  YES    NO
DEVELOPER			CREATE HIERARCHY			 NO  YES    NO
DEVELOPER			CREATE ATTRIBUTE DIMENSION		 NO  YES    NO
DEVELOPER			EXECUTE DYNAMIC MLE			 NO  YES    NO
DEVELOPER			CREATE CUBE BUILD PROCESS		 NO  YES    NO
DEVELOPER			CREATE CUBE				 NO  YES    NO
DEVELOPER			CREATE CUBE DIMENSION			 NO  YES    NO
DEVELOPER			CREATE MINING MODEL			 NO  YES    NO
DEVELOPER			CREATE JOB				 NO  YES    NO
DEVELOPER			DEBUG CONNECT SESSION			 NO  YES    NO
DEVELOPER			ON COMMIT REFRESH			 NO  YES    NO
DEVELOPER			CREATE DIMENSION			 NO  YES    NO
DEVELOPER			CREATE TYPE				 NO  YES    NO
DEVELOPER			CREATE MATERIALIZED VIEW		 NO  YES    NO
DEVELOPER			CREATE TRIGGER				 NO  YES    NO
DEVELOPER			CREATE PROCEDURE			 NO  YES    NO
DEVELOPER			FORCE TRANSACTION			 NO  YES    NO
DEVELOPER			CREATE SEQUENCE 			 NO  YES    NO
DEVELOPER			CREATE VIEW				 NO  YES    NO
DEVELOPER			CREATE SYNONYM				 NO  YES    NO
DEVELOPER			CREATE TABLE				 NO  YES    NO
DEVELOPER			CREATE SESSION				 NO  YES    NO

24 rows selected.

SYS@cdb1> 
SYS@cdb1> grant create any table to developer;

Grant succeeded.

SYS@cdb1> select * from role_sys_privs where role='DEVELOPER';

ROLE				PRIVILEGE				 ADM COMMON INHERITED
------------------------------- ---------------------------------------- --- ------ ---------
DEVELOPER			CREATE ANY TABLE			 NO  NO     NO
DEVELOPER			CREATE DOMAIN				 NO  YES    NO
DEVELOPER			CREATE MLE				 NO  YES    NO
DEVELOPER			CREATE ANALYTIC VIEW			 NO  YES    NO
DEVELOPER			CREATE HIERARCHY			 NO  YES    NO
DEVELOPER			CREATE ATTRIBUTE DIMENSION		 NO  YES    NO
DEVELOPER			EXECUTE DYNAMIC MLE			 NO  YES    NO
DEVELOPER			CREATE CUBE BUILD PROCESS		 NO  YES    NO
DEVELOPER			CREATE CUBE				 NO  YES    NO
DEVELOPER			CREATE CUBE DIMENSION			 NO  YES    NO
DEVELOPER			CREATE MINING MODEL			 NO  YES    NO
DEVELOPER			CREATE JOB				 NO  YES    NO
DEVELOPER			DEBUG CONNECT SESSION			 NO  YES    NO
DEVELOPER			ON COMMIT REFRESH			 NO  YES    NO
DEVELOPER			CREATE DIMENSION			 NO  YES    NO
DEVELOPER			CREATE TYPE				 NO  YES    NO
DEVELOPER			CREATE MATERIALIZED VIEW		 NO  YES    NO
DEVELOPER			CREATE TRIGGER				 NO  YES    NO
DEVELOPER			CREATE PROCEDURE			 NO  YES    NO
DEVELOPER			FORCE TRANSACTION			 NO  YES    NO
DEVELOPER			CREATE SEQUENCE 			 NO  YES    NO
DEVELOPER			CREATE VIEW				 NO  YES    NO
DEVELOPER			CREATE SYNONYM				 NO  YES    NO
DEVELOPER			CREATE TABLE				 NO  YES    NO
DEVELOPER			CREATE SESSION				 NO  YES    NO

25 rows selected.

SYS@cdb1> 
SYS@cdb1> revoke CREATE TABLE from developer;
revoke CREATE TABLE from developer
*
ERROR at line 1:
ORA-65092: system privilege granted with a different scope to 'DEVELOPER'

SYS@cdb1> 
SYS@cdb1> revoke create any table from developer;

Revoke succeeded.

SYS@cdb1> select * from role_sys_privs where role='DEVELOPER';

ROLE	  PRIVILEGE		     ADMIN_OPTION COMMON INHERITED
--------- -------------------------- ------------ ------ ---------
DEVELOPER CREATE DOMAIN 	     NO 	  YES	 NO
DEVELOPER CREATE MLE		     NO 	  YES	 NO
DEVELOPER CREATE ANALYTIC VIEW	     NO 	  YES	 NO
DEVELOPER CREATE HIERARCHY	     NO 	  YES	 NO
DEVELOPER CREATE ATTRIBUTE DIMENSION NO 	  YES	 NO
DEVELOPER EXECUTE DYNAMIC MLE	     NO 	  YES	 NO
DEVELOPER CREATE CUBE BUILD PROCESS  NO 	  YES	 NO
DEVELOPER CREATE CUBE		     NO 	  YES	 NO
DEVELOPER CREATE CUBE DIMENSION      NO 	  YES	 NO
DEVELOPER CREATE MINING MODEL	     NO 	  YES	 NO
DEVELOPER CREATE JOB		     NO 	  YES	 NO
DEVELOPER DEBUG CONNECT SESSION      NO 	  YES	 NO
DEVELOPER ON COMMIT REFRESH	     NO 	  YES	 NO
DEVELOPER CREATE DIMENSION	     NO 	  YES	 NO
DEVELOPER CREATE TYPE		     NO 	  YES	 NO
DEVELOPER CREATE MATERIALIZED VIEW   NO 	  YES	 NO
DEVELOPER CREATE TRIGGER	     NO 	  YES	 NO
DEVELOPER CREATE PROCEDURE	     NO 	  YES	 NO
DEVELOPER FORCE TRANSACTION	     NO 	  YES	 NO
DEVELOPER CREATE SEQUENCE	     NO 	  YES	 NO
DEVELOPER CREATE VIEW		     NO 	  YES	 NO
DEVELOPER CREATE SYNONYM	     NO 	  YES	 NO
DEVELOPER CREATE TABLE		     NO 	  YES	 NO
DEVELOPER CREATE SESSION	     NO 	  YES	 NO

24 rows selected.

SYS@cdb1> 

```

### Reference 

[Oracle Database 23c / Security Guide
 / 12.3 Use of the DEVELOPER Role for Application Developers](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/dbseg/managing-security-for-application-developers.html#GUID-DCEEC563-4F6C-4B0A-9EB2-9F88CDF351D7)


Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


