---
layout: post
title: "Oracle 12c pdbseed Tips"
category: Oracle
tags: Oracle 12c
---

* content
{:toc}



Oracle 12c pdbseed Tips







Oracle 12c 的 pdb$seed，默认打开模式为read only
如果要修改pdb$seed的状态，则需在当前会话修改"_oracle_scripts"为true


	SYS@PRODCDB1> show pdbs

		CON_ID CON_NAME                       OPEN MODE  RESTRICTED
	---------- ------------------------------ ---------- ----------
			 2 PDB$SEED                       READ ONLY  NO
			 3 PDB1                           READ WRITE NO
	SYS@PRODCDB1> alter session set "_oracle_script"=true;

	Session altered.

	SYS@PRODCDB1> alter pluggable database pdb$seed close immediate;

	Pluggable database altered.

	SYS@PRODCDB1> show pdbs

		CON_ID CON_NAME                       OPEN MODE  RESTRICTED
	---------- ------------------------------ ---------- ----------
			 2 PDB$SEED                       MOUNTED
			 3 PDB1                           READ WRITE NO
	SYS@PRODCDB1> alter pluggable database pdb$seed open;

	Pluggable database altered.
	SYS@PRODCDB1> show pdbs;

		CON_ID CON_NAME                       OPEN MODE  RESTRICTED
	---------- ------------------------------ ---------- ----------
			 2 PDB$SEED                       READ WRITE NO
			 3 PDB1                           READ WRITE NO
	SYS@PRODCDB1> 
	SYS@PRODCDB1> create table tab01 (col1 varchar2(10));

	Table created.

	SYS@PRODCDB1> insert into tab01 values('aaaa');

	1 row created.

	SYS@PRODCDB1> commit;

	Commit complete.

	SYS@PRODCDB1> select * from tab01;

	COL1
	----------
	aaaa

	SYS@PRODCDB1> 
	SYS@PRODCDB1> alter pluggable database pdb$seed close immediate;

	Pluggable database altered.

	SYS@PRODCDB1> 
	SYS@PRODCDB1> alter pluggable database pdb$seed open read only;

	Pluggable database altered.

	SYS@PRODCDB1> 




To be continue....

Have a good life! 2018/07 via LinHong


