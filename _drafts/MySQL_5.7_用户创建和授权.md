
[root@ol8mysql01 msb_5_7_26]# mysql -uroot -pmsandbox -S/tmp/mysql_sandbox5726.sock
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 4
Server version: 5.7.26 MySQL Community Server (GPL)

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
mysql> select Host,User,authentication_string,password_expired,account_locked from mysql.user;
+-----------+---------------+-------------------------------------------+------------------+----------------+
| Host      | User          | authentication_string                     | password_expired | account_locked |
+-----------+---------------+-------------------------------------------+------------------+----------------+
| localhost | root          | *E74858DB86EBA20BC33D0AECAE8A8108C56B17FA | N                | N              |
| localhost | mysql.session | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | N                | Y              |
| localhost | mysql.sys     | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | N                | Y              |
| 127.%     | msandbox      | *6C387FC3893DBA1E3BA155E74754DA6682D04747 | N                | N              |
| localhost | msandbox      | *6C387FC3893DBA1E3BA155E74754DA6682D04747 | N                | N              |
| localhost | msandbox_rw   | *6C387FC3893DBA1E3BA155E74754DA6682D04747 | N                | N              |
| 127.%     | msandbox_rw   | *6C387FC3893DBA1E3BA155E74754DA6682D04747 | N                | N              |
| 127.%     | msandbox_ro   | *6C387FC3893DBA1E3BA155E74754DA6682D04747 | N                | N              |
| localhost | msandbox_ro   | *6C387FC3893DBA1E3BA155E74754DA6682D04747 | N                | N              |
| 127.%     | rsandbox      | *B07EB15A2E7BD9620DAE47B194D5B9DBA14377AD | N                | N              |
| %         | root          | *E74858DB86EBA20BC33D0AECAE8A8108C56B17FA | N                | N              |
+-----------+---------------+-------------------------------------------+------------------+----------------+
11 rows in set (0.00 sec)

mysql> grant select on mysql.user to 'abc'@'localhost';
ERROR 1290 (HY000): The MySQL server is running with the --skip-grant-tables option so it cannot execute this statement
mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> grant select on mysql.user to 'abc'@'localhost';
ERROR 1133 (42000): Can't find any matching row in the user table
mysql> grant select on mysql.user to 'abc'@'localhost';
ERROR 1133 (42000): Can't find any matching row in the user table
mysql> create user 'abc'@'localhost';
Query OK, 0 rows affected (0.00 sec)

mysql> grant select on mysql.user to 'abc'@'localhost';
Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> select Host,User,authentication_string,password_expired,account_locked from mysql.user;
+-----------+---------------+-------------------------------------------+------------------+----------------+
| Host      | User          | authentication_string                     | password_expired | account_locked |
+-----------+---------------+-------------------------------------------+------------------+----------------+
| localhost | root          | *E74858DB86EBA20BC33D0AECAE8A8108C56B17FA | N                | N              |
| localhost | mysql.session | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | N                | Y              |
| localhost | mysql.sys     | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | N                | Y              |
| 127.%     | msandbox      | *6C387FC3893DBA1E3BA155E74754DA6682D04747 | N                | N              |
| localhost | msandbox      | *6C387FC3893DBA1E3BA155E74754DA6682D04747 | N                | N              |
| localhost | msandbox_rw   | *6C387FC3893DBA1E3BA155E74754DA6682D04747 | N                | N              |
| 127.%     | msandbox_rw   | *6C387FC3893DBA1E3BA155E74754DA6682D04747 | N                | N              |
| 127.%     | msandbox_ro   | *6C387FC3893DBA1E3BA155E74754DA6682D04747 | N                | N              |
| localhost | msandbox_ro   | *6C387FC3893DBA1E3BA155E74754DA6682D04747 | N                | N              |
| 127.%     | rsandbox      | *B07EB15A2E7BD9620DAE47B194D5B9DBA14377AD | N                | N              |
| %         | root          | *E74858DB86EBA20BC33D0AECAE8A8108C56B17FA | N                | N              |
| localhost | abc           |                                           | N                | N              |
+-----------+---------------+-------------------------------------------+------------------+----------------+
12 rows in set (0.00 sec)

mysql> 
