


Exadata statistics are only available when AWR report generated in html format (Doc ID 2509783.1)

```
This is because the Exadata sections are wide and contain a lot of data,
while the text version of the AWR report is restricted to a width of 80 characters.
We intentionally do not show Exadata stats in the text report.
The text version of AWR report contains following comment after 12.1.0.2.13 DBBP.
```




AWR Output Truncated Due To Large SQL Text (Doc ID 2908860.1)	


Symptoms

```
AWR is generated incomplete due to large SQL text.
```

Cause

```
Output Buffer too small to hold the full report output
```

Solution

Increasing the SQL*Plus long variable helps.

Please use the following for an AWR with HTML format, increasing the long variable size.
-- To generate awr in html format

```
set heading off
set feedback off
set trimspool on
set linesize 8000
set long 30000000
set longchunksize 32767
spool awr_report1.html
select output from table(dbms_workload_repository.awr_report_html(&DBID ,&Instance_Number, &Begin_snap_id, &end_snap_id));
spool off
```

- Note: LONG limit is 2,000,000,000 bytes.