---
layout: post
title: "Oracle Vector Store in free23ai Tips"
category: Oracle
tags: Oracle Vector Tips
---

* content
{:toc}

Oracle Vector Store in free23ai Tips

A vector database can be used for:
- searching, where results are ranked by relevance based on a query input string
- clustering, where text string are group by similarities
- recommendations, where items finds relations
- classifications, where text strings are classified by the most similar label










### 1.Download and unzip all-MiniLM-L12-v2_augmented.zip

Commands 

```shell
$ wget https://adwc4pm.objectstorage.us-ashburn-1.oci.customer-oci.com/p/VBRD9P8ZFWkKvnfhrWxkpPe8K03-JIoM5h_8EJyJcpE80c108fuUjg7R5L5O7mMZ/n/adwc4pm/b/OML-Resources/o/all_MiniLM_L12_v2_augmented.zip
$ unzip all_MiniLM_L12_v2_augmented.zip
$ ls -l all_MiniLM_L12_v2.onnx
```

Logs:

```javascript
[oracle@5f21fd6e3953 ~]$ unzip all_MiniLM_L12_v2_augmented.zip 
Archive:  all_MiniLM_L12_v2_augmented.zip
  inflating: all_MiniLM_L12_v2.onnx  
  inflating: README-ALL_MINILM_L12_V2-augmented.txt  
[oracle@5f21fd6e3953 ~]$ ls -l all_MiniLM_L12_v2.onnx 
-rw-r--r-- 1 oracle oinstall 133322334 Jul 15  2024 all_MiniLM_L12_v2.onnx
[oracle@5f21fd6e3953 ~]$ 
```

### 2.Create user and define the data dump directory.

Create user in pluggable database and grant role to the user.
Define the data dump directory as the path where the ONNX model was unzipped. 

```sql
SQL> alter session set container=freepdb1;
SQL> create user llmuser identified by Welcome12345# container=current; 
SQL> grant create session,resource, unlimited tablespace to llmuser;
SQL> grant db_developer_role,create mining model to llmuser;
SQL> create or replace directory dir_dump as '/home/oracle'; --- '<path to ONNX model>'
SQL> grant read,write on directory dir_dump to llmuser;
SQL> grant read,write on directory dir_dump to public;
SQL> exit
```

Logs:

```
SYS@FREE> show pdbs

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 FREEPDB1			  READ WRITE NO
SYS@FREE> alter session set container=freepdb1;

Session altered.

SYS@FREE> create user llmuser identified by Welcome12345# container=current;

User created.

SYS@FREE> grant create session,resource, unlimited tablespace to llmuser;

Grant succeeded.

SYS@FREE> grant db_developer_role,create mining model to llmuser;

Grant succeeded.

SYS@FREE> create or replace directory dir_dump as '/home/oracle';

Directory created.

SYS@FREE> grant read,write on directory dir_dump to public;

Grant succeeded.

SYS@FREE> 
```

### 3.Load the ONNX model

[ONNX Pipeline Models : Text Embedding](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/convert-trained-models-onnx-format.html)

Connect freepdb1 via llmuser user.

```
$ lsnrctl status
$ sqlplus llmuser/Welcome12345#@freepdb1
```

Logs:

```
SYS@FREE> !lsnrctl status

LSNRCTL for Linux: Version 23.0.0.0.0 - Production on 05-FEB-2025 10:07:32

Copyright (c) 1991, 2024, Oracle.  All rights reserved.

Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=0.0.0.0)(PORT=1521)))
STATUS of the LISTENER
------------------------
Alias                     LISTENER
Version                   TNSLSNR for Linux: Version 23.0.0.0.0 - Production
Start Date                05-FEB-2025 09:30:28
Uptime                    0 days 0 hr. 37 min. 4 sec
Trace Level               off
Security                  ON: Local OS Authentication
SNMP                      OFF
Default Service           FREE
Listener Parameter File   /opt/oracle/product/23ai/dbhomeFree/network/admin/listener.ora
Listener Log File         /opt/oracle/diag/tnslsnr/5f21fd6e3953/listener/alert/log.xml
Listening Endpoints Summary...
  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=0.0.0.0)(PORT=1521)))
  (DESCRIPTION=(ADDRESS=(PROTOCOL=ipc)(KEY=EXTPROC1521)))
Services Summary...
Service "27dd1283e7b20a0ee0630900580a45e6" has 1 instance(s).
  Instance "FREE", status READY, has 1 handler(s) for this service...
Service "FREE" has 1 instance(s).
  Instance "FREE", status READY, has 1 handler(s) for this service...
Service "FREEXDB" has 1 instance(s).
  Instance "FREE", status READY, has 1 handler(s) for this service...
Service "freepdb1" has 1 instance(s).
  Instance "FREE", status READY, has 1 handler(s) for this service...
The command completed successfully

SYS@FREE> conn llmuser/Welcome12345#@freepdb1
Connected.
LLMUSER@freepdb1> 
```


```sql
SQL> exec DBMS_VECTOR.DROP_ONNX_MODEL(model_name => 'ALL_MINILM_L12_V2', force => true);

BEGIN
   DBMS_VECTOR.LOAD_ONNX_MODEL(
        directory => 'DIR_DUMP',
		file_name => 'all_MiniLM_L12_v2.onnx',
        model_name => 'ALL_MINILM_L12_V2',
        metadata => JSON('{"function" : "embedding", "embeddingOutput" : "embedding", "input": {"input": ["DATA"]}}'));
END;
/

SQL> select model_name, algorithm, mining_function from user_mining_models where  model_name='ALL_MINILM_L12_V2';
SQL> SELECT MODEL_NAME, ALGORITHM, MINING_FUNCTION, round(MODEL_SIZE/1024/1024) MB FROM USER_MINING_MODELS WHERE MODEL_NAME='ALL_MINILM_L12_V2';
```

