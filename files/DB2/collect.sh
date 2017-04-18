#!/usr/bin/ksh

set +x
DBNAME=$1
  TS=`date '+%Y-%m-%d-%H.%M.%S'`
  if [ "x$extension" = "x" ];then
   extension="cData"
fi

userhome=~${DB2INSTANCE}
eval userhome=$userhome

collect_data()
{
echo "`date`:Starting to run the MON queries"
db2 connect to $DBNAME

tstamp=`date "+%Y%m%d_%H%M%S"`
 iostat >iostat.$TS
 ps -kelf >pself.$TS
 db2pd -edus > db2pd.edus.$TS
db2pd -stacks all >stack.$TS
 db2pd -dbptnmem > db2pd.dbptnmem.$TS
   db2 get snapshot for database manager > snap.dbm.$TS
  db2 get snapshot for database on $1 > snap.db.$1.$TS
  get snapshot for application agentid <applhandle> >snap.app.$1.$TS
  db2 INGEST GET STATS FOR <ingest jobid>
    }

for i in 1 2 3 4 5
do
collect_data
sleep 900
done

In another window please run the trace command on application handle
using:-

db2trc on -f  trace.dmp -t -apphdl <apphdl>
wait for 2 minutes
db2trc off
db2trc fmt trace.dmp trace.fmt
db2trc flw trace.dmp trace.flw -t
db2trc fmt trace.dmp trace.fmtc -c

================================================================================================================================================================
dbv97i07:/dbhome/dbv97i07/collect$ cat collect.sh                                                                                                                                            
#!/usr/bin/ksh
# Check the usage
if [ $# -ne 1 ];then
        echo "usage $0 <dbname>"
        exit 1
fi
DB=$1
db2 update monitor switches using bufferpool on lock on sort on statement on table on timestamp on uow on
for i in 1 2 3 4 5
do
ds=`date +%Y%m%d_%H%M%S`
echo "Taking db2pd outputs - round $i."
vmstat -w -t 1 10 >> vmstat.out.$ds
vmstat -P all -w -t 1 10 > vmstat.P.out.$ds
iostat 1 10 > iostat.out.$ds
ps -elf | sort +5 -rn > pself.$ds
ps aux | sort +5 -rn > psaux.$ds
db2pd -edus -file db2pd.edus.$ds > /dev/null 2>&1
db2pd -agents -file db2pd.agents.$ds > /dev/null 2>&1
db2pd -latches -file db2pd.latches.$ds > /dev/null 2>&1
#db2pd -stack all > /dev/null 2>&1
db2pd -db $DB -dyn -file db2pd.dyn.$ds > /dev/null 2>&1
db2pd -db $DB -appl -trans -locks -wlocks -alldbpartitionnums -file db2pd.appl.tran.locks.wlocks.$ds > /dev/null 2>&1
db2pd -db $DB -apinfo all -file db2pd.apinfo.$ds > /dev/null 2>&1
db2 list utilities show detail > util.$ds
db2 get snapshot for all application > app.$ds
db2 get snapshot for dynamic sql on $DB > dyn.$ds
db2 get snapshot for database manager > dbm.snap.$ds
db2 get snapshot for database on $DB > db.snap.$ds
db2 get snapshot for tablespaces on $DB > tbsp.snap.$ds
db2 get snapshot for bufferpools on $DB > bp.snap.$ds
db2 get snapshot for locks on $DB > locks.snap.$ds
db2mtrk -i -v -p -d -a > db2mtrk.$ds
echo "Taking stack outputs - round $i. Output will go to db2dump
directory."

sleep 30

done
exit 0
dbv97i07:/dbhome/dbv97i07/collect$ 

================================================================================================================================================================
