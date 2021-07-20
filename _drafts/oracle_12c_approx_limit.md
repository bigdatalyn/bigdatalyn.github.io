


Changing APPROX_FOR_AGGREGATION parameter also changes approx_for_count_distinct and approx_for_percentile (Doc ID 2487300.1)	
BUG:29135618 - CHANGING APPROX_FOR_AGGREGATION DOES NOT SAVE THE CHANGES TO APPROX_FOR_COUNT_DISTINCT ON SPFILE


Connected to:
Oracle Database 12c Enterprise Edition Release 12.2.0.1.0 - 64bit Production

SQL> col Parameter for a40
col Value for a20
select a.ksppinm "Parameter",b.ksppstvl "Value"
from x$ksppi a, x$ksppcv b
SQL> where a.indx = b.indx
and (a.ksppinm in ('_optimizer_use_feedback','optimizer_features_enable')
or a.ksppinm like '%approx%');SQL> 2 3 4 5

Parameter Value
---------------------------------------- --------------------
optimizer_features_enable 12.2.0.1　★
_optimizer_use_feedback TRUE
_approx_cnt_distinct_gby_pushdown choose
_approx_cnt_distinct_optimization 0
approx_for_aggregation FALSE
approx_for_count_distinct FALSE
_approx_perc_sampling_err_rate 2
approx_for_percentile none　★
_approx_percentile_optimization 0

9 rows selected.

SQL> alter system set approx_for_percentile=ALL;

System altered.

SQL> select a.ksppinm "Parameter",b.ksppstvl "Value"
from x$ksppi a, x$ksppcv b
where a.indx = b.indx
and (a.ksppinm in ('_optimizer_use_feedback','optimizer_features_enable')
or a.ksppinm like '%approx%'); 2 3 4 5

Parameter Value
---------------------------------------- --------------------
optimizer_features_enable 12.2.0.1
_optimizer_use_feedback TRUE
_approx_cnt_distinct_gby_pushdown choose
_approx_cnt_distinct_optimization 0
approx_for_aggregation FALSE
approx_for_count_distinct FALSE
_approx_perc_sampling_err_rate 2
approx_for_percentile ALL　★
_approx_percentile_optimization 0

9 rows selected.

SQL> alter system set optimizer_features_enable='10.2.0.5';

System altered.

SQL> select a.ksppinm "Parameter",b.ksppstvl "Value"
from x$ksppi a, x$ksppcv b
where a.indx = b.indx
and (a.ksppinm in ('_optimizer_use_feedback','optimizer_features_enable')
or a.ksppinm like '%approx%'); 2 3 4 5

Parameter Value
---------------------------------------- --------------------
optimizer_features_enable 10.2.0.5　★
_optimizer_use_feedback FALSE
_approx_cnt_distinct_gby_pushdown choose
_approx_cnt_distinct_optimization 0
approx_for_aggregation FALSE
approx_for_count_distinct FALSE
_approx_perc_sampling_err_rate 2
approx_for_percentile ALL
_approx_percentile_optimization 0

9 rows selected.

SQL> startup force
ORA-32004: obsolete or deprecated parameter(s) specified for RDBMS instance
ORACLE instance started.

Total System Global Area 5368709120 bytes
Fixed Size 8789648 bytes
Variable Size 3489661296 bytes
Database Buffers 1610612736 bytes
Redo Buffers 259645440 bytes
Database mounted.
Database opened.
SQL> select a.ksppinm "Parameter",b.ksppstvl "Value"
from x$ksppi a, x$ksppcv b
where a.indx = b.indx
and (a.ksppinm in ('_optimizer_use_feedback','optimizer_features_enable')
or a.ksppinm like '%approx%'); 2 3 4 5

Parameter Value
---------------------------------------- --------------------
optimizer_features_enable 10.2.0.5　★
_optimizer_use_feedback FALSE
_approx_cnt_distinct_gby_pushdown choose
_approx_cnt_distinct_optimization 0
approx_for_aggregation FALSE
approx_for_count_distinct FALSE
_approx_perc_sampling_err_rate 2
approx_for_percentile ALL　★
_approx_percentile_optimization 0

9 rows selected.

SQL> alter system set optimizer_features_enable='12.2.0.1';

System altered.

SQL> startup force
ORA-32004: obsolete or deprecated parameter(s) specified for RDBMS instance
ORACLE instance started.

Total System Global Area 5368709120 bytes
Fixed Size 8789648 bytes
Variable Size 3489661296 bytes
Database Buffers 1610612736 bytes
Redo Buffers 259645440 bytes
Database mounted.
Database opened.
SQL> select a.ksppinm "Parameter",b.ksppstvl "Value"
from x$ksppi a, x$ksppcv b
where a.indx = b.indx
and (a.ksppinm in ('_optimizer_use_feedback','optimizer_features_enable')
or a.ksppinm like '%approx%'); 2 3 4 5

Parameter Value
---------------------------------------- --------------------
optimizer_features_enable 12.2.0.1　★
_optimizer_use_feedback TRUE
_approx_cnt_distinct_gby_pushdown choose
_approx_cnt_distinct_optimization 0
approx_for_aggregation FALSE
approx_for_count_distinct FALSE
_approx_perc_sampling_err_rate 2
approx_for_percentile ALL　★
_approx_percentile_optimization 0

9 rows selected.



approx_for_percentile is NOT related with  optimizer_features_enable's change.