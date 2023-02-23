


#### 索引组织表

根据索引组织起来的表，Innodb的表是根据主键排序组织起来的表

索引就是根据一列或者多列进行排序的数据结构

类似数据的目录

InnoDB的主键是特殊的索引字段
主键排序后的主索引

- 每张表都有主键
- 非空唯一索引的话，就是主键(没有特指Primary key)
- 多个非空唯一索引的话，选第一个定义的索引
- 6个字节的uuid为主键


### 主流索引查找算法

- 线性查找
- 二分查找
- 二叉树查找
- 平衡二叉树
- B树
- B+树

[cs.usfca.edu/~galley](http://cs.usfca.edu/~galles/visualization/algorithms.html)


http://cs.usfca.edu/~galles/visualization/algorithms.html
