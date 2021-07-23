

//// 大表创建索引的一些建议


create index idx_tabname_col1col2col3 on tabname(col1,col2,col3) 
tablespace tbs_name -- 指定表空间
online -- 用online是为了不影响其他dml
parallel 16 -- 大表索引创建用parallel 加速，另外注意，创建之后需要把索引并行消除掉 alter index xxx noparallel;
nologging -- 为了减少redo log的生成，但是如果有db恢复，需要重新rebuild下
invisible ;-- 在不知道此索引是否有效情况下，先invisible，减少现在执行事务是否有影响

如果online rebuild索引报错： ORA-08104
可以用dbms_repair.online_index_clean来清理

```sql
conn / as sysdba 
declare
isClean boolean; 
begin
 isClean := FALSE;
 while isClean=FALSE loop
 isClean := dbms_repair.online_index_clean(&object_id); dbms_lock.sleep(2);
 end loop; 
exception
when others then 
RAISE;
end;
/
```