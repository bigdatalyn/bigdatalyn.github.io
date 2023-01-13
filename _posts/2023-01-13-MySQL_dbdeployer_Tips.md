---
layout: post
title: "MySQL dbdeployer tool Tips"
category: MySQL
tags: MySQL Tips
---

* content
{:toc}

MySQL dbdeployer tool Tips

DBdeployer is a tool that deploys MySQL database servers easily. This is a port of MySQL-Sandbox, originally written in Perl, and re-designed from the ground up in Go. 







### dbdeployer

安装
```
wget https://github.com/datacharmer/dbdeployer/releases/download/v1.71.0/dbdeployer-1.71.0.linux.tar.gz

tar xzvf dbdeployer-1.71.0.linux.tar.gz 

chmod +x dbdeployer-1.71.0.linux
mv dbdeployer-1.71.0.linux /usr/local/bin/dbdeployer
```
测试

```
[root@ol8mysql01 ~]# dbdeployer --help
dbdeployer makes MySQL server installation an easy task.
Runs single, multiple, and replicated sandboxes.

Usage:
  dbdeployer [command]

Available Commands:
  admin           sandbox management tasks
  cookbook        Shows dbdeployer samples
  data-load       tasks related to dbdeployer data loading
  defaults        tasks related to dbdeployer defaults
  delete          delete an installed sandbox
  delete-binaries delete an expanded tarball
  deploy          deploy sandboxes
  downloads       Manages remote tarballs
  export          Exports the command structure in JSON format
  global          Runs a given command in every sandbox
  help            Help about any command
  import          imports one or more MySQL servers into a sandbox
  info            Shows information about dbdeployer environment samples
  init            initializes dbdeployer environment
  sandboxes       List installed sandboxes
  unpack          unpack a tarball into the binary directory
  update          Gets dbdeployer newest version
  usage           Shows usage of installed sandboxes
  use             uses a sandbox
  versions        List available versions

Flags:
      --config string           configuration file (default "/root/.dbdeployer/config.json")
  -h, --help                    help for dbdeployer
      --sandbox-binary string   Binary repository (default "/root/opt/mysql")
      --sandbox-home string     Sandbox deployment directory (default "/root/sandboxes")
      --shell-path string       Path to Bash, used for generated scripts (default "/bin/bash")
      --skip-library-check      Skip check for needed libraries (may cause nasty errors)
  -v, --version                 version for dbdeployer

Use "dbdeployer [command] --help" for more information about a command.
[root@ol8mysql01 ~]# 
```
解释说明:
```
## 创建 MySQL 软件包及解压后的软件目录
shell> mkdir -p ~/sandboxes/{mysql_package,mysql_base}

## 将默认配置中 sandbox-binary 参数修改为已创建的目录路径
## 该部分也可使用 dbdeployer defaults export ~/.dbdeployer/config.json 先将配置文件导出，再 vim 手工编辑修改
shell> dbdeployer defaults update sandbox-binary $HOME/sandboxes/mysql_base

## 查看已修改的配置信息
## 配置中包含各类 MySQL 的初始化信息，可根据实际情况灵活调整
shell> dbdeployer defaults show

[root@ol8mysql01 ~]# mkdir -p ~/sandboxes/{mysql_package,mysql_base}
[root@ol8mysql01 ~]# dbdeployer defaults update sandbox-binary $HOME/sandboxes/mysql_base
# Updated sandbox-binary -> "/root/sandboxes/mysql_base"
# Configuration file: /root/.dbdeployer/config.json
{
 	"version": "1.70.0",
 	"sandbox-home": "$HOME/sandboxes",
 	"sandbox-binary": "$HOME/sandboxes/mysql_base",
 	"use-sandbox-catalog": true,
 	"log-sb-operations": false,
 	"log-directory": "/root/sandboxes/logs",
 	"cookbook-directory": "recipes",
 	"shell-path": "/bin/bash",
 	"master-slave-base-port": 11000,
 	"group-replication-base-port": 12000,
 	"group-replication-sp-base-port": 13000,
 	"fan-in-replication-base-port": 14000,
 	"all-masters-replication-base-port": 15000,
 	"multiple-base-port": 16000,
 	"pxc-base-port": 18000,
 	"ndb-base-port": 19000,
 	"ndb-cluster-port": 20000,
 	"group-port-delta": 125,
 	"mysqlx-port-delta": 10000,
 	"admin-port-delta": 11000,
 	"master-name": "master",
 	"master-abbr": "m",
 	"node-prefix": "node",
 	"slave-prefix": "slave",
 	"slave-abbr": "s",
 	"sandbox-prefix": "msb_",
 	"imported-sandbox-prefix": "imp_msb_",
 	"master-slave-prefix": "rsandbox_",
 	"group-prefix": "group_msb_",
 	"group-sp-prefix": "group_sp_msb_",
 	"multiple-prefix": "multi_msb_",
 	"fan-in-prefix": "fan_in_msb_",
 	"all-masters-prefix": "all_masters_msb_",
 	"reserved-ports": [
 		1186,
 		3306,
 		5432,
 		33060,
 		33062
 	],
 	"remote-repository": "https://raw.githubusercontent.com/datacharmer/mysql-docker-minimal/master/dbdata",
 	"remote-index-file": "available.json",
 	"remote-completion-url": "https://raw.githubusercontent.com/datacharmer/dbdeployer/master/docs/dbdeployer_completion.sh",
 	"remote-tarball-url": "https://raw.githubusercontent.com/datacharmer/dbdeployer/master/downloads/tarball_list.json",
 	"pxc-prefix": "pxc_msb_",
 	"ndb-prefix": "ndb_msb_",
 	"default-sandbox-executable": "default",
 	"download-name-linux": "mysql-{{.Version}}-linux-glibc2.17-x86_64{{.Minimal}}.{{.Ext}}",
 	"download-name-macos": "mysql-{{.Version}}-macos11-x86_64.{{.Ext}}",
 	"download-url": "https://dev.mysql.com/get/Downloads/MySQL",
 	"timestamp": "Fri Jan 13 02:45:16 UTC 2023"
 }
[root@ol8mysql01 ~]# dbdeployer defaults show

```
下载
```
## 查看dbdeployer工具支持下载的MySQL软件包
shell> dbdeployer downloads list
## 下载并解压指定软件包
shell> cd sandboxes/mysql_package

shell> dbdeployer downloads get-unpack mysql-8.0.20-linux-x86_64-minimal.tar.xz

dbdeployer downloads get-unpack mysql-5.6.44.tar.xz 
dbdeployer downloads get-unpack mysql-5.7.26.tar.xz 
```

