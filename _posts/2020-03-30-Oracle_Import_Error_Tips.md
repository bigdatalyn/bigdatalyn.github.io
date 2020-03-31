---
layout: post
title: "Oracle Import Error Hit Tips"
category: Oracle
tags: Oracle Import Tips 
---

* content
{:toc}

Oracle Import Error Hit Tips

Export dumpfile from Oracle db 12.2 and import dumpfile to Oracle 12.1.

There was the following errors in import command.

```shell
ORA-39126: KUPW$WORKER.MOVE_DATA [TABLE_DATA:"XXX"."YYYYYYY"]
ORA-39096: METHOD
ORA-06512: "SYS.DBMS_SYS_ERROR"
ORA-06512: "SYS.KUPW$WORKER",
```

Command eg.

Export command:

	expdp <user>/<password> SCHEMAS=<schema> DIRECTORY=<dir_dump>　DUMPFIE=<dump_file> LOGFILE=<logfile_12.1.log> VERSION=12.1

Import command:

	impdp <user>/<password> SCHEMAS=<schema> EXCLUDE=USER DIRECTORY=<dir_dump> DUMPFILE=<dump_file> EXCLUDE=STATISTICS LOGFILE=<logfile_12.2.log>


Reference:

Unable To Import Table Using DataPump Import (IMPDP) And Hitting ORA-39126 And ORA-39096 Errors (Doc ID 2193782.1)

```shell
To resolve the errors prior 12.2, apply Patch 20056333 and run post-installation step:

	1. Navigate to the <ORACLE_HOME>/OPatch directory:
	$ cd <ORACLE_HOME>/OPatch
	2. Install the SQL portion of the patch by running the following command:
	$ datapatch
```


Have a good work&life! 2020/03 via LinHong


