




COLUMN category FORMAT a10
COLUMN sql_text FORMAT a20
SELECT NAME,type, SQL_TEXT, CATEGORY, STATUS FROM DBA_SQL_PROFILES;

How to drop the sql Profile

BEGIN
DBMS_SQLTUNE.DROP_SQL_PROFILE (‘my_sql_profile’);
END;
/

How to disable the sql Profile

BEGIN
DBMS_SQLTUNE.ALTER_SQL_PROFILE(
name => 'my_sql_profile',
attribute_name => 'STATUS',
value => 'DISABLED');
END;
/


How to check the Sql profile content


SELECT CREATED, PROFILE_NAME, SQL_TEXT, 
extractvalue(VALUE(hint), '.') AS hint
FROM DBMSHSXP_SQL_PROFILE_ATTR h, DBA_SQL_PROFILES p, TABLE(xmlsequence(extract(xmltype(h.comp_data), '/outline_data/hint'))) hint
WHERE p.name = h.profile_name;


select hint as outline_hints
from (select p.name, p.signature, p.category, row_number()
over (partition by sd.signature, sd.category order by sd.signature) row_num,
extractValue(value(t), '/hint') hint
from sqlobj$data sd, dba_sql_profiles p,
table(xmlsequence(extract(xmltype(sd.comp_data),
'/outline_data/hint'))) t
where sd.obj_type = 1
and p.signature = sd.signature
and p.category = sd.category
and p.name like ('&&profile_name'))
order by row_num;


How to show Sql-id related to Oracle Sql profile

select distinct(s.sql_id) from dba_sql_profiles p,DBA_HIST_SQLSTAT s where p.name=s.sql_profile;

select distinct(s.sql_id) from dba_sql_profiles p, v$sql s where p.name=s.sql_profile;

How to check sql profile for sql id in oracle

select s.name, s.type, s.SQL_TEXT, s.CATEGORY, s.STATUS
from dba_sql_profiles s,DBA_HIST_SQLSTAT d
where s.name=d.sql_profile
and d.sql_id='&sqlid';


select s.name, s.type, s.SQL_TEXT, s.CATEGORY, s.STATUS
from dba_sql_profiles s,v$sql d
where s.name=d.sql_profile
and d.sql_id='&sqlid';


