---
layout: post
title: "Oracle 19c mac os Client install Tips"
category: Oracle
tags: Oracle 19c Tips
---

* content
{:toc}

Oracle 19c mac os Client install Tips






### Download

Download the following packages.

- instantclient-basic-macos.x64-19.8.0.0.0dbru.dmg
- instantclient-tools-macos.x64-19.8.0.0.0dbru.dmg
- instantclient-sqlplus-macos.x64-19.8.0.0.0dbru.dmg

[Oracle Instant Client Downloads for macOS (Intel x86)](https://www.oracle.com/database/technologies/instant-client/macos-intel-x86-downloads.html)

### Problem

```
“libsqlplus.dylib” cannot be opened because the developer cannot be verified.
```
Fix:
```
mac-os : System Preferences / General / Allow apps downloaded from ...
```
### Install by following the dmg's readme

Install like the following steps
```
1. In Finder, double click on all desired Instant Client .dmg packages to mount them

2. Open a terminal window and change directory to one of the packages, for example:
   $ cd /Volumes/instantclient-basic-macos.x64-19.8.0.0.0dbru

3. Run the install_ic.sh script:
   $ ./install_ic.sh
   This copies the contents of all currently mounted Instant Client .dmg packages to /User/$USER/Downloads/instantclient_19_8

4. In Finder, eject the mounted Instant Client packages
```

### Mac-os user profile

Edit .bash_profile and add the following contents.
```shell
vi .bash_profile

# oracle client 19.8
export ORACLE_HOME=/Users/lin/instantclient_19_8
export DYLD_LIBRARY_PATH=$ORACLE_HOME
export LD_LIBRARY_PATH=$ORACLE_HOME
export PATH=/Users/lin/instantclient_19_8:$PATH

source ~/.bash_profile
```

Test
```sql
lin@lin-mac ~ % sqlplus hong/oracle@192.168.56.22:1521/pdb1

SQL*Plus: Release 19.0.0.0.0 - Production on Wed Aug 18 18:25:29 2021
Version 19.8.0.0.0

Copyright (c) 1982, 2020, Oracle.  All rights reserved.

Last Successful login time: Wed Aug 18 2021 18:24:56 +08:00

Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.10.0.0.0

SQL>
```

### Others Error: Your CLT does not support macOS 11.4.

```
lin@lin-mac admin % brew install rlwrap
Updating Homebrew...
Warning: You are using macOS 11.4.
We do not provide support for this pre-release version.
You will encounter build failures with some formulae.
Please create pull requests instead of asking for help on Homebrew's GitHub,
Discourse, Twitter or IRC. You are responsible for resolving any issues you
experience while you are running this pre-release version.

==> Downloading https://ftp.gnu.org/gnu/autoconf/autoconf-2.69.tar.gz
######################################################################## 100.0%
==> Downloading https://git.savannah.gnu.org/cgit/config.git/snapshot/config-0b5188819ba6091770064adf26360b204113317e.tar.gz
 -=#=-#  #    #
==> Downloading https://ftp.gnu.org/gnu/automake/automake-1.16.2.tar.xz
######################################################################## 100.0%
==> Downloading https://ftp.gnu.org/gnu/readline/readline-8.0-patches/readline80-001
######################################################################## 100.0%
==> Downloading https://ftp.gnu.org/gnu/readline/readline-8.0-patches/readline80-002
######################################################################## 100.0%
==> Downloading https://ftp.gnu.org/gnu/readline/readline-8.0-patches/readline80-003
######################################################################## 100.0%
==> Downloading https://ftp.gnu.org/gnu/readline/readline-8.0-patches/readline80-004
######################################################################## 100.0%
==> Downloading https://ftp.gnu.org/gnu/readline/readline-8.0.tar.gz
######################################################################## 100.0%
==> Downloading https://github.com/hanslub42/rlwrap/archive/v0.43.tar.gz
==> Downloading from https://codeload.github.com/hanslub42/rlwrap/tar.gz/v0.43
   -#O=#   #   #
Error: Your CLT does not support macOS 11.4.
It is either outdated or was modified.
Please update your CLT or delete it if no updates are available.
lin@lin-mac admin %
```

Fix:

brew update-reset to fix Error: Your CLT does not support macOS 11.4.

```
lin@lin-mac ~ % brew update-reset
==> Fetching /usr/local/Homebrew...
remote: Enumerating objects: 31754, done.
remote: Counting objects: 100% (31754/31754), done.
remote: Compressing objects: 100% (7352/7352), done.
remote: Total 31754 (delta 23512), reused 31752 (delta 23511)s
Receiving objects: 100% (31754/31754), 11.03 MiB | 10.24 MiB/s, done.
Resolving deltas: 100% (23512/23512), completed with 975 local objects.
From git://mirrors.ustc.edu.cn/brew
   488a43ecd..3573ff8d5  master     -> origin/master
 * [new tag]             2.5.10     -> 2.5.10
 * [new tag]             2.5.11     -> 2.5.11
 * [new tag]             2.5.12     -> 2.5.12
 * [new tag]             2.5.9      -> 2.5.9
 * [new tag]             2.6.0      -> 2.6.0
 * [new tag]             2.6.1      -> 2.6.1
 * [new tag]             2.6.2      -> 2.6.2
 * [new tag]             2.7.0      -> 2.7.0
 * [new tag]             2.7.1      -> 2.7.1
 * [new tag]             2.7.2      -> 2.7.2
 * [new tag]             2.7.3      -> 2.7.3
 * [new tag]             2.7.4      -> 2.7.4
 * [new tag]             2.7.5      -> 2.7.5
 * [new tag]             2.7.6      -> 2.7.6
 * [new tag]             2.7.7      -> 2.7.7
 * [new tag]             3.0.0      -> 3.0.0
 * [new tag]             3.0.1      -> 3.0.1
 * [new tag]             3.0.10     -> 3.0.10
 * [new tag]             3.0.11     -> 3.0.11
 * [new tag]             3.0.2      -> 3.0.2
 * [new tag]             3.0.3      -> 3.0.3
 * [new tag]             3.0.4      -> 3.0.4
 * [new tag]             3.0.5      -> 3.0.5
 * [new tag]             3.0.6      -> 3.0.6
 * [new tag]             3.0.7      -> 3.0.7
 * [new tag]             3.0.8      -> 3.0.8
 * [new tag]             3.0.9      -> 3.0.9
 * [new tag]             3.1.0      -> 3.1.0
 * [new tag]             3.1.1      -> 3.1.1
 * [new tag]             3.1.10     -> 3.1.10
 * [new tag]             3.1.11     -> 3.1.11
 * [new tag]             3.1.12     -> 3.1.12
 * [new tag]             3.1.2      -> 3.1.2
 * [new tag]             3.1.3      -> 3.1.3
 * [new tag]             3.1.4      -> 3.1.4
 * [new tag]             3.1.5      -> 3.1.5
 * [new tag]             3.1.6      -> 3.1.6
 * [new tag]             3.1.7      -> 3.1.7
 * [new tag]             3.1.8      -> 3.1.8
 * [new tag]             3.1.9      -> 3.1.9
 * [new tag]             3.2.0      -> 3.2.0
 * [new tag]             3.2.1      -> 3.2.1
 * [new tag]             3.2.2      -> 3.2.2
 * [new tag]             3.2.3      -> 3.2.3
 * [new tag]             3.2.4      -> 3.2.4
 * [new tag]             3.2.5      -> 3.2.5
 * [new tag]             3.2.6      -> 3.2.6
 * [new tag]             3.2.7      -> 3.2.7
 * [new tag]             3.2.8      -> 3.2.8

==> Resetting /usr/local/Homebrew...
Branch 'master' set up to track remote branch 'master' from 'origin'.
Reset branch 'master'
Your branch is up to date with 'origin/master'.

==> Fetching /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask...
remote: Enumerating objects: 98966, done.
remote: Counting objects: 100% (98966/98966), done.
remote: Compressing objects: 100% (33962/33962), done.
remote: Total 98966 (delta 68145), reused 93694 (delta 64028)
Receiving objects: 100% (98966/98966), 30.23 MiB | 11.24 MiB/s, done.
Resolving deltas: 100% (68145/68145), completed with 3299 local objects.
From https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask
   71b093c7d8..d255d170cf  master     -> origin/master
 * [new tag]               0.1        -> 0.1
 * [new tag]               0.2        -> 0.2
 * [new tag]               0.3        -> 0.3
 * [new tag]               0.4        -> 0.4
 * [new tag]               0.5        -> 0.5
 * [new tag]               0.6        -> 0.6
 * [new tag]               0.7        -> 0.7
 * [new tag]               0.7.1      -> 0.7.1
 * [new tag]               0.8        -> 0.8
 * [new tag]               0.8.1      -> 0.8.1
 * [new tag]               0.9        -> 0.9
 * [new tag]               0.9.1      -> 0.9.1
 * [new tag]               0.9.2      -> 0.9.2
 * [new tag]               0.9.3      -> 0.9.3
 * [new tag]               0.9.4      -> 0.9.4
 * [new tag]               0.9.5      -> 0.9.5

==> Resetting /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask...
Branch 'master' set up to track remote branch 'master' from 'origin'.
Reset branch 'master'
Your branch is up to date with 'origin/master'.

==> Fetching /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core...
remote: Enumerating objects: 206402, done.
remote: Counting objects: 100% (206402/206402), done.
remote: Compressing objects: 100% (53855/53855), done.
remote: Total 206402 (delta 152511), reused 206402 (delta 152511)
Receiving objects: 100% (206402/206402), 91.41 MiB | 11.07 MiB/s, done.
Resolving deltas: 100% (152511/152511), completed with 2768 local objects.
From git://mirrors.ustc.edu.cn/homebrew-core
   a73d450786..e4c6111baa  master     -> origin/master

==> Resetting /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core...
Updating files: 100% (5939/5939), done.
Branch 'master' set up to track remote branch 'master' from 'origin'.
Reset branch 'master'
Your branch is up to date with 'origin/master'.

lin@lin-mac ~ %
```

brew install rlwrap again.

```
lin@lin-mac ~ % brew install rlwrap
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/readline-8.1.big_sur.bottle.tar.gz
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/rlwrap-0.45.2.big_sur.bottle.tar.gz
######################################################################## 100.0%
==> Installing dependencies for rlwrap: readline
==> Installing rlwrap dependency: readline
==> Pouring readline-8.1.big_sur.bottle.tar.gz
🍺  /usr/local/Cellar/readline/8.1: 48 files, 1.6MB
==> Installing rlwrap
==> Pouring rlwrap-0.45.2.big_sur.bottle.tar.gz
🍺  /usr/local/Cellar/rlwrap/0.45.2: 45 files, 388.9KB
==> `brew cleanup` has not been run in 30 days, running now...
Removing: /Users/lin/Library/Caches/Homebrew/dos2unix--7.4.2.catalina.bottle.tar.gz... (108.1KB)
Removing: /Users/lin/Library/Caches/Homebrew/gettext--0.21.catalina.bottle.tar.gz... (8.5MB)
Removing: /Users/lin/Library/Caches/Homebrew/libidn2--2.3.0.catalina.bottle.tar.gz... (233.6KB)
Removing: /Users/lin/Library/Caches/Homebrew/libunistring--0.9.10.catalina.bottle.tar.gz... (1.4MB)
Removing: /Users/lin/Library/Caches/Homebrew/openssl@1.1--1.1.1h.catalina.bottle.tar.gz... (5.4MB)
Removing: /Users/lin/Library/Caches/Homebrew/readline--patch--b1aa3d2a40eee2dea9708229740742e649c32bb8db13535ea78f8ac15377394c... (1.2KB)
Removing: /Users/lin/Library/Caches/Homebrew/readline--patch--d8e5e98933cf5756f862243c0601cb69d3667bb33f2c7b751fe4e40b2c3fd069... (927B)
Removing: /Users/lin/Library/Caches/Homebrew/readline--8.0.4.tar.gz... (2.8MB)
Removing: /Users/lin/Library/Caches/Homebrew/readline--patch--36b0febff1e560091ae7476026921f31b6d1dd4c918dcb7b741aa2dad1aec8f7... (1.4KB)
Removing: /Users/lin/Library/Caches/Homebrew/readline--patch--94ddb2210b71eb5389c7756865d60e343666dfb722c85892f8226b26bb3eeaef... (2.1KB)
Removing: /Users/lin/Library/Caches/Homebrew/rlwrap--0.43.tar.gz... (158.7KB)
Removing: /Users/lin/Library/Caches/Homebrew/wget--1.20.3_2.catalina.bottle.tar.gz... (1.4MB)
Removing: /Users/lin/Library/Caches/Homebrew/automake--1.16.2.tar.xz... (1.5MB)
Removing: /Users/lin/Library/Caches/Homebrew/autoconf--2.69.tar.gz... (1.8MB)
Removing: /Users/lin/Library/Caches/Homebrew/all_commands_list.txt... (1.2KB)
Removing: /Users/lin/Library/Caches/Homebrew/Cask/visual-studio-code--1.50.1... (91.0MB)
Removing: /Users/lin/Library/Logs/Homebrew/dos2unix... (64B)
Pruned 1 symbolic links from /usr/local
lin@lin-mac ~ % which rlwrap
/usr/local/bin/rlwrap
lin@lin-mac ~ %

```
rlwrap sqlplus setting:

```
lin@lin-mac ~ % cat .bash_profile | grep sqlplus
alias sqlplus='/usr/local/bin/rlwrap sqlplus'
lin@lin-mac ~ %

```

### Ref

[Oracle Instant Client Downloads for macOS (Intel x86)](https://www.oracle.com/database/technologies/instant-client/macos-intel-x86-downloads.html)


Have a good work&life! 2021/08 via LinHong
