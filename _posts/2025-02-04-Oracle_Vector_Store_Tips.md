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

### 5. Create table for storing PDF documents and vectors for embbeming data.

```sql
CREATE TABLE IF NOT EXISTS "FILE_DOCS" ( 
    ID INTEGER GENERATED BY DEFAULT ON NULL AS IDENTITY ( START WITH 1 CACHE 20 ) PRIMARY KEY, 
    file_name    VARCHAR2 (900), 
    file_size    INTEGER, 
    file_type    VARCHAR2 (100) , 
    file_content BLOB
);

CREATE TABLE IF NOT EXISTS "FILE_VECTOR_TABLE" (
    "DOC_ID" NUMBER(*,0) NOT NULL ENABLE,
    "EMBED_ID" NUMBER,
    "EMBED_DATA" VARCHAR2(4000 BYTE),
    "EMBED_VECTOR" VECTOR,
    FOREIGN KEY (DOC_ID) REFERENCES FILE_DOCS(ID)
);
```

There will be `ORA-43853: VECTOR type cannot be used in non-automatic segment space management` if you are using SYSTEM tablespace.

```
LLMUSER@localhost:1521/freepdb1> CREATE TABLE IF NOT EXISTS "FILE_VECTOR_TABLE" (
    "DOC_ID" NUMBER(*,0) NOT NULL ENABLE,
    "EMBED_ID" NUMBER,
    "EMBED_DATA" VARCHAR2(4000 BYTE),
    "EMBED_VECTOR" VECTOR,
    FOREIGN KEY (DOC_ID) REFERENCES FILE_DOCS(ID)
);  2    3    4    5    6    7  
CREATE TABLE IF NOT EXISTS "FILE_VECTOR_TABLE" (
                           *
ERROR at line 1:
ORA-43853: VECTOR type cannot be used in non-automatic segment space management
tablespace "SYSTEM"
Help: https://docs.oracle.com/error-help/db/ora-43853/
```

Fix - create new tablespace(autoextend) for llmuser;

```sql
$ sqlplus system/Welcome12345#@localhost:1521/freepdb1

SQL> SELECT username, default_tablespace
FROM dba_users
WHERE username = 'LLMUSER';

SQL> CREATE TABLESPACE vector_tbs
DATAFILE 'vector01.dbf' SIZE 100M AUTOEXTEND ON NEXT 10M MAXSIZE UNLIMITED;

SQL> ALTER USER LLMUSER DEFAULT TABLESPACE vector_tbs;

SQL> SELECT username, default_tablespace
FROM dba_users
WHERE username = 'LLMUSER';

Other: 
ALTER TABLE my_table MOVE TABLESPACE new_tablespace;
```

```
LLMUSER@localhost:1521/freepdb1> desc FILE_DOCS
 Name					   Null?    Type
 ----------------------------------------- -------- ----------------------------
 ID					   NOT NULL NUMBER(38)
 FILE_NAME					    VARCHAR2(900)
 FILE_SIZE					    NUMBER(38)
 FILE_TYPE					    VARCHAR2(100)
 FILE_CONTENT					    BLOB

LLMUSER@localhost:1521/freepdb1> desc FILE_VECTOR_TABLE
 Name					   Null?    Type
 ----------------------------------------- -------- ----------------------------
 DOC_ID 				   NOT NULL NUMBER(38)
 EMBED_ID					    NUMBER
 EMBED_DATA					    VARCHAR2(4000)
 EMBED_VECTOR					    CLOB VALUE

LLMUSER@localhost:1521/freepdb1> 
```

### 6. Load PDF documents into table

