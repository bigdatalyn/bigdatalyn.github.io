set pagesi 999
select /*+monitor gather_plan_statistics*/
tim_lvl_member_id
, prd_lvl_member_id
, org_lvl_member_id
, cus_lvl_member_id
, dcs_lvl_member_id
, so_fcst_risk_value
, line_fill_count
, service_level
, fill_qty
, lateness
, net_fcst
, manual_dm
, indep_dem_qty
, revenue
, dmd_cnt
, so_by_sched_date
, so_value_by_sched_date
, so_by_rd
, so_value_by_rd
from (
with
pocd as (
  -- create all possible combinations of the keys
  -- from t_demands
  select prd_lvl_member_id,org_lvl_member_id,cus_lvl_member_id, dcs_lvl_member_id from
  (
  select inventory_item_id prd_lvl_member_id, organization_id org_lvl_member_id
  , nvl(customer_site_id,-1) cus_lvl_member_id
  , nvl(to_number(demand_class),-23453) dcs_lvl_member_id
  from "FUSION"."MSC_DEMANDS"
  where plan_id = 300100097467293
  )
  group by prd_lvl_member_id,org_lvl_member_id
  , cus_lvl_member_id, dcs_lvl_member_id
)
, dlist as (
  -- create a list of all possible julian dates in the interval
  -- plan_start_julian until plan_end_julian
  -- note that this uses excessive memory in the connect by
  -- if the list of dates is very long (say, more than 25 years)
  select rownum+2458487 tim_lvl_member_id from dual connect by rownum<=501
)
, reslist as (
  -- make the cartesian product between these two
  -- this basically drives the query, i.e. there is one result
  -- row in the query for each row in this cartesian product
  select /**/ tim_lvl_member_id, prd_lvl_member_id, org_lvl_member_id
  , cus_lvl_member_id, dcs_lvl_member_id from pocd, dlist
)
select res.tim_lvl_member_id
, res.prd_lvl_member_id
, res.org_lvl_member_id
, res.cus_lvl_member_id
, res.dcs_lvl_member_id
, dem.so_fcst_risk_value so_fcst_risk_value
, dem.line_fill_count line_fill_count
, dempeg.service_level service_level
, dempeg.fill_qty fill_qty
, dempeg.lateness lateness
, dem.net_fcst net_fcst
, dem.manual_dm manual_dm
, dem.indep_dem_qty indep_dem_qty
, dem.revenue revenue
, dem.dmd_cnt dmd_cnt
, dem.so_by_sched_date so_by_sched_date
, dem.so_value_by_sched_date so_value_by_sched_date
, demreqdate.so_by_rd so_by_rd
, demreqdate.so_value_by_rd so_value_by_rd
 from reslist res
left outer join (
select demands.inventory_item_id prd_lvl_member_id,
demands.organization_id org_lvl_member_id,
nvl(to_number(demands.demand_class),-23453) dcs_lvl_member_id,
nvl(demands.customer_site_id,-1) cus_lvl_member_id,
to_number(to_char(demands.using_assembly_demand_date,'J')) sdate
, sum(case when demands.origination_type in (1007, 1030, 1006, 1008, 1029)
then 1
else null end) dmd_cnt
, sum(case when
demands.origination_type in (1006, 1007, 1029, 1030)
 then demands.using_requirement_quantity else null end) indep_dem_qty
, sum(case when
demands.origination_type in (1006, 1007, 1008, 1029, 1030)
then fpg.hasfp
else null end)  line_fill_count
, sum(case when
demands.origination_type = 1008
and demands.using_requirement_quantity > 0
 then demands.using_requirement_quantity else null end) manual_dm
, sum(case when
demands.origination_type in (1007, 1029)
 then demands.using_requirement_quantity else null end) net_fcst
, sum(case when
demands.origination_type in (1006, 1007, 1008, 1029, 1030)
and demands.using_requirement_quantity > 0
then case when demands.origination_type in (1006, 1030)
and demands.selling_price > 0
then demands.using_requirement_quantity * demands.selling_price
else case when sit.list_price is null then 0 else
sit.list_price *  demands.using_requirement_quantity *
(1 - sit.average_discount/100) end
end
else null end)  revenue
, sum(case when demands.origination_type in ( 1030, 1006)
 and demands.using_requirement_quantity > 0
then demands.using_requirement_quantity
else null end) so_by_sched_date
, sum(case when
demands.origination_type in (1006, 1007, 1029, 1030)
and exd.demand_id is not null
then case when sit.list_price is null then 0 else
sit.list_price *  demands.using_requirement_quantity *
(1 - sit.average_discount/100) end
else null end)  so_fcst_risk_value
, sum(case when demands.origination_type in ( 1030, 1006)
 and demands.using_requirement_quantity > 0
then demands.using_requirement_quantity * demands.selling_price
else null end) so_value_by_sched_date
from "FUSION"."MSC_DEMANDS" demands
left outer join (select eee.demand_id, eee.plan_id, count(*) exc_count from
"FUSION"."MSC_EXCEPTION_DETAILS"
eee where eee.exception_type in (25,24,26, 27, 48)
group by eee.demand_id, eee.plan_id) exd
on demands.plan_id = exd.plan_id
and demands.demand_id = exd.demand_id
left outer join (select fff.demand_id, fff.plan_id
, max(case when fff.supply_date<=fff.demand_date then 1 else 0 end) hasfp
from
"FUSION"."MSC_FULL_PEGGING"
fff where fff.plan_id =300100097467293
group by fff.demand_id, fff.plan_id) fpg
on demands.plan_id = fpg.plan_id
and demands.demand_id = fpg.demand_id
left outer join "FUSION"."MSC_SYSTEM_ITEMS" sit
on demands.plan_id = sit.plan_id
and demands.inventory_item_id = sit.inventory_item_id
where demands.plan_id=300100097467293
 and demands.using_assembly_demand_date between to_date(2458488,'J') and to_date(2458988,'J')
group by to_number(to_char(demands.using_assembly_demand_date,'J')),
demands.inventory_item_id, demands.organization_id
, nvl(to_number(demands.demand_class),-23453), nvl(demands.customer_site_id,-1)
) dem
on res.tim_lvl_member_id = dem.sdate
and res.prd_lvl_member_id = dem.prd_lvl_member_id
and res.dcs_lvl_member_id = dem.dcs_lvl_member_id
and res.cus_lvl_member_id = dem.cus_lvl_member_id
and res.org_lvl_member_id = dem.org_lvl_member_id
left outer join (
select demands.inventory_item_id prd_lvl_member_id,
demands.organization_id org_lvl_member_id,
nvl(to_number(demands.demand_class),-23453) dcs_lvl_member_id,
nvl(demands.customer_site_id,-1) cus_lvl_member_id,
to_number(to_char(demands.using_assembly_demand_date,'J')) sdate
, sum(case when demands.origination_type in (1007, 1029, 1030, 1006, 1008)
then (case when dfpeg.supply_date<=demands.using_assembly_demand_date
then dfpeg.allocated_quantity
else null end)
else null end) fill_qty
, sum(case when demands.origination_type in (1007, 1029, 1030, 1006, 1008)
and dfpeg.supply_date >= dfpeg.demand_date
then case when demands.using_assembly_demand_date is not null
then dfpeg.allocated_quantity * (trunc(demands.dmd_satisfied_date) - trunc(demands.using_assembly_demand_date))
else dfpeg.allocated_quantity * (trunc(demands.dmd_satisfied_date) - trunc(plandef.plan_horizon_start_date)) end
else null end) lateness
, sum(case when demands.origination_type in (1007, 1029, 1030, 1006, 1008)
then (case when dfpeg.supply_date<=dfpeg.demand_date
then 100*dfpeg.allocated_quantity/demands.using_requirement_quantity
else 0 end)
else null end) service_level
from "FUSION"."MSC_DEMANDS" demands
left outer join "FUSION"."MSC_FULL_PEGGING" dfpeg
on demands.plan_id = dfpeg.plan_id
and demands.demand_id = dfpeg.demand_id
left outer join "FUSION"."MSC_PLAN_DEFINITIONS" plandef
on demands.plan_id = plandef.plan_id
where demands.plan_id=300100097467293
 and demands.using_assembly_demand_date between to_date(2458488,'J') and to_date(2458988,'J')
group by to_number(to_char(demands.using_assembly_demand_date,'J')),
demands.inventory_item_id, demands.organization_id
, nvl(to_number(demands.demand_class),-23453), nvl(demands.customer_site_id,-1)
) dempeg
on res.tim_lvl_member_id = dempeg.sdate
and res.prd_lvl_member_id = dempeg.prd_lvl_member_id
and res.dcs_lvl_member_id = dempeg.dcs_lvl_member_id
and res.cus_lvl_member_id = dempeg.cus_lvl_member_id
and res.org_lvl_member_id = dempeg.org_lvl_member_id
left outer join (
select demands.inventory_item_id prd_lvl_member_id,
demands.organization_id org_lvl_member_id,
nvl(to_number(demands.demand_class),-23453) dcs_lvl_member_id,
nvl(demands.customer_site_id,-1) cus_lvl_member_id,
to_number(to_char(demands.request_date,'J')) sdate
, sum(case when demands.origination_type in ( 1030, 1006)
 and demands.request_date IS NOT NULL
then demands.using_requirement_quantity
else null end) so_by_rd
, sum(case when demands.origination_type in ( 1030, 1006)
 and request_date IS NOT NULL
then demands.using_requirement_quantity * demands.selling_price
else null end) so_value_by_rd
from "FUSION"."MSC_DEMANDS" demands
where demands.plan_id=300100097467293
 and demands.request_date between to_date(2458488,'J') and to_date(2458988,'J')
group by to_number(to_char(demands.request_date,'J')),
demands.inventory_item_id, demands.organization_id
, nvl(to_number(demands.demand_class),-23453), nvl(demands.customer_site_id,-1)
) demreqdate
on res.tim_lvl_member_id = demreqdate.sdate
and res.prd_lvl_member_id = demreqdate.prd_lvl_member_id
and res.dcs_lvl_member_id = demreqdate.dcs_lvl_member_id
and res.cus_lvl_member_id = demreqdate.cus_lvl_member_id
and res.org_lvl_member_id = demreqdate.org_lvl_member_id
) where (
   so_fcst_risk_value is not null
or line_fill_count is not null
or service_level is not null
or fill_qty is not null
or lateness is not null
or net_fcst is not null
or manual_dm is not null
or indep_dem_qty is not null
or revenue is not null
or dmd_cnt is not null
or so_by_sched_date is not null
or so_value_by_sched_date is not null
or so_by_rd is not null
or so_value_by_rd is not null
)
/
