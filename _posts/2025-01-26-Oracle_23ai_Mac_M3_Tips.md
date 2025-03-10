---
layout: post
title: "Oracle 23ai Mac M3 Docker Tips"
category: Oracle
tags: Oracle 23ai Tips
---

* content
{:toc}

Oracle 23ai Mac M3 Docker Tips

Some tips for oracle 23ai install in Mac M3.

- Docker in Mac M3
- Oracle 23ai Free in Docker
- APEX / ORDS Install wiht Oracle 23ai free


![ords]({{ "/files/Oracle/23ai/ords_hp.png"}})	





### Technical 

Colima 

```
Colima（Container Lima）是一款专为 macOS 设计的轻量级工具，用于在本地快速运行容器化环境（如 Docker 或 containerd）。它基于 Lima（Linux 虚拟机）实现，通过简化的命令行操作，为 macOS 用户提供无缝的容器开发体验，尤其适合替代 Docker Desktop。

Colima (Container Lima) is a lightweight tool designed specifically for macOS to quickly run containerized environments (such as Docker or containerd) locally. Built on Lima (Linux Virtual Machine), it provides macOS users with a seamless containerized development experience through simplified command-line operations, making it an ideal replacement for Docker Desktop.
```

Docker 

```
Docker 是一种开源的容器化平台，用于开发、部署和运行应用程序。它通过将应用程序及其依赖项打包到一个轻量级的容器中，实现了应用程序的快速部署和跨平台运行。

Docker is an open-source containerization platform used for developing, deploying, and running applications. By packaging applications and their dependencies into lightweight containers, it enables rapid deployment and cross-platform operation of applications.
```

