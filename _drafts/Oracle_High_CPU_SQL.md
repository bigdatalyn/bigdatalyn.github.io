

Oracle 一种CPU高定位会话的诊断思路

很多时候,系统CPU资源使用率高通常都是由于SQL导致的.所以找到这些问题SQL通常也就找到了问题所在.

思路如下:
1.通过top工具直接定位到高CPU耗用的进程PID

top / ps -ef 
oracleora11g1 (LOCAL=NO)

2.如果这些进程是远程连接数据库的进程,我们就可以通过系统层面PID和v$process.spid相关联.

select addr from v$process where spid=xxx

3.进而再通过v$ process.addr和v$session.paddr相关联,就可以定位问题session

select sid,serial#,event,sql_id from v$process a,v$session b where a.addr=b.paddr;

4.最后再结合v$sqltext,即可获得当前session正在执行的SQL语句.并对SQL语句进行分析优化等处理.

select sql_text from v$sqltext where sql_id = xxx

也可以将v$ process,v$ session,v$ sqltext同时进行关联:

select sql_text from 
v$ sqltext a,v$ session b,v$process c 
where a.sql_id=b.sql_id 
and b.paddr=c.addr 
and c.spid=xxx;

需要其他字段信息自己添加即可
如果我们发现这些最消耗CPU的进程是后台进程,这一般是由于异常,BUG等导致的.还需要进一步分析.

