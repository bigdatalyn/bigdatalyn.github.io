column "Who am I?" format A120
select
     'DB Name: '  ||Sys_Context('Userenv', 'DB_Name')||
  ' / CDB?: '     ||case
                      when Sys_Context('Userenv', 'CDB_Name') is not null then 'YES'
                      else                                                     'NO'
                    end||
  ' / Auth-ID: '   ||Sys_Context('Userenv', 'Authenticated_Identity')||
  ' / Sessn-User: '||Sys_Context('Userenv', 'Session_User')||
  ' / Container: ' ||Nvl(Sys_Context('Userenv', 'Con_Name'), 'n/a')
   "Who am I?"
from Dual
/
