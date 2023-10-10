---
layout: post
title: "Oracle CONTROL_FILE_RECORD_KEEP_TIME Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle CONTROL_FILE_RECORD_KEEP_TIME Tips

CONTROL_FILE_RECORD_KEEP_TIME

[CONTROL_FILE_RECORD_KEEP_TIME](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/CONTROL_FILE_RECORD_KEEP_TIME.html) specifies the minimum number of days before a reusable record in the control file can be reused.

Note:This parameter applies only to records in the control file that are circularly reusable (such as archive log records and various backup records). It does not apply to records such as data file, tablespace, and redo thread records, which are never reused unless the corresponding object is dropped from the tablespace.







### CONTROL_FILE_RECORD_KEEP_TIME

RMAN backup keeps the backup metadata information in the reusable section of the controlfile. It depends on the parameter CONTROL_FILE_RECORD_KEEP_TIME. CONTROL_FILE_RECORD_KEEP_TIME specifies the minimum number of days before a reusable record in the control file can be reused. In the event a new record needs to be added to a reusable section and there is not enough space then it will delete the oldest record, which are aged enough.

Backup retention policy is the rule to set regarding which backups must be retained (whether on disk or other backup media) to meet the recovery and other requirements.

If the CONTROL_FILE_RECORD_KEEP_TIME is less than the retention policy then it may overwrite the RMAN metadata in the reusable records prior to obsoleting them.  Without the metadata RMAN cannot delete the backups.  Therefor it is recommended that the CONTROL_FILE_RECORD_KEEP_TIME should be set to value higher than the retention policy configuration.   

Please note the default control_file_record_keep_time is 7 days.

```
NOTE:  Best practice is to NOT set  to a value greater than 10.    If you need retention greater than this in the controlfile, you should use an RMAN catalog .  

Bigger values, will hold data for more time, But will also have bigger the size of the controlfile, which in turn can cause performance issue are more entries from controlfile need to be read. 

The exception is when using Database in the Oracle Cloud,  control_file_record_keep_time  default value after enable backup is 40 without using Recovery Catalog

Typically control_file_record_keep_time is by default set to higher value in cloud DB systems which is approved by database cloud engineering group.
```

Formula

CONTROL_FILE_RECORD_KEEP_TIME = retention period + level 0 backup interval + 1

For e.g.

e.q. level 0 backup once a week with retention policy of a recovery windows of 14 days then in this case the CONTROL_FILE_RECORD_KEEP_TIME should be 14+7+1=22

To be on safer side you can always add + 2 or 3 days to above formula.

Ideally its recommended to configure a recovery catalog so that information about the backups are present in recovery catalog even though the controlfile section gets reused based on the control_file_record_keep_time due to space pressure.

### Control file contents

Names of Reusable Sections:

```
 	ARCHIVED LOG                      BACKUP CORRUPTION
	BACKUP DATAFILE                   BACKUP PIECE
	BACKUP REDO LOG                   BACKUP SET
	COPY CORRUPTION                   DATAFILE COPY
	DELETED OBJECT                    LOGHISTORY
	OFFLINE RANGE           
```

### Referece

参考:

Relation between RMAN retention period and control_file_record_keep_time (Doc ID 397269.1)	


Have a good work&life! 2023/08 via LinHong


