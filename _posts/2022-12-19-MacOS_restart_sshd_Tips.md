---
layout: post
title: "MacOS restart ssh Tips"
category: Linux
tags: Linux ssh Tips
---

* content
{:toc}

MacOS restart ssh Tips

```
 % sudo launchctl list | grep ssh
 % sudo launchctl load -w /System/Library/LaunchDaemons/ssh.plist 
 % sudo launchctl list | grep ssh                                
-	0	com.openssh.sshd
 % sudo launchctl unload /System/Library/LaunchDaemons/ssh.plist
 % sudo launchctl list | grep ssh                               
 % sudo launchctl load -w /System/Library/LaunchDaemons/ssh.plist
 % sudo launchctl list | grep ssh                                
-	0	com.openssh.sshd
 % sudo systemsetup -getremotelogin 
Remote Login: On
 % 
```



### Reference 

[11.2.3 Encryption of Tablespaces in an Oracle Data Guard Environment](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/asoag/using-transparent-data-encryption-with-other-oracle-features.html#GUID-68EE178A-6B6C-497A-B720-052FB23B5794)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


