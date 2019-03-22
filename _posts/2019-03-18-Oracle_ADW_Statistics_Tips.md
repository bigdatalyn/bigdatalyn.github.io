---
layout: post
title: "Oracle ADW Statistics Tips"
category: Oracle
tags: Oracle ADW Tips
---

* content
{:toc}

Oracle ADW statistics Tips

Database's statistics are maintained during direct path load.

Here are the sample test.












### Env

ADW 18.4/SQLcl 18.4/Oracle Linux 7/JDK 8

### Test

The following test shows that statistics are maintained during direct path load.


	SQL> set cloudconfig /home/opc/wallet_ADWDEMO01.zip
	Operation is successfully completed.
	Operation is successfully completed.
	Using temp directory:/tmp/oracle_cloud_config1455974966931990014
	SQL> conn admin@adwdemo01_high
	Password? (**********?) ****************
	Connected.
	SQL> !pwd
	/home/opc/practise/oracle-db-examples/optimizer/autonomous/stats_on_load

	SQL> !ls -ltr
	total 56
	-rw-rw-r--. 1 opc opc   349 Mar 15 16:29 user.sql
	-rw-rw-r--. 1 opc opc  2445 Mar 15 16:29 test_load.sql
	-rw-rw-r--. 1 opc opc 37364 Mar 15 16:29 test_load.lst
	-rw-rw-r--. 1 opc opc   734 Mar 15 16:29 stat.sql
	-rw-rw-r--. 1 opc opc   516 Mar 15 16:29 README.md

	SQL> !cat user.sql
	--
	-- Log into admin account and create a test user as follows
	--
	create user adwu1 identified by "choose your password";

	grant ALTER SESSION to adwu1;
	grant CREATE TABLE to adwu1;
	grant CREATE VIEW to adwu1;
	grant CREATE SESSION to adwu1;
	--
	grant select on v$session to adwu1;
	grant select on v$sql_plan to adwu1;
	grant select on v$sql to adwu1;

	SQL> !vi user.sql

	SQL> !cat user.sql
	--
	-- Log into admin account and create a test user as follows
	--
	create user adwu1 identified by "1qazXSW@3edc";

	grant ALTER SESSION to adwu1;
	grant CREATE TABLE to adwu1;
	grant CREATE VIEW to adwu1;
	grant CREATE SESSION to adwu1;
	--
	grant select on v$session to adwu1;
	grant select on v$sql_plan to adwu1;
	grant select on v$sql to adwu1;

	SQL>



	++++++++++++++++++++++++++++++++++++++

	create user adwu1 identified by oracle
	Error report -
	ORA-28003: password verification for the specified password failed
	ORA-20000: password length less than 12 bytes
	28003. 00000 -  "password verification for the specified password failed"
	*Cause:    The new password did not meet the necessary complexity
			   specifications and the password_verify_function failed
	*Action:   Enter a different password. Contact the DBA to know the rules for
			   choosing the new password
	++++++++++++++++++++++++++++++++++++++



	SQL> @user.sql

	User ADWU1 created.


	Grant succeeded.


	Grant succeeded.


	Grant succeeded.


	Grant succeeded.


	Grant succeeded.


	Grant succeeded.


	Grant succeeded.

	SQL>


	SQL> set timing on
	SQL> @test_load.sql
	SQL>
	SQL> spool test_load
	SQL>
	SQL> drop table fact1 purge;

	Error starting at line : 18 File @ /home/opc/practise/oracle-db-examples/optimizer/autonomous/stats_on_load/test_load.sql
	In command -
	drop table fact1 purge
	Error report -
	ORA-00942: table or view does not exist
	00942. 00000 -  "table or view does not exist"
	*Cause:
	*Action:
	Elapsed: 00:00:00.020
	SQL> drop table fact1_source purge;

	Error starting at line : 19 File @ /home/opc/practise/oracle-db-examples/optimizer/autonomous/stats_on_load/test_load.sql
	In command -
	drop table fact1_source purge
	Error report -
	ORA-00942: table or view does not exist
	00942. 00000 -  "table or view does not exist"
	*Cause:
	*Action:
	Elapsed: 00:00:00.016
	SQL>
	SQL> create table fact1 (num0 number(10), num1 number(10), txt1 varchar2(100));

	Table FACT1 created.

	Elapsed: 00:00:00.036
	SQL>
	SQL> create table fact1_source as
	  2  select * from fact1 where 1=-1;

	Table FACT1_SOURCE created.

	Elapsed: 00:00:00.160
	SQL>
	SQL> insert /*+ APPEND */ into fact1_source
	  2  select rownum,mod(rownum,10),'XXX'||rownum
	  3  from   dual connect by rownum <= 10000;

	10,000 rows inserted.

	Elapsed: 00:00:01.779
	SQL>
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.292
	SQL>
	SQL> --
	SQL> -- Notice that NUM_ROWS is maintained on initial load - and this
	SQL> -- has been available since 12c.
	SQL> --
	SQL> select table_name,num_rows from user_tables where  table_name = 'FACT1_SOURCE';

	TABLE_NAME                       NUM_ROWS
	------------------------------ ----------
	FACT1_SOURCE                        10000

	Elapsed: 00:00:00.090
	SQL>
	SQL> pause p...
	p...


	SQL>
	SQL> --
	SQL> -- Insert rows into FACT1
	SQL> --
	SQL> insert /*+ APPEND */ into fact1 select num0,1,txt1 from fact1_source;

	10,000 rows inserted.

	Elapsed: 00:00:01.132
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.035
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                               10000       10000 NO

	Elapsed: 00:00:00.177
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                       10000 HYBRID
	FACT1                          NUM0                           C102                           C302                                 10000 HYBRID
	FACT1                          NUM1                           C102                           C102                                 10000 FREQUENCY

	Elapsed: 00:00:00.193
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2       5500

	Elapsed: 00:00:00.094
	Elapsed: 00:00:00.095
	SQL>
	SQL> -- Notice above that statistics are created.
	SQL> -- Histograms have been created too.
	SQL> pause p...
	p...


	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,2,txt1 from fact1_source;

	10,000 rows inserted.

	Elapsed: 00:00:00.889
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.058
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                               20000       20000 NO

	Elapsed: 00:00:00.095
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                       20000 HYBRID
	FACT1                          NUM0                           C102                           C302                                 20000 HYBRID
	FACT1                          NUM1                           C102                           C103                                 20000 FREQUENCY

	Elapsed: 00:00:00.010
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000

	Elapsed: 00:00:00.005
	Elapsed: 00:00:00.006
	SQL>
	SQL> -- Notice above that the stats have been updated.
	SQL> -- Histograms have been maintained too.
	SQL> -- ADWC will maintain statistics even if the target
	SQL> -- table in not empty before the load!
	SQL> pause p...
	p...


	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,3,txt1 from fact1_source;

	10,000 rows inserted.

	Elapsed: 00:00:00.173
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.032
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                               30000       30000 NO

	Elapsed: 00:00:00.015
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                       30000 HYBRID
	FACT1                          NUM0                           C102                           C302                                 30000 HYBRID
	FACT1                          NUM1                           C102                           C104                                 30000 FREQUENCY

	Elapsed: 00:00:00.174
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000

	Elapsed: 00:00:00.005
	Elapsed: 00:00:00.005
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,4,txt1 from fact1_source;

	10,000 rows inserted.

	Elapsed: 00:00:00.307
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.032
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                               40000       40000 NO

	Elapsed: 00:00:00.016
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                       40000 HYBRID
	FACT1                          NUM0                           C102                           C302                                 40000 HYBRID
	FACT1                          NUM1                           C102                           C105                                 40000 FREQUENCY

	Elapsed: 00:00:00.009
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000

	Elapsed: 00:00:00.005
	Elapsed: 00:00:00.005
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,5,txt1 from fact1;

	40,000 rows inserted.

	Elapsed: 00:00:00.704
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.041
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                               80000       80000 NO

	Elapsed: 00:00:00.015
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                       80000 HYBRID
	FACT1                          NUM0                           C102                           C302                                 80000 HYBRID
	FACT1                          NUM1                           C102                           C106                                 80000 FREQUENCY

	Elapsed: 00:00:00.008
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000
	<=5                    1      40000

	Elapsed: 00:00:00.008
	Elapsed: 00:00:00.009
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,6,txt1 from fact1;

	80,000 rows inserted.

	Elapsed: 00:00:00.181
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.031
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                              160000      160000 NO

	Elapsed: 00:00:00.013
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                      160000 HYBRID
	FACT1                          NUM0                           C102                           C302                                160000 HYBRID
	FACT1                          NUM1                           C102                           C107                                160000 FREQUENCY

	Elapsed: 00:00:00.008
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000
	<=5                    1      40000
	<=6                    1      80000

	6 rows selected.

	Elapsed: 00:00:00.009
	Elapsed: 00:00:00.010
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,7,txt1 from fact1;

	160,000 rows inserted.

	Elapsed: 00:00:00.502
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.032
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                              320000      320000 NO

	Elapsed: 00:00:00.016
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                      320000 HYBRID
	FACT1                          NUM0                           C102                           C302                                320000 HYBRID
	FACT1                          NUM1                           C102                           C108                                320000 FREQUENCY

	Elapsed: 00:00:00.014
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000
	<=5                    1      40000
	<=6                    1      80000
	<=7                    1     160000

	7 rows selected.

	Elapsed: 00:00:00.013
	Elapsed: 00:00:00.013
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,8,txt1 from fact1;

	320,000 rows inserted.

	Elapsed: 00:00:00.680
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.032
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                              640000      640000 NO

	Elapsed: 00:00:00.018
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                      640000 HYBRID
	FACT1                          NUM0                           C102                           C302                                640000 HYBRID
	FACT1                          NUM1                           C102                           C109                                640000 FREQUENCY

	Elapsed: 00:00:00.012
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000
	<=5                    1      40000
	<=6                    1      80000
	<=7                    1     160000
	<=8                    1     320000

	8 rows selected.

	Elapsed: 00:00:00.012
	Elapsed: 00:00:00.012
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,9,txt1 from fact1;

	640,000 rows inserted.

	Elapsed: 00:00:00.624
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.034
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                             1280000     1280000 NO

	Elapsed: 00:00:00.015
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                     1280000 HYBRID
	FACT1                          NUM0                           C102                           C302                               1280000 HYBRID
	FACT1                          NUM1                           C102                           C10A                               1280000 FREQUENCY

	Elapsed: 00:00:00.008
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000
	<=5                    1      40000
	<=6                    1      80000
	<=7                    1     160000
	<=8                    1     320000
	<=9                    1     640000

	9 rows selected.

	Elapsed: 00:00:00.014
	Elapsed: 00:00:00.014
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,10,txt1 from fact1;

	1,280,000 rows inserted.

	Elapsed: 00:00:01.219
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.034
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                             2560000     2560000 NO

	Elapsed: 00:00:00.018
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                     2560000 HYBRID
	FACT1                          NUM0                           C102                           C302                               2560000 HYBRID
	FACT1                          NUM1                           C102                           C10B                               2560000 FREQUENCY

	Elapsed: 00:00:00.008
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000
	<=5                    1      40000
	<=6                    1      80000
	<=7                    1     160000
	<=8                    1     320000
	<=9                    1     640000
	<=10                   1    1280000

	10 rows selected.

	Elapsed: 00:00:00.008
	Elapsed: 00:00:00.008
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,11,txt1 from fact1;

	2,560,000 rows inserted.

	Elapsed: 00:00:01.422
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.032
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                             5120000     5120000 NO

	Elapsed: 00:00:00.018
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                     5120000 HYBRID
	FACT1                          NUM0                           C102                           C302                               5120000 HYBRID
	FACT1                          NUM1                           C102                           C10C                               5120000 FREQUENCY

	Elapsed: 00:00:00.006
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000
	<=5                    1      40000
	<=6                    1      80000
	<=7                    1     160000
	<=8                    1     320000
	<=9                    1     640000
	<=10                   1    1280000
	<=11                   1    2560000

	11 rows selected.

	Elapsed: 00:00:00.012
	Elapsed: 00:00:00.012
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,12,txt1 from fact1;

	5,120,000 rows inserted.

	Elapsed: 00:00:03.044
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.033
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                            10240000    10240000 NO

	Elapsed: 00:00:00.020
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                    10240000 HYBRID
	FACT1                          NUM0                           C102                           C302                              10240000 HYBRID
	FACT1                          NUM1                           C102                           C10D                              10240000 FREQUENCY

	Elapsed: 00:00:00.011
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000
	<=5                    1      40000
	<=6                    1      80000
	<=7                    1     160000
	<=8                    1     320000
	<=9                    1     640000
	<=10                   1    1280000
	<=11                   1    2560000
	<=12                   1    5120000

	12 rows selected.

	Elapsed: 00:00:00.011
	Elapsed: 00:00:00.012
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,13,txt1 from fact1;

	10,240,000 rows inserted.

	Elapsed: 00:00:06.306
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.040
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                            20480000    20480000 NO

	Elapsed: 00:00:00.018
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                    20480000 HYBRID
	FACT1                          NUM0                           C102                           C302                              20480000 HYBRID
	FACT1                          NUM1                           C102                           C10E                              20480000 FREQUENCY

	Elapsed: 00:00:00.013
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000
	<=5                    1      40000
	<=6                    1      80000
	<=7                    1     160000
	<=8                    1     320000
	<=9                    1     640000
	<=10                   1    1280000
	<=11                   1    2560000
	<=12                   1    5120000
	<=13                   1   10240000

	13 rows selected.

	Elapsed: 00:00:00.026
	Elapsed: 00:00:00.027
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,14,txt1 from fact1;

	20,480,000 rows inserted.

	Elapsed: 00:00:10.988
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.044
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                            40960000    40960000 NO

	Elapsed: 00:00:00.016
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                    40960000 HYBRID
	FACT1                          NUM0                           C102                           C302                              40960000 HYBRID
	FACT1                          NUM1                           C102                           C10F                              40960000 FREQUENCY

	Elapsed: 00:00:00.010
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000
	<=5                    1      40000
	<=6                    1      80000
	<=7                    1     160000
	<=8                    1     320000
	<=9                    1     640000
	<=10                   1    1280000
	<=11                   1    2560000
	<=12                   1    5120000
	<=13                   1   10240000
	<=14                   1   20480000

	14 rows selected.

	14 rows selected.

	Elapsed: 00:00:00.012
	Elapsed: 00:00:00.012
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,15,txt1 from fact1;

	40,960,000 rows inserted.

	Elapsed: 00:01:57.679
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.039
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                            81920000    81920000 NO

	Elapsed: 00:00:00.020
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                    81920000 HYBRID
	FACT1                          NUM0                           C102                           C302                              81920000 HYBRID
	FACT1                          NUM1                           C102                           C110                              81920000 FREQUENCY

	Elapsed: 00:00:00.012
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000
	<=5                    1      40000
	<=6                    1      80000
	<=7                    1     160000
	<=8                    1     320000
	<=9                    1     640000
	<=10                   1    1280000
	<=11                   1    2560000
	<=12                   1    5120000
	<=13                   1   10240000
	<=14                   1   20480000
	<=15                   1   40960000

	15 rows selected.

	Elapsed: 00:00:00.012
	Elapsed: 00:00:00.013
	SQL>
	SQL> insert /*+ APPEND */ into fact1 select num0,16,txt1 from fact1;

	81,920,000 rows inserted.

	Elapsed: 00:00:38.097
	SQL> commit;

	Commit complete.

	Elapsed: 00:00:00.041
	SQL> @stat
	SQL> --
	SQL> -- Show statistics for FACT1
	SQL> --
	SQL> -- The histogram query is by Tim Hall: https://oracle-base.com/articles/12c/histograms-enhancements-12cr1
	SQL> --
	SQL> select table_name,num_rows,sample_size,stale_stats from user_tab_statistics where  table_name = 'FACT1';

	TABLE_NAME                       NUM_ROWS SAMPLE_SIZE STALE_S
	------------------------------ ---------- ----------- -------
	FACT1                           163840000   163840000 NO

	Elapsed: 00:00:00.021
	SQL>
	SQL> select table_name,column_name,low_value,high_value,sample_size,histogram from user_tab_col_statistics where table_name = 'FACT1';

	TABLE_NAME                     COLUMN_NAME                    LOW_VALUE                      HIGH_VALUE                     SAMPLE_SIZE HISTOGRAM
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ----------- ---------------
	FACT1                          TXT1                           58585831                       58585839393939                   163840000 HYBRID
	FACT1                          NUM0                           C102                           C302                             163840000 HYBRID
	FACT1                          NUM1                           C102                           C111                             163840000 FREQUENCY

	Elapsed: 00:00:00.010
	SQL>
	SQL> SELECT '<=' || endpoint_value AS range,
	  2         endpoint_value - (LAG(endpoint_value, 1, -1) OVER (ORDER BY endpoint_value)+1) + 1 AS vals_in_range,
	  3         endpoint_number - LAG(endpoint_number, 1, 0) OVER (ORDER BY endpoint_value) AS frequency
	  4  FROM   user_tab_histograms
	  5  WHERE  table_name  = 'FACT1'
	  6  AND    column_name = 'NUM1'
	  7  ORDER BY endpoint_value;

	RANGE      VALS_IN_RANGE  FREQUENCY
	---------- ------------- ----------
	<=1                    2      10000
	<=2                    1      10000
	<=3                    1      10000
	<=4                    1      10000
	<=5                    1      40000
	<=6                    1      80000
	<=7                    1     160000
	<=8                    1     320000
	<=9                    1     640000
	<=10                   1    1280000
	<=11                   1    2560000
	<=12                   1    5120000
	<=13                   1   10240000
	<=14                   1   20480000
	<=15                   1   40960000
	<=16                   1   81920000

	16 rows selected.

	Elapsed: 00:00:00.010
	Elapsed: 00:00:00.010
	SQL> spool off
	Elapsed: 00:00:00.013
	SQL>





	
Have a good work&life! 2019/03 via LinHong



