---
layout: post
title: "Oracle 19c Automatic Indexing"
category: Oracle
tags: Tips 19c
---

* content
{:toc}



Oracle 19c Automatic Indexing




19C has a new feature database 19c is automatic indexing.

![AI]({{ "/files/Oracle/19c/automatic_index.png"}})


[Database Licensing Information User Manual](https://docs.oracle.com/en/database/oracle/oracle-database/19/dblic/Licensing-Information.html#GUID-0F9EB85D-4610-4EDF-89C2-4916A0E7AC87)

	[OnP] Automatic Indexing is supported by only Exadata(ODA can NOT be supported)

	It can be supported via SE in Cloud.

[21.7 Managing Auto Indexes](https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/managing-indexes.html)

	Automatic indexing is disabled by default in an Oracle database. 

	To enable automatic indexing, set the AUTO_IMPLEMENT_INDEXES initialization parameter to the Oracle database release number, 

	for example, 19.1. You can disable automatic indexing by setting the AUTO_IMPLEMENT_INDEXES initialization parameter to NONE.

![Method]({{ "/files/Oracle/19c/AI_Method.png"}})

Some parameters with Automatic Indexing and it can be executed by DBMS_AUTO_INDEX package

	SQL> EXEC DBMS_AUTO_INDEX.CONFIGURE('AUTO_INDEX_DEFAULT_TABLESPACE','INDEX_TS');

![Parameter]({{ "/files/Oracle/19c/parameter.png"}})

Some other advisor:

	Index Advisor, Partition Advisor, In-Memory Advisor, etc.


Have a good work&life! 2019/02 via LinHong



