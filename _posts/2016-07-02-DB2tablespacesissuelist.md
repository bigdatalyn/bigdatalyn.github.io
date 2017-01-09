---
layout: post
title: "[原创]DB2表空间问题集"
date:   2016-07-02 11:42:00
category: Shell
tags: DB2 Unix Shell
---

* content
{:toc}


DB2表空间问题集





[DB2 LUW] 表スペースがフルになった場合の解決方法

http://www-01.ibm.com/support/docview.wss?uid=swg21504142


[DB2 LUW] 表スペース・コンテナーに確保された領域を解放する方法

http://www.ibm.com/support/docview.wss?uid=swg21575040

IBM Lowering the High-Water Mark of a Tablespace - United States

http://www.ibm.com/support/docview.wss?uid=swg21006526




db2pd - Monitor and troubleshoot DB2 database command

Table space Autoresize Statistics:

http://www.ibm.com/support/knowledgecenter/SSEPGG_10.1.0/com.ibm.db2.luw.admin.cmd.doc/doc/r0011729.html#r0011729__pdtablespaces

Id
The table space ID.
AS
Indicates whether or not the table space is using automatic storage. The possible values are:

    Yes
    No

AR
Indicates whether or not the table space is enabled to be automatically resized. The possible values are:

    Yes
    No




db2 "alter STOGROUP IBMSTOGROUP ADD '/adfarchive5','/adfarchive6' "

ALTER STOGROUP statement in below link:

http://www.ibm.com/support/knowledgecenter/SSEPGG_10.5.0/com.ibm.db2.luw.sql.ref.doc/doc/r0058603.html






