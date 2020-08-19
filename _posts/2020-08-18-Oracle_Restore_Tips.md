---
layout: post
title: "Oracle Restore Tips"
category: Oracle
tags: Oracle Restore Tips 
---

* content
{:toc}

Oracle Restore 11g/19c Tips



### RMAN command history

Met some case of restoring db from other host.(same platform)

RMAN commands Tips:

pfile -> controlfile -> restore db -> recover db

need to change some path for initorcl1.ora etc.

```sql
set decryption identified by "systempassword";
startup nomount pfile=/u01/app/oracle/product/11.2.0.4/dbhome_1/dbs/initorcl1.ora
set decryption identified by "systempassword";
restore controlfile from '/zfsfold/201912/c-XXXXX02'
;
exit
shutdown immediate;
startup nomount pfile=/u01/app/oracle/product/11.2.0.4/dbhome_1/dbs/initorcl1.ora
set decryption identified by "systempassword";
restore controlfile from '/zfsfold/201912/c-XXXXX02'
;

mount database;
catalog start with '/zfsfold/201912/';
YES
exit
run
{
configure device type disk parallelism 64;
sql 'alter system set "_backup_disk_bufcnt"=64 scope=memory';
sql 'alter system set "_backup_disk_bufsz"=1048576 scope=memory';
restore database;
}
recover database;
run {
configure device type disk parallelism 64;
set until scn 11111122222333;
set archivelog destination to '/zfsfold/temp/flash_recovery_area' ;
recover database;
}

run {
configure device type disk parallelism 64;
set until scn 11111122222333;
recover database;}
exit
```

Have a good work&life! 2020/08 via LinHong


