---
layout: post
title: "Oracle Backup commands Tips"
category: Oracle
tags: Oracle Backup commands
---

* content
{:toc}




Oracle Backup commands Tips

#### Archive log mode

archivelog mode

	SQL> archive log list
	SQL> shutdown immediate
	SQL> startup mount
	SQL> alter database archivelog;
	SQL> alter database open;









#### RMAN commands

Rman backup/configure/advise failure

	RMAN> backup database plus archivelog;
	RMAN> alter system set db_flashback_retention_target=4320;
	RMAN> alter database flashback on;
	RMAN> show all;
	RMAN> configure default device type to disk;
	RMAN> show default device type;
	RMAN> configure controlfile autobackup on;
	RMAN> show backup optimization;
	RMAN> configure retention policy to recovery window of 31 days;
	RMAN> show retention policy;
	RMAN> configure controlfile autobackup on;
	RMAN> show controlfile autobackup;
	RMAN> list backup summary;
	RMAN> list backup of datafile 3;
	RMAN> list failure;
	RMAN> advise failure;
	RMAN> repair failure;


Displaying Backup Information

	RMAN> list backup summary;

crosscheck all backup sets.

	RMAN> crosscheck backup;

delete expired backups from the RMAN repository.

	RMAN> delete expired backup;

obtain information about the Fast Recovery Area.

	SQL> select * from v$recovery_file_dest;
	SQL> select file_type, percent_space_used PCT_USED, percent_space_reclaimable PCT_RECLAIM, number_of_files NO_FILES from v$recovery_area_usage;

Flashback table

	SQL> alter table hr.regions enable row movement;
	SQL> select * from hr.regions;
	SQL> update hr.regions set region_name = 'ORACLE';
	SQL> select * from hr.regions;
	SQL> flashback table hr.regions to timestamp to_timestamp('2018-07-10 07:30:00', 'YYYY-MM-DD HH:MI:SS');

Flashback drop table

	SQL> flashback table hr.regions_hist to before drop;



To be continue....

Have a good life! 2018/07 via LinHong


