#!/usr/bin/env python
#_*_ coding:utf-8 _*_

import csv
import getpass
import os

cnt = 0
count = 3
flag = 0
while cnt < count:
	cnt += 1
	_username = raw_input("Your Name:")
	_password = getpass.getpass("Password:")

	with open('list.csv','rb') as csvfile:
		reader = csv.reader(csvfile)
		flag = 0
		for i,rows in enumerate(reader):
			row = rows
			if row[0] == _username:
				flag = 1
				if int(row[2]) >= 3:
					print "This user[%s] is Lock. Please check with system administrator." %(_username)
					break
				if row[1] == _password:
					flag = 2
					print "Welcome to XXXX system."
					break
				else:
					print "The user[%s]'s password is wrong." % (_username)
	
	if flag == 0:
		print "There is NOT %s person." %(_username)
	if flag == 2:
		break

	#input = raw_input()

else:
	print "You had tried %s times!" % (cnt)


csvfile.close()