deploy single 实例和测试
```
[root@ol8mysql01 mysql_package]# dbdeployer deploy single 8.0
# 8.0 => 8.0.20
Database installed in $HOME/sandboxes/msb_8_0_20
run 'dbdeployer usage single' for basic instructions'
... sandbox server started
[root@ol8mysql01 mysql_package]# 


[root@ol8mysql01 ~]# ls -tlr
total 0
drwxr-xr-x 5 root root 63 Jan 13 03:08 sandboxes
[root@ol8mysql01 ~]# cd sandboxes/
[root@ol8mysql01 sandboxes]# ls -tlr
total 4
drwxr-xr-x 2 root root  108 Jan 13 02:54 mysql_package
drwxr-xr-x 5 root root   48 Jan 13 02:54 mysql_base
drwxr-xr-x 4 root root 4096 Jan 13 03:10 msb_8_0_20
[root@ol8mysql01 sandboxes]# cd msb_8_0_20/
[root@ol8mysql01 msb_8_0_20]# ./use
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 10
Server version: 8.0.20 MySQL Community Server - GPL

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql [localhost:8020] {msandbox} ((none)) > show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| test               |
+--------------------+
5 rows in set (0.00 sec)

mysql [localhost:8020] {msandbox} ((none)) > use test;
Database changed
mysql [localhost:8020] {msandbox} (test) >

```

