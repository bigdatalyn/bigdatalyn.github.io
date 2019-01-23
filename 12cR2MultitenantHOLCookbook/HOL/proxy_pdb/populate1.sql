declare
Type X_region is table of varchar2(5);
x X_region;
Type Y_year is table of varchar2(5);
y Y_year;
Type Z_Quarter is table of varchar2(5);
z Z_Quarter;
v_amt number;
--
begin
--
x := X_region('north','south','east','west');
y := Y_year(2012, 2013);
z := Z_Quarter('Q1','Q2','Q3','Q4');
--
for i1 in x.FIRST..x.LAST
loop
   for i2 in y.FIRST..y.LAST
     loop
       for i3 in z.FIRST..z.LAST
         loop
             v_amt := round(dbms_random.value(10000,20000));
             insert into app_owner.sales_data values (y(i2),x(i1),z(i3),v_amt);
         end loop;
     end loop;
end loop; 
--
commit;
--
end;
/
