---
layout: post
title: "[转]Using RMAN Incremental Backups to Refresh Standby Database"
category: Oracle
tags: Datagurad Oracle 
---

* content
{:toc}

Mark

[Using RMAN Incremental Backups to Refresh Standby Database](http://oracleinaction.com/using-rman-incremental-backups-refresh-standby-database/)



1-The standby database is considerably lagging behind the primary . The copying and applying of archive logs from primary will be time consuming as it will apply both the COMMITED and the NON COMMITED transactions then will ROLLBACK the non committed transactions. Incremental backup will recover the standby database much faster than applying the archives as it will apply only the COMMITED transactions on the standby database .

2-Some archivelogs on the primary which have not been applied to the standby have been lost. In such cases, you can create an incremental backup of the primary database containing changes since the standby database was last refreshed. This incremental backup can be applied to the standby database to synchronize it with a primary database.

Overview:

    Stop redo transport on primary
    Switch logs on primary – results in some archived logs on primary which have not been sent to standby
    Rename newly generated archived logs on primary to simulate their loss
    Restart redo transport – gives error as gap cannot be resolved due to missing logs
    Create a control file for standby database on primary
    Take incremental backup on primary starting from the SCN# of standby database
    Copy the incremental backup to the standby host and catalog it with RMAN
    Mount the standby database with newly created standby control file
    Cancel managed recovery of standby database and apply incremental backup to the standby database
    Start managed recovery of standby database





<p>Using RMAN Incremental Backups to Refresh Standby Database<br>
<iframe id="ocm exam" src="http://oracleinaction.com/using-rman-incremental-backups-refresh-standby-database/" width="800" height="800"></iframe></p>
<p>&nbsp;</p>









