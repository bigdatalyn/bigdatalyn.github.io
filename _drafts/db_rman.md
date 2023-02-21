


$ crontab -l
30 1 * * * /hdd/scripts/backup.sh /hdd/orabak
0 */6 * * * /hdd/scripts/backuparch.sh /hdd/orabak


vi /hdd/scripts/backup.sh

#!/bin/bash
#ENV
export ORACLE_SID=demo
export ORACLE_BASE=/u01/app/oracle
export ORACLE_HOME=/u01/app/oracle/product/19.3.0/db_1
export PATH=$ORACLE_HOME/bin:$PATH


#backup RMAN
if [ ! -d "$1" ]; then
        echo "You have input no dir for \$1"
        exit 1
fi

echo "=================================================================================" >>${1}/backup_full.log
echo "Begin backup at : `date`" >> ${1}/backup_full.log
rman target / <<EOF >> ${1}/backup_full.log
run {
CONFIGURE RETENTION POLICY TO REDUNDANCY = 2;
CONFIGURE DEVICE TYPE DISK PARALLELISM 6;
CONFIGURE DEFAULT DEVICE TYPE TO DISK;
backup as compressed backupset database format '${1}/FULLBAK_%d_%T_%s_%p.DBFILE';
backup current controlfile format '${1}/%d.%s.%p.%T.CTL';
backup spfile format '${1}/%d.%s.%p.%T.SPFILE';
crosscheck backup;
crosscheck copy;
sql "alter system archive log current";
backup as COMPRESSED backupset archivelog all not backed up format '${1}/%d.%s.%p.%T.ARC';
crosscheck archivelog all;
delete noprompt archivelog all completed before 'sysdate-10';
delete noprompt expired backup;
delete noprompt obsolete;
}
exit
EOF
echo "End backup at : `date`" >>${1}/backup_full.log

echo "Begin cp to NAS at : `date`" >>${1}/backup_full.log
cp ${1}/*`date +%Y%m%d`* /public/Others/orabak
echo "End cp to NAS at : `date`" >>${1}/backup_full.log
echo "=================================================================================" >>${1}/backup_full.log

exit 0


vi /hdd/scripts/backuparch.sh


#!/bin/bash
#ENV
export ORACLE_SID=demo
export ORACLE_BASE=/u01/app/oracle
export ORACLE_HOME=/u01/app/oracle/product/19.3.0/db_1
export PATH=$ORACLE_HOME/bin:$PATH

#backup RMAN
if [ ! -d "$1" ]; then
        echo "You have input no dir for \$1"
        exit 1
fi

echo "=================================================================================" >>${1}/backup_arch.log
echo "Begin backup at : `date`" >> ${1}/backup_arch.log
rman target / <<EOF >> ${1}/backup_arch.log
run {
CONFIGURE RETENTION POLICY TO REDUNDANCY = 2;
CONFIGURE DEVICE TYPE DISK PARALLELISM 6;
CONFIGURE DEFAULT DEVICE TYPE TO DISK;
backup current controlfile format '${1}/%d.%s.%p.%T.CTL';
backup spfile format '${1}/%d.%s.%p.%T.SPFILE';
crosscheck backup;
crosscheck copy;
sql "alter system archive log current";
backup as COMPRESSED backupset archivelog all not backed up format '${1}/%d.%s.%p.%T.ARC';
crosscheck archivelog all;
delete noprompt archivelog all completed before 'sysdate-10';
delete noprompt expired backup;
delete noprompt obsolete;
}
exit
EOF
echo "End backup at : `date`" >>${1}/backup_arch.log

echo "Begin cp to NAS at : `date`" >>${1}/backup_arch.log
cp ${1}/*`date +%Y%m%d`*.{CTL,SPFILE,ARC} /public/Others/orabak
echo "End cp to NAS at : `date`" >>${1}/backup_arch.log
echo "=================================================================================" >>${1}/backup_arch.log

exit 0






需求：每10分钟清除4h之前的归档日志；
$ crontab -l
*/10 * * * * /u01/scripts/delarch.sh /u01/scripts


vi /u01/scripts/delarch.sh


#!/bin/bash
#ENV
export ORACLE_SID=jydb1;
export ORACLE_BASE=/u01/app/oracle;
export ORACLE_HOME=/u01/app/oracle/product/19.3.0/db_1;
export PATH=$ORACLE_HOME/bin:$PATH;

#RMAN delete archivelog
if [ ! -d "$1" ]; then
        echo "You have input no dir for \$1"
        exit 1
fi

echo "=================================================================================" >>${1}/delarch.log
echo "Begin backup at : `date`" >> ${1}/delarch.log
rman target / <<EOF >> ${1}/delarch.log
delete noprompt archivelog all completed before 'sysdate - 1/24*4';
EOF
echo "End backup at : `date`" >>${1}/delarch.log
echo "=================================================================================" >>${1}/delarch.log

exit 0





发现针对控制文件和参数文件，在最后居然被删掉了。。

梳理脚本逻辑，确认是这条命令触发的删除：

delete noprompt obsolete;
何为obsolete？目前策略中的 REDUNDANCY 设置为2，但是因为开启了自动的控制文件备份（其中也会同时包含参数文件），所以反而手工备份的都没有被传输到备份端。

另外，需要注意的是，这不是一个小问题，因为这会给正常恢复带来很大的麻烦；
试想，没有这两个文件，尤其是控制文件的备份存档到NAS，一旦主机crash，通过NAS上的备份就成为无稽之谈。

那么解决方案呢？也很简单，修改默认值，默认值为：

CONFIGURE CONTROLFILE AUTOBACKUP ON; # default
CONFIGURE CONTROLFILE AUTOBACKUP FORMAT FOR DEVICE TYPE DISK TO '%F'; # default


因此对应了两种修改方式：

方式一：关闭RMAN中控制文件的自动备份；

CONFIGURE CONTROLFILE AUTOBACKUP OFF; 

方式二：设置RMAN中控制文件自动备份的路径为我们备份的路径：

CONFIGURE CONTROLFILE AUTOBACKUP FORMAT FOR DEVICE TYPE DISK TO '/hdd/orabak/AUTO_%F.CTL';




ADG环境下的特殊配置
为了应对主备角色切换期间等场景，在主备库都配置上归档删除策略，确保未传到备库的归档不会被删除：

RMAN> CONFIGURE ARCHIVELOG DELETION POLICY TO SHIPPED TO ALL STANDBY;

new RMAN configuration parameters:
CONFIGURE ARCHIVELOG DELETION POLICY TO SHIPPED TO ALL STANDBY;
new RMAN configuration parameters are successfully stored

