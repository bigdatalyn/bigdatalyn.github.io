

```
# wget https://github.com/datacharmer/dbdeployer/releases/download/v1.71.0/dbdeployer-1.71.0.linux.tar.gz
# tar xzvf dbdeployer-1.71.0.linux.tar.gz 
# chmod +x dbdeployer-1.71.0.linux
# mv dbdeployer-1.71.0.linux /usr/local/bin/dbdeployer
# mkdir -p ~/sandboxes/{mysql_package,mysql_base}
# dbdeployer defaults update sandbox-binary $HOME/sandboxes/mysql_base
# dbdeployer defaults show

# scp mysql-commercial-8.0.32-linux-glibc2.12-x86_64.tar.xz ol8mysql:/root

# mkdir /opt/mysql/mysql_ee -p
# dbdeployer --sandbox-binary=/opt/mysql/mysql_ee unpack mysql-commercial-8.0.32-linux-glibc2.12-x86_64.tar.xz
# dbdeployer deploy single 8.0.32 --sandbox-binary=/opt/mysql/mysql_ee  --sandbox-directory=ee_8_0_32 --bind-address=0.0.0.0 --port=8032 --remote-access='%' --native-auth-plugin --gtid --my-cnf-options="skip_name_resolve" --pre-grants-sql="create user lin@'%' identified with mysql_native_password by 'mysql';grant all on *.* to lin@'%' with grant option;flush privileges;"


# mysql -ulin -P8032 -pmysql

Client:

# mysql -ulin -pmysql -hol8mysql01 -P8032 -e "select version()";
```

/opt/mysql/mysql_ee/8.0.32/bin/mysql -ulin -P8032 -p

[root@ol8mysql ~]# hostname
ol8mysql
[root@ol8mysql ~]# cat /proc/cpuinfo | grep -i process
processor	: 0
processor	: 1
[root@ol8mysql ~]# free -m
              total        used        free      shared  buff/cache   available
Mem:           1972         663         521          16         787        1145
Swap:          4095           0        4095
[root@ol8mysql ~]# mysql -ulin -hol8mysql -P8032 -pmysql -e "select version();"
mysql: [Warning] Using a password on the command line interface can be insecure.
+-------------------+
| version()         |
+-------------------+
| 8.0.32-commercial |
+-------------------+
[root@ol8mysql ~]# 


