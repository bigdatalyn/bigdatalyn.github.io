---
layout: post
title: "Oracle Calibrate IO Test Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle Calibrate IO Test Tips











### Oracle Calibrate IO 

```sql

SET SERVEROUTPUT ON
DECLARE
 lat  INTEGER;
 iops INTEGER;
 mbps INTEGER;
BEGIN
-- DBMS_RESOURCE_MANAGER.CALIBRATE_IO (<DISKS>, <MAX_LATENCY>, iops, mbps, lat);
  DBMS_RESOURCE_MANAGER.CALIBRATE_IO (2, 20, iops, mbps, lat);
 DBMS_OUTPUT.PUT_LINE ('max_iops = ' || iops);
 DBMS_OUTPUT.PUT_LINE ('latency  = ' || lat);
 dbms_output.put_line('max_mbps = ' || mbps);
end;
/

select start_time, max_iops, max_mbps, max_pmbps,latency,num_physical_disks from  DBA_RSRC_IO_CALIBRATE;

---- TEST

SYS@cdb1> SET SERVEROUTPUT ON
SYS@cdb1> DECLARE
  2   lat  INTEGER;
  3   iops INTEGER;
 mbps INTEGER;
  5  BEGIN
  6  -- DBMS_RESOURCE_MANAGER.CALIBRATE_IO (<DISKS>, <MAX_LATENCY>, iops, mbps, lat);
  7    DBMS_RESOURCE_MANAGER.CALIBRATE_IO (2, 20, iops, mbps, lat);
  8   DBMS_OUTPUT.PUT_LINE ('max_iops = ' || iops);
  9   DBMS_OUTPUT.PUT_LINE ('latency  = ' || lat);
 10   dbms_output.put_line('max_mbps = ' || mbps);
end;
 12  /
max_iops = 1829
latency  = .001
max_mbps = 367
max_iops = 1829
latency  = 0
max_mbps = 367

PL/SQL procedure successfully completed.

SYS@cdb1>

SYS@cdb1> select start_time, max_iops, max_mbps, max_pmbps,latency,num_physical_disks from  DBA_RSRC_IO_CALIBRATE;

START_TIME                    MAX_IOPS  MAX_MBPS  MAX_PMBPS      LATENCY  NUM_PHYSICAL_DISKS
---------------------------- --------- --------- ---------- ------------ -------------------
08-OCT-21 04.24.06.317964 PM      1829       367        346         .001                   2

SYS@cdb1> 
```


|Items | Type | Comments|
|---|---|---|
|num_physical_disks	| IN	| Approximate number of physical disks in the database storage|
|max_latency	| IN| 	Maximum tolerable latency in milliseconds for database-block-sized IO requests|
|max_iops | OUT	| Maximum number of I/O requests per second that can be sustained. The I/O requests|
|max_mbps	| OUT	| Maximum throughput of I/O that can be sustained, expressed in megabytes per second. The I/O requests are randomly-distributed, 1 megabyte reads.|
|actual_latency	| OUT| 	Average latency of database-block-sized I/O requests at max_iops rate, expressed in milliseconds|




Have a good work&life! 2021/09 via LinHong

