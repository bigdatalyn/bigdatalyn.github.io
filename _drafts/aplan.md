
aplans.sql


set lines 1000
col ID for 9999
col Operation for a60
col Name for a20
col Pstart for a13
col Pstop for a13
col A-Time for 9,990.00
col A-Rows for 999,999,999,990
col E-Rows for 999,999,999,990
col Starts for 999,999,999,990
-- Output 
select
 ID
,"Operation"
,"Name"
,"Starts"
,"E-Rows"
,"A-Rows"
,"A-Time"
,"Buffers"
,"Reads"
,"Writes"
,"Srch Cols"
,"Pstart"
,"Pstop"
,"PartID"
from
(
  select
   rownum NO
  ,ID
  ,lpad(' ',DEPTH) || OPERATION ||' '|| OPTIONS "Operation"
  ,OBJECT_NAME "Name"
  ,LAST_STARTS "Starts"
  ,nvl(CARDINALITY,1) * LAST_STARTS "E-Rows" -- E-Rows
  ,LAST_OUTPUT_ROWS "A-Rows"                 -- A-Rows
  ,LAST_ELAPSED_TIME/1000000 "A-Time"
  ,LAST_CR_BUFFER_GETS "Buffers"
  ,LAST_DISK_READS "Reads"
  ,LAST_DISK_WRITES "Writes"
  ,SEARCH_COLUMNS "Srch Cols"
  --,COST
  ,PARTITION_START "Pstart"
  ,PARTITION_STOP "Pstop"
  ,PARTITION_ID "PartID"
  from
  (
    select a.* from
     V$SQL_PLAN_STATISTICS_ALL a
    where a.SQL_ID    = '&1'
    and   a.TIMESTAMP = (select max(b.TIMESTAMP) from V$SQL_PLAN_STATISTICS_ALL b where b.SQL_ID = a.SQL_ID)
  )
  start with PARENT_ID is null
  connect by prior ID = PARENT_ID
  order siblings by ID desc
)
order by NO desc
;
