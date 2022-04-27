---
layout: post
title: "Oracle SQLT Tips"
category: Oracle
tags: Oracle SQLT Tips
---

* content
{:toc}

Oracle SQLT Tips

### What is SQLTXPLAIN (SQLT)?

SQLTXPLAIN, also known as SQLT, is a tool provided by Oracle Server Technologies Center of Expertise - ST CoE. SQLT inputs one SQL statement and outputs a set of diagnostics files. These files are commonly used to diagnose SQL statements performing poorly. SQLT connects to the database and collects execution plans, Cost-based Optimizer CBO statistics, schema objects metadata, performance statistics, configuration parameters, and similar elements that influence the performance of the SQL being analyzed.

Licensing (SQLT requires no license and is FREE)

Execution plans, execution statistics, data volume, etc. Those have to be taken for the same query(ies) from different env.

SQLT helps gathering these info.

### Download SQLT and Install SQLT

Download SQLT: All About the SQLT Diagnostic Tool (Doc ID 215187.1)

- sqlt_10g_11g_12c_18c_19c_5th_June_2020.zip
- sqlt9i_11.3.1.4.zip

Install SQLT: SQLT Usage Instructions (Doc ID 1614107.1)

Tips:

```sql
1.Uninstall a prior version (optional).
# cd sqlt/install
# sqlplus / as sysdba
SQL> START sqdrop.sql

2.Execute installation script sqlt/install/sqcreate.sql connected as SYS.
# cd sqlt/install
# sqlplus / as sysdba
SQL> START sqcreate.sql
```


During the installation you will be asked to enter values for these parameters:
```
Optional Connect Identifier (mandatory when installing in a Pluggable Database)
In some restricted-access systems you may need to specify a connect identifier like @PROD. If a connect identifier is not needed, enter nothing and just hit the "Enter" key. Entering nothing is the most common setup.
The Connect Identifier is a mandatory parameter when installing SQLT in a Pluggable Database.

SQLTXPLAIN password.
Case sensitive in most systems.

SQLTXPLAIN Default Tablespace.
Select from a list of available permanent tablespaces which one should be used by SQLTXPLAIN for the SQLT repository. It must have more than 50MB of free space.

SQLTXPLAIN Temporary Tablespace.
Select from a list of available temporary tablespaces which one should be used by SQLTXPLAIN for volatile operations and objects.

Optional Application User.
This is the user that issued the SQL statement to be analyzed. For example, if this were an EBS system specify APPS, on Siebel you would specify SIEBEL and on People Soft SYSADM. You won't be asked to enter the password for this user. You can add additional SQLT users after the tool is installed, by granting them role SQLT_USER_ROLE.

Licensed Oracle Pack. (T, D or N)
You can specify T for Oracle Tuning, D for Oracle Diagnostic or N for none. If T or D is selected, SQLT may include licensed content within the diagnostics files it produces. Default is T. If N is selected, SQLT installs with limited functionality.
```


### EXTRACT SQLT reports:

Starting with 12cR1, SQLT can be executed under SYS user -- for so, do as follows before starting execution:


```
SQL> CONN /as sysdba
SQL> GRANT INHERIT PRIVILEGES ON USER sys TO sqltxadmin;
```

1: To speedup SQLT Extraction -- connect as SQLTXADMIN user and run:

```
EXEC sqltxplain.sqlt$a.set_param('sta_time_limit_secs', '30');
EXEC sqltxplain.sqlt$a.set_sess_param('sql_tuning_advisor','N');
EXEC sqltxadmin.sqlt$a.set_param('ash_reports', '0');
EXEC sqltxadmin.sqlt$a.set_param('awr_reports', '0');
```

2: Then start extraction:
```
$ cd sqlt/run
$ sqlplus /nolog
SQL> conn /as sysdba
SQL> @sqltxtract.sql <sql_id> [sqltxplain_password]
```

When asked for an input, enter [S]


### Env and test logs

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
```

```
$ unzip sqlt_10g_11g_12c_18c_19c_5th_June_2020.zip
$ cd sqlt/install
$ sqlplus sys/oracle@orclpdb as sysdba


Optional Connect Identifier (ie: @PROD): @orclpdb ------ pdbname
Password for user SQLTXPLAIN:                     ------ password:oracle
Re-enter password:

Type YES or NO [Default NO]:                      ------ List tablespace(default)
Default tablespace [UNKNOWN]: USERS               ------ tablespace name:USERS
Temporary tablespace [UNKNOWN]: TEMP              ------ temp tbs   name:TEMP
Oracle Pack license [T]:                          ------ License type: T


SQLT users must be granted SQLT_USER_ROLE before using this tool.
SQCREATE completed. Installation completed successfully.
SQL>

```

```

SQL> conn / as sysdba
Connected.
SQL> alter session set container=orclpdb;

Session altered.

SQL> grant create session,resource to sqltxadmin;

Grant succeeded.

SQL> alter user sqltxadmin account unlock;

User altered.

SQL> alter user sqltxadmin identified by oracle;

User altered.

SQL> GRANT INHERIT PRIVILEGES ON USER sys TO sqltxadmin;

Grant succeeded.

SQL> conn sqltxadmin/oracle@orclpdb
Connected.
SQL>


EXEC sqltxplain.sqlt$a.set_param('sta_time_limit_secs', '30');
EXEC sqltxplain.sqlt$a.set_sess_param('sql_tuning_advisor','N');
EXEC sqltxadmin.sqlt$a.set_param('ash_reports', '0');
EXEC sqltxadmin.sqlt$a.set_param('awr_reports', '0');

PL/SQL procedure successfully completed.

SQL> conn sys/oracle@orclpdb as sysdba
Connected.
SQL> @sqltxtract.sql 8auxqkth626p5 oracle
SP2-0310: unable to open file "sqltxtract.sql"
SQL> !pwd
/home/oracle/scripts/sqlt/install

SQL> @../run/sqltxtract.sql 8auxqkth626p5 oracle

-- another session had executed test sql:
-- sqlarea 8auxqkth626p5  select /*+ monitor test001 */ count(*) from t1,t3

Describe the characteristic of this run

"F[AST]"	     if you have a FAST run
"S[LOW]"	     if you have a SLOW run (default)
"H[ASH]"	     if this is a run with a HASH JOIN
"N[L]"		     if this is a run with a NESTED LOOP
"C[OLUMN HISTOGRAM]" if this is a run with a Column Historgram in place

SQL Description [S]: S

#####
The SQLT has collected information and place it in a repository in the database, exported it and zip it.
The collected info can be purged from the database using the following file :
... getting sqlt_s31317_purge.sql out of sqlt repository ...

SQLTXTRACT completed.
SQL>SQL>
```
Out put:
- sqlt_20220427_1002_8auxqkth626p5_S.zip

![oracle-sqlt]({{ "/files/Oracle/19c/SQLT/sqlt_reports.png"}}) 

SQLT Main HTML

![oracle-sqlt_main]({{ "/files/Oracle/19c/SQLT/sqlt_main.png"}}) 


### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/04 via LinHong

