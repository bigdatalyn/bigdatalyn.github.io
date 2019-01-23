break on year skip 1
set pagesize 999
col name format a10
col cdb$name format a10
col con$name format a15
compute sum label "Yearly Revenue" of revenue on year
--
select sum(a.revenue) revenue, a.year, a.region, con$name, cdb$name
from containers(sales_data) a
group by a.year, a.region, a.con_id, con$name, cdb$name
order by con$name,a.year,a.region
/
