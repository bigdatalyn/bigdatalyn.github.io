---
layout: post
title: "Oracle ADWC Restrictions Tips"
category: Oracle
tags: Oracle ADWC
---

* content
{:toc}



Oracle ADWC Restrictions Tips











Oracle Autonomous Data Warehouse(ADWC)
	
	
[Restrictions for DB Options](https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/experienced-database-users.html#GUID-791E7112-07F7-46F0-BD81-777C8FAD83A0)

The following Oracle Database features are not available in Autonomous Data Warehouse:

    Oracle Real Application Testing
    Oracle Database Vault
    Oracle OLAP
    Oracle R capabilities of Oracle Advanced Analytics
    Oracle Spatial and Graph
    Oracle Industry Data Models
    Oracle Text
    Oracle Tuning Pack
    Oracle Database Lifecycle Management Pack
    Oracle Data Masking and Subsetting Pack
    Oracle Cloud Management Pack for Oracle Database
    Oracle Application Express
    Oracle Multimedia
    Java in DB
    Oracle XML DB
    Context
    Oracle Workspace Manager

Restrictions for SQL Commands

    ADMINISTER KEY MANAGEMENT
    ALTER INDEX
    ALTER INDEXTYPE
    ALTER MATERIALIZED VIEW
    ALTER MATERIALIZED VIEW LOG
    ALTER MATERIALIZED ZONEMAP
    ALTER PROFILE
    ALTER TABLESPACE
    CREATE DATABASE LINK
    CREATE INDEX
    CREATE INDEXTYPE
    CREATE MATERIALIZED VIEW
    CREATE MATERIALIZED VIEW LOG
    CREATE MATERIALIZED ZONEMAP
    CREATE TABLESPACE
    DROP INDEX
    DROP INDEXTYPE
    DROP MATERIALIZED VIEW
    DROP MATERIALIZED VIEW LOG
    DROP MATERIALIZED ZONEMAP
    DROP TABLESPACE


"Create index " is also limited in ADWC.
	
	
To be continue....

Have a good life! 2018/08 via LinHong


