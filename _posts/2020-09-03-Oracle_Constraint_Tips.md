---
layout: post
title: "Oracle Disable and Enable Constraint Tips"
category: Oracle
tags: Oracle Datapump Tips 
---

* content
{:toc}

Disable and Enable all Constraint









####  Disable Constraint

```sql
CREATE OR REPLACE PROCEDURE DISABLE_ALL_CONSTRAINT
IS
BEGIN
-- Disable foreign key constraint
for i IN (select table_name, constraint_name
from user_constraints
where constraint_type ='R'
and status = 'ENABLED')
loop
EXECUTE IMMEDIATE 'alter table ' ||i.table_name|| ' disable constraint ' ||i.constraint_name;
end loop i;

-- Disable rest of the constraint
for i IN (select table_name, constraint_name
from user_constraints
where status = 'ENABLED')
loop
EXECUTE IMMEDIATE 'alter table ' ||i.table_name|| ' disable constraint ' ||i.constraint_name;
end loop i;
END;
/

```

sql:

```
execute DISABLE_ALL_CONSTRAINT;
```


#### Enable Constraint

```sql
CREATE OR REPLACE PROCEDURE ENABLE_ALL_CONSTRAINT
IS
BEGIN
-- Enable all constraint except foreign key
for i IN (select table_name, constraint_name
from user_constraints
where status = 'DISABLED'
and constraint_type!='R'
)
loop
EXECUTE IMMEDIATE 'alter table ' ||i.table_name|| ' enable novalidate constraint ' ||i.constraint_name;
end loop i;

-- Enable foreign key constraint
for i IN (select table_name, constraint_name
from user_constraints
where constraint_type ='R'
and status = 'DISABLED')
loop
EXECUTE IMMEDIATE 'alter table ' ||i.table_name|| ' enable novalidate constraint ' ||i.constraint_name;
end loop i;
END;
/

```

sql

```
execute ENABLE_ALL_CONSTRAINT;
```

```
-- Disable Constraint
-- Disable foreign key
select 'alter table '||table_name||' disable constraint '||constraint_name||';'
from user_constraints
where constraint_type ='R'
and status = 'ENABLED';

-- Disable rest of the constraint
select 'alter table '||table_name||' disable constraint '||constraint_name||';'
from user_constraints
where status = 'ENABLED';


-- Enable Constraint
-- enable all constraint except foreign key
select 'alter table '||table_name||' enable novalidate constraint '||constraint_name||';'
from user_constraints
where constraint_type !='R'
and status = 'DISABLED';

-- Enable foreign key constraint
select 'alter table '||table_name||' enable novalidate constraint '||constraint_name||';'
from user_constraints
where constraint_type ='R'
and status = 'DISABLED';
```

### Reference


[Disable and Enable all Constraint](http://www.nazmulhuda.info/disable-and-enable-all-constrai)





Have a good work&life! 2020/09 via LinHong


