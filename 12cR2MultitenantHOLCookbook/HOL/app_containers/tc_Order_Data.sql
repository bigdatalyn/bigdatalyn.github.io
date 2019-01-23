-- =========================================================================
--
--      File: tc_Order_Data.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/18/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Create orders for Terminally Chill's franchises.
--
-- Description:
--   Create franchise-specific orders for Terminally Chill's franchises.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Application Container installed with applicable PDBs.
--   - Application Root Terminal_Master.
--   - Application PDBs for Terminally Chill's franchises.
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

set verify off

prompt SQL> -- Orders for franchise &Franchise
prompt

declare
  v_Num_Orders    integer;
  v_Num_Items     integer;
  v_Item_Qty      integer;
  v_Order_ID      raw(16);
  v_Order_Date    date;
  v_Kiosk_Code    varchar2(30);
  v_Campaign_Code varchar2(30);
  v_Product_ID    raw(16);
begin
  v_Num_Orders := round(dbms_random.value(0,&Max_Num_Orders));
  for o in 1..v_Num_Orders
  -- Create the Order (header)
  loop
    v_Order_ID   := Sys_GUID();                             -- GUID for Order (needed for Order Item below).
    v_Order_Date := SysDate-dbms_random.value(0,730);       -- Some date in the last 2 years.
    v_Num_Items  := round(dbms_random.value(1,&Max_Items)); -- Random number of items
    select *                                                -- A random Kiosk.
    into v_Kiosk_Code
    from (select Value_Code
          from tc_List_Of_Values
          where Type_Code = 'Kiosk'
          order by dbms_random.value
         )
    where rownum=1
    ;
    select *                                                -- A random Campaign.
    into v_Campaign_Code
    from (select Value_Code
          from tc_List_Of_Values
          where Type_Code = 'Campaign'
          order by dbms_random.value
         )
    where rownum=1
    ;
    insert into tc_Orders (Row_GUID, Order_Date, Kiosk_Code, Campaign_Code)
    values (v_Order_ID, v_Order_Date, v_Kiosk_Code, v_Campaign_Code);
    -- dbms_output.put_line('Order: '||v_Order_ID||', '||v_Order_Date||', '||v_Kiosk_Code', '||v_Campaign_Code);
    for i in 1..v_Num_Items
    -- Create the Order Items
    loop
      v_Item_Qty := round(dbms_random.value(1,&Max_Qty));   -- Random item quantity
      select *                                              -- A random Product
      into v_Product_ID
      from (select p.Row_GUID
            from tc_Products p
            where not exists
            -- Avoid having same product in two items on same order
            (select 'anything'
             from tc_Order_Items
             where Order_ID = v_Order_ID
             and   Product_ID = p.Row_GUID
            )
            order by dbms_random.value
           )
      where rownum=1
      ;      
      insert into tc_Order_Items (Order_ID, Item_Num, Product_ID, Order_Qty)
      values (v_Order_ID, i, v_Product_ID, v_Item_Qty);
      -- dbms_output.put_line('Items: '||v_Order_ID||', '||i||', '||v_Product_ID||', '||v_Item_Qty);
    end loop;
  end loop;
  commit;
end;
/

