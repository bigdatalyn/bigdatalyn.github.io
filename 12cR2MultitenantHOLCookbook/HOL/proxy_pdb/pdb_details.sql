set echo off
col name format a15
col application_root_con_id format 999

select con_id, name, application_root, application_pdb, application_root_con_id
from v$containers;
