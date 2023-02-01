


【python】一个极其简易的数据库跳板机

前言：DBA日常运维除了通过自动化平台来进行日常操作以外，免不了还是会登陆到实例上进行操作，今天花了点时间写了个极其简易的数据库跳板机。

```
#建库：
create database jumpmysql 

#建表：
CREATE TABLE `mysql_server` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(50) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `soketdir` varchar(50) DEFAULT NULL,
  `datadir` varchar(50) DEFAULT NULL,
  `mysql_user` varchar(20) DEFAULT NULL,
  `mysql_pass` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `info` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8
1 row in set (0.00 sec)

#插入测试数据：
insert into mysql_server values(1,'xxx主库','10.100.xx.xxx',3306,'/storage/mysql/mysql.sock','/storage/mysql/data/','xxx','123456',1,'xxx主库');
insert into mysql_server values(2,'xxx备库','10.100.xx.xxx',3306,'/storage/mysql/mysql.sock','/storage/mysql/data/','xxx','123456',1,'xxx备库');
```



```
#!/usr/bin/env python
#-*- coding:utf-8 -*-
import os
import MySQLdb as mdb
from passde import encrypt, decrypt

conn = mdb.connect(host='127.0.0.1', port=3306, user='test', passwd=decrypt('e51bc8b1c7f3810573d0fb9d7c2f8c01'), db='jumpmysql', charset='utf8')

while True :
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM mysql_server")
    servers = cursor.fetchall()

    for server in servers:
          id = server[0]
          ip = server[2]
          port = server[3]
          tag = server[1]
             # 打印结果
          print "\033[1;33;44m %d \033[0m: %s  %d %s" % \
                 (id, ip, port, tag)

    serverid = raw_input("请选择实例ID：")

   #获取连接信息
    SQL = "SELECT ip,port,mysql_user,mysql_pass FROM mysql_server where id= {SERVER_ID}".format(SERVER_ID=serverid)

    cursor.execute(SQL)
    data = cursor.fetchone()
    host = data[0]
    port = data[1]
    user = data[2]
    password =  decrypt(str(data[3]))

    connectinfo = "mysql -h %s -P%d -u%s -p%s" % (host, port, user, password)
    try:
        os.system(connectinfo)
    except:
        print "信息错误，请重试！
```

加密解密脚本

```
[root@localhost src]# cat passde.py
# -*- coding:utf-8 -*-
#!/usr/bin/env python

from Crypto.Cipher import AES
from binascii import b2a_hex,a2b_hex
# from deveops.settings import SECRET_KEY
SECRET_KEY = '1x$!#dwp2_6^tdgs1nv8pwgutbc#4m%#qaz!m!0h_f*%6fp+vt'
KEY = SECRET_KEY
KEY_LENGTH=16
def encrypt(text):
    # 这里密钥key 长度必须为16（AES-128）、24（AES-192）、或32（AES-256）Bytes 长度.目前AES-128足够用
    cryptor = AES.new(KEY[0:KEY_LENGTH], AES.MODE_CBC, KEY[0:KEY_LENGTH])
    length = KEY_LENGTH
    count = len(text)
    add = length - (count % length)
    text = text + ('\0' * add)
    ciphertext = cryptor.encrypt(text)
    # 因为AES加密时候得到的字符串不一定是ascii字符集的，输出到终端或者保存时候可能存在问题
    # 所以这里统一把加密后的字符串转化为16进制字符串
    return b2a_hex(ciphertext)

def decrypt(text):
    cryptor = AES.new(KEY[0:16], AES.MODE_CBC, KEY[0:16])
    plain_text = cryptor.decrypt(a2b_hex(text))
    return plain_text.rstrip('\0')

if __name__ == '__main__':
    e = encrypt("123456")
    d = decrypt('e51bc8b1c7f3810573d0fb9d7c2f8c01')
    print e, d
```