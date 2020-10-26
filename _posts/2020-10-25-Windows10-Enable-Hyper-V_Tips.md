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

#### Reference

[Windows10家庭版的功能中没有Hyper-V的解决方法](https://www.cnblogs.com/guangzhou11/p/11622212.html)


Have a good work&life! 2020/10 via LinHong


