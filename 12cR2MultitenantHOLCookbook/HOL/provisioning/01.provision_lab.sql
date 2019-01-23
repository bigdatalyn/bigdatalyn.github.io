!clear
prompt +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt + In this hot clone lab we will create a clone of the database that will have some  +
prompt + active transactions. In release 12.1. of Oracle Multitenant we recommended        +
prompt + our customers to set the source database in read only mode. But in release 12.2   +
prompt + we can now support cloning directly from a read write source. So we will be able  +
prompt + to create a development system directly from production without needing any       +
prompt + downtime at the source.pretty cool !!! right ?                                    +
prompt +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt
prompt 
prompt Press [Enter] to Continue
pause
prompt SQL> conn sys/oracle12@//localhost/cdb1 as sysdba
conn sys/oracle12@//localhost/cdb1 as sysdba
prompt As the first step let us create a new pluggable database and create as user in that database 
prompt
prompt SQL> create pluggable database oe admin user soe identified by soe roles=(dba);
create pluggable database oe admin user soe identified by soe roles=(dba);
prompt
prompt +++ Opening the pluggable database
prompt SQL> alter pluggable database oe open;
prompt
alter pluggable database oe open;
prompt 
prompt SQL> alter session set container = oe;
alter session set container = oe;
prompt
prompt SQL> grant create session, create table to soe;
grant create session, create table to soe;
prompt SQL> alter user soe quota unlimited on system;
alter user soe quota unlimited on system;
prompt 
prompt Press [Enter] to continue
pause
prompt +++ Connecting as soe and creating a table to hold some data
prompt SQL> connect soe/soe@//localhost/oe
prompt SQL> CREATE TABLE sale_orders 
prompt SQL> (ORDER_ID number, 
prompt SQL>  ORDER_DATE date, 
prompt SQL>  CUSTOMER_ID number);
prompt
connect soe/soe@//localhost/oe
CREATE TABLE sale_orders 
(ORDER_ID      number, 
 ORDER_DATE    date, 
 CUSTOMER_ID   number);
prompt
prompt +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt + Now that we have created the table we will start a load in another window       +
prompt + Open another terminal window and change directory to the lab location           +
prompt + In your case the location will be /u01/HOL/provisioning_labs                    +
prompt + From that location execute the script ./02-write-load.sh                      +
prompt + Once you have started the workload comeback to this window and press enter to   +
prompt + continue                                                                        +
prompt +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt Press Enter to continue
pause
prompt 
prompt +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt + Now that a workload is running on the OE database. Let us create a clone of this+
prompt + database in another CDB (CDB2).                                                 +
prompt +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt 
prompt SQL> connect sys/oracle12@//localhost/cdb2 as sysdba
prompt 
connect sys/oracle12@//localhost/cdb2 as sysdba
prompt SQL> create pluggable database oe_dev from oe@cdb1_link;
create pluggable database oe_dev from oe@cdb1_link;
prompt
prompt +++ Let us open the database 
prompt SQL> alter pluggable database oe_dev open;
alter pluggable database oe_dev open;
prompt SQL> connect soe/soe@//localhost/oe_dev
prompt SQL> select count(*) from sale_orders;
connect soe/soe@//localhost/oe_dev
select count(*) from sale_orders;
prompt
prompt press [Enter] to continue
pause
prompt 
prompt +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt + Notice the count of rows in the sales_orders tables is different from the number+
prompt + you have in the other terminal. This number represents the point in time the    +
prompt + clone was executed. Now that we have demonstrated the hot clone let us drop the +
prompt + pluggable databse and proceed with the next step of the lab.                    +
prompt +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt
prompt Press [Enter] to continue
pause
prompt SQL> connect sys/oracle12@//localhost/cdb2 as sysdba
connect sys/oracle12@//localhost/cdb2 as sysdba
prompt SQL> alter pluggable database oe_dev close;
prompt SQL> drop pluggable database oe_dev including datafiles;

