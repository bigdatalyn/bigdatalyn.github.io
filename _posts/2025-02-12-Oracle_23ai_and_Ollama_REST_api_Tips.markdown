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

Embedding via llama

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
```

### Oracle BaseDB 23.6 



### Referece

[Oracle Database 23ai Release Updates](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/oracle-database-23ai-release-updates.html)


Have a good work&life! 2025/02 via LinHong
