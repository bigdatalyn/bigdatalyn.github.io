#/bin/ksh
. ./cdb1.env
lsnrctl stop
sqlplus / as sysdba <<EOF2
shutdown immediate
exit
EOF2
. ./cdb2.env
sqlplus / as sysdba <<EOF3
shutdown immediate
exit
EOF3
echo "Databases stopped"
ps -ef|grep -i pmon
