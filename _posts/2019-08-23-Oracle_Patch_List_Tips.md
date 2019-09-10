---
layout: post
title: "Oracle 19c Query the patch Tips"
category: Oracle
tags: Oracle Scripts SQL 19c
---

* content
{:toc}


Oracle 19c Query the patch Tips

Query the patch applied on database 19c.

```css
SYS@orcl> !cat patch_list.sql
set line 300
col action form a12
col version  form a40
col comments form a60
col action_date form a20

select comments, action, to_char(action_time,'DD/MM/RR HH24:MI:SS') action_date, version from registry$history order by action_date;

set line 300
col action form a12
col version  form a40
col description form a60
col action_date form a20
select description, action, to_char(action_time,'DD/MM/RR HH24:MI:SS') action_date, ' ' version from dba_registry_sqlpatch;

SYS@orcl>
```


















![Oracle_Patch_list]({{ "/files/Oracle/19c/Oracle_Patch_list.png"}})




Have a good work&life! 2019/08 via LinHong




