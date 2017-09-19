---
layout: post
title: "[转]为何在查询中索引未被使用 (Doc ID 1549181.1)"
category: Oracle
tags: Oracle Index 
---

* content
{:toc}

[转]为何在查询中索引未被使用 (Doc ID 1549181.1)


文档内容

用途

排错步骤

快速检查

表上是否存在索引？

索引是否应该被使用？

索引本身的问题

索引列或者索引的前置列是否在单表（non-join）查询的 Where 条件中（predicate list）？

索引列是否用在连接谓词中（join predicates）？

索引列在 IN 或者多个 OR 语句中？

索引列是否被函数修改？

隐式类型转换（implicit type conversion）是什么？

是否在语义（semantically）上无法使用索引？

错误类型的索引扫描？

是否索引列为可空？

NLS_SORT是否设置为二进制（BINARY）？

是否使用的是不可见索引（invisible indexes）？

优化器和成本计算相关问题

是否存在准确且合适的统计信息（Statistics）？

一个索引是否与其它的索引有相同的等级或者成本（cost）？

索引的选择度不高？

在总体成本中，表扫描的成本占大部分

访问空索引并不意味着比访问有值的索引高效。

参数设置

其它问题

是否使用了视图/子查询？

是否存在远程表(remote table)？

是否使用并行执行（PX）?

是否是包含了子查询的Update语句？

查询是否使用了绑定变量？

查询是否引用了带有延迟约束的列?

索引提示（hint）不工作

有用的 hints:

参考


<p>为何在查询中索引未被使用 (Doc ID 1549181.1)<br>
<iframe id="Doc ID 1549181.1" src="http://www.bigdatalyn.com/files/Oracle/DocID_1549181.1.html" width="800" height="800"></iframe></p>
<p>&nbsp;</p>

	
~~~~ 2017/09/02 LinHong ~~~~




