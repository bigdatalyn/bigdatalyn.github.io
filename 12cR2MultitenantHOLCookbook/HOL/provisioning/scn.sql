conn system/oracle12@localhost/oe
select current_scn, to_char(sysdate, 'YYYYMMDD-HH12MISS') time from v$database;
