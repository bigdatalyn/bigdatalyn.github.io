
https://blog.csdn.net/eagle89/article/details/89384273#comments_24831888

```
1，临时紧急抓取

SHOW FULL PROCESSLIST; #查看MySQL 在运行的线程；多执行几次，有相同语句，就可能是SQL慢查询语句；

这个命令中最关键的就是state列，mysql列出的状态主要有以下几种：

Checking table   #正在检查数据表（这是自动的）。 

Closing tables   #正在将表中修改的数据刷新到磁盘中，同时正在关闭已经用完的表。这是一个很快的操作，如果不是这样的话，就应该确认磁盘空间是否已经满了或者磁盘是否正处于重负中。 

Connect Out      #复制从服务器正在连接主服务器。 

Copying to tmp table on disk #由于临时结果集大于 tmp_table_size，正在将临时表从内存存储转为磁盘存储以此节省内存。 

Creating tmp table #正在创建临时表以存放部分查询结果。 

deleting from main table #服务器正在执行多表删除中的第一部分，刚删除第一个表。 

deleting from reference tables  #服务器正在执行多表删除中的第二部分，正在删除其他表的记录。 

Flushing tables  #正在执行 FLUSH TABLES，等待其他线程关闭数据表。 

Killed   #发送了一个kill请求给某线程，那么这个线程将会检查kill标志位，同时会放弃下一个kill请求。MySQL会在每次的主循环中检查kill标志 

位，不过有些情况下该线程可能会过一小段才能死掉。如果该线程程被其他线程锁住了，那么kill请求会在锁释放时马上生效。 

Locked    #被其他查询锁住了。 

Sending data  #正在处理 SELECT 查询的记录，同时正在把结果发送给客户端。 

Sorting for group #正在为 GROUP BY 做排序。 

Sorting for order  #正在为 ORDER BY 做排序。 

Opening tables  #这个过程应该会很快，除非受到其他因素的干扰。例如，在执 ALTER TABLE 或 LOCK TABLE 语句行完以前，数据表无法被其他线程打开。 正尝试打开一个表。 

Removing duplicates  #正在执行一个 SELECT DISTINCT 方式的查询，但是MySQL无法在前一个阶段优化掉那些重复的记录。因此，MySQL需要再次去掉重复的记录，然后再把结果发送给客户端。 

Reopen table #获得了对一个表的锁，但是必须在表结构修改之后才能获得这个锁。已经释放锁，关闭数据表，正尝试重新打开数据表。 

Repair by sorting #修复指令正在排序以创建索引。 

Repair with keycache #修复指令正在利用索引缓存一个一个地创建新索引。它会比 Repair by sorting 慢些。 

Searching rows for update  #正在讲符合条件的记录找出来以备更新。它必须在 UPDATE 要修改相关的记录之前就完成了。 

Sleeping #正在等待客户端发送新请求. 

System lock #正在等待取得一个外部的系统锁。如果当前没有运行多个mysqld服务器同时请求同一个表，那么可以通过增加 --skip-external-locking参数来禁止外部系统锁。 

Upgrading lock 

INSERT DELAYED #正在尝试取得一个锁表以插入新记录。 

Updating #正在搜索匹配的记录，并且修改它们。 

INSERT DELAYED #已经处理完了所有待处理的插入操作，正在等待新的请求。

总结：

一般简单查询都应该2秒内完成，如果超时可能就存在异常

另外，上面的状态 大多数都是出现问题后，为排错提供，类似错误码；

1、 show PROCESSLIST;
 
2、查看当前有哪些表是打开
show open tables  where In_use > 0;;
或者通过指定数据库来减少返回条数：show open tables from database;
 
3、查看服务器状态。
show status like ‘%lock%’
 
4、查看innodb引擎的运行时信息。查看造成死锁的sql语句，分析索引情况，然后优化sql语句

show engine innodb statusG;

5、查看超时时间

show variables like '%timeout%'

6、查询 正在执行的事务

SELECT * FROM information_schema.INNODB_TRX

7、查看正在锁的事务

SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCKS;

8、查看等待锁的事务

SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCK_WAITS;

9、完整SQL
SELECT a.*, c.thread_id, c.sql_text from information_schema.processlist a
LEFT JOIN performance_schema.threads b on a.id = b.PROCESSLIST_ID
LEFT JOIN performance_schema.events_statements_current c on c.THREAD_ID = b.THREAD_ID;

```


