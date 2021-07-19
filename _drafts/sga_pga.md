SQL> startup nomount

SQL> create pfile='/tmp/cdbm061_20210312_1712.ora' from spfile;

File created.

SQL> alter system set sga_max_size = 48G scope=spfile sid='*';

System altered.

SQL> alter system set sga_target = 48G scope=spfile sid='*';

System altered.

SQL> shu immediate;


The initialization parameter PGA_AGGREGATE_LIMIT has been introduced since Oracle Database 12.1.0.1.

http://dbaparadise.com/2020/09/things-to-know-about-pga_aggregate_limit/

PGA_AGGREGATE_TARGET = soft limit => more memory can be allocated

PGA_AGGREGATE_LIMIT = hard limit => no more memory can be allocated.

https://www.vitalsofttech.com/limiting-pga-with-pga_aggregate_limit/

When the PGA_AGGREGATE_LIMIT value is over its limit, the sessions or processes using the most PGA memory will be terminated. The error below will be written to the alert log.

PGA memory used by the instance exceeds PGA_AGGREGATE_LIMIT of 3072 MB
Immediate Kill Session#: 41, Serial#: 397
Immediate Kill Session: sess: 0xc13a5066  OS pid: 5233

PGA_AGGREGATE_LIMIT is a dynamic parameter and its value can be changed during run time. The Database restart is not required.

PGA_AGGREGATE_LIMIT is a dynamic parameter and its value can be changed during run time. The Database restart is not required.
SQL> alter system set pga_aggregate_limit=4096M scope=both;
System Altered.
Now we can check verify the change.
SQL> show parameter pga_agg
NAME                 TYPE VALUE
-------------------- ----------- -------
pga_aggregate_limit  big integer 4G
However you cannot decrease the value of pga_aggregate _limit too much. If you try to set it to very low, you will receive the following error.
SQL> alter system set pga_aggregate_limit=100M scope=both;
alter system set pga_aggregate_limit=100M scope=both

*
ERROR at line 1:
ORA-02097: parameter cannot be modified specified value invalid
ORA-00093: pga_aggregate_limit must be between 1694M and 100000G

For DBA’s it is very important to be aware of the behavior when setting the this parameter. When working in 12c and sessions terminate, the DBA should look out for the effect of this parameter.






