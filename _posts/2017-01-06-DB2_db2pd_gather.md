---
layout: post
title: "[原创] DB2 db2pd收集信息脚本"
categories: DB2
tags: DB2 Shell 
---

* content
{:toc}

问题：

上周碰到app的reorg job执行了23小时，而平时大概30分钟执行完成，事后调查比较繁琐和复杂，建议在下一次执行job时候，为了收集app的具体信息，

由于晚上3点多执行，所有定制收集信息的task脚本收集即可




## 脚本逻辑：

```
db2pd_gather_info.ksh
#!/usr/bin/ksh
##########################################################################################
#                                                                                        #
#   NAME      : db2pd_gather_info.ksh                                                    #
#   FUNCTION  : Start Gather DB2 instance information and stats                          #
#   USAGE     : ./db2pd_gather_info.ksh   for db2inst1                                    #
#   PARAMETER : -                                                                        #
#   INFILE    : -                                                                        #
#   OUTFILE   : -                                                                        #
#   RETURN    : 0 : Normal End                                                           #
#   AUTHOR    : Hong Lin                                                                 #
#   CREATE    : 2016/12/29                                                               #
#   MODIFIED  : 2016/12/29  DB2 V10.1 Version 1.0                                        #
#                                                                                        #
##########################################################################################

#start time/end time: month day hour minute
START_TIME=12310400
END___TIME=12310500
#interval:10 mintues * 60 second
INTERVAL=600

LANG=en_US
DBNAME=SAMPLE


while test `date +%m%d%H%M` -lt $START_TIME; do 
		sleep 30; 
done

while test `date +%m%d%H%M` -le $END___TIME ; do 

		echo "++++++++++++++ Start `date +"%Y%m%d%H%M%S"` ++++++++++++++"

		db2 list application show detail > /dbhome/db2inst1/monitor/db2listapplication_`date +"%Y.%m.%d-%H.%M.%S"`
		db2 list utilities show detail > /dbhome/db2inst1/monitor/db2utilities_`date +"%Y.%m.%d-%H.%M.%S"`
		db2pd -d $DBNAME -reorg index > /dbhome/db2inst1/monitor/db2pd_reorg_`date +"%Y.%m.%d-%H.%M.%S"`
		db2pd -d $DBNAME -runstats > /dbhome/db2inst1/monitor/db2pd_runstats_`date +"%Y.%m.%d-%H.%M.%S"`
		db2pd -d $DBNAME -logs > /dbhome/db2inst1/monitor/db2pd_logs_`date +"%Y.%m.%d-%H.%M.%S"`
		db2pd -d $DBNAME -applications > /dbhome/db2inst1/monitor/db2pd_app_`date +"%Y.%m.%d-%H.%M.%S"`
		db2pd -d $DBNAME -transactions > /dbhome/db2inst1/monitor/db2pd_txn_`date +"%Y.%m.%d-%H.%M.%S"`
		db2pd -d $DBNAME -locks -transactions -agents -applications -dynamic > /dbhome/db2inst1/monitor/lock_transactions_agents_`date +"%Y.%m.%d-%H.%M.%S"`
		db2pd -d $DBNAME -tcbstats > /dbhome/db2inst1/monitor/db2pd_tcbstats_`date +"%Y.%m.%d-%H.%M.%S"`
		db2pd -age -latches > /dbhome/db2inst1/monitor/db2pd_age_latches_`date +"%Y.%m.%d-%H.%M.%S"`
		db2pd -d $DBNAME -api -wlocks -tra -act -edus > /dbhome/db2inst1/monitor/wlock_tra_act_edus`date +"%Y.%m.%d-%H.%M.%S"`
		iostat -DlT 1 10 > /dbhome/db2inst1/monitor/iostat_`date +"%Y.%m.%d-%H.%M.%S"`
		vmstat 1 10 > /dbhome/db2inst1/monitor/vmstat_`date +"%Y.%m.%d-%H.%M.%S"`
		ps -ef >  /dbhome/db2inst1/monitor/ps_ef_`date +"%Y.%m.%d-%H.%M.%S"`
		ps auxw > /dbhome/db2inst1/monitor/ps_auxw_`date +"%Y.%m.%d-%H.%M.%S"`
		ipcs -ma > /dbhome/db2inst1/monitor/ipcs_ma_`date +"%Y.%m.%d-%H.%M.%S"`

		echo "++++++++++++++ Completed `date +"%Y%m%d%H%M%S"` ++++++++++++++"

done

_reorg=`db2 list applications show detail | grep db2reorg`
if [[ -n $_reorg ]];then
		echo "db2reorg is running"
		db2pd -eve > /dbhome/db2inst1/monitor/db2pd-eve_`date +"%Y%m%d_%H%M%S"` 
		db2pd -stack all        
fi

exit;
```

**注意：


`START_TIME 时间：12311040 12月31日4点整`

`END___TIME 时间：12310500 12月31日5点整`

`INTERVAL 间隔时间：600 秒`

`提前创建好目录 /dbhome/db2inst1/monitor/ 并赋予权限`


### 执行：


```
nohup /dbhome/db2inst1/db2pd_gather_info.ksh &
```
