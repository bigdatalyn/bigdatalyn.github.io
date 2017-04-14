grant connect,resource,unlimited tablespace to apps identified by App1234;
create directory dump_dir as '/home/oracle/scripts';
!impdp \'sys/oracle@pdbprod1 as sysdba\' dumpfile=apps.dmp directory=dump_dir
drop directory dump_dir;
