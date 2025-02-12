---
layout: post
title: "Oracle 23ai and Ollama REST api Tips"
category: Oracle
tags: Oracle 23ai Tips
---

* content
{:toc}

Oracle 23ai and Ollama REST api Tips


### ollama

[ollama Download](https://ollama.com/download)

Install

```
# curl -fsSL https://ollama.com/install.sh | sh
```

Logs

```
>>> Installing ollama to /usr/local
>>> Downloading Linux amd64 bundle
######################################################################## 100.0%
>>> Creating ollama user...
..................
>>> Creating ollama systemd service...
>>> Enabling and starting ollama service...
Created symlink /etc/systemd/system/default.target.wants/ollama.service → /etc/systemd/system/ollama.service.
>>> The Ollama API is now available at 127.0.0.1:11434.
>>> Install complete. Run "ollama" from the command line.
WARNING: No NVIDIA/AMD GPU detected. Ollama will run in CPU-only mode.
```

There is NOT enought space to download model.

```
[root@db23ai01 ~]# ollama run deepseek:r1
pulling manifest 
Error: pull model manifest: file does not exist
[root@db23ai01 ~]# ollama run deepseek-r1
pulling manifest 
pulling 96c415656d37...   2% ▕███                                                                                                                                            ▏ 107 MB/4.7 GB                  
Error: write /usr/share/ollama/.ollama/models/blobs/sha256-96c415656d377afbff962f6cdb2394ab092ccbcbaab4b82525bc4ca800fe8a49-partial: no space left on device
[root@db23ai01 ~]# 
[root@db23ai01 ~]# df -h /usr/share/ollama/.ollama/models/
Filesystem             Size  Used Avail Use% Mounted on
/dev/mapper/vg00-root  9.6G  7.1G  2.1G  78% /
[root@db23ai01 ~]# 
```

ollama directory to link
```
# mkdir -p /u01/ollama/models
# chown -R ollama:ollama /u01/ollama
# ln -s /u01/ollama/models/ /usr/share/ollama/.ollama/models/blobs
# df -h
```

Deepseek R1

```
ollama run deepseek-r1

[root@db23ai01 models]# ollama run deepseek-r1
pulling manifest 
pulling 96c415656d37... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 4.7 GB                         
pulling 369ca498f347... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏  387 B                         
pulling 6e4c38e1172f... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 1.1 KB                         
pulling f4d24e9138dd... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏  148 B                         
pulling 40fb844194b2... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏  487 B                         
verifying sha256 digest 
writing manifest 
success 
>>> who are you?
<think>

</think>

Greetings! I'm DeepSeek-R1, an artificial intelligence assistant created by DeepSeek. I'm at your service and would be delighted to assist you with any inquiries or tasks you may have.

>>> /bye
[root@db23ai01 models]# 
```

Llama 3 Model:

```
ollama pull llama3

[root@db23ai01 models]# ollama pull llama3
pulling manifest 
pulling 6a0746a1ec1a... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏ 4.7 GB                         
pulling 4fa551d4f938... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏  12 KB                         
pulling 8ab4849b038c... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏  254 B                         
pulling 577073ffcc6c... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏  110 B                         
pulling 3f8eb4da87fa... 100% ▕███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████▏  485 B                         
verifying sha256 digest 
writing manifest 
success 
[root@db23ai01 models]# ollama list
NAME                  ID              SIZE      MODIFIED           
llama3:latest         365c0bd3c000    4.7 GB    About a minute ago    
deepseek-r1:latest    0a8c26691023    4.7 GB    5 minutes ago         
[root@db23ai01 models]# 
```

ollama command Ref:

```
ollama serve: This command starts the Ollama service, enabling you to use its features and functionalities.
ollama create: Use this command to create a new model from a model file. It allows you to define and set up your model within the Ollama environment.
ollama show: This command displays detailed information about a specific model, including its architecture, parameters, and other relevant metadata.
ollama run Model: Execute a specified model by replacing "Model" with the name of your model. This command is essential for running and testing your models.
ollama pull Model: Fetch a model from a registry, which is a repository where models are stored. This command is useful for retrieving pre-trained or shared models.
ollama push: Send a model to a registry, making it accessible to others or for future retrieval. This command is the counterpart to "ollama pull."
ollama list: Display a list of all available models in the Ollama environment. This helps in managing and organizing your models.
ollama cp: Copy a model within the Ollama environment. This command is useful for duplicating models or moving them between different locations.
ollama rm Model: Delete a specified model from the Ollama environment. Use this command to remove models that are no longer needed.
ollama help: Access help information for Ollama commands. This provides guidance and documentation to assist users in understanding and using the commands effectively.

1. 启动Ollama服务： ollama serve
2. 从模型文件创建模型： ollama create
3. 显示模型信息： ollama show
4. 运行模型： ollama run 模型名称
5. 从注册表中拉去模型： ollama pull 模型名称
6. 将模型推送到注册表： ollama push
7. 列出模型： ollama list
8. 复制模型： ollama cp
9. 删除模型： ollama rm 模型名称
10. 获取有关Ollama任何命令的帮助信息： ollama help

```

### Test local LLM via curl

Embedding via llama/deepseek-r1 

Both root and oracel user can use.

```
$ curl http://localhost:11434/api/embeddings -d '{
  "model" : "llama3", 
  "prompt": "Hello world!" 
}'


[root@db23ai01 models]# curl http://localhost:11434/api/embeddings -d '{
>   "model" : "llama3", 
>   "prompt": "Hello world!" 
> }'
{"embedding":[-1.69779372215271,................



curl http://localhost:11434/api/embeddings -d '{
  "model" : "deepseek-r1", 
  "prompt": "Hello world!" 
}'


[oracle@db23ai01 ~]$ curl http://localhost:11434/api/embeddings -d '{
>   "model" : "deepseek-r1", 
>   "prompt": "Hello world!" 
> }'
{"embedding":[-1.2477748394012451,-0.5404292941093445,0.05913175642490387

```

### Oracle BaseDB 23.7


```
$ export NLS_LANG=American_America.AL32UTF8
$ sqlplus / as sysdba

alter session set container=pdb1;
CREATE USER docuser identified by "WElcome12345#-" DEFAULT TABLESPACE USERS quota unlimited on USERS;
GRANT DB_DEVELOPER_ROLE, create credential to docuser;

BEGIN
  DBMS_NETWORK_ACL_ADMIN.APPEND_HOST_ACE(
    host => '*',
    ace => xs$ace_type(privilege_list => xs$name_list('connect'),
                       principal_name => 'docuser',
                       principal_type => xs_acl.ptype_db));
END;
/

```

Test Log

```
[oracle@db23ai01 ~]$ sql / as sysdba

SQLcl: Release 24.3 Production on Wed Feb 12 12:29:24 2025

Copyright (c) 1982, 2025, Oracle.  All rights reserved.

Connected to:
Oracle Database 23ai EE High Perf Release 23.0.0.0.0 - for Oracle Cloud and Engineered Systems
Version 23.7.0.25.01

SQL> alter session set container=pdb1;

Session altered.

SQL> CREATE USER docuser identified by Welcome12345# DEFAULT TABLESPACE USERS quota unlimited on USERS;

Error starting at line : 1 in command -
CREATE USER docuser identified by Welcome12345# DEFAULT TABLESPACE USERS quota unlimited on USERS
Error report -
ORA-28003: The password chosen did not meet the required complexity rules set by your organization.
ORA-20000: password must contain 2 or more uppercase characters
Help: https://docs.oracle.com/error-help/db/ora-28003/
28003. 00000 -  "The password chosen did not meet the required complexity rules set by your organization."
*Cause:    The new password did not meet the complexity rules which may
           include the minimum number of characters, integers, and special
           characters.
*Action:   Enter a different password that meets your organization
           password complexity requirements. If you don't know the password
           requirements, check with your system administrator or help desk.
SQL> CREATE USER docuser identified by "WElcome12345#-" DEFAULT TABLESPACE USERS quota unlimited on USERS;

User DOCUSER created.

SQL> GRANT DB_DEVELOPER_ROLE, create credential to docuser;

Grant succeeded.

SQL> BEGIN
  DBMS_NETWORK_ACL_ADMIN.APPEND_HOST_ACE(
    host => '*',
    ace => xs$ace_type(privilege_list => xs$name_list('connect'),
                       principal_name => 'docuser',
                       principal_type => xs_acl.ptype_db));
END;
/  2    3    4    5    6    7    8  

PL/SQL procedure successfully completed.

SQL> 
```

Test sample table

```

select service_id,name,pdb,con_id from cdb_services order by con_id;
sqlplus docuser/"WElcome12345#-"@10.0.0.171:1521/db23ai_pdb1.paas.oracle.com

create table documentation_tab (id number,info varchar2(512));
insert into documentation_tab (id,info) values(	1,'San Francisco is in California.');
commit;


var embed_ollama_params clob;
exec :embed_ollama_params := '{ -
     "provider": "ollama", -
     "host"    : "local", -
     "url"     : "http://localhost:11434/api/embeddings", -
     "model"   : "llama3" -
}';


select dbms_vector.utl_to_embedding('hello', json(:embed_ollama_params)) ollama_output from dual;

OLLAMA_OUTPUT
--------------------------------------------------------------------------------
[-2.21529579E+000,-3.08794588E-001,2.9065159E-001,-1.62136102E+000,



create table vector_doc_tab (id number, text clob,v vector);
insert into vector_doc_tab select id,info,dbms_vector.utl_to_embedding(info, json(:embed_ollama_params)) vector from documentation_tab;
commit;


curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "Why is the sky blue?"
}'

select text from vector_doc_tab
order by vector_distance(v, dbms_vector.utl_to_embedding('Cars', json(:embed_ollama_params)), EUCLIDEAN)
fetch first 5 rows only;


var ollama_params clob;
exec :ollama_params := '{ -
  "provider"       : "ollama", -
  "host"           : "local", -
  "url"            : "http://localhost:11434/api/generate", -
  "model"          : "llama3"-
}';
select dbms_vector.utl_to_generate_text('what is 1 plus 1', json(:ollama_params)) from dual;
select dbms_vector.utl_to_generate_text('who are you?', json(:ollama_params)) from dual;

SQL> set time on timing on
15:36:05 SQL> select dbms_vector.utl_to_generate_text('who are you?', json(:ollama_params)) from dual;

DBMS_VECTOR.UTL_TO_GENERATE_TEXT('WHOAREYOU?',JSON(:OLLAMA_PARAMS))
--------------------------------------------------------------------------------
I am LLaMA, an AI assistant developed by Meta AI that can understand and respond

Elapsed: 00:00:46.38
15:36:59 SQL> 
```

### ollama Deepseek test

Test vith ollama deepseek-r1
```
curl http://localhost:11434/api/generate -d '{
  "model": "deepseek-r1",
  "prompt": "Why is the sky blue?"
}'

var ds_params clob;
exec :ds_params := '{ -
  "provider"       : "ollama", -
  "host"           : "local", -
  "url"            : "http://localhost:11434/api/generate", -
  "model"          : "deepseek-r1" -
}';
select dbms_vector.utl_to_generate_text('what is 1 plus 1', json(:ds_params)) from dual;
select dbms_vector.utl_to_generate_text('who are you?', json(:ds_params)) from dual;

15:41:52 SQL> select dbms_vector.utl_to_generate_text('who are you?', json(:ds_params)) from dual;

DBMS_VECTOR.UTL_TO_GENERATE_TEXT('WHOAREYOU?',JSON(:DS_PARAMS))
--------------------------------------------------------------------------------
<think>

</think>

Greetings! I'm DeepSeek-R1, an artificial intelligence assist

Elapsed: 00:00:19.52
15:42:18 SQL> 
```


### Referece

[SQL Quick Start Using a Vector Embedding Model Uploaded into the Database](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/sql-quick-start-using-vector-embedding-model-uploaded-database.html)

[Oracle AI Vector Search User's Guide 23ai UTL_TO_GENERATE_TEXT](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/utl_to_generate_text-dbms_vector_chain.html)



Have a good work&life! 2025/02 via LinHong
