---
layout: post
title: "Oracle MacOS SqlDevelper Tips"
category: Oracle
tags: Oracle sqldeveloper Tips
---

* content
{:toc}

Oracle MacOS SqlDevelper Tips







### Error in Install SQLDeveloper in MacOS

```
mac SQL Developer supports Java SE 8 and 11 .  Java SE can be downloaded from:
```

### Fix Steps

Step tips:

```
mymac ~ % /usr/libexec/java_home -V
Matching Java Virtual Machines (1):
    16.0.1 (x86_64) "Oracle Corporation" - "Java SE 16.0.1" /Library/Java/JavaVirtualMachines/jdk-16.0.1.jdk/Contents/Home
/Library/Java/JavaVirtualMachines/jdk-16.0.1.jdk/Contents/Home
mymac ~ %

mymac ~ % /usr/libexec/java_home -F -v 16.0.1
/Library/Java/JavaVirtualMachines/jdk-16.0.1.jdk/Contents/Home
mymac-mac ~ %

mymac-mac ~ % cd /Applications/SQLDeveloper.app/Contents/MacOS/
mymac-mac MacOS % cp sqldeveloper.sh sqldeveloper.sh.init
mymac-mac MacOS % vi sqldeveloper.sh
mymac-mac MacOS % diff sqldeveloper.sh sqldeveloper.sh.init
19,20c19
<     #APP_JAVA_HOME=`/usr/libexec/java_home -F -v 1.8.0`
<     APP_JAVA_HOME=`/usr/libexec/java_home -F -v 16.0.1`
---
>     APP_JAVA_HOME=`/usr/libexec/java_home -F -v 1.8.0`
mymac-mac MacOS %
```

### Reference

[Java SE Development Kit 16 Downloads](https://www.oracle.com/java/technologies/javase-jdk16-downloads.html)


[SQL Developer 21.2 Downloads](https://www.oracle.com/tools/downloads/sqldev-downloads.html)
Version 21.2.0.187.1842 - July 14, 2021


https://www.talkapex.com/2020/11/sqldeveloper-in-macos-big-sur/

List your Java Versions
```
/usr/libexec/java_home -V
```

Remove the Applet Plugin
```
sudo rm -rf "/Library/Internet Plug-Ins/JavaAppletPlugin.plugin/"
```


Have a good work&life! 2021/07 via LinHong
