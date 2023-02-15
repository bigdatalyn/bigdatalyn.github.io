---
layout: post
title: "Oracle UNDO tablespace size Tips"
category: Oracle
tags: Oracle scripts Tips
---

* content
{:toc}

Oracle UNDO tablespace size Tips





### scripts

Scripts

```
SELECT a.tablespace_name,
       SIZEMB,
       USAGEMB,
       (SIZEMB - USAGEMB) FREEMB, (sizemb-(sizemb-usagemb))/sizemb*100 PERCENT_USED
  FROM (  SELECT SUM (bytes) / 1024 / 1024 SIZEMB, b.tablespace_name
            FROM dba_data_files a, dba_tablespaces b
           WHERE a.tablespace_name = b.tablespace_name AND b.contents = 'UNDO'
        GROUP BY b.tablespace_name) a,
       (  SELECT c.tablespace_name, SUM (bytes) / 1024 / 1024 USAGEMB
            FROM DBA_UNDO_EXTENTS c
           WHERE status <> 'EXPIRED'
        GROUP BY c.tablespace_name) b   
 WHERE a.tablespace_name = b.tablespace_name; 
```

![Oracle_undo_size]({{ "/files/Oracle/23c/undo_size.png"}})	



### Reference

Have a good work&life! 2023/02 via LinHong