[Oracle 23ai Free](https://www.oracle.com/database/free/)

```
Oracle Database 23ai Free 是 Oracle 官方提供的免费版本，适用于学习、开发和测试。它包含了 Oracle 23ai 的核心功能，但有一些限制（例如，只能使用 2 个 CPU 和 2GB 内存）。可以在个人电脑或虚拟机中安装和使用。

Oracle Database 23ai Free offers the ability to experience Oracle Database, which businesses throughout the world rely on for their mission-critical workloads. The resource limits for Oracle Database Free are up to 2 CPUs for foreground processes, 2 GB of RAM and 12 GB of user data on disk. It is packaged for ease of use and simple download.
```

[APEX 24.2 ](https://apex.oracle.com/en/)

```
用 100 倍的代码量减少，20 倍的速度构建企业应用程序。
Oracle APEX 是全球最受欢迎的企业级低代码应用开发平台。

Build enterprise apps 20x faster with 100x less code.
Oracle APEX is the world's most popular enterprise low-code application platform.
```

[Oracle REST Data Services](https://www.oracle.com/database/technologies/appdev/rest.html)

```
Oracle REST Data Services (ORDS) 让您的 Oracle 数据库启用 HTTPS 功能。作为一个中间层 Java 应用，ORDS 提供了数据库管理 REST API、SQL Developer Web、PL/SQL 网关和适用于 REST 的 SODA，并且支持发布 RESTful Web 服务，可与 Oracle 数据库中的数据和存储过程进行交互。

Oracle REST Data Services (ORDS) bridges HTTPS and your Oracle Database. A mid-tier Java application, ORDS provides a Database Management REST API, SQL Developer Web, a PL/SQL Gateway, SODA for REST, and the ability to publish RESTful Web Services for interacting with the data and stored procedures in your Oracle Database.
```

### Docker Mac M3 install 23ai free 

[Get started with Oracle Database 23ai Free today](https://blogs.oracle.com/database/post/announcing-oracle-database-23ai-free-container-images-for-armbased-apple-macbook-computers)
```
To get started (using Docker here as an example), simply use the following command, replacing “<your-password>” with the password you want to use for the Oracle Database SYS and SYSTEM users:

docker run --name oracle-free -p 1521:1521 -e ORACLE_PWD=<your-password> container-registry.oracle.com/database/free:latest-lite

For example: ouser@ouser-mac ~ % docker run --name oracle-free -p 1521:1521 -e ORACLE_PWD=OracleIsAwesome container-registry.oracle.com/database/free:latest-lite
```

docker 23ai free 有很多版本，注意选择平台和lite/full等

Docker 23ai Free comes in many versions, so be sure to select the appropriate platform (e.g., macOS, Windows, Linux) and variant (e.g., Lite or Full) based on your needs.

### Test

MacOS首选要安装colima/docker/qemu

MacOS Install colima

Colima version / docker version:

```
(base) honglin@macos ~ % colima version 
colima version 0.8.0
git commit: 9c08cff339f087c0600d9d56af7b5fbcfe02e287

runtime: docker
arch: x86_64
client: v27.3.1
server: v27.1.1
(base) honglin@macos ~ % docker -v     
Docker version 27.3.1, build ce1223035a
(base) honglin@macos ~ % 
```

Colima Install in MAC.

```
brew install colima
brew install qemu
colima start
```

Starup VM via colima cmd.

```
colima start 
    --arch x86_64 
    --vm-type=vz 
    --vz-rosetta 
    --mount-type=virtiofs 
    --memory 8

a86_64: Architecture (aarch64, x86_64)
vz: Virtual machine type (qemu, vz)
vz-rosetta: Enable Rosetta for amd64 emulation
disk: Default 60GiB
virtiofs: Volume Mount Driver – Default virtiofs (for vz), sshfs (for qemu)
memory: Memory default 2G
cpu: Default 2
```

也可以colima start --edit 编辑默认值如cpu设置为4
You can also use colima start --edit to modify default settings

创建了 4c8g x86_64的 虚拟机
Created 4c8g x86_64 vm.

```
(base) honglin@macos ~ % colima list
PROFILE    STATUS     ARCH      CPUS    MEMORY    DISK     RUNTIME    ADDRESS
default    Running    x86_64    4       6GiB      60GiB    docker     
(base) honglin@macos ~ % 
```

启动 / Start Docker

```
(base) honglin@macos ~ % colima stop
INFO[0000] stopping colima                              
INFO[0000] stopping ...                                  context=docker
INFO[0007] stopping ...                                  context=vm
INFO[0011] done                                         
(base) honglin@macos ~ % ps -ef | grep docker
  501 42638     1   0  3:38PM ??         0:09.88 /opt/homebrew/bin/colima daemon start docker --inotify --inotify-runtime docker --inotify-dir /Users/honglin/ --inotify-dir /tmp/colima-docker/
  501 71410 70577   0  8:10PM ttys005    0:00.01 grep docker
(base) honglin@macos ~ % colima start 
INFO[0000] starting colima                              
INFO[0000] runtime: docker                              
INFO[0000] preparing network ...                         context=vm
INFO[0002] starting ...                                  context=vm
INFO[0043] provisioning ...                              context=docker
INFO[0048] starting ...                                  context=docker
INFO[0052] done                                         
(base) honglin@macos ~ % colima status 
INFO[0000] colima is running using QEMU                 
INFO[0000] arch: x86_64                                 
INFO[0000] runtime: docker                              
INFO[0000] mountType: sshfs                             
INFO[0000] address:                                     
INFO[0000] socket: unix:///Users/honglin/.colima/default/docker.sock 
(base) honglin@macos ~ % ps -ef | grep docker
  501 42638     1   0  3:38PM ??         0:09.91 /opt/homebrew/bin/colima daemon start docker --inotify --inotify-runtime docker --inotify-dir /Users/honglin/ --inotify-dir /tmp/colima-docker/
  501 71447     1   0  8:10PM ??         0:00.03 /opt/homebrew/bin/colima daemon start default --vmnet --inotify --inotify-runtime docker --inotify-dir /Users/honglin/ --inotify-dir /tmp/colima/
  501 71690 70577   0  8:11PM ttys005    0:00.01 grep docker
(base) honglin@macos ~ % 
```

### docker pull 拉取 image

Ref. Images Info:

Tag Version |  OS/Architecture |  Size |  Pull Command  |  Image ID |
|:-----------:|:----------------:|:----------:|:------------------------------------------------------------:|:-------------:|
latest	| linux/arm64	| 3 GB	| docker pull container-registry.oracle.com/database/free:latest	| 0e168a7f991a |
23.6.0.0-arm64	| linux/arm64	| 3 GB	| docker pull container-registry.oracle.com/database/free:23.6.0.0-arm64	|	0e168a7f991a |
23.6.0.0	| linux/arm64	| 3 GB	| docker pull container-registry.oracle.com/database/free:23.6.0.0	| 	0e168a7f991a |


M3 cpu: arm64

```
(base) honglin@macos ~ % uname -m
arm64
(base) honglin@macos ~ % 
```

commands:

```
docker pull container-registry.oracle.com/database/free:23.6.0.0-arm64 (NG)
docker pull container-registry.oracle.com/database/free:23.6.0.0-amd64 (OK)
```

拉取过程 （比较花时间)

The pulling process (can be time-consuming).

```
(base) honglin@macos ~ % docker pull container-registry.oracle.com/database/free:23.6.0.0-arm64
23.6.0.0-arm64: Pulling from database/free
71fd6fc09a21: Pull complete 
a53452c05934: Pull complete 
6e6f9623f93c: Pull complete 
e223d88a0938: Pull complete 
4a7c7ddefd15: Pull complete 
800c470e76be: Pull complete 
2412eb405747: Pull complete 
13414ab74102: Pull complete 
7e072039dd41: Pull complete 
1701c5701157: Pull complete 
a72cbebe65be: Pull complete 
7091ac36517b: Pull complete 
f06dbb675ffa: Pull complete 
292b8eee4b44: Pull complete 
cb7d8d488a8d: Pull complete 
c808e941959a: Pull complete 
9a89921753e2: Pull complete 
9c9e136f7bca: Pull complete 
a13de1a2dd7e: Pull complete 
0f95a1a3978f: Pull complete 
4f0f6342ad73: Pull complete 
Digest: sha256:b9c8afffb8750774368463fe5c102e78a5fc06e3ade2da92eed34b6685f24e52
Status: Downloaded newer image for container-registry.oracle.com/database/free:23.6.0.0-arm64
container-registry.oracle.com/database/free:23.6.0.0-arm64
(base) honglin@macos ~ % docker image ls 
REPOSITORY                                    TAG              IMAGE ID       CREATED        SIZE
container-registry.oracle.com/database/free   23.6.0.0-amd64   2d0ea0353ff3   5 weeks ago    9.49GB
container-registry.oracle.com/database/free   23.6.0.0-arm64   0e168a7f991a   8 weeks ago    9.06GB
oceanbase-ce                                  4.2.1            5c19f3e27bb1   7 months ago   580MB
(base) honglin@macos ~ % 
```

查看各自23aifree的rpm包

Check the RPM packages for each version of 23aifree.

```
docker image inspect container-registry.oracle.com/database/free:23.6.0.0-amd64 | grep INSTALL_FILE
docker image inspect container-registry.oracle.com/database/free:23.6.0.0-arm64 | grep INSTALL_FILE

(base) honglin@macos ~ % docker image inspect container-registry.oracle.com/database/free:23.6.0.0-amd64 | grep INSTALL_FILE
                "INSTALL_FILE_1=oracle-database-free-23ai-1.0-1.el8.x86_64.rpm",
(base) honglin@macos ~ % docker image inspect container-registry.oracle.com/database/free:23.6.0.0-arm64 | grep INSTALL_FILE
                "INSTALL_FILE_1=oracle-database-free-23ai-1.0-1.el8.aarch64.rpm",
(base) honglin@macos ~ % 
```

测试:不同平台会出错

Testing: Errors may occur on different platforms.

```
WARNING: The requested image's platform (linux/arm64) does not match the detected host platform (linux/amd64/v1) and no specific platform was requested
```

Sample:

```
docker run -d -it --name 23cfree -p 8521:1521 -p 8500:5500 -p 8023:8080 -p 9043:8443 -e ORACLE_PWD=E container-registry.oracle.com/database/free:latest

docker run -d \
  --name ora23ai \
  -p 1521:1521 \
  -p 5500:5500 \
  -p 8080:8080 \
  -p 8443:8443 \
  container-registry.oracle.com/database/free:23.6.0.0-amd64


docker run -d \
  --name ora23ai \
  -p 2222:22   \
  -p 1521:1521 \
  -p 5500:5500 \
  -p 8080:8080 \
  -p 8443:8443 \
  -v /Users/honglin/Downloads:/mnt \
  container-registry.oracle.com/database/free:23.6.0.0-arm64


docker端口示例说明: 将宿主机的 8080 端口映射到容器的 80 端口
docker run -d -p 8080:80 nginx

docker文件映射通常在运行容器时通过 -v 或 --mount 参数来指定。
例如，如果你想将宿主机上的某个目录映射到容器中，可以使用以下命令：
docker run -v /path/to/host/directory:/path/in/container image_name

内存不够，可能出现上面错误 也可以colima start --edit 编辑默认值如cpu设置为4/内存2g改为6g
If the memory is insufficient, the error mentioned above may occur. You can also use the command colima start --edit to edit the default settings, such as changing the CPU setting from 4 to 6 and the memory from 2G to 6G.

Errors in file /opt/oracle/diag/rdbms/free/FREE/trace/FREE_lgwr_1263.trc  (incident=9773) (PDBNAME=CDB$ROOT):
ORA-00800: soft external error, arguments: [Set Priority Failed], [LGWR], [Check traces and OS configuration], [Check Oracle document and MOS notes], []
Incident details in: /opt/oracle/diag/rdbms/free/FREE/incident/incdir_9773/FREE_lgwr_1263_i9773.trc

上面稍微花点时间
The above process may take a little time.

加了下面两个出错,时间也很久！  
Adding the following two caused errors, and it also took a long time!

  -e ORACLE_PWD=Welcome12345# \
  -v /Users/honglin/oradata:/opt/oracle/oradata \

Other Options

-e ORACLE_CHARACTERSET=AL32UTF8：设置数据库的字符集为 AL32UTF8。/ Set the database character set to AL32UTF8.
-e ENABLE_ARCHIVELOG=true：启用归档日志模式。/ Enable archive log mode.
-e ENABLE_FORCE_LOGGING=true：启用强制日志模式。/ Enable forced logging mode.

查看container / view the containers
docker ps -la

查看日志(dbca比较花时间) / Check the logs (dbca can be time-consuming).
docker logs ora23ai

有下面信息说明创建成功 / The presence of the following information indicates that the creation was successful.
---> shows DATABASE IS READY TO USE!

通过下面脚本修改初始密码 / Modify the initial password using the script below.
docker exec -it ora23ai /bin/bash
./setPassword.sh Welcome12345#

查看CPU/内存: / Check CPU/Memory:
docker exec -it ora23ai /bin/bash
mpstat -I SCPU
free -m

查看端口: / Check ports:
docker port ora23ai

(base) honglin@macos ~ % docker port ora23ai
1521/tcp -> 0.0.0.0:1521
1521/tcp -> [::]:1521
5500/tcp -> 0.0.0.0:5500
5500/tcp -> [::]:5500
8080/tcp -> 0.0.0.0:8080
8080/tcp -> [::]:8080
8443/tcp -> 0.0.0.0:8443
8443/tcp -> [::]:8443
(base) honglin@macos ~ % 
```

MAC sqlcl Conenct Testing

[SQLcl 24.3.2 Downloads / Version 24.3.2.330.1718 - November 26, 2024](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl/download/)

```
export PATH=/Users/honglin/sqlcl/bin:$PATH
sql system/Welcome12345#@localhost:1521/FREE
SQL> select INSTANCE_NAME, HOST_NAME, VERSION_FULL from v$instance;

-- PDB:
sql system/Welcome12345#@localhost:1521/FREEPDB1

-- docker方式
docker exec -it ora23ai sqlplus / as sysdba
SQL> select banner_full from v$version;
```

参考日志: / Refer to the logs:

```
(base) honglin@macos ~ % export PATH=/Users/honglin/sqlcl/bin:$PATH
(base) honglin@macos ~ % sql system/Welcome12345#@localhost:1521/FREE


SQLcl: Release 24.3 Production on Sun Jan 26 09:50:54 2025

Copyright (c) 1982, 2025, Oracle.  All rights reserved.

Last Successful login time: Sun Jan 26 2025 09:50:55 +08:00

Connected to:
Oracle Database 23ai Free Release 23.0.0.0.0 - Develop, Learn, and Run for Free
Version 23.6.0.24.10

SQL> show pdbs

   CON_ID CON_NAME    OPENMODE      RESTRICTED    
_________ ___________ _____________ _____________ 
        2 PDB$SEED    READ ONLY     NO            
        3 FREEPDB1    READ WRITE    NO            
SQL> exit;
Disconnected from Oracle Database 23ai Free Release 23.0.0.0.0 - Develop, Learn, and Run for Free
Version 23.6.0.24.10
(base) honglin@macos ~ % 
```

定制化下oracle profile内容: / Customize the Oracle profile content:

```
docker exec -it ora23ai /bin/bash

source .bashrc
vi $ORACLE_HOME/sqlplus/admin/glogin.sql 
set sqlprompt "_user'@'_connect_identifier> "
vi bash_profile

bash-4.4$ cat bash_profile
# User specific environment and startup programs
export ORACLE_HOME=/opt/oracle/product/23ai/dbhomeFree
export ORACLE_SID=FREE
export PDB_NAME=FREEPDB1
export NLS_LANG=AMERICAN_AMERICA.AL32UTF8
export NLS_DATE_FORMAT="YYYY-MM-DD HH24:MI:SS"
export LD_LIBRARY_PATH=${ORACLE_HOME}/lib:/lib:/usr/lib
export PATH=${ORACLE_HOME}/sqlcl/bin:${ORACLE_HOME}/bin:${ORACLE_HOME}/OPatch:$OGG_HOME:${PATH}
export HOST=`hostname | cut -f1 -d"."`
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:$ORACLE_HOME/lib32:$OGG_HOME:/lib/usr/lib:/usr/local/lib
# General exports and vars
export PATH=$ORACLE_HOME/bin:$PATH
alias sys='sqlplus / as sysdba'
bash-4.4$ 
```

Repo 源问题 / Repo source issue.

```
docker exec -it ora23ai /bin/bash
用root用户执行
su - 
cp -R /etc/yum.repos.d/ /etc/yum.repos.d_bak
cd /etc/yum.repos.d/
rm -f *.repo
#输入“y”回车确认
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo
dnf clean all
sed -i -e '/mirrors.cloud.aliyuncs.com/d' -e '/mirrors.aliyuncs.com/d' /etc/yum.repos.d/CentOS-Base.repo

dnf install sudo -y
ls -l /etc/sudoers
chmod 660 /etc/sudoers
vi /etc/sudoers

oracle ALL=(ALL) NOPASSWD: ALL

chmod 440 /etc/sudoers

dnf install iptables -y
dnf install wget -y
dnf install java-17-openjdk 
-- dnf install java-21-openjdk 
alternatives --config java
java -version
```

Install Sample schema for 23ai free

```
docker exec -i "ora23ai" /bin/bash <<EOT
curl -sSL https://github.com/oracle-samples/db-sample-schemas/archive/refs/tags/v23.3.tar.gz | tar xzf -
cd /home/oracle/db-sample-schemas-23.3/human_resources
sed -i "s/ACCEPT pass PROMPT/ACCEPT pass DEFAULT "Welcome12345#" PROMPT/" hr_install.sql
echo -e "\n\n\n" |  /opt/oracle/product/23ai/dbhomeFree/bin/sqlplus system/"Welcome12345#"@FREEPDB1 @hr_install.sql
cd /home/oracle/db-sample-schemas-23.3/customer_orders
sed -i "s/ACCEPT pass PROMPT/ACCEPT pass DEFAULT "Welcome12345#" PROMPT/" co_install.sql
echo -e "\n\n\n" |  /opt/oracle/product/23ai/dbhomeFree/bin/sqlplus system/"Welcome12345#"@FREEPDB1 @co_install.sql
cd /home/oracle/db-sample-schemas-23.3/sales_history
sed -i "s/ACCEPT pass PROMPT/ACCEPT pass DEFAULT "Welcome12345#" PROMPT/" sh_install.sql
echo -e "\n\n\n" | /opt/oracle/product/23ai/dbhomeFree/bin/sqlplus system/"Welcome12345#"@FREEPDB1 @sh_install.sql
EOT

上面脚本 Enter有问题:`echo -e "\n\n\n"` 手动执行 
/opt/oracle/product/23ai/dbhomeFree/bin/sqlplus system/"Welcome12345#"@FREEPDB1 @hr_install.sql

sql 比 sqlplus 执行要慢一些？原因？虚拟环境运行java 比较慢？

docker exec -i "ora23ai" /bin/bash <<EOT
echo -e "SELECT OWNER, OBJECT_TYPE, COUNT(1) FROM DBA_OBJECTS where owner in ('HR','OE','SH','IX','BI','PM','SCOTT') GROUP BY OWNER,OBJECT_TYPE ORDER BY 1;" | /opt/oracle/product/23ai/dbhomeFree/sqlcl/bin/sql -s system/"Welcome12345#"@FREEPDB1 
EOT

docker exec -i "ora23ai" /bin/bash <<EOT
echo -e "SELECT OWNER, OBJECT_TYPE, COUNT(1) FROM DBA_OBJECTS where owner in ('HR','OE','SH','IX','BI','PM','SCOTT') GROUP BY OWNER,OBJECT_TYPE ORDER BY 1;" | /opt/oracle/product/23ai/dbhomeFree/bin/sqlplus -s system/"Welcome12345#"@FREEPDB1 
EOT

(base) honglin@macos ~ % docker exec -i "ora23ai" /bin/bash <<EOT
echo -e "SELECT OWNER, OBJECT_TYPE, COUNT(1) FROM DBA_OBJECTS where owner in ('HR','OE','SH','IX','BI','PM','SCOTT') GROUP BY OWNER,OBJECT_TYPE ORDER BY 1;" | /opt/oracle/product/23ai/dbhomeFree/sqlcl/bin/sql -s system/"Welcome12345#"@FREEPDB1
EOT

OWNER    OBJECT_TYPE             COUNT(1) 
________ ____________________ ___________ 
HR       INDEX                         19 
HR       PROCEDURE                      2 
HR       SEQUENCE                       3 
HR       TABLE                          7 
HR       TRIGGER                        2 
HR       VIEW                           1 
SH       DIMENSION                      5 
SH       INDEX                         33 
SH       INDEX PARTITION              115 
SH       LOB                            1 
SH       MATERIALIZED VIEW              2 
SH       TABLE                         18 
SH       TABLE PARTITION               35 
SH       VIEW                           1 

14 rows selected. 

(base) honglin@macos ~ % 
```

### 配置 repo Setup

Repo源有问题替换成其他方法，网络没问题就无视次步骤

```
root 用户执行
su - 
-- 进入配置文件夹
cp -R /etc/yum.repos.d/ /etc/yum.repos.d_bak
cd /etc/yum.repos.d/
-- 删除旧的配置文件
rm -f *.repo
-- 输入“y”回车确认

curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo

yum makecache
-- 如果你是非阿里云ECS用户，可能回会出现 Couldn't resolve host 'mirrors.cloud.aliyuncs.com' 的信息，不过不影响使用。你可以修改相关的配置：
sed -i -e '/mirrors.cloud.aliyuncs.com/d' -e '/mirrors.aliyuncs.com/d' /etc/yum.repos.d/CentOS-Base.repo

-- # 清理 DNF 缓存并重试
dnf clean all
dnf install wget -y
dnf install java-21-openjdk 
dnf install java-17-openjdk 
alternatives --config java
```

### APEX Setup 安装

[Oracle APEX 24.2 is now available!](https://apex.oracle.com/)

密码都用: `Welcome12345#`

```
docker exec -it ora23ai /bin/bash
mkdir /home/oracle
mkdir /home/oracle/apex
mkdir /home/oracle/ords
mkdir /home/oracle/scripts

cd /home/oracle/
curl -OL https://download.oracle.com/otn_software/apex/apex-latest.zip
unzip apex-latest.zip
cd /home/oracle/apex/
export NLS_LANG=American_America.AL32UTF8
sqlplus / as sysdba

SQL> 
SQL> alter session set container=freepdb1;
SQL> CREATE TABLESPACE "APEX" DATAFILE '/opt/oracle/oradata/FREE/FREEPDB1/APEX01.DBF' SIZE 500M;
SQL> select tablespace_name,bytes/1024/1024 mb_size,user_bytes/1024/1024 user_mb_size from dba_data_files;
SQL> @apexins APEX APEX TEMP /i/

过程比较花时间(几十分钟)
多语言:
-- SQL> @load_trans JAPANESE

SQL> @apxchpwd

Enter the administrator's username [ADMIN] -----> Enter key/回车
User "ADMIN" does not yet exist and will be created.
Enter ADMIN's email [ADMIN]  -----> Enter key/回车
Enter ADMIN's password [] -----> Input/输入密码: Welcome12345#
Created instance administrator ADMIN.

SQL> ALTER USER APEX_PUBLIC_USER NO AUTHENTICATION ACCOUNT UNLOCK;
SQL> ALTER PROFILE "DEFAULT" LIMIT PASSWORD_LIFE_TIME UNLIMITED;
```

### ORDS Setup 安装

root用户执行
[安装ords](https://docs.oracle.com/en/database/oracle/apex/24.2/htmig/downloading-installing-ords.html)

```
cd /home/oracle/
mkdir /etc/ords
mkdir /etc/ords/config
mkdir /home/oracle/logs
chmod -R 777 /etc/ords
java -version

cp -r -p /home/oracle/apex/images /home/oracle/ords

sudo yum-config-manager --add-repo=https://yum.oracle.com/repo/OracleLinux/OL8/oracle/software/x86_64
sudo dnf install ords -y

提示:
INFO: Before starting ORDS service, run the below command as user oracle:
         ords --config /etc/ords/config install

oracle 用户执行:

java -version
export _JAVA_OPTIONS="-Xms512M -Xmx512M"
ords --config /etc/ords/config install
----->
  Enter a number to select the TNS net service name to use from /opt/oracle/product/23ai/dbhomeFree/network/admin/tnsnames.ora or specify the database connection
    [1] FREE         SERVICE_NAME=FREE                                           
    [2] FREEPDB1     SERVICE_NAME=FREEPDB1                                       
    [S] Specify the database connection
  Choose [1]: 2
  Provide database user name with administrator privileges.
    Enter the administrator username: sys
  Enter the database password for SYS AS SYSDBA: 
----->
  Choose [A]: 9
  Enter the APEX static resources location: /home/oracle/apex/images
----->
  Choose [A]: 
----->
```

ords 启动和停止脚本

- /home/oracle/scripts/start_ords.sh
- /home/oracle/scripts/stop_ords.sh

```
vi /home/oracle/scripts/start_ords.sh

export ORDS_HOME=/usr/local/bin/ords
export _JAVA_OPTIONS="-Xms512M -Xmx512M"
LOGFILE=/home/oracle/scripts/log/ords-`date +"%Y""%m""%d"`.log
nohup ${ORDS_HOME} --config /etc/ords/config serve >> $LOGFILE 2>&1 & echo "View log file with : tail -f $LOGFILE"

vi /home/oracle/scripts/stop_ords.sh
kill `ps -ef | grep [o]rds.war | awk '{print $2}'`

sh /home/oracle/scripts/start_ords.sh
sh /home/oracle/scripts/stop_ords.sh

vi /opt/oracle/scripts/startup/01_auto_ords.sh
sudo sh /home/oracle/scripts/start_ords.sh
```

Mac 登录 `http://localhost:8080/ords/_/landing`

```
http://localhost:8080/ 
APEX、SQL Developer Web

http://localhost:8080/ords/apex_admin
- admin
- Welcome12345#
```

### ords sqldeveloper

测试:

```
$ sqlplus system/Welcome12345#@localhost:1521/freepdb1 
SQL> alter user hr identified by hr account unlock;

SQL> conn hr/hr@localhost:1521/freepdb1 

BEGIN
  ORDS.enable_schema(
    p_enabled             => TRUE,
    p_schema              => 'HR',
    p_url_mapping_type    => 'BASE_PATH',
    p_url_mapping_pattern => 'hr',
    p_auto_rest_auth      => FALSE
  );
    
  COMMIT;
END;
/

http://localhost:8080/ords/

用hr schema模式登录用
hr/hr 登录
```

![sqldeveloper]({{ "/files/Oracle/23ai/ords_sqldeveloper.png"}})	

![ords_sqldev_hr]({{ "/files/Oracle/23ai/ords_sqldev_hr.png"}})	


### Referece

Akiyama-san's Github : [Oracle-Database-23ai-Free-on-Docker](https://github.com/shakiyam/Oracle-Database-23ai-Free-on-Docker)

[Oracle Container Registry](https://container-registry.oracle.com/ords/ocr/ba/database/free)

[Oracle Database 23ai FreeとAPEXでRAGを使った生成AIアプリをローコード開発してみた (事前準備編)](https://qiita.com/ssfujita/items/34d9e3c39ca730d29351)


[Run Oracle Database 23ai Free on Mac computers with Apple silicon](https://ronekins.com/2024/07/02/run-oracle-database-23ai-free-on-mac-computers-with-apple-silicon/)


[Oracle 23c Free Docker, APEX & ORDS – all in one simple guide](https://pretius.com/blog/oracle-apex-docker-ords/)

```
If you are running this on an OCI compute instance, you’ll need to open ports 8521, 8500, 8023, 9043 & 9922. Otherwise ignore this step.
```

Have a good work&life! 2025/01 via LinHong


