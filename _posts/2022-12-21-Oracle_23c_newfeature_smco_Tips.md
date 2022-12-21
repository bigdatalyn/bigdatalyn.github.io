---
layout: post
title: "Oracle 23c New features - smco process Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - smco process Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	


Improved System Monitor (SMON) Process Scalability

Queries can require large amounts of temporary space and some temporary space operations run in critical background processes, like the System Monitor (SMON) process. SMON is responsible for cleaning up temporary segments that are no longer in use. SMON checks regularly to see whether it is needed, and other processes can call SMON. Temporary space management can affect SMON's scalability for other critical actions. This new enhancement instead uses the Space Management Coordinator (SMCO) process so that the responsibility of managing temporary space is offloaded from SMON, thereby improving its scalability.

This feature improves the overall scalability of the SMON process, particularly in a multitenant Oracle RAC cluster.









### 23c backugroud process

```
[oracle@ol8-23c ~]$ ps -ef | grep ora_ | grep -v grep
oracle    290350       1  0 13:22 ?        00:00:00 ora_pmon_cdb1
oracle    290354       1  0 13:22 ?        00:00:00 ora_clmn_cdb1
oracle    290358       1  0 13:22 ?        00:00:00 ora_psp0_cdb1
oracle    290362       1  1 13:22 ?        00:00:42 ora_vktm_cdb1
oracle    290368       1  0 13:22 ?        00:00:00 ora_gen0_cdb1
oracle    290372       1  0 13:22 ?        00:00:00 ora_mman_cdb1
oracle    290378       1  0 13:22 ?        00:00:00 ora_gen2_cdb1
oracle    290380       1  0 13:22 ?        00:00:00 ora_vosd_cdb1
oracle    290383       1  0 13:22 ?        00:00:00 ora_diag_cdb1
oracle    290386       1  0 13:22 ?        00:00:00 ora_ofsd_cdb1
oracle    290388       1  0 13:22 ?        00:00:00 ora_dbrm_cdb1
oracle    290390       1  0 13:22 ?        00:00:00 ora_vkrm_cdb1
oracle    290392       1  0 13:22 ?        00:00:00 ora_svcb_cdb1
oracle    290394       1  0 13:22 ?        00:00:00 ora_pman_cdb1
oracle    290396       1  0 13:22 ?        00:00:01 ora_dia0_cdb1
oracle    290398       1  0 13:22 ?        00:00:00 ora_dia1_cdb1
oracle    290400       1  0 13:22 ?        00:00:01 ora_lmhb_cdb1
oracle    290402       1  0 13:22 ?        00:00:00 ora_dbw0_cdb1
oracle    290404       1  0 13:22 ?        00:00:00 ora_lgwr_cdb1
oracle    290407       1  0 13:22 ?        00:00:00 ora_ckpt_cdb1
oracle    290409       1  0 13:22 ?        00:00:00 ora_smon_cdb1
oracle    290412       1  0 13:22 ?        00:00:00 ora_smco_cdb1
oracle    290414       1  0 13:22 ?        00:00:00 ora_reco_cdb1
oracle    290419       1  0 13:22 ?        00:00:00 ora_lreg_cdb1
oracle    290422       1  0 13:22 ?        00:00:00 ora_pxmn_cdb1
oracle    290429       1  0 13:22 ?        00:00:03 ora_mmon_cdb1
oracle    290433       1  0 13:22 ?        00:00:00 ora_mmnl_cdb1
oracle    290445       1  0 13:22 ?        00:00:00 ora_bg00_cdb1
oracle    290447       1  0 13:22 ?        00:00:00 ora_w000_cdb1
oracle    290450       1  0 13:22 ?        00:00:00 ora_lg00_cdb1
oracle    290455       1  0 13:22 ?        00:00:00 ora_bg01_cdb1
oracle    290457       1  0 13:22 ?        00:00:00 ora_w001_cdb1
oracle    290459       1  0 13:22 ?        00:00:00 ora_lg01_cdb1
oracle    290465       1  0 13:22 ?        00:00:00 ora_bg02_cdb1
oracle    290471       1  0 13:22 ?        00:00:00 ora_d000_cdb1
oracle    290473       1  0 13:22 ?        00:00:00 ora_s000_cdb1
oracle    290475       1  0 13:22 ?        00:00:00 ora_tmon_cdb1
oracle    290479       1  0 13:22 ?        00:00:00 ora_tt00_cdb1
oracle    290481       1  0 13:22 ?        00:00:00 ora_arc0_cdb1
oracle    290483       1  0 13:22 ?        00:00:00 ora_tt01_cdb1
oracle    290485       1  0 13:22 ?        00:00:00 ora_arc1_cdb1
oracle    290487       1  0 13:22 ?        00:00:00 ora_arc2_cdb1
oracle    290489       1  0 13:22 ?        00:00:00 ora_arc3_cdb1
oracle    290491       1  0 13:22 ?        00:00:00 ora_tt02_cdb1
oracle    290495       1  0 13:22 ?        00:00:00 ora_gcw0_cdb1
oracle    290497       1  0 13:22 ?        00:00:01 ora_gcr0_cdb1
oracle    290499       1  0 13:22 ?        00:00:01 ora_gcr1_cdb1
oracle    290505       1  0 13:22 ?        00:00:00 ora_aqpc_cdb1
oracle    290509       1  0 13:22 ?        00:00:00 ora_w002_cdb1
oracle    290511       1  0 13:22 ?        00:00:00 ora_rcbg_cdb1
oracle    290516       1  0 13:22 ?        00:00:08 ora_p000_cdb1
oracle    290518       1  0 13:22 ?        00:00:07 ora_p001_cdb1
oracle    290520       1  0 13:22 ?        00:00:01 ora_p002_cdb1
oracle    290522       1  0 13:22 ?        00:00:00 ora_p003_cdb1
oracle    290524       1  0 13:22 ?        00:00:00 ora_w003_cdb1
oracle    290713       1  0 13:23 ?        00:00:01 ora_gcr2_cdb1
oracle    290732       1  0 13:23 ?        00:00:00 ora_w004_cdb1
oracle    290734       1  0 13:23 ?        00:00:06 ora_m001_cdb1
oracle    290742       1  0 13:23 ?        00:00:04 ora_m004_cdb1
oracle    290746       1  0 13:23 ?        00:00:05 ora_m005_cdb1
oracle    290754       1  0 13:23 ?        00:00:04 ora_m007_cdb1
oracle    290756       1  0 13:23 ?        00:00:02 ora_m008_cdb1
oracle    290810       1  0 13:23 ?        00:00:01 ora_gcr3_cdb1
oracle    290841       1  0 13:23 ?        00:00:00 ora_qm02_cdb1
oracle    290845       1  0 13:23 ?        00:00:00 ora_q002_cdb1
oracle    290849       1  0 13:23 ?        00:00:00 ora_q004_cdb1
oracle    290852       1  0 13:23 ?        00:00:00 ora_w005_cdb1
oracle    290880       1  0 13:23 ?        00:00:18 ora_cjq0_cdb1
oracle    290884       1  0 13:23 ?        00:00:00 ora_w006_cdb1
oracle    291179       1  0 13:23 ?        00:00:00 ora_cl00_cdb1
oracle    293465       1  0 13:28 ?        00:00:01 ora_gcr4_cdb1
oracle    294374       1  0 13:30 ?        00:00:01 ora_gcr5_cdb1
oracle    294440       1  0 13:30 ?        00:00:01 ora_gcr6_cdb1
oracle    294667       1  0 13:31 ?        00:00:00 ora_w007_cdb1
oracle    305686       1  0 13:58 ?        00:00:00 ora_m000_cdb1
[oracle@ol8-23c ~]$ 
```

