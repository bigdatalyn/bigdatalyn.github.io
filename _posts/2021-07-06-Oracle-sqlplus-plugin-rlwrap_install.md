---
layout: post
title: "Oracle sqlplus plugin rlwrap install Tips"
category: Oracle
tags: Oracle sqlplus Tips
---

* content
{:toc}

Oracle sqlplus plugin rlwrap install Tips



### 1. Download RPM PBone rpm file
rlwrap download site: 
http://rpm.pbone.net/

    wget ftp://ftp.pbone.net/mirror/archive.fedoraproject.org/epel/6/x86_64/Packages/r/rlwrap-0.42-1.el6.x86_64.rpm

rlwrap_ext download site:
http://www.linuxification.at/rlwrap_ext.html.en

    wget http://www.linuxification.at/download/rlwrap-extensions-V12-0.01.tar.gz

### 2. Install rpm via root user
rpm install
eg: redhat 6 

    rpm -ivh rlwrap-0.42-1.el6.x86_64.rpm

### 3. Setting

create tab key file

    $HOME/.oracle_keywords

alias sqlplus in .bashrc/.bash_profile

    alias sqlplus='/usr/bin/rlwrap -if $HOME/.oracle_keywords $ORACLE_HOME/bin/sqlplus'

we can use $HOME/.oracle_keywords to customize our tab key word.

The other way is using rlwrap_ext to extend our keyword in sqlplus by the following way.

Copy rlwrap_ext via root user

    cp rlwrap-extensions-V12-0.01.tar.gz /usr/share/rlwrap/completions
    cd /usr/share/rlwrap/completions
    tar ztvf rlwrap-extensions-V12-0.01.tar.gz
    tar zxvf rlwrap-extensions-V12-0.01.tar.gz 
    vi sql+
    
before:

    R_HOME=${RLWRAP_HOME:=/usr/local/share/rlwrap/completions}
After:

    R_HOME=${RLWRAP_HOME:=/usr/share/rlwrap/completions}

    cp -p sql+ asm+ /usr/local/bin

    [oracle@edtkrVMp0 ~]$ which sql+
    /usr/local/bin/sql+
    [oracle@edtkrVMp0 ~]$ which asm+
    /usr/local/bin/asm+
    [oracle@edtkrVMp0 ~]$ 

Have a good work&life! 2021/07 via LinHong