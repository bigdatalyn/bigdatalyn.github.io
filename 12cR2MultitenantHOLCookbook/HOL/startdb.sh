#/bin/ksh
. ./cdb1.env
lsnrctl start
sqlplus / as sysdba <<EOF2
startup
exit
EOF2
. ./cdb2.env
sqlplus / as sysdba <<EOF3
startup
exit
EOF3
echo "Databases started"
ps -ef|grep -i pmon
