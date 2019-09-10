---
layout: post
title: "Oracle 12c PDB LOCKDOWN Profiles Tips"
category: Oracle
tags: Oracle Tips 12c
---

* content
{:toc}


Oracle 12c PDB LOCKDOWN Profiles Tips


```
[oracle@testdb] $ oraversion -help

These are its possible arguments:

 -compositeVersion: Print the full version number: a.b.c.d.e.

 -baseVersion: Print the base version number: a.0.0.0.0.

 -majorVersion: Print the major version number: a.

 -buildStamp: Print the date/time associated with the build.

 -buildDescription: Print a description of the build.

 -libVersion: Print the library version number.

 -help: Print this message.

[oracle@testdb] $ oraversion -baseVersion
18.0.0.0.0

[oracle@testdb] $ oraversion -compositeVersion
18.3.0.0.0

[oracle@testdb] $ oraversion -majorVersion
18

[oracle@testdb] $ oraversion -libVersion


[oracle@testdb] $ oraversion -buildDescription
Release_Update

[oracle@testdb] $ oraversion -buildStamp
180813205634

```
[Oracle Database 12.2 New Feature – PDB Lockdown Profiles](https://gavinsoorma.com/2017/04/oracle-database-12-2-new-feature-pdb-lockdown-profiles/)

[Having fun with PDB LOCKDOWN PROFILES ](https://orablogs-jp.blogspot.com/2017/01/having-fun-with-pdb-lockdown-profiles.html)

[oracle 12cR2新特性-PDB lockdown profile](http://www.dboracle.com/archivers/oracle-12cr2%E6%96%B0%E7%89%B9%E6%80%A7-pdb-lockdown-profile.html)

Have a good work&life! 2019/09 via LinHong




