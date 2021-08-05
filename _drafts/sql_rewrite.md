

SQL改写：

https://blog.csdn.net/wujiandao/article/details/112210737

### 半连接

两表关联，只返回主表数据
并且只返回主表与子表关联的数据
in、exist

select * from dept where deptno in (select deptno from emp);
select * from dept where exists (select null from emp where dept.deptno = emp.deptno);

#### 半连接改为内连接 01

dept : 1
emp : n

将上面emp n变为1的关系再与dept关联

select * from dept d,(select deptno from emp group by deptno) e where d.deptno = e.deptno;

#### 半连接改为内连接 02


dept 和 emp 是 1 ： n 的关系

select * from dept where deptno in (select deptno from emp);
返回的是1的结果集

可以让dept与emp关联变为n，再对 N group by 变为1

select d.deptno, d.dname, d.loc from dept d, emp e
where d.deptno=e.deptno
group by d.deptno,d.dname,d.loc; --- group by N 变为 1


#### 半连接改为外连接 03


select * from dept where deptno in (select deptno from emp);

select d.deptno,d.dname,d.loc from (select d.*(select 1 from emp e where d.deptno=e.deptno and rownum =1) status from dept d) d where status = 1;

#### 测试

11g：

create table a as select * from dba_objects;
create table b as select * from dba_objects;


select count(distinct owner),count(distinct object_name) from a where owner in (select owner from b);

要跑很久

执行计划是 HASH JOIN（全表扫）

执行计划的半连接应该 SEMI的关键字，但执行计划没有，说明优化器进行了等价改写为内连接


改为了：

select count(distinct owner),count(distinct object_name) from a,b
 where a.owner=b.owner

两表是N：N（owner)的关系，返回局部范围的笛卡尔乘积，返回了几十亿条数据

为了避免N：N，半连接需要把N的关系转为1，需要group by


select count(distinct owner),count(distinct object_name) from a
where owner in (select owner from b group by owner);

select count(distinct owner),count(distinct object_name) from a,(select owner from b group by owner) b where a.owner=b.owner;

这个在12c中修正了





