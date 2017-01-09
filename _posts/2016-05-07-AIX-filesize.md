---
layout: post
title: "[原创]aix文件系统限制"
date:   2016-05-07 11:36:00
category: Unix
tags: DB2 Unix filesize 
---

* content
{:toc}


扩表空大小，需要考虑系统文件大小的限制吗？




### 扩表空大小，需要考虑系统文件大小的限制吗？

今天刚被同事问到客户需要把Page是4k的表空间扩多61g，这个表空间还是单容器的..

理论上是可以的，但需要考虑但容器文件系统的大小也是受操作系统的限制

需要如下查看：

ulimit -a 看创建文件系统的限制

查看fsize的限制

	grep -ip default /etc/security/limits 

	grep -ip instance /etc/security/limits 

instance 是实例名，如果实例下没有fsize则是使用默认default的fsize

	$sudo grep -ip default /etc/security/limits
	*
	* Sizes are in multiples of 512 byte blocks, CPU time is in seconds
	*
	* fsize      - soft file size in blocks
	* core       - soft core file size in blocks
	* cpu        - soft per process CPU time limit in seconds
	* data       - soft data segment size in blocks
	* stack      - soft stack segment size in blocks
	* rss        - soft real memory usage in blocks
	* nofiles    - soft file descriptor limit
	* fsize_hard - hard file size in blocks
	* core_hard  - hard core file size in blocks
	* cpu_hard   - hard per process CPU time limit in seconds
	* data_hard  - hard data segment size in blocks
	* stack_hard - hard stack segment size in blocks
	* rss_hard   - hard real memory usage in blocks
	* nofiles_hard - hard file descriptor limit
	*
	* The following table contains the default hard values if the
	* hard values are not explicitly defined:
	*
	*   Attribute        Value
	*   ==========    ============
	*   fsize_hard    set to fsize
	*   cpu_hard      set to cpu
	*   core_hard         -1
	*   data_hard         -1
	*   stack_hard      8388608 
	*   rss_hard          -1
	*   nofiles_hard      -1
	*
	* NOTE:  A value of -1 implies "unlimited"
	*

	default:
		fsize_hard = -1
		core_hard = -1
		cpu_hard = -1
		data_hard = -1
		rss_hard = -1
		stack_hard = -1
		nofiles_hard = -1
		fsize = -1     
		core = 2097151
		cpu = -1
		data = 262144
		rss = 65536
		stack = 65536
		nofiles = 2000

	$

除了安全方面的限制，单个文件大小还受文件系统类型的限制，AIX下主要使用JFS和JFS2文件系统。JFS最大只能支持64G的单个文件，有时候做大文件的归档备份时，有可能会超过这个限制的，所以建议使用JFS2文件系统。

<table border="1">
  <tr>
    <th>Functions</th>
    <th>JFS2</th>
    <th>JFS</th>
  </tr>
  <tr>
    <td>Fragments/Block Size</td>
    <td>512-4096 Block sizes</td>
    <td>512-4096 Frags</td>
  </tr>
  <tr>
    <td>Maximum file system size</td>
    <td>16 Terabytes</td>
    <td>1 Terabyte</td>
  </tr>
  <tr>
    <td>Maximum file size</td>
    <td>16 Terabytes</td>
    <td>64 GB</td>
  </tr>
  <tr>
    <td>Number of i-nodes</td>
    <td>Dynamic, limited by disk space</td>
    <td>Fixed, set at file-system creation</td>
  </tr>
  <tr>
    <td>Directory organization</td>
    <td>B-tree</td>
    <td>Linear</td>
  </tr>
  <tr>
    <td>Compression</td>
    <td>No</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Quotas</td>
    <td>No</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Error logging</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  
</table>

怎么查看我的文件系统是什么类型的文件类型呢？

	$/usr/sysv/bin/df -n
	/                   : jfs2
	/usr                : jfs2
	/var                : jfs2
	/tmp                : jfs2
	/home               : jfs2
	/admin              : jfs2
	/proc               : procfs
	/opt                : jfs2
	/var/adm/ras/livedump: jfs2

怎么查看系统的blocksize呢？

	$getconf PAGESIZE
	4096
	$


关于DB2层面中，如4k的超过限制空间，变大对应的表空间，会报如下错误

[SQL1139N](http://www.ibm.com/support/knowledgecenter/SSEPGG_9.7.0/com.ibm.db2.luw.messages.sql.doc/doc/msql01139n.html?lang=en)



---

