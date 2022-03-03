---
layout: post
title: "Linux find du Tips"
category: Linux
tags: Linux find du Tips
---

* content
{:toc}

Linux find du Tips

find large file in linux filesystem.

- find
```
find /mdata -type f -printf '%s %p\n'| sort -nr | head -10
```

- du
```
du -a /mdata |sort -n -r |head -n 10
```







### find / du sample

```
[root@centos7 ~]# find /mdata -type f -printf '%s %p\n'| sort -nr | head -10
146800640 /mdata/data80/employees/salaries.ibd
79691776 /mdata/data80/ibdata1
66389964 /mdata/data80/binlog.000012
50331648 /mdata/mysql_test_data/ib_logfile1
50331648 /mdata/mysql_test_data/ib_logfile0
50331648 /mdata/data_mysql80/ib_logfile1
50331648 /mdata/data_mysql80/ib_logfile0
50331648 /mdata/data_mysql56/ib_logfile1
50331648 /mdata/data_mysql56/ib_logfile0
50331648 /mdata/data80/ib_logfile1
[root@centos7 ~]# du -a /mdata |sort -n -r |head -n 10
1251348	/mdata
561640	/mdata/data80
238288	/mdata/data80/employees
178332	/mdata/data_mysql80
143360	/mdata/data80/employees/salaries.ibd
136800	/mdata/data1
136784	/mdata/data2
124464	/mdata/mysql_test_data
113328	/mdata/data_mysql56
77824	/mdata/data80/ibdata1
[root@centos7 ~]#
```

	
Have a good work&life! 2022/03 via LinHong



