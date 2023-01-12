

### Schema用户

18c引入
```
create user schema_noauth NO AUTHENTICAT
```
- 没有验证
- 可以创建各种对象
  
### Database Valut

云架构
云上安全
云上数据/数据访问/数据留在云上:数据的安全性

公有云
私有云

很好的保护/数据进行隔离

### Oracle Vault

通过Vault去管理数据库（并不用sys用户）
sysdba跟数据做一道防火墙
即使dba访问数据库时候，也需要通过vault就行验证，在vault的应用规则前提下，限制访问应用数据

Exec dvsys.dbms_macadm.disable_app_protection(NULL);
Exec dvsys.dbms_macadm.disable_app_protection(PDB_NAME=>'PDB1');

指定某个pdb起到应用保护

conn / as sysdba
exec sys.configure_dv(DVOWNER_UNAME=>'c##dvo',-
 DVACCTMGR_UNAME=>'c##dvacctgmr',-
 ...)

可以添加异常列表（黑白名单） Exception List


审计规则 Audit Policies

用户执行sql时候，或者调用存储过程执行sql时候，进行审计

Privilege Analysis
18c有权限分析
19c的权限分析在Database EE版本就有
捕获哪些权限在用，哪些权限没在用
需要跟踪一段时间

TDE加密表空间

CDB做root的keystore
Master 加密key
PDB创建master key
PDB表空间创建key


select file_name from v$passwordfile_info;

orapwd file='' dbuniquename='ORCL'

alter system flush passwordfile_metadata_cache;

密码文件不强制放在dbs目录下



dba_user/
v$pwfile_users;



SYS@cdb1> select username,AUTHENTICATION_TYPE from v$pwfile_users;

USERNAME	       AUTHENTICATION_TYPE
---------------------- -------------------
SYS		       PASSWORD

SYS@cdb1> 

SYS@cdb1> select username,AUTHENTICATION_TYPE from dba_users order by 2;

USERNAME	       AUTHENTICATION_TYPE
---------------------- -------------------
GSMADMIN_INTERNAL      NONE
SYS$UMF 	       NONE
ORACLE_OCM	       NONE
SYSRAC		       NONE
XS$NULL 	       NONE
OJVMSYS 	       NONE
LBACSYS 	       NONE
OUTLN		       NONE
DBSNMP		       NONE
APPQOSSYS	       NONE
DBSFWUSER	       NONE
GGSYS		       NONE
ANONYMOUS	       NONE
CTXSYS		       NONE
DVF		       NONE
DVSYS		       NONE
AUDSYS		       NONE
SYSDG		       NONE
GGSHAREDCAP	       NONE
OLAPSYS 	       NONE
MDSYS		       NONE
XDB		       NONE
WMSYS		       NONE
GSMCATUSER	       NONE
MDDATA		       NONE
REMOTE_SCHEDULER_AGENT NONE
SYSBACKUP	       NONE
GSMUSER 	       NONE
GSMROOTUSER	       NONE
DIP		       NONE
DGPDB_INT	       NONE
SYSKM		       NONE
C##HONG 	       PASSWORD
SYSTEM		       PASSWORD
SYS		       PASSWORD

35 rows selected.

SYS@cdb1>


Database Vault:

SYS@cdb1> select * from dba_dv_status;

NAME		    STATUS
------------------- --------------
DV_CONFIGURE_STATUS FALSE
DV_ENABLE_STATUS    FALSE
DV_APP_PROTECTION   NOT CONFIGURED

SYS@cdb1> 


