---
layout: post
title: "[原创]自动发送邮件脚本"
date:   2016-04-18 16:36:00
category: Shell
tags: 脚本 scripts mail
---

* content
{:toc}

公司时不时要抽查部门员工的个人电脑，是否违反了公司一些安全规定，如安装不必要的软件和浏览不必要的网站。需要部门发送自检的工具的report。
随机性的不好人为的判断和主观色彩，所以写了个随机抽取部门的一个mail，然后发送邮件提醒他做一次report。




### 构建一些表

db2inst1实例下创建：

cd

如下表做一个members.csv的成员列表

	id int not null primary key,
	chinese_name varchar(30),
	english_name varchar(30),
	company_id varchar(30),
	internet_mail varchar(30),
	company_id_dis varchar(30),
	employee_id char(10)

members.csv

	cat << 'EOF' > ./members.csv
	1,AAA,BBBB,678,aaa@bb.com,GD,123456
	2,CCC,DDDD,678,ccc@dd.com,GD,123457
	EOF

 
修改权限：
	
	chmod 755 members.csv


连接数据库进行创建	members和随机查找list：
	
	db2 connect sample

	db2 -v "create table members(id int not null primary key,
	chinese_name varchar(30),
	english_name varchar(30),
	company_id varchar(30),
	internet_mail varchar(30),
	company_id_dis varchar(30),
	employee_id char(10)
	)"

	db2 "create table members like members"
	db2 "alter table members add column ts timestamp add column msg clob(32k)"
	db2 describe table members
	db2 "load from members.csv of DEL modified by dumpfile=/dbhome/db2inst1/members.dmp messages members.msg insert into members for exception members"
	db2 backup db sample to /dev/null
	db2 "create table checklist(id integer not null generated always as identity (start with 1, increment by 1),order varchar(10),checkdate varchar(40))";
	db2 "insert into checklist(order,checkdate) select int(rand()*19)+1,current timestamp from sysibm.sysdummy1"

 

之后可以通过下面三个语句抽查

	db2 "select * from checklist"

	db2 "select order,checkdate from checklist where id = (select max(id) from checklist)"
	db2 "insert into checklist(order,checkdate) select int(rand()*19)+1,current timestamp from sysibm.sysdummy1"

	db2 "select * from checklist"
	db2 "select order,checkdate from checklist where id = (select max(id) from checklist)"
	db2 "with checkperson(id,checkdate) as ( select order,checkdate from checklist where id = (select max(id) from checklist) ) select t1.id,t1.chinese_name,t1.english_name,t1.employee_id,t1.internet_mail,t2.checkdate from members t1,checkperson t2 where t1.id = t2.id " 

### 发送邮件脚本：



发送脚本如下：

CyberNoticeCheck_Ver1.0.sh

	#!/bin/sh

	#Use: send mail for security check
	#Prepared By: Lin


	DBname=sample
	CheckTime=$(date "+%Y%m%d-%H%M%s")

	rm -rf RandomcheckResult.sql > /dev/null 2>&1

	cat << EOF > RandomcheckResult.sql  
	insert into checklist(order,checkdate) select int(rand()*19)+1,current timestamp from sysibm.sysdummy1
	select order,checkdate from checklist where id > (select max(id) from checklist) - 5
	with checkperson(id,checkdate) as ( select order,checkdate from checklist where id = (select max(id) from checklist) ) select t1.id,t1.chinese_name,t1.english_name,t1.employee_id,t1.internet_mail,t2.checkdate from members t1,checkperson t2 where t1.id = t2.id

	EOF

	db2 connect to $DBname
	db2 -of RandomcheckResult.sql > MailReport_${CheckTime}_1.rpt
	db2 terminate

	rm -rf checkWhoTurn.sql  > /dev/null 2>&1


	cat << EOF > checkWhoTurn.sql
	with checkperson(id,checkdate) as ( select order,checkdate from checklist where id = (select max(id) from checklist) ) select t1.internet_mail from members t1,checkperson t2 where t1.id = t2.id

	EOF

	db2 connect to $DBname
	db2 -of checkWhoTurn.sql > MailWhoTurn_${CheckTime}_1.rpt
	db2 terminate

	whoturn=`sed -n '4p' MailWhoTurn_${CheckTime}_1.rpt | tr -d " "`

	TO_ADDRESS="${whoturn},bbbb@ccc.com"
	FROM_ADDRESS="sender@yourdomain.com"
	SUBJECT="[Remind]CyberSecurityCheck-Test"
	CC_LIST="aaaa@dddd.com"


	rm -rf MailContents.txt > /dev/null 2>&1

	cat << EOF > MailContents.txt


	To : ${TO_ADDRESS}
	Subject : ${SUBJECT}
	Cc : ${CC_LIST}

	Hi,

	This is Remind E-mail message from SecurityCheckAutoRamdonNoticeTool.

	It's your turn to do the Cyber Security Check and send the results report to Security Focal:DDDDDDDD.

	EOF

	cat MailReport_${CheckTime}_1.rpt >> MailContents.txt

	cat << EOF >> MailContents.txt

	About the Company policy knowledge,you can confirm with EEEEEEE.

	Yours sincerely

	$(date)

	EOF


	mail -s ${SUBJECT} -c ${CC_LIST} ${TO_ADDRESS} < MailContents.txt

	exit 0 

### 在Cron追加item定时执行


cron的使用


crontab文件的含义：

用户所建立的crontab文件中，每一行都代表一项任务，每行的每个字段代表一项设置，它的格式共分为六个字段，前五段是时间设定段，第六段是要执行的命令段，格式如下：

minute   hour   day   month   week   command

其中：

minute： 表示分钟，可以是从0到59之间的任何整数。

hour：表示小时，可以是从0到23之间的任何整数。

day：表示日期，可以是从1到31之间的任何整数。

month：表示月份，可以是从1到12之间的任何整数。

week：表示星期几，可以是从0到7之间的任何整数，这里的0或7代表星期日。

command：要执行的命令，可以是系统命令，也可以是自己编写的脚本文件。


---