smco process

```
[oracle@ol8-23c ~]$ ps -ef | grep ora_ | grep -v grep | grep smco
oracle    290412       1  0 13:22 ?        00:00:00 ora_smco_cdb1
[oracle@ol8-23c ~]$ 
```


### System Monitor Process (SMON)

The system monitor process (SMON) is in charge of a variety of system-level cleanup duties.

Duties assigned to SMON include:

Performing instance recovery, if necessary, at instance startup. In an Oracle RAC database, the SMON process of one database instance can perform instance recovery for a failed instance.

Recovering terminated transactions that were skipped during instance recovery because of file-read or tablespace offline errors. SMON recovers the transactions when the tablespace or file is brought back online.

Cleaning up unused temporary segments in permanent tablespaces. For example, Oracle Database allocates extents when creating an index. If the operation fails, then SMON cleans up the temporary space.

Coalescing contiguous free extents within dictionary-managed tablespaces.

SMON checks regularly to see whether it is needed. Other processes can call SMON if they detect a need for it.

### Space Management Coordinator Process (SMCO)

The space management coordinator process (SMCO) process is started by SMON and coordinates the execution of various space management related tasks.

The SMCO process coordinates the execution of various space management related tasks.

Typical tasks include proactive space allocation and reclamation, and temporary tablespace maintenance. SMCO dynamically spawns child processes (Wnnn) to implement the task.


### Reference 

[Space Management Coordinator Process (SMCO)](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/cncpt/process-architecture.html#GUID-CBC4114F-88A1-442C-9327-7D36460E9EFC)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


