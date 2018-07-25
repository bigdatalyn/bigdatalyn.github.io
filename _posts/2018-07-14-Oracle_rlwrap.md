---
layout: post
title: "Oracle rlwrap tips"
category: Oracle
tags: Oracle Linux
---

* content
{:toc}


rlwrap is a 'readline wrapper', a small utility that uses the GNUreadline library to allow the editing of keyboard input for any command








### Manual

Download:
	
	https://github.com/hanslub42/rlwrap
	or
	https://codeload.github.com/hanslub42/rlwrap/zip/master
	
	Maybe you need to install readline-devel before installing rlwarp

Install:
	
	cd rlwrap*
	./configure
	make
	make check
	make install

	
### Yum

Simple:

	yum install rlwrap

### Setting

Edit .bash_profile and add the following alais

	alias sqlplus=”rlwrap sqlplus”
	alias dgmgrl=”rlwrap dgmgrl”
	alias rman=”rlwrap rman”
	alias lsnrctl=”rlwrap lsnrctl”
	alias asmcmd=”rlwrap asmcmd”
	alias adrci=”rlwrap adrci”
	alias impdp=”rlwrap impdp”
	alias expdp=”rlwrap expdp”

To be continue....

Have a good life! 2018/07 via LinHong


