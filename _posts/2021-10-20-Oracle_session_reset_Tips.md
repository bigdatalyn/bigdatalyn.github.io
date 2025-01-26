---
layout: post
title: "Oracle session reset parameter Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle session reset parameter Tips









### session reset parameter ORA-00922/ORA-03001

11g:
```sql
SYS@orcl> alter session reset "_small_table_threshold";
alter session reset "_small_table_threshold"
              *
ERROR at line 1:
ORA-00922: missing or invalid option

SYS@orcl> 
```

12c/19c:
```sql
HONG@pdb1> alter session reset "_small_table_threshold";
ERROR:
ORA-03001: unimplemented feature

HONG@pdb1> 
```

12.2 database, alter session reset failed with ORA-03001. 
(alter system reset didn't run into this problem).

Fix:
```
Run alter session set to revert init parameter value back
```

### Reference

```
12.2 Alter Session Reset Failed With ORA-03001: unimplemented feature (Doc ID 2548082.1)	

```

Have a good work&life! 2021/10 via LinHong

