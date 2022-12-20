---
layout: post
title: "Oracle 23c export table data to csv via sql Tips"
category: Oracle
tags: Oracle 23c Tips
---

* content
{:toc}

Oracle 23c export table data to csv via sql Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	







### Export data to csv via sql

[How to unload table data to csv file - fastest way for millions of records](https://asktom.oracle.com/pls/apex/f?p=100:11:0::::P11_QUESTION_ID:9536328100346697722)

```
You can take advantage of the CSV sql format in SQLcl to pump your data out in that format. And use a parallel hint to have many processes running your query. Then you just need to spool the output:
```

```
[oracle@ol8-23c ~]$ source .bash_profile
[oracle@ol8-23c ~]$ echo $ORACLE_HOME
/u01/app/oracle/product/23.0.0/dbhome_1
[oracle@ol8-23c ~]$ cat 1.sql 
set term off
set feed off
set sqlformat csv
spool out.csv
select /*+ parallel(2) */* from t1 where rownum < 100;
spool off
exit
[oracle@ol8-23c ~]$ cat exp01.sh 
#!/bin/bash

CONN_STR="hong/oracle@pdb1"
$ORACLE_HOME/sqldeveloper/sqldeveloper/bin/sql $CONN_STR @/home/oracle/1.sql

exit 0
[oracle@ol8-23c ~]$ nohup sh exp01.sh &
[1] 120207
[oracle@ol8-23c ~]$ nohup: ignoring input and appending output to 'nohup.out'
[oracle@ol8-23c ~]$ 
[1]+  Done                    nohup sh exp01.sh
[oracle@ol8-23c ~]$
```


[Parallel PL/SQL with DBMS_PARALLEL_EXECUTE](https://seanstuber.com/2013/10/17/parallel-plsql-with-dbms_parallel_execute/)

### Reference 

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


