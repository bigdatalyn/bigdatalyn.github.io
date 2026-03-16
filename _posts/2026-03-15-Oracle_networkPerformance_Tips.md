---
layout: post
title: "Oracle OCI Network Performance TestTips"
category: Oracle
tags: Oracle OCI Network Tips
---

* content
{:toc}

Oracle OCI Network Performance Test

### Test Network Performance in OCI

[Network Performance](https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/networkperformance.htm)

Install via yum.
```
sudo yum install -y iperf3

```
Enable communication to the server instance on TCP port 5201 (for iperf3):
```
sudo firewall-cmd --zone=public --permanent --add-port 5201/tcp
sudo firewall-cmd --reload
```

On the server instance, run iperf3 in server mode. Example Linux command:
```
iperf3 -s
```

On the client instance, run iperf3 in client mode and specify the private IP address of the server instance. Example Linux command:
```
iperf3 -c <server_instance_private_ip_address>
```


### Good Day

Have a good work&life! 2026/01 via LinHong