### 测试联合索引最左匹配

这个 SQL 不满足索引的最左匹配的原则（跳过了 b 列，直接使用 c 列），不应该选择联合索引。但执行计划确实选择了联合索引，可能是优化器在起作用。

```
mysql [localhost:8020] {msandbox} (test) > create table t1(a int primary key, b int,c int, key t1_b_c(b,c));
Query OK, 0 rows affected (0.04 sec)

mysql [localhost:8020] {msandbox} (test) > 
mysql [localhost:8020] {msandbox} (test) > explain select * from t1 where c=2;
+----+-------------+-------+------------+-------+---------------+--------+---------+------+------+----------+--------------------------+
| id | select_type | table | partitions | type  | possible_keys | key    | key_len | ref  | rows | filtered | Extra                    |
+----+-------------+-------+------------+-------+---------------+--------+---------+------+------+----------+--------------------------+
|  1 | SIMPLE      | t1    | NULL       | index | t1_b_c        | t1_b_c | 10      | NULL |    1 |   100.00 | Using where; Using index |
+----+-------------+-------+------------+-------+---------------+--------+---------+------+------+----------+--------------------------+
1 row in set, 1 warning (0.01 sec)

mysql [localhost:8020] {msandbox} (test) > 
```

通过诊断优化器观察

```
set optimizer_trace_max_mem_size=1048576;
set optimizer_trace="enabled=on";
select * from t1 where c=2;
select trace from information_schema.optimizer_trace\G
select trace into dumpfile file1 from information_schema.optimizer_trace;

--->
mysql [localhost:8020] {msandbox} (test) > select trace into dumpfile file1 from information_schema.optimizer_trace;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'file1 from information_schema.optimizer_trace' at line 1
mysql [localhost:8020] {msandbox} (test) > show variables like 'secure%';
+------------------+-------+
| Variable_name    | Value |
+------------------+-------+
| secure_file_priv | NULL  |
+------------------+-------+
1 row in set (0.01 sec)

mysql [localhost:8020] {msandbox} (test) > 

这个secure_file_priv应该为空，不然在读写文件时就会受到限制，甚至为NULL时无法读写，改的话很容易，在mysql的配置文件中加入一行secure_file_priv=然后重启mysql服务即可。
```
结果:
best_covering_index_scan