alter pluggable database oe_dev close;
drop pluggable database oe_dev including datafiles;
prompt 
prompt +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt + PDB Hot Cloning provides fast provisioning of hot data, however, to keep in sync+
prompt + with the source, hot cloning still requires one to drop and recreate the clone  +
prompt + from source, or, unplug, archive and drop the PDB and then recreate from source.+
prompt + PDB hot cloning is a required technology for fast cloning on hot data, however, +
prompt + operationally speaking, hot clone by itself is cumbersome when there is a       +
prompt + requirement to keep in sync with the source and incur little data copy costs.   +
prompt + PDB refresh addresses this requirement. PDB refresh provides a means to hot     +
prompt + clone a refreshable PDB master clone from which test, dev, UAT and BI           +
prompt + environments can clone. A refreshable clone copies the base source once, and    +
prompt + then maintains a synchronized copy based on iterative redo apply and transaction+
prompt + rollback at open to ensure transaction consistency. This lab walks you through  +
prompt + creating a refreshable master clone and refreshing the master clone from a hot  +
prompt + data source.                                                                    + 
prompt +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt 
prompt Press [Enter] to continue
pause
prompt SQL> create pluggable database oe_refresh from oe@cdb1_link refresh mode manual;
create pluggable database oe_refresh from oe@cdb1_link refresh mode manual;
prompt SQL> alter pluggable database oe_refresh open read only;
alter pluggable database oe_refresh open read only;
prompt 
prompt +++ Now let us look at the count of orders..
prompt Press [Enter] to continue
pause
prompt SQL> conn soe/soe@//localhost/oe_refresh
conn soe/soe@//localhost/oe_refresh
prompt
prompt SQL> select count(*) from sale_orders;
select count(*) from sale_orders;
prompt 
prompt +++ The count of orders will be close to the count of orders in the other terminal window
prompt +++ But slowly the number keeps on increasing on the OE PDB (inserts running in other 
prompt +++ window
prompt
prompt Press [Enter] to continue
pause
prompt +++ Now we want to refresh the oe_refresh PDB and make the order count in sync 
prompt 
prompt SQL> conn sys/oracle12@//localhost/oe_refresh as sysdba
conn sys/oracle12@//localhost/oe_refresh as sysdba
prompt
prompt SQL> alter pluggable database oe_refresh close;
prompt
alter pluggable database oe_refresh close;
prompt SQL> alter session set container=oe_refresh;
alter session set container=oe_refresh;
prompt
prompt SQL> alter pluggable database oe_refresh refresh;
alter pluggable database oe_refresh refresh;
prompt
prompt SQL> alter pluggable database oe_refresh open read only;
alter pluggable database oe_refresh open read only;
prompt 
prompt
prompt Press [Enter] to continue
pause
prompt +++ Now let us check the number of orders
prompt
prompt SQL> conn soe/soe@//localhost/oe_refresh
conn soe/soe@//localhost/oe_refresh
prompt
prompt SQL> select count(*) from sale_orders;
select count(*) from sale_orders;
prompt 
prompt +++ The number of orders have increased.This is because of refresh of the PDB 
prompt +++ refresh command.
prompt +++ Now we will move to the final section of this lab. But before we do that 
prompt +++ let us drop the oe_refresh database
prompt 
prompt Press [Enter] to continue
pause
prompt SQL> conn sys/oracle12@//localhost/cdb2 as sysdba
conn sys/oracle12@//localhost/cdb2 as sysdba
prompt SQL> alter pluggable database oe_refresh close;
alter pluggable database oe_refresh close;
prompt SQL> drop pluggable database oe_refresh including datafiles;
drop pluggable database oe_refresh including datafiles;
prompt 
prompt Press [Enter] to continue
pause
prompt ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt + It is not uncommon that a database may go down for planned maintenance, or +
prompt + non-critical workload would need to be stopped to satisfy the compute      +
prompt + resource requirements of more important workload. Or, you simply want to   +
prompt + migrate your database to new hardware. PDB Near Zero Downtime (NZD)        +
prompt + Relocate is intended to address these use cases by providing online        +
prompt + relocation of a PDB from one physical server to another with little or no  +
prompt + impact to the connected clients.                                           +
prompt ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt 
prompt 
prompt Press [Enter] to continue
pause
prompt +++ We will relocate the OE PDB that is running in CDB1 over to CDB2
prompt SQL> conn sys/oracle12@//localhost/cdb2 as sysdba
conn sys/oracle12@//localhost/cdb2 as sysdba;
prompt 
prompt SQL> create pluggable database oe from oe@cdb1_link relocate;
create pluggable database oe from oe@cdb1_link relocate;
prompt
prompt SQL> alter pluggable database oe open;
alter pluggable database oe open;
prompt 
prompt Press [Enter] to continue
pause
prompt +++ Notice the workload on the other terminal window continues to run with probably
prompt +++ a tiny blip but the count continues to increase 
prompt 
prompt +++ let us examine the PDBs in CDB1
prompt SQL> conn sys/oracle12@//localhost/cdb1 as sysdba
conn sys/oracle12@//localhost/cdb1 as sysdba
prompt 
show pdbs
prompt 
prompt +++ We do not see the oe PDB anymore
prompt Press [Enter] to continue
pause
prompt 
prompt +++ let us drop the PDB in CDB2 as well and finish the lab.
prompt SQL> conn sys/oracle12@//localhost/cdb2 as sysdba
conn sys/oracle12@//localhost/cdb2 as sysdba
prompt 
prompt SQL> alter pluggable database oe close;
alter pluggable database oe close;
prompt SQL> drop pluggable database oe including datafiles;
drop pluggable database oe including datafiles;
prompt
prompt ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt + In this lab we have successfully demonstrated three interesting features       +
prompt + Hot clone, refresh and relocate                                                +
prompt + Please also close the other terminal window that you have opened earlier       +
prompt ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
prompt Press [Enter] to exit
exit
