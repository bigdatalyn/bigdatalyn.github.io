---
layout: post
title: "Oracle 18c Private Temporary Table Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle 18c Private Temporary Table Tips


### Private Temporary Table

Private Temporary Table is Available from Oracle 18c. A temporary table holds data that exists only for the duration of a transaction or session. Also we cannot create a PTT as SYS and possibly with other privileged accounts. 

Private temporary tables are useful for dynamic reporting applications.
Memory-based temporary table that is dropped at the end of the session or transaction depending on the setup.


The document is [PRIVATE TEMPORARY TABLE](https://docs.oracle.com/en/database/oracle/oracle-database/18/sqlrf/CREATE-TABLE.html#GUID-F9CE0CC3-13AE-4744-A43C-EAC7A71AAAB6)









### Restrictions

Restrictions on Temporary Tables

	Temporary tables are subject to the following restrictions:

			Temporary tables cannot be partitioned, clustered, or index organized.

			You cannot specify any foreign key constraints on temporary tables.

			Temporary tables cannot contain columns of nested table.

			You cannot specify the following clauses of the LOB_storage_clause: TABLESPACE, storage_clause, or logging_clause.

			Parallel UPDATE, DELETE and MERGE are not supported for temporary tables.

			The only part of the segment_attributes_clause you can specify for a temporary table is TABLESPACE, which allows you to specify a single temporary tablespace.

			Distributed transactions are not supported for temporary tables.

			A temporary table cannot contain INVISIBLE columns.

Restrictions on Private Temporary Tables

	In addition to the general limitations of temporary tables, private temporary tables are subject to the following restrictions:

			The name of private temporary tables must always be prefixed with whatever is defined with the init.ora parameter PRIVATE_TEMP_TABLE_PREFIX. The default is ORA$PTT_.

			You cannot create indexes, materialized views, or zone maps on private temporary tables.

			You cannot define column with default values.

			You cannot reference private temporary tables in any permanent object, e.g. views or triggers.

			Private temporary tables are not visible through database links.

### Test
		
Creating a Private Temporary Table

Type: 

	Default Type: ON COMMIT DROP DEFINITION (the table should be dropped at the end of the transaction, or the end of the session.)

	ON COMMIT PRESERVE DEFINITION (the table and any data should persist beyond the end of the transaction. The table will be dropped at the end of the session.)

	Naming Rules： ORA$PTT_
	Visibility: Only in created table session
	DDL storage: Memory

View:
	DBA_PRIVATE_TEMP_TABLES,USER_PRIVATE_TEMP_TABLES

Sample:

[Oracle 18c- Private Temporary Tables](https://livesql.oracle.com/apex/livesql/file/content_GCBGQNP17WVI7SYYH906WZ0I9.html)

	
	
Have a good work&life! 2018/11 via LinHong



