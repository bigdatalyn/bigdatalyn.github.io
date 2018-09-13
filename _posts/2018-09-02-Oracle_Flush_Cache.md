---
layout: post
title: "Oracle Flush cache Tips"
category: Oracle
tags: Oracle ADWC
---

* content
{:toc}


Flush Shared pool & Buffer Cache in Oracle


Clear all objects and items from shared pool and buffer cache by running following commands:











#### For single instances:

	alter system flush buffer_cache;

	alter system flush shared_pool;

#### For RAC Environment:

	alter system flush buffer_cache global;

	alter system flush shared_pool global;

#### Check the Buffer Cache cleared:

-- For all buffer cache is empty
	select * from v$bh where status != 'free';

-- For particular file or block such as particular row: (RAC Environment)
	select inst_id,file#,block#,status,dirty from gv$bh where file# = 1 and block# = 101736 and status != 'free' order by inst_id,status;

-- For Single instance for specific user
	select o.OBJECT_TYPE, substr(o.OBJECT_NAME,1,10) objname , b.objd , b.status, count(b.objd) from v$bh b, dba_objects o where b.objd = o.data_object_id and o.owner = 'SCOTT' group by o.object_type, o.object_name,b.objd, b.status ;

Note: Find out in which file and block our table record is located:

	select name,num ,dbms_rowid.rowid_relative_fno(rowid) fileno, dbms_rowid.rowid_block_number(rowid) block_no from t1 where name='RAM';
	
	
	
To be continue....

Have a good life! 2018/09 via LinHong



