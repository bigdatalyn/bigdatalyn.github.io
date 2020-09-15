---
layout: post
title: "Oracle Create PDB Tips"
category: Oracle
tags: Oracle PDB Tips
---

* content
{:toc}

Oracle Create PDB Tips


### Create pluggable nologging option

Using nologging to reduce the time of creating pdb.

```
21:48:29 SYS@PRODCDB> @1.sql
21:48:30 SYS@PRODCDB> create pluggable database pdbprod3 from pdbprod1 file_name_convert=('PDBPROD1','PDBPROD3') nologging;

Pluggable database created.

21:49:00 SYS@PRODCDB> 
21:49:18 SYS@PRODCDB> @2.sql
21:49:18 SYS@PRODCDB> create pluggable database pdbprod6 from pdbprod1 file_name_convert=('PDBPROD1','PDBPROD6');

Pluggable database created.

21:50:02 SYS@PRODCDB> 
```

```
nologging: 30 seconds
logging  : 34 seconds
```

#### Reference

```
Create Pluggable database PDB Tips
Administrator's Guide 
--> 38 Creating and Removing PDBs with SQL*Plus 
--> Creating a PDB by Cloning an Existing PDB or Non-CDB
--> Cloning a Local PDB
```




Have a good work&life! 2020/09 via LinHong