[Oracle Exadata Database Machine X11M Datasheet](https://www.oracle.com/a/ocom/docs/engineered-systems/exadata/exadata-x11m-ds.pdf)

```sql
INSERT INTO FILE_DOCS(file_name, file_size, file_type, file_content) VALUES (
    'exadata-x11m-ds.pdf',
    dbms_lob.getlength(to_blob(bfilename('DIR_DUMP', 'exadata-x11m-ds.pdf'))),
    'PDF',
    to_blob(bfilename('DIR_DUMP', 'exadata-x11m-ds.pdf'))
);
COMMIT;
```

```
LLMUSER@localhost:1521/freepdb1> INSERT INTO FILE_DOCS(file_name, file_size, file_type, file_content) VALUES (
    'exadata-x11m-ds.pdf',
    dbms_lob.getlength(to_blob(bfilename('DIR_DUMP', 'exadata-x11m-ds.pdf'))),
    'PDF',
    to_blob(bfilename('DIR_DUMP', 'exadata-x11m-ds.pdf'))
);  2    3    4    5    6  

1 row created.

LLMUSER@localhost:1521/freepdb1> commit;

Commit complete.

LLMUSER@localhost:1521/freepdb1> 
```

### TEST via Text Embedding


```sql 
drop table documentation_tab purge;
create table documentation_tab (id number, text clob);
insert into documentation_tab values (1, 
    'Analytics empowers business analysts and consumers with modern, AI-powered, self-service analytics capabilities for data preparation, visualization, enterprise reporting, augmented analysis, and natural language processing.
     Oracle Analytics Cloud is a scalable and secure public cloud service that provides capabilities to explore and perform collaborative analytics for you, your workgroup, and your enterprise.
     
     Oracle Analytics Cloud is available on Oracle Cloud Infrastructure Gen 2 in several regions in North America, EMEA, APAC, and LAD when you subscribe through Universal Credits. You can subscribe to Professional Edition or Enterprise Edition.');
   
insert into documentation_tab values (3, 
    'Generative AI Data Science is a fully managed and serverless platform for data science teams to build, train, and manage machine learning models in the Oracle Cloud Infrastructure.');

insert into documentation_tab values (4, 
    'Language allows you to perform sophisticated text analysis at scale. Using the pretrained and custom models, you can process unstructured text to extract insights without data science expertise. 
     Pretrained models include sentiment analysis, key phrase extraction, text classification, and named entity recognition. You can also train custom models for named entity recognition and text 
     classification with domain specific datasets. Additionally, you can translate text across numerous languages.');

insert into documentation_tab values (5, 
    'When you work with Oracle Cloud Infrastructure, one of the first steps is to set up a virtual cloud network (VCN) for your cloud resources. This topic gives you an overview of Oracle Cloud 
     Infrastructure Networking components and typical scenarios for using a VCN. A virtual, private network that you set up in Oracle data centers. It closely resembles a traditional network, with
     firewall rules and specific types of communication gateways that you can choose to use. A VCN resides in a single Oracle Cloud Infrastructure region and covers one or more CIDR blocks 
     (IPv4 and IPv6, if enabled). See Allowed VCN Size and Address Ranges. The terms virtual cloud network, VCN, and cloud network are used interchangeably in this documentation. 
     For more information, see VCNs and Subnets.');

insert into documentation_tab values (6, 
    'NetSuite banking offers several processing options to accurately track your income. You can record deposits to your bank accounts to capture customer payments and other monies received in the
     course of doing business. For a deposit, you can select payments received for existing transactions, add funds not related to transaction payments, and record any cash received back from the bank.');

commit;

EXECUTE dbms_vector.drop_onnx_model(model_name => 'ALL_MINILM_L12_V2', force => true);

BEGIN
   DBMS_VECTOR.LOAD_ONNX_MODEL(
        directory => 'DIR_DUMP',
		file_name => 'all_MiniLM_L12_v2.onnx',
        model_name => 'ALL_MINILM_L12_V2',
        metadata => JSON('{"function" : "embedding", "embeddingOutput" : "embedding", "input": {"input": ["DATA"]}}'));
END;
/

create table doc_chunks as (
  SELECT d.id id,
         row_number() over (partition by d.id order by d.id) chunk_id,
         vc.chunk_offset chunk_offset,
         vc.chunk_length chunk_length, 
         vc.chunk_text chunk,
         vector_embedding(ALL_MINILM_L12_V2 using vc.chunk_text as data) vector
  FROM documentation_tab d,
       vector_chunks(d.text by words max 100 overlap 10 split RECURSIVELY) vc
);

desc doc_chunks;
set linesize 100
set long 1000
col id for 999
col chunk_id for 99999
col chunk_offset for 99999
col chunk_length for 99999
col chunk for a30
col vector for a100

select id, chunk_id, chunk_offset, chunk_length, chunk from doc_chunks;
select vector from doc_chunks where rownum <= 1;

create vector index vidx on doc_chunks (vector) 
   organization neighbor partitions 
   with target accuracy 95 
   distance EUCLIDEAN parameters (
	type IVF,
	neighbor partitions 2);

--- Query about Machine Learning:
select id, vector_distance(
    vector,
    vector_embedding(ALL_MINILM_L12_V2 using 'machine learning models' as data),
    EUCLIDEAN) results
FROM doc_chunks order by results;

--- Query about Generative AI:
select id, vector_distance(
    vector,
    vector_embedding(ALL_MINILM_L12_V2 using 'gen ai' as data),
    EUCLIDEAN) results
FROM doc_chunks order by results;

select id, vector_distance(
    vector,
    vector_embedding(ALL_MINILM_L12_V2 using 'gen ai' as data),
    EUCLIDEAN_SQUARED) results
FROM doc_chunks order by results;

select id, vector_distance(
    vector,
    vector_embedding(ALL_MINILM_L12_V2 using 'gen ai' as data),
    HAMMING) results
FROM doc_chunks order by results;

select id, vector_distance(
    vector,
    vector_embedding(ALL_MINILM_L12_V2 using 'gen ai' as data),
    DOT) results
FROM doc_chunks order by results;

select id, vector_distance(
    vector,
    vector_embedding(ALL_MINILM_L12_V2 using 'gen ai' as data),
    COSINE) results
FROM doc_chunks order by results;
```

```
SQL> select vector from doc_chunks where rownum <= 1;

VECTOR
----------------------------------------------------------------------------------------------------
[-1.41790323E-002,-4.51444201E-002,-3.39790224E-003,-4.13504392E-002,-4.03541587E-002,-6.56375214E-0
02,-1.34643555E-001,-2.19502021E-002,2.19004992E-002,1.89935006E-002,-5.04647614E-004,-5.12245111E-0
02,2.98117343E-002,-9.26017761E-003,-6.29789606E-002,-4.3903511E-002,-9.53261115E-005,3.85315269E-00
2,2.60610059E-002,-3.56726572E-002,-4.95629758E-002,6.66216835E-002,-7.36646205E-002,-1.16762213E-00
1,-2.85020769E-002,2.50546471E-003,1.05830312E-001,2.40027327E-002,4.67124023E-002,-8.91094208E-002,
1.05313763E-001,3.89015712E-002,2.88177282E-002,5.32665811E-002,-4.58955094E-002,-5.7362549E-002,-6.
71713278E-002,-2.916901E-002,-3.93578084E-003,-3.04846652E-002,3.35643883E-003,1.16438428E-002,-6.74
784705E-002,1.56847723E-002,-2.06939578E-002,7.35214353E-003,-8.74971598E-002,3.34898308E-002,-5.430
91111E-002,5.3316649E-002,-3.86595936E-003,-9.41196159E-002,-4.30755243E-002,5.57974689E-002,-3.4203
6188E-002,-2.4324527E-002,1.18211493E-001,1.62526965E-002,1.89540237E-002,-6.28600689E-003,


SQL> create vector index vidx on doc_chunks (vector) 
   organization neighbor partitions 
   with target accuracy 95 
   distance EUCLIDEAN parameters (
	type IVF,
	neighbor partitions 2);  2    3    4    5    6  

Index created.

SQL> select id, vector_distance(
    vector,
    vector_embedding(ALL_MINILM_L12_V2 using 'machine learning models' as data),
    EUCLIDEAN) results
FROM doc_chunks order by results;  2    3    4    5  

  ID	RESULTS
---- ----------
   4 1.122E+000
   3 1.149E+000
   6 1.342E+000
   5 1.359E+000
   5 1.364E+000

SQL> 
SQL> select id, vector_distance(
    vector,
    vector_embedding(ALL_MINILM_L12_V2 using 'gen ai' as data),
    EUCLIDEAN) results
FROM doc_chunks order by results;  2    3    4    5  

  ID	RESULTS
---- ----------
   3 1.068E+000
   4 1.314E+000
   5 1.376E+000
   5 1.376E+000
   6 1.428E+000

SQL> 
```

向量间距离计算 VECTOR_DISTANCE(v1, v2, 距离策略) 是向量检索的关键操作，用来比较两个向量的距离（相似度）。
距离越大，说明相似度越小；反之，说明两个向量越相似。
Oracle支持的距离策略主要有：EUCLIDEAN, COSINE, DOT, HAMMING 等

EUCLIDEAN 欧几里得距离是指连接这两点的线段的长度（二维空间中）
COSINE 余弦距离策略关注的是两个向量在方向上的一致性

提供的策略有: [VECTOR_DISTANCE](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/vector_distance.html)

```
metric must be one of the following tokens :

    COSINE metric is the default metric. It calculates the cosine distance between two vectors.

    DOT metric calculates the negated dot product of two vectors. The INNER_PRODUCT function calculates the dot product, as in the negation of this metric.

    EUCLIDEAN metric, also known as L2 distance, calculates the Euclidean distance between two vectors.

    EUCLIDEAN_SQUARED metric, also called L2_SQUARED, is the Euclidean distance without taking the square root.

    HAMMING metric calculates the hamming distance between two vectors by counting the number dimensions that differ between the two vectors.

    MANHATTAN metric, also known as L1 distance or taxicab distance, calculates the Manhattan distance between two vectors.

    JACCARD metric calculates the Jaccard distance. The two vectors used in the query must be BINARY vectors.

COSINE度量 是默认的度量方式。它计算两个向量之间的余弦距离。
DOT度量 计算两个向量的负点积。INNER_PRODUCT函数计算点积，即此度量的相反数。
EUCLIDEAN度量，也称为L2距离，计算两个向量之间的欧几里得距离。
EUCLIDEAN_SQUARED度量，也称为L2_SQUARED，是不取平方根的欧几里得距离。
HAMMING度量 通过计算两个向量之间不同的维度数量来计算汉明距离。
MANHATTAN度量，也称为L1距离或出租车距离，计算两个向量之间的曼哈顿距离。
JACCARD度量计算杰卡德距离。查询中使用的两个向量必须是二进制向量。
```

### 7.Create vector embeddings for text chunks using the ALL_MINILM_L12_V2 model

```
INSERT into FILE_VECTOR_TABLE (doc_id, embed_id, embed_data, embed_vector) 
SELECT id, embed_id ,text_chunk , embed_vector
FROM FILE_DOCS doc
CROSS JOIN TABLE(
    DBMS_VECTOR_CHAIN.UTL_TO_EMBEDDINGS (
        DBMS_VECTOR_CHAIN.UTL_TO_CHUNKS (
            DBMS_VECTOR_CHAIN.UTL_TO_TEXT(doc.file_content), 
            json('{"by":"words","max":"300","split":"sentence","normalize":"all"}')
        ),
        json('{"provider":"database", "model":"ALL_MINILM_L12_V2"}')
    )
)  t
CROSS JOIN JSON_TABLE(
    t.column_value, 
    '$[*]' COLUMNS (
        embed_id NUMBER PATH '$.embed_id',
        text_chunk VARCHAR2(4000) PATH '$.embed_data',
        embed_vector CLOB PATH '$.embed_vector'
    )
);
COMMIT;
```

Error.

```
ERROR at line 7:
ORA-20000: Oracle Text error:
DRG-50857: oracle error in dbms_vector_chain.utl_to_text
ORA-20000: Oracle Text error:
DRG-50857: oracle error in to_text(blob)
ORA-20000: Oracle Text error:
DRG-10502: index BLOB_POLICY does not exist
ORA-30600: Oracle Text error
DRG-50614: library loading error in druanlload
ORA-06512: at "CTXSYS.DRUE", line 192
ORA-06512: at "CTXSYS.DBMS_VECTOR_CHAIN", line 803
ORA-06512: at line 1
Help: https://docs.oracle.com/error-help/db/ora-20000/
```

This event turns off the encrypting / decrypting of the temporary files that is used by the third party filter (ctxhx command) that is used by Oracle Text.
DRG-11207 DRG-11221 When Indexing Certain PDF Document Using AUTO_FILTER (Doc ID 2614682.1)

```
If dbms_vector_chain.utl_to_text works on most of the documents but fails with just certain PDF docs with DRG-11207 and DRG-11221 errors like below ...
SQL> SELECT dbms_vector_chain.utl_to_text(dt.data) from documentation_tab dt where dt.id = 99;
ERROR:
ORA-20000: Oracle Text error:
DRG-50857: oracle error in dbms_vector_chain.utl_to_text
ORA-20000: Oracle Text error:
DRG-50857: oracle error in to_text(blob)
ORA-20000: Oracle Text error:
DRG-11207: user filter command exited with status 1 
DRG-11221: Third-party filter indicates this document is corrupted.
ORA-06512: "CTXSYS.DRUE", 行192
ORA-06512: "CTXSYS.DBMS_VECTOR_CHAIN", 行476
ORA-06512: 行1

... you might want to try setting this event in the system and see if that prevents the error:

connect / as sysdba
alter system set events '30580 trace name context forever, level 65536';
-- logoff from the session 
exit
```

Some error ... To be continue.

### Pre-built Embedding Generation model for Oracle Database 23ai

[OML4Py: Leveraging ONNX and Hugging Face for AI Vector Search](https://blogs.oracle.com/machinelearning/post/oml4py-leveraging-onnx-and-hugging-face-for-advanced-ai-vector-search)


```
Starting with OML4Py 2.0, the client converts pre-trained transformer models from Hugging Face to the Open Neural Network Exchange (ONNX) format for AI Vector Search. Hugging Face is an open-source Python library for deep learning, offering thousands of pre-trained models for natural language processing (NLP), computer vision, audio, and more. ONNX is an open format for representing various machine learning models, including transformers, classification, regression, and other types.

Oracle Database 23ai 引入了 Oracle AI Vector Search，通过使用 Transformer 模型生成向量并在数据库中大规模管理这些向量，彻底改变了语义相似性搜索的方式。这使得用户能够基于含义和上下文找到相关信息，解决了将数据转移到独立向量数据库的痛点，从而降低了复杂性和运营开销。
从 OML4Py 2.0 开始，客户端将 Hugging Face 上的预训练 Transformer 模型转换为用于 AI Vector Search 的开放神经网络交换（ONNX）格式。Hugging Face 是一个用于深度学习的开源 Python 库，提供数千种用于自然语言处理（NLP）、计算机视觉、音频等领域的预训练模型。ONNX 是一种用于表示各种机器学习模型的开放格式，包括 Transformer、分类、回归以及其他类型。
OML4Py 客户端通过从 Hugging Face 仓库下载预训练模型，为其添加预处理和后处理步骤，将增强后的模型转换为 ONNX 格式，并将其加载到数据库内模型或导出到文件中，从而简化了在数据库中生成嵌入向量的路径。一旦以 ONNX 格式加载，您可以无缝使用数据库内的 ONNX 运行时为 AI Vector Search 生成向量嵌入。
结合 OML4Py 客户端，AI Vector Search 为在 Oracle 数据库中利用向量嵌入提供了一个全面的解决方案，增强了文本数据分析、搜索能力和机器学习应用。
```

```
-- ALL_MINILM_L12_V2
col model_name for a20
SELECT MODEL_NAME, ALGORITHM, MINING_FUNCTION
FROM USER_MINING_MODELS 
WHERE MODEL_NAME='ALL_MINILM_L12_V2';

MODEL_NAME	     ALGORITHM			    MINING_FUNCTION
-------------------- ------------------------------ ------------------------------
ALL_MINILM_L12_V2    ONNX			    EMBEDDING

col view_name for a25
col view_type for a30
SELECT VIEW_NAME, VIEW_TYPE 
FROM USER_MINING_MODEL_VIEWS
WHERE MODEL_NAME='ALL_MINILM_L12_V2'
ORDER BY VIEW_NAME;

VIEW_NAME		  VIEW_TYPE
------------------------- ------------------------------
DM$VJALL_MINILM_L12_V2	  ONNX Metadata Information
DM$VMALL_MINILM_L12_V2	  ONNX Model Information
DM$VPALL_MINILM_L12_V2	  ONNX Parsing Information

-- 每个模型视图都有一个独特的名称。“DM$V”是模型视图的前缀，后面跟着一个字母，表示它包含的信息类型（例如，J=JSON，M=元数据，P=解析后的 JSON），最后是模型名称。

col metadata for a90
select * from DM$VJALL_MINILM_L12_V2;

METADATA
------------------------------------------------------------------------------------------
{"function":"embedding","embeddingOutput":"embedding","input":{"input":["DATA"]}}

```


blog post Now Available! [Pre-built Embedding Generation model for Oracle Database 23ai.](https://blogs.oracle.com/machinelearning/post/use-our-prebuilt-onnx-model-now-available-for-embedding-generation-in-oracle-database-23ai)


What is all-MiniLM-L12-v2?

```
Hugging Face's all-MiniLM-L12-v2 model is a compact yet powerful sentence transformers model widely leveraged for optimizing various natural language processing (NLP) tasks. Hugging Face's documentation states that it aims for efficiency and high-performance and features a 12-layer architecture that is designed to excel in tasks such as sentence similarity and text classification. This model's lightweight design is meant to allow for quicker processing and reduced computational demands compared to larger models. Despite its compact size, it is known to uphold high accuracy and reliability, establishing itself as a versatile choice for developers implementing NLP solutions.

Hugging Face 的 all-MiniLM-L12-v2 模型是一个紧凑而强大的句子变换器（sentence transformers）模型，被广泛用于优化各种自然语言处理（NLP）任务。根据 Hugging Face 的文档，该模型旨在实现高效性和高性能，具有12层架构，专为在句子相似性、文本分类等任务中表现出色而设计。这种模型的轻量化设计旨在实现比大型模型更快的处理速度和更低的计算需求。尽管其体积小巧，但其以高准确性和可靠性著称，已成为开发者实施 NLP 解决方案时的多功能选择。
```

 google/vit-base-patch16-224 / `vit-base-patch16.onnx`

```
-- Loaded both ONNX models, for text and Image embedding
DBMS_VECTOR.LOAD_ONNX_MODEL(
            MODEL_NAME => 'CLIP_TXT_MODEL',
            MODEL_DATA => <clip-vit-large_txt.onnx>,
            METADATA   => JSON('{"function" : "embedding", "embeddingOutput" : "embedding", "input": {"input": ["DATA"]}}')
        );
 DBMS_VECTOR.LOAD_ONNX_MODEL(
            MODEL_NAME => 'CLIP_IMG_MODEL',
            MODEL_DATA => <clip-vit-large_img.onnx>,
            METADATA   => JSON('{"function" : "embedding", "embeddingOutput" : "embedding", "input": {"input": ["DATA"]}}')
        );

-- Created vectors on my images

update images set image_vector  = to_vector(vector_embedding (CLIP_IMG_MODEL using image_blob as data));

-- Perform Semantic Search based on a text search term

SELECT ID,
       IMAGE_BLOB,
       MIME_TYPE,
       FILE_NAME,
       IMAGE_DESCRIPTION,
       IMAGE_VECTOR
  FROM IMAGES
ORDER BY VECTOR_DISTANCE(
           TO_VECTOR(VECTOR_EMBEDDING(CLIP_TXT_MODEL USING :P1_SEARCH_TEXT AS DATA)),
           IMAGE_VECTOR,
           COSINE
);
```


[11.3 Python Classes to Convert Pretrained Models to ONNX Models](https://docs.oracle.com/en/database/oracle/machine-learning/oml4py/2/mlugp/python-classes-convert-pretrained-models-onnx-models.html)

[11.7 Load Custom Models from The Local Filesystem](https://docs.oracle.com/en/database/oracle/machine-learning/oml4py/2-23ai/mlpug/loading-pretrained-models-filesystem.html)


### Referece

[Oracle AI Vector Search User's Guide](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/import-onnx-models-oracle-database-end-end-example.html)

[How can we measure vector distance?](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/vector-distance-metrics.html)

[ONNX model without Oracle tokenization performed](https://docs.oracle.com/en/database/oracle/machine-learning/oml4py/2/mlugp/convert-trained-models-onnx-format.html)

[Embeddings generated by ONNX model ](https://docs.oracle.com/en/database/oracle/machine-learning/oml4sql/23/mlsql/embedding.html#GUID-B8EC6F74-1517-4002-8E07-38F9B9B8CAA1)

Have a good work&life! 2025/02 via LinHong
