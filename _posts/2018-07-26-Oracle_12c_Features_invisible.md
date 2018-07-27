---
layout: post
title: "Oracle 12c 新特性 invisible column Tips"
category: Oracle
tags: Oracle 12c
---

* content
{:toc}



Oracle 12c 新特性 invisible column Tips










不可见列： invisible

	HR@PDB1> create table tab_invisible(col1 varchar2(10),col2 number, col3 varchar2(10) invisible);
		Table created.
	HR@PDB1> desc tab_invisible
	 Name                                      Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 COL1                                               VARCHAR2(10)
	 COL2                                               NUMBER

	HR@PDB1> set colinvisible on
	HR@PDB1> desc tab_invisible
	 Name                                      Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 COL1                                               VARCHAR2(10)
	 COL2                                               NUMBER
	 COL3 (INVISIBLE)                                   VARCHAR2(10)

	HR@PDB1> 
	HR@PDB1> insert into tab_invisible values('aaaaa',1);
	1 row created.
	HR@PDB1>
	HR@PDB1> insert into tab_invisible values('aaaaa',1,'invisible');
	insert into tab_invisible values('aaaaa',1,'invisible')
			   *
	ERROR at line 1:
	ORA-00913: too many values
	HR@PDB1> 
	HR@PDB1> insert into tab_invisible(col1,col2,col3) values('aaaaa',1,'invisible');
	1 row created.
	HR@PDB1>

插入数据时候需要指定列名(不可见列)
通过 set colinvisible on/off 来查看 invisible的情况

	HR@PDB1> alter table tab_invisible modify (col3 visible);
	Table altered.
	HR@PDB1> desc tab_invisible;
	 Name                                      Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 COL1                                               VARCHAR2(10)
	 COL2                                               NUMBER
	 COL3                                               VARCHAR2(10)
	HR@PDB1> 





To be continue....

Have a good life! 2018/07 via LinHong


