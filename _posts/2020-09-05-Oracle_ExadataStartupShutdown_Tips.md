---
layout: post
title: "Oracle Exadata Startup Shutdown Tips"
category: Oracle
tags: Oracle Exadata Tips 
---

* content
{:toc}

Oracle Exadata Startup Shutdown Tips

Shutdown and Startup Exadata

### Shutdown steps


#### 1.Shutdown database(s)

```
$ srvctl stop database -d DB_NAME
```

#### 2.Stop Cluster Resources(Grid Infrastructure)

```
$ crsctl stop cluster -all

Or stop CRS on each database server node

$ crsctl stop crs
```

#### 3.Shutdown all Cell Servers

```
$ dcli -g cell_group -l root "su - celladmin -c \"cellcli -e alter cell shutdown services all \""

Or shutdown each cell server one by one

$ service celld status
$ service celld stop
```

#### 4.Shutdown database cell server

```
$ dcli -g cell_group -l root poweroff

Or shutdown each one by one

$ shutdown -h -y now
or
poweroff
```
### Startup


#### 1.startup cell servers from Database server using the following command.

```
for host in `cat cell_group`; do
echo ${host}: `ipmitool -H ${host}-ilom -U root -P Welcome1 chassis power on`
done
```
You can also startup exadata by using ILOM.

```
$ dcli -g cell_group -l root 'hostname; uptime'
$ dcli -g cell_group -l root "su - celladmin -c \"cellcli -e list cell detail \""
```

#### 2.Check DB&Cluster

```
$ crsctl status res -t
$ ps -ef | grep smon
```


#### 3.Start Cluster

```
crsctl start cluster -all
```

#### 4.Start DB

```
$ srvctl start database -d DB_NAME
```









Have a good work&life! 2020/09 via LinHong


