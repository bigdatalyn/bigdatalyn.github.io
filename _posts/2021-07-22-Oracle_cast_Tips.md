---
layout: post
title: "Oracle 19c extract CAST Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle 19c extract CAST Tips







### extract funcation

Extract function:

```
oracle中extract()函数从oracle 9i中引入的,主要作用于一个date或者interval类型中截取特定的部分
extract()语法如下：
extract (
{ year | month | day | hour | minute | second | 某一时区 }
from { date类型值 | interval类型值} )
```

```
SELECT 
EXTRACT (YEAR FROM DATE '2021-07-22') AS YEAR,
EXTRACT (MONTH FROM DATE '2021-07-22') AS MONTH,
EXTRACT (DAY FROM DATE '2021-07-22') AS DAY
FROM DUAL;
```

年月日可以根据上面情况直接 EXTRACT
如果是小时，分，秒的话可以结合使用 CAST

```
SELECT 
EXTRACT( HOUR FROM CAST( datetime AS TIMESTAMP ) ) AS Hours,
EXTRACT( MINUTE FROM CAST( datetime AS TIMESTAMP ) ) AS Minutes,
EXTRACT( SECOND FROM CAST( datetime AS TIMESTAMP ) ) AS Seconds
FROM (
SELECT TO_DATE( '2021-07-22 09:13:10', 'YYYY-MM-DD HH24:MI:SS' ) AS datetime FROM DUAL);
```

### CAST function

CAST()函数可以进行数据类型的转换。

CAST converts values from one data type to another.

CAST()函数的参数有两部分，源值和目标数据类型，中间用AS关键字分隔。

![cast_data_type]({{ "/files/Oracle/19c/cast_data_type.png"}})	

[SQL Language Reference/CAST](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/CAST.html#GUID-5A70235E-1209-4281-8521-B94497AAEF75)


Have a good work&life! 2021/07 via LinHong