There will be error-`ORA-00600: internal error code, arguments:` with free:23.6.0.0-arm64.

```
LLMUSER@freepdb1> BEGIN
   DBMS_VECTOR.LOAD_ONNX_MODEL(
        directory => 'DIR_DUMP',
		file_name => 'all_MiniLM_L12_v2.onnx',
        model_name => 'ALL_MINILM_L12_V2',
        metadata => JSON('{"function" : "embedding", "embeddingOutput" : "embedding", "input": {"input": ["DATA"]}}'));
END;
/  2    3    4    5    6    7    8  
BEGIN
*
ERROR at line 1:
ORA-00600: internal error code, arguments:
[kgsnxInitCtx_lazy:library.load.fail], [], [], [], [], [], [], [], [], [], [],
[]
ORA-06512: at "SYS.DBMS_DATA_MINING", line 5767
ORA-06512: at "SYS.DBMS_VECTOR", line 1804
ORA-06512: at line 2
Help: https://docs.oracle.com/error-help/db/ora-00600/

LLMUSER@freepdb1> 
```

The ORA-600 error folks saw in 23.6 Oracle Database Free while loading ONNX models (due to three missing libraries) is fixed in 23.7

```
it is fixed 
docker pull container-registry.oracle.com/database/free:latest-lite
or
docker pull container-registry.oracle.com/database/free:23.6.0.0-lite
and also 23.7
```

Create free23ai with the following cmd.

```shell
docker pull container-registry.oracle.com/database/free:23.6.0.0-lite

docker run -d \
  --name ora23ailite \
  -p 2222:22   \
  -p 1521:1521 \
  -p 5500:5500 \
  -p 8080:8080 \
  -p 8443:8443 \
  -v /Users/honglin/Downloads:/mnt \
  container-registry.oracle.com/database/free:23.6.0.0-lite
```

Execution logs:

```
bash-4.4$ sqlplus llmuser/Welcome12345#@freepdb1

SQL*Plus: Release 23.0.0.0.0 - Production on Wed Feb 5 10:30:39 2025
Version 23.6.0.24.10

Copyright (c) 1982, 2024, Oracle.  All rights reserved.

Last Successful login time: Wed Feb 05 2025 10:28:29 +00:00

Connected to:
Oracle Database 23ai Free Release 23.0.0.0.0 - Develop, Learn, and Run for Free
Version 23.6.0.24.10

SQL> BEGIN
   DBMS_VECTOR.LOAD_ONNX_MODEL(
        directory => 'DIR_DUMP',
		file_name => 'all_MiniLM_L12_v2.onnx',
        model_name => 'ALL_MINILM_L12_V2',
        metadata => JSON('{"function" : "embedding", "embeddingOutput" : "embedding", "input": {"input": ["DATA"]}}'));
END;
/  2    3    4    5    6    7    8  

PL/SQL procedure successfully completed.

SQL> select model_name, algorithm, mining_function from user_mining_models where  model_name='ALL_MINILM_L12_V2';

MODEL_NAME
--------------------------------------------------------------------------------
ALGORITHM		       MINING_FUNCTION
------------------------------ ------------------------------
ALL_MINILM_L12_V2
ONNX			       EMBEDDING

SQL> SELECT MODEL_NAME, ALGORITHM, MINING_FUNCTION, round(MODEL_SIZE/1024/1024) MB FROM USER_MINING_MODELS WHERE  MODEL_NAME='ALL_MINILM_L12_V2';

MODEL_NAME
--------------------------------------------------------------------------------
ALGORITHM		       MINING_FUNCTION			      MB
------------------------------ ------------------------------ ----------
ALL_MINILM_L12_V2
ONNX			       EMBEDDING			     127


SQL> 
```

### 4. Generate embedding vectors using the VECTOR_EMBEDDING SQL scoring function.

```sql
SQL> SELECT VECTOR_EMBEDDING(ALL_MINILM_L12_V2 USING 'hello world!' as DATA) AS embedding;
```

sample:

```
SQL> conn llmuser/Welcome12345#@freepdb1
Connected.
SQL> SELECT VECTOR_EMBEDDING(ALL_MINILM_L12_V2 USING 'hello world!' as DATA) AS embedding;

EMBEDDING
--------------------------------------------------------------------------------
[-7.21711665E-002,3.80970128E-002,-1.0909863E-003,-5.86064607E-002,

SQL> 
```


### Referece

[Oracle AI Vector Search User's Guide](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/import-onnx-models-oracle-database-end-end-example.html)

[How can we measure vector distance?](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/vector-distance-metrics.html)

[ONNX model without Oracle tokenization performed](https://docs.oracle.com/en/database/oracle/machine-learning/oml4py/2/mlugp/convert-trained-models-onnx-format.html)

[Embeddings generated by ONNX model ](https://docs.oracle.com/en/database/oracle/machine-learning/oml4sql/23/mlsql/embedding.html#GUID-B8EC6F74-1517-4002-8E07-38F9B9B8CAA1)

Have a good work&life! 2025/02 via LinHong
