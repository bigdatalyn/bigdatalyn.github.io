
### OL8
https://docs.oracle.com/en/database/oracle/oracle-database/23/lacli/install-instant-client-using-rpm.html

dnf install oracle-instantclient-release-el8 -y
dnf install oracle-instantclient-basic -y
dnf install oracle-instantclient-sqlplus -y

### OL7
https://qiita.com/feifo/items/d21b7050d0d4799f5d47
https://qiita.com/tkprof/items/2a4eb868f45fb5759110

# yum install oracle-instantclient18.3-basic
# yum install oracle-instantclient18.3-devel
# yum install oracle-instantclient18.3-jdbc
# yum install oracle-instantclient18.3-sqlplus

yum list oracle-instantclient*


https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html

### Package

wget https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-sqlplus-linux.x64-23.4.0.24.05.zip
wget https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-tools-linux.x64-23.4.0.24.05.zip

https://www.geeksforgeeks.org/how-to-install-sqlplus-on-linux/


export LD_LIBRARY_PATH=/root/instantclient_23_4:$LD_LIBRARY_PATH

export PATH=/root/instantclient_23_4:$PATH
export PATH=/root/tools:$PATH

### tnsnames.ora


[root@inst-client ~]# cat $ORACLE_HOME/network/admin/tnsnames.ora 
PDB1= 
 (DESCRIPTION= 
   (ADDRESS=(PROTOCOL=TCP)(host=basedb23ai-scan.sub01030811150.dbvcn.oraclevcn.com)(PORT=1521))
   (CONNECT_DATA= 
     (SERVICE_NAME=DB23ai_PDB1.sub01030811150.dbvcn.oraclevcn.com))) 
[root@inst-client ~]# 


