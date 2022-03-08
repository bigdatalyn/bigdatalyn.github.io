[PMM监控](https://www.modb.pro/db/160044)
[Percona Monitoring and Management (PMM) 监控MongoDB](https://developer.aliyun.com/article/534263)
[安装和使用PMM（Percona Monitoring and Management）](https://www.cnblogs.com/jiangxm157/p/14715592.html?ivk_sa=1024320u)


### PMM Server Install

```
[root@centos7 ~]# yum install -y docker
[root@centos7 ~]# ps -ef | grep docker
root      7754  7535  0 18:10 pts/0    00:00:00 grep --color=auto docker
[root@centos7 ~]# systemctl start docker
[root@centos7 ~]# ps -ef | grep docker
root      7808     1  3 18:10 ?        00:00:00 /usr/bin/dockerd-current --add-runtime docker-runc=/usr/libexec/docker/docker-runc-current --default-runtime=docker-runc --exec-opt native.cgroupdriver=systemd --userland-proxy-path=/usr/libexec/docker/docker-proxy-current --init-path=/usr/libexec/docker/docker-init-current --seccomp-profile=/etc/docker/seccomp.json --selinux-enabled --log-driver=journald --signature-verification=false --storage-driver overlay2
root      7814  7808  0 18:10 ?        00:00:00 /usr/bin/docker-containerd-current -l unix:///var/run/docker/libcontainerd/docker-containerd.sock --metrics-interval=0 --start-timeout 2m --state-dir /var/run/docker/libcontainerd/containerd --shim docker-containerd-shim --runtime docker-runc --runtime-args --systemd-cgroup=true
root      7898  7535  0 18:11 pts/0    00:00:00 grep --color=auto docker
[root@centos7 ~]#

[root@centos7 ~]# mkdir -p /etc/docker
[root@centos7 ~]# vi /etc/docker/daemon.json
[root@centos7 ~]# cat /etc/docker/daemon.json
{
"registry-mirrors": ["https://kli7phym.mirror.aliyuncs.com"]
}
[root@centos7 ~]#
[root@centos7 ~]# systemctl daemon-reload
[root@centos7 ~]# systemctl restart docker
[root@centos7 ~]# ps -ef | grep docker
root      8018     1  2 18:13 ?        00:00:00 /usr/bin/dockerd-current --add-runtime docker-runc=/usr/libexec/docker/docker-runc-current --default-runtime=docker-runc --exec-opt native.cgroupdriver=systemd --userland-proxy-path=/usr/libexec/docker/docker-proxy-current --init-path=/usr/libexec/docker/docker-init-current --seccomp-profile=/etc/docker/seccomp.json --selinux-enabled --log-driver=journald --signature-verification=false --storage-driver overlay2
root      8025  8018  0 18:13 ?        00:00:00 /usr/bin/docker-containerd-current -l unix:///var/run/docker/libcontainerd/docker-containerd.sock --metrics-interval=0 --start-timeout 2m --state-dir /var/run/docker/libcontainerd/containerd --shim docker-containerd-shim --runtime docker-runc --runtime-args --systemd-cgroup=true
root      8130  7535  0 18:13 pts/0    00:00:00 grep --color=auto docker
[root@centos7 ~]#

PMM Server
https://hub.docker.com/r/percona/pmm-server

[root@centos7 ~]# docker pull percona pmm-server:latest

[root@centos7 ~]# docker pull percona/pmm-server:2
Trying to pull repository docker.io/percona/pmm-server ...
2: Pulling from docker.io/percona/pmm-server
2d473b07cdd5: Pull complete
e05cef0f5a85: Pull complete
Digest: sha256:57a7a150218e35c0126466294367c18de12fe7d4b0076ab587684cc2110691ee
Status: Downloaded newer image for docker.io/percona/pmm-server:2
[root@centos7 ~]#
[root@centos7 ~]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
[root@centos7 ~]# docker images
REPOSITORY                     TAG                 IMAGE ID            CREATED             SIZE
docker.io/percona/pmm-server   2                   2cfce486d2a8        2 months ago        1.78 GB
[root@centos7 ~]#

docker create \
-v /opt/prometheus/data \
-v /opt/consul-data \
-v /var/lib/mysql \
-v /var/lib/grafana \
--name pmm-data \
percona/pmm-server:2 /bin/true

[root@centos7 ~]# docker create \
> -v /opt/prometheus/data \
> -v /opt/consul-data \
> -v /var/lib/mysql \
> -v /var/lib/grafana \
> --name pmm-data \
> percona/pmm-server:2 /bin/true
ceb0cc2f0e9d92402b0a30b4e98f4c4a762644304670397f5df43e84d4e9b414
[root@centos7 ~]#


docker run -d -p 80:80 --volumes-from pmm-data --name pmm-server --restart always percona/pmm-server:2
docker run -d -p 80:80 --volumes-from pmm-data --name pmm-server -e METRICS_RETENTION=336h --restart always percona/pmm-server:2
-- METRICS_RETENTION=336h 参数为日志保留时间
-- http://192.168.56.21:80
-- default user/pwd: admin/admin -> change new password

docker run -d \
-e METRICS_RETENTION=720h \
-e SERVER_USER=admin \
-e SERVER_PASSWORD=admin \
-p 80:80 \
--volumes-from pmm-data percona/pmm-server:2

docker run -d -p 80:80  -e METRICS_RETENTION=720h -e SERVER_USER=admin -e SERVER_PASSWORD=admin --volumes-from pmm-data --name pmm-server --restart always percona/pmm-server:2
docker run -d -p 443:443 --volumes-from pmm-data --name pmm-server -e SERVER_USER=admin -e SERVER_PASSWORD=admin --restart always percona/pmm-server:2



docker run -d \
-e METRICS_RETENTION=720h \
-e SERVER_USER=admin \
-e SERVER_PASSWORD=admin \
--volumes-from pmm-data percona/pmm-server:2

[root@centos7 ~]# docker create \
> -v /opt/prometheus/data \
> -v /opt/consul-data \
> -v /var/lib/mysql \
> -v /var/lib/grafana \
> --name pmm-data \
> percona/pmm-server:2 /bin/true
dd0494618740965638f9bf23277f743008547d1bc0a0217aadd2de53aa9f1027
[root@centos7 ~]# docker ps -a
CONTAINER ID        IMAGE                  COMMAND             CREATED             STATUS              PORTS               NAMES
dd0494618740        percona/pmm-server:2   "/bin/true"         5 seconds ago       Created                                 pmm-data
[root@centos7 ~]#
[root@centos7 ~]#
[root@centos7 ~]#
[root@centos7 ~]# docker run -d \
> -e METRICS_RETENTION=720h \
> -e SERVER_USER=admin \
> -e SERVER_PASSWORD=admin \
> -p 80:80 \
> --volumes-from pmm-data percona/pmm-server:2
4eddf01a7f3bdf6da6c9faf4969d8c4e2c68e3b48a2a7e32527ab0e281b45b6e
[root@centos7 ~]# docker ps -a
CONTAINER ID        IMAGE                  COMMAND                CREATED             STATUS                            PORTS                         NAMES
4eddf01a7f3b        percona/pmm-server:2   "/opt/entrypoint.sh"   3 seconds ago       Up 2 seconds (health: starting)   0.0.0.0:80->80/tcp, 443/tcp   xenodochial_jang
dd0494618740        percona/pmm-server:2   "/bin/true"            21 seconds ago      Created                                                         pmm-data
[root@centos7 ~]#
[root@centos7 ~]# docker exec -it xenodochial_jang /bin/bash
[root@4eddf01a7f3b opt]#
[root@4eddf01a7f3b ~]# cd /etc/grafana/
[root@4eddf01a7f3b grafana]# ls -l
total 40
-rw-r--r-- 1 grafana grafana 35298 Dec 13 09:46 grafana.ini
-rw-r--r-- 1 grafana grafana  2270 Dec  3 13:55 ldap.toml
[root@4eddf01a7f3b grafana]#

```

PMM Server HomePage

![PMM_HP]({{ "/files/MySQL/PMM/PMM_HomePage.jpg"}})


### Client Install


[root@centos7 ~]# ls -tlr /usr/lib/sysctl.d/00-system.conf
-rw-r--r--. 1 root root 293 Oct 13  2020 /usr/lib/sysctl.d/00-system.conf
[root@centos7 ~]# vi /usr/lib/sysctl.d/00-system.conf
[root@centos7 ~]#
[root@centos7 ~]#
[root@centos7 ~]#
[root@centos7 ~]# systemctl restart network
[root@centos7 ~]# sysctl net.ipv4.ip_forward
net.ipv4.ip_forward = 1
[root@centos7 ~]#

Yum Install
```
[root@ol8-21c ~]# yum install -y https://repo.percona.com/yum/percona-release-latest.noarch.rpm
[root@ol8-21c ~]# yum -y install pmm-client
[root@ol8-21c ~]# which pmm-admin
/sbin/pmm-admin
[root@ol8-21c ~]#
```

Or

Download rpm and install.
```
wget https://downloads.percona.com/downloads/pmm2/2.16.0/binary/redhat/7/x86_64/pmm2-client-2.16.0-6.el7.x86_64.rpm
rpm -ivh pmm2-client-2.16.0-6.el7.x86_64.rpm
```

### Config PMM-Server

[root@centos7 ~]# ls -tlr /usr/lib/sysctl.d/00-system.conf
-rw-r--r--. 1 root root 293 Oct 13  2020 /usr/lib/sysctl.d/00-system.conf
[root@centos7 ~]# vi /usr/lib/sysctl.d/00-system.conf
[root@centos7 ~]#
[root@centos7 ~]#
[root@centos7 ~]#
[root@centos7 ~]# systemctl restart network
[root@centos7 ~]# sysctl net.ipv4.ip_forward
net.ipv4.ip_forward = 1
[root@centos7 ~]#

pmm-admin config --server 192.168.56.21:80 --server-user admin --server-password admin


(root@localhost) [(none)]>\_> use mysql

(root@localhost) [mysql]>\_> create user 'pmm_user'@'%' identified by '12345678';
Query OK, 0 rows affected (0.06 sec)

(root@localhost) [mysql]>\_> flush privileges;
Query OK, 0 rows affected (0.01 sec)

(root@localhost) [mysql]>\_> alter user 'pmm_user'@'%' identified with mysql_native_password by '12345678';
Query OK, 0 rows affected (0.03 sec)

(root@localhost) [mysql]>\_> exit



[root@centos7 ~]# mysql -upmm_user -h192.168.56.21 -P3380 -p12345678
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 15
Server version: 8.0.28 MySQL Community Server - GPL

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

(pmm_user@192.168.56.21) [(none)]>\_>



pmm-admin config --server 192.168.56.21:80
pmm-admin config --server 192.168.56.21:80 --server-user admin --server-password admin 