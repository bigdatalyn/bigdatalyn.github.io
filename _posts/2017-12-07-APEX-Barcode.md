---
layout: post
title: "APEX Barcode扫描小程序"
category: APEX
tags: APEX Oracle
---

* content
{:toc}


APEX Barcode扫描小程序

简单扫描EAN, CODE 128, CODE 39, EAN 8, UPC-A, UPC-C, I2of5, CODABAR的Barcode。





Step 1. Apex账号申请

很简单,点击注册，邮箱注册，确认,下一步....

https://apex.oracle.com/en/

测试版本:  Oracle Application Express 5

Step 2. 下载代码包
 

下载Apex代码

[ApexBarcodeScanner](/files/Oracle/Apex/ApexBarcodeScanner.zip)

下载Javascript Barcode

[JavaScript for Barcode](https://serratus.github.io/quaggaJS/)
 
[serratus-quaggaJS-v0.12.1](/files/Oracle/Apex/serratus-quaggaJS-v0.12.1-0-geff0c5a.zip)
 

Step 3. 创建SQL Workshop项目并导入Application Builder

创建SQL Workshop项目，创建新表CODE_PRODUCTS:

表名:
	
	code_products

列:

	ID NUMBER(10,0) Not NULL NAME VARCHAR2(50)

	CODE VARCHAR2(40)

	TYPE VARCHAR2(12)

	Primary Key: Populated from a new sequence

	Primary Key Constraint Name: CODE_PRODUCTS_PK

	Primary Key: ID (NUMBER)

	Sequence Name: CODE_PRODUCTS_SEQ

	No Foreign Keys.

	No Constraints.
 
在Application Builder上导入之前下载的Apex代码下的  f101.sql 

步骤:

	Database Application, Page or Component Export, File Character Set: Unicode UTF-8 (default values),Install Application
 
之后编辑Application: Edit Application/Shared Components/Static Application Files 上传serratus-quaggaJS-v0.12.1-0-geff0c5a.zip下载的解压后的四个文件，这几个文件也可以定制修改

	jsfiles/jquery-1.11.3.js
	jsfiles/my_live_w_locator.js
	jsfiles/quagga.min.js	
	stylesheets/styles.css


Step 4.测试
 
我用个人pc的摄像头扫描，效果视频如下： 

https://apex.oracle.com/pls/apex/f?p=29110:1:2214956191348:::::

容许使用Camera

[CameraSetting](/files/Apex/Camera_setting.png)



<video width="600" height="400" controls>
<source src="http://www.bigdatalyn.com/files/Apex/Barcode/BarCode.mp4">
</video>


参考:

[Oracle Application Express Barcode Scanner Example](https://community.oracle.com/people/Valentin+Leonard+Tabacaru+-Oracle/blog/2017/12/05/oracle-application-express-barcode-scanner-example?customTheme=ougc)


++++++++++++++++ EOF LinHong ++++++++++++++++	