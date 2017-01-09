---
layout: post
title:  "Github ssh 提交"
date:   2016-01-30 10:06:05
description: "Github中用ssh免密码登录是如何配置的？下文通过图文并茂的引导大家配置Github的ssh"
categories: Jekyll
excerpt: ssh配置
---

* content
{:toc}

## 序
git默认配置是https，所以每次push新东西都需要输入密码，通过下面步骤可以使用ssh免密码登录push到git。方便用户使用。

---

### ssh公共key的生成

<pre><code class="markdown"><font size="2">ssh-keygen -b 1024 -t rsa -C "邮箱地址" 
</font></code></pre>

### 启动ssh进程，避免多个启动

<pre><code class="markdown"><font size="2">eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
</font></code></pre>

多个启动的话，可以删除

<pre><code class="markdown"><font size="2">ps -ef | grep ssh
kill -9 多余ssh进程pid
</font></code></pre>

### 拷贝id_rsa.pub内容到自己git帐号的ssh

> 帐号setting

![git-setting]({{ "/css/pics/Jekyll/git-setting.png"}}) 

> 追加id_rsa.pub内容(备注带有邮箱pub 可以内容)

![git-addssh]({{ "/css/pics/Jekyll/git-addssh.png"}}) 

![git-id_rsa-pub-add]({{ "/css/pics/Jekyll/git-id_rsa-pub-add.png"}}) 

> 等几分钟有效化

### 测试

<pre><code class="markdown"><font size="2">ssh -vT git@github.com
</font></code></pre>

倒数第五行有类似：（否则根据log内容去分析和查错）
<pre><code class="markdown"><font size="2">Hi XXXXXXX! You've successfully authenticated, but GitHub does not provide shell access.
</font></code></pre>

### 编辑 .git/config

修改 origin 部分的内容： 
把https:// 换成类似如下内容 
> git@github.com:帐号

如我个人的：
<pre><code class="markdown"><font size="2">[remote "origin"]
	fetch = +refs/heads/*:refs/remotes/origin/*
	url = git@github.com:bigdatalyn/bigdatalyn.github.io.git
</font></code></pre>

### git提交测试

git add -A
git commit -m 'release post'
git push origin

方便可用下面的脚本

<pre><code class="markdown"><font size="2">$ cat release.sh 
#! /bin/sh

if [[ -n $1 ]];then
git add --all 
git commit -m "release post"
git push origin
else
git add --all 
git commit -m "$1" 
git push origin
fi
$ 
</font></code></pre>


常见错误：

没设置对.git/config

ssh public key 不对

<pre><code class="markdown"><font size="2">The requested URL returned error: 403 Forbidden while accessing
</font></code></pre>



----------------------------------------

Sat Jan 30 10:30:06 CST 2016

----------------- EOF ------------------