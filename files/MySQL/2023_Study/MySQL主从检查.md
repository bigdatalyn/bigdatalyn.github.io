

#!/usr/bin/env python
# -*- coding: UTF-8 -*-
#脚本需要和 pt-table-checksum一起使用
#通过监控pt-table-checksum生产的checksums表来确认表是否一致
#脚本要在主库执行

import smtplib
from email.mime.text import MIMEText
import time,datetime
import os,sys
import MySQLdb as mdb

mail_host = ''
mail_user = ''
mail_postfix = ''



def check_info():
    try:
        #这里要连接从库
        con = mdb.connect(host='',user='',passwd='',db='test',port=3306)
        cur = con.cursor()
        sql = "select * from checksums where this_crc not in (select master_crc from checksums  )"
        cur.execute(sql)
        res = cur.fetchall()
        con.close()
        return res
    except Exception,e:
        print e

def send_mail(mail_to,subject,content):
    me = mail_user+"<"+mail_user+"@"+mail_postfix+">"
    msg = MIMEText(content,'html','utf-8')
    msg["subject"] = subject
    msg["From"] = me
    global sendstatus
    global senderr

    try:
        smtp = smtplib.SMTP()
        smtp.connect(mail_host)
        smtp.login(mail_user,mail_pass)
        smtp.sendmail(me,mail_to,msg.as_string())
        smtp.close()
        sendstatus = True
        print 'send ok'
    except Exception,e:
        senderr = str(e)
        print senderr
        endstatus = False

if __name__ == "__main__":
    cmd = "pt-table-checksum  --nocheck-replication-filters --no-check-binlog-format --replicate=test.checksums h='',u='',p='',P=3306,S=/tmp/mysql3306.sock -d test "
    os.system(cmd)
    mail_to = ['573242930@qq.com']
    subject = '主从表数据不一致'
    result = check_info()
    nowtime = time.strftime( '%Y-%m-%d %X', time.localtime() )
    output = ''
    if result:
        for m in result:
            output += "库名：%s </br>" %m[0]
            output += "表名：%s </br>" %m[1]
        content = "%s </br>%s" % (nowtime,output)
        send_mail(mail_to,subject,content)


        