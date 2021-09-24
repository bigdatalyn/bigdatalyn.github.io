---
layout: post
title: "Oracle Reset Linux 8 Root password Tips"
category: Oracle
tags: Oracle linux Tips
---

* content
{:toc}


Reset root password on Oracle Linux 8


### Reset Tips

- Reboot the system and access the `GRUB` boot-loader menu. 

- Find the line that begins `linux` and scroll to the very end of the line.

- Add the following parameter: `rd.break` to the end of this line.

- Press `Ctrl -X` to start your system.

- Shell prompt `switch_root:/#`

- Type the following commands:

```
mount -o remount,rw /sysroot
chroot /sysroot
passwd
-> input new password twice.
```

- Run the following commands to relabel SELinux at reboot.

```
touch /.autorelabel
exit
exit
```

- Reboot and login via new password.


Have a good work&life! 2021/09 via LinHong

