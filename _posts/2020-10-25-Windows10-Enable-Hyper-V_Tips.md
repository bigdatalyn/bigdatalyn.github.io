---
layout: post
title: "Windows 10 Enable Hyper-V Tips"
category: HyperV
tags: Windows HyperV Tips
---

* content
{:toc}

Windows 10 Enable Hyper-V Tips










#### Edit Hyper-V.cmd file

```shell
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del hyper-v.txt
Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
```

#### Execute Hyper-V.cmd as windows adminster

Execute Hyper-V.cmd

![Execute]({{ "/files/windows/win10_hyperV.png"}})	


#### Restart windows OS 

Enter `Y` at the end of the executing Hyper-V.cmd file.

#### Confirm the Hyper-V in control plan.

Confirm the setting of hyper-v in contorl plan.

![Execute]({{ "/files/windows/win10_hyperV_setting.png"}})	

#### VT-x is not available (VERR_VMX_NO_VMX)

VT-x is not available in virtualbox 6.1(Windows 10) like the following error.


```shell
D:\vagrant_work\vagrant_personal>vagrant up
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Importing base box 'ol7u8'...
==> default: Matching MAC address for NAT networking...
==> default: Setting the name of the VM: vagrant_personal_default_1603790824304_74774
==> default: Clearing any previously set network interfaces...
==> default: Preparing network interfaces based on configuration...
    default: Adapter 1: nat
==> default: Forwarding ports...
    default: 22 (guest) => 2222 (host) (adapter 1)
==> default: Running 'pre-boot' VM customizations...
==> default: Booting VM...
There was an error while executing `VBoxManage`, a CLI used by Vagrant
for controlling VirtualBox. The command and stderr is shown below.

Command: ["startvm", "911a6688-ab44-45d9-9656-3122e24bdca3", "--type", "gui"]

Stderr: VBoxManage.exe: error: WHvCapabilityCodeHypervisorPresent is FALSE! Make sure you have enabled the 'Windows Hypervisor Platform' feature. (VERR_NEM_NOT_AVAILABLE).
VBoxManage.exe: error: VT-x is not available (VERR_VMX_NO_VMX)
VBoxManage.exe: error: Details: code E_FAIL (0x80004005), component ConsoleWrap, interface IConsole

D:\vagrant_work\vagrant_personal>

```

Solution set hypervisorlaunchtype：

```
Step 1. Open CMD as administer.
Step 2. Enter bcdedit command to check the value of hypervisorlaunchtype. auto?
Step 3. if hypervisorlaunchtype is auto, use `bcdedit /set hypervisorlaunchtype off` to set off
Step 4. Restart windows 10.
```

Sample steps:

```
C:\WINDOWS\system32>bcdedit

Windows 启动管理器
--------------------
标识符                  {bootmgr}
device                  partition=\Device\HarddiskVolume3
path                    \EFI\Microsoft\Boot\bootmgfw.efi
description             Windows Boot Manager
locale                  en-US
inherit                 {globalsettings}
badmemoryaccess         Yes
default                 {current}
resumeobject            {1bc0f315-cbcf-11e9-ab94-9766afff5a12}
displayorder            {current}
toolsdisplayorder       {memdiag}
timeout                 30

Windows 启动加载器
-------------------
标识符                  {current}
device                  partition=C:
path                    \WINDOWS\system32\winload.efi
description             Windows 10
locale                  en-US
inherit                 {bootloadersettings}
recoverysequence        {1bc0f317-cbcf-11e9-ab94-9766afff5a12}
displaymessageoverride  Recovery
recoveryenabled         Yes
badmemoryaccess         Yes
isolatedcontext         Yes
allowedinmemorysettings 0x15000075
osdevice                partition=C:
systemroot              \WINDOWS
resumeobject            {1bc0f315-cbcf-11e9-ab94-9766afff5a12}
nx                      OptIn
bootmenupolicy          Standard
hypervisorlaunchtype    Auto

C:\WINDOWS\system32>
C:\WINDOWS\system32>
C:\WINDOWS\system32>bcdedit /set hypervisorlaunchtype off
操作成功完成。

C:\WINDOWS\system32>bcdedit

Windows 启动管理器
--------------------
标识符                  {bootmgr}
device                  partition=\Device\HarddiskVolume3
path                    \EFI\Microsoft\Boot\bootmgfw.efi
description             Windows Boot Manager
locale                  en-US
inherit                 {globalsettings}
badmemoryaccess         Yes
default                 {current}
resumeobject            {1bc0f315-cbcf-11e9-ab94-9766afff5a12}
displayorder            {current}
toolsdisplayorder       {memdiag}
timeout                 30

Windows 启动加载器
-------------------
标识符                  {current}
device                  partition=C:
path                    \WINDOWS\system32\winload.efi
description             Windows 10
locale                  en-US
inherit                 {bootloadersettings}
recoverysequence        {1bc0f317-cbcf-11e9-ab94-9766afff5a12}
displaymessageoverride  Recovery
recoveryenabled         Yes
badmemoryaccess         Yes
isolatedcontext         Yes
allowedinmemorysettings 0x15000075
osdevice                partition=C:
systemroot              \WINDOWS
resumeobject            {1bc0f315-cbcf-11e9-ab94-9766afff5a12}
nx                      OptIn
bootmenupolicy          Standard
hypervisorlaunchtype    Off

C:\WINDOWS\system32>
```

After restart windows 10 os and execute `vagrant up`.

```
D:\vagrant_work>cd vagrant_personal

D:\vagrant_work\vagrant_personal>vagrant up
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Importing base box 'ol7u8'...
==> default: Matching MAC address for NAT networking...
==> default: Setting the name of the VM: vagrant_personal_default_1603793433250_70615
==> default: Clearing any previously set network interfaces...
==> default: Preparing network interfaces based on configuration...
    default: Adapter 1: nat
==> default: Forwarding ports...
    default: 22 (guest) => 2222 (host) (adapter 1)
==> default: Running 'pre-boot' VM customizations...
==> default: Booting VM...
==> default: Waiting for machine to boot. This may take a few minutes...
    default: SSH address: 127.0.0.1:2222
    default: SSH username: vagrant
    default: SSH auth method: private key
    default:
    default: Vagrant insecure key detected. Vagrant will automatically replace
    default: this with a newly generated keypair for better security.
    default:
    default: Inserting generated public key within guest...
    default: Removing insecure key from the guest if it's present...
    default: Key inserted! Disconnecting and reconnecting using new SSH key...
==> default: Machine booted and ready!
==> default: Checking for guest additions in VM...
==> default: Configuring proxy environment variables...
==> default: Configuring proxy for Yum...
==> default: Mounting shared folders...
    default: /vagrant => D:/vagrant_work/vagrant_personal

D:\vagrant_work\vagrant_personal>
```


#### Reference

[Windows10家庭版的功能中没有Hyper-V的解决方法](https://www.cnblogs.com/guangzhou11/p/11622212.html)

[Win10 10月更新 VirtualBox VT-x is not available (VERR_VMX_NO_VMX). 解决](https://blog.csdn.net/weixin_42140580/article/details/103235619)

Have a good work&life! 2020/10 via LinHong