```
mysql [localhost:8020] {msandbox} (test) > select trace from information_schema.optimizer_trace\G
*************************** 1. row ***************************
trace: {
  "steps": [
    {
      "join_preparation": {
        "select#": 1,
        "steps": [
          {
            "expanded_query": "/* select#1 */ select `t1`.`a` AS `a`,`t1`.`b` AS `b`,`t1`.`c` AS `c` from `t1` where (`t1`.`c` = 1)"
          }
        ]
      }
    },
    {
      "join_optimization": {
        "select#": 1,
        "steps": [
          {
            "condition_processing": {
              "condition": "WHERE",
              "original_condition": "(`t1`.`c` = 1)",
              "steps": [
                {
                  "transformation": "equality_propagation",
                  "resulting_condition": "multiple equal(1, `t1`.`c`)"
                },
                {
                  "transformation": "constant_propagation",
                  "resulting_condition": "multiple equal(1, `t1`.`c`)"
                },
                {
                  "transformation": "trivial_condition_removal",
                  "resulting_condition": "multiple equal(1, `t1`.`c`)"
                }
              ]
            }
          },
          {
            "substitute_generated_columns": {
            }
          },
          {
            "table_dependencies": [
              {
                "table": "`t1`",
                "row_may_be_null": false,
                "map_bit": 0,
                "depends_on_map_bits": [
                ]
              }
            ]
          },
          {
            "ref_optimizer_key_uses": [
            ]
          },
          {
            "rows_estimation": [
              {
                "table": "`t1`",
                "range_analysis": {
                  "table_scan": {
                    "rows": 1,
                    "cost": 2.45
                  },
                  "potential_range_indexes": [
                    {
                      "index": "PRIMARY",
                      "usable": false,
                      "cause": "not_applicable"
                    },
                    {
                      "index": "t1_b_c",
                      "usable": true,
                      "key_parts": [
                        "b",
                        "c",
                        "a"
                      ]
                    }
                  ],
                  "best_covering_index_scan": {
                    "index": "t1_b_c",
                    "cost": 0.35,
                    "chosen": true
                  },
                  "setup_range_conditions": [
                  ],
                  "group_index_range": {
                    "chosen": false,
                    "cause": "not_group_by_or_distinct"
                  },
                  "skip_scan_range": {
                    "potential_skip_scan_indexes": [
                      {
                        "index": "t1_b_c",
                        "tree_travel_cost": 0,
                        "num_groups": 2,
                        "rows": 1,
                        "cost": 0.4
                      }
                    ]
                  },
                  "best_skip_scan_summary": {
                    "type": "skip_scan",
                    "index": "t1_b_c",
                    "key_parts_used_for_access": [
                      "b",
                      "c"
                    ],
                    "range": [
                      "1 <= c <= 1"
                    ],
                    "chosen": false,
                    "cause": "cost"
                  },
                  "analyzing_range_alternatives": {
                    "range_scan_alternatives": [
                      {
                        "index": "t1_b_c",
                        "chosen": false,
                        "cause": "no_valid_range_for_this_index"
                      }
                    ],
                    "analyzing_roworder_intersect": {
                      "usable": false,
                      "cause": "too_few_roworder_scans"
                    }
                  }
                }
              }
            ]
          },
          {
            "considered_execution_plans": [
              {
                "plan_prefix": [
                ],
                "table": "`t1`",
                "best_access_path": {
                  "considered_access_paths": [
                    {
                      "rows_to_scan": 1,
                      "access_type": "scan",
                      "resulting_rows": 1,
                      "cost": 0.35,
                      "chosen": true
                    }
                  ]
                },
                "condition_filtering_pct": 100,
                "rows_for_plan": 1,
                "cost_for_plan": 0.35,
                "chosen": true
              }
            ]
          },
          {
            "attaching_conditions_to_tables": {
              "original_condition": "(`t1`.`c` = 1)",
              "attached_conditions_computation": [
              ],
              "attached_conditions_summary": [
                {
                  "table": "`t1`",
                  "attached": "(`t1`.`c` = 1)"
                }
              ]
            }
          },
          {
            "finalizing_table_conditions": [
              {
                "table": "`t1`",
                "original_table_condition": "(`t1`.`c` = 1)",
                "final_table_condition   ": "(`t1`.`c` = 1)"
              }
            ]
          },
          {
            "refine_plan": [
              {
                "table": "`t1`"
              }
            ]
          }
        ]
      }
    },
    {
      "join_execution": {
        "select#": 1,
        "steps": [
        ]
      }
    }
  ]
}
1 row in set (0.00 sec)

mysql [localhost:8020] {msandbox} (test) > 
```

查看json格式:
```
jsonviewer.stack.hu
```

联合索引是最优的 covering index

联合索引可能是 range index

这里涉及了三个概念：covering index、range index、skip scan，可以获得官方文档的帮助：

```
https://dev.mysql.com/doc/refman/8.0/en/range-optimization.html#range-access-skip-scan
https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_covering_index
```

### Reference 

[如何使用 dbdeployer 快速搭建 MySQL 测试环境](https://my.oschina.net/actiontechoss/blog/3134499)

[dbdeployer 官方手册](https://github.com/datacharmer/dbdeployer)

[MySQL 各历史版本下载链接](https://downloads.mysql.com/archives/community/)

[dbdeployer 的功能特性](https://github.com/datacharmer/dbdeployer/blob/master/docs/features.md)

[dbdeployer MySQL沙盒部署详解](https://www.cnblogs.com/easydb/p/13741861.html)

Have a good work&life! 2023/01 via LinHong


