---
layout: post
title: "OCI SSH Key Tips"
category: OCI
tags: OCI Tips
---

* content
{:toc}

OCI SSH Key Tips

Introduction
The SSH (Secure Shell) protocol is a method for secure remote login from one computer to another. SSH enables secure system administration and file transfers over insecure networks using encryption to secure the connections between endpoints. SSH keys are an important part of securely accessing Oracle Cloud Infrastructure compute instances in the cloud.

If you already have an SSH key pair, you may use that to connect to your environment. We recommend you use the Oracle Cloud Shell to interface with the OCI compute instance you will create. Oracle Cloud Shell is browser-based, does not require installation or configuration of anything on your laptop, and works independently of your network setup. However, if you prefer to connect via your laptop, please select an option based on your configuration.

- Important: If the SSH key is not created correctly, you will not be able to connect to your environment and will get errors. Please ensure you create your key properly.


### Options

```
Option 1: Oracle Cloud Shell
Option 2: MacOS
Option 3: Windows 10
Option 4: Prior Windows Versions
Option 5: SSH Keys for Linux
```

```
ssh-keygen
```


### Referece

参考:

[Generate SSH keys](https://docs.oracle.com/en/learn/generate_ssh_keys/index.html#introduction)

[Required Keys and OCIDs](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm)

Have a good work&life! 2023/01 via LinHong


