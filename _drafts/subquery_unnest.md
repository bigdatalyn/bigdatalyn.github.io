//////////////////////////////////////////////

子查询非嵌套 subquery unnesting
where子查询中 in/not in/exists/not exists，优化器会尝试把子查询展开（unnest），消除filter

子查询非嵌套目的是为了消除filter。

原因是：filter的驱动表是固定的，执行计划也是固定的。
如果驱动表有很多行数据，则sql执行性能较差。

不让优化器进行子查询展开的话，可以在子查询加HINT： /*+ NO_UNNEST */ 这样就产生了filter

filter消除很难用hint来消除，一般通过sql的等价改写来消除。


exists中有rownum



//////////////////////////////////////////////