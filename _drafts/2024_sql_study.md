
https://sql.wang/sql-leetcode/lc178/

### 删除重复行 delete same records

drop table register purge;
create table if not exists register (id int, email varchar(255));
insert into register (id, email) values (1, 'scott@example.com');
insert into register (id, email) values (2, 'john@example.com');
insert into register (id, email) values (3, 'john@example.com');
insert into register (id, email) values (4, 'scott@example.com');
insert into register (id, email) values (5, 'kathy@example.com');


HONG@pdb1> select * from register;

 ID EMAIL
--- -----------------
  1 scott@example.com
  2 john@example.com
  3 john@example.com       <delete target>
  4 scott@example.com      <delete target>
  5 kathy@example.com

HONG@pdb1> 


<方法1> 分组取最小值的典型操作，使用group by + min函数或者开窗函数

select min(id) from register group by email;

select * from register where id not in(
    select min(id) from register group by email
);

HONG@pdb1> select min(id) from register group by email;

   MIN(ID)
----------
	 1
	 2
	 5

select * from register where id not in(
  2      select min(id) from register group by email
  3  );

 ID EMAIL
--- -----------------
  3 john@example.com
  4 scott@example.com

HONG@pdb1> 


delete from register where id not in(
    select min(id) from register group by email 
);

<方法2> 排除操作可以使用not in或not exists来完成

select * from register a where not exists (
   select 1 from (select min(id) min_id from register b group by email) c where a.id=c.min_id
);

delete from register a where not exists (
   select 1 from (select min(id) min_id from register b group by email) c where a.id=c.min_id
);


<方法3> 自关联 自关联对email相同的行两两组合，使用比较运算符把大于待删除表中id的值的行全部删除

select a.id,a.email from register a inner join register b on a.email=b.email and a.id>b.id;

HONG@pdb1> select * from register a inner join register b on a.email=b.email and a.id>b.id;

 ID EMAIL	       ID EMAIL
--- ----------------- --- -----------------
  4 scott@example.com	1 scott@example.com
  3 john@example.com	2 john@example.com

HONG@pdb1> select a.id,a.email from register a inner join register b on a.email=b.email and a.id>b.id;

 ID EMAIL
--- -----------------
  4 scott@example.com
  3 john@example.com

HONG@pdb1> 


注意点：如果id有null值

HONG@pdb1> select * from register;

 ID EMAIL
--- -----------------
  1 scott@example.com
  2 john@example.com
  3 john@example.com
  4 scott@example.com
  5 kathy@example.com
    null@example.com
    null1@example.com
    null@example.com
    null1@example.com

9 rows selected.

HONG@pdb1> 

HONG@pdb1> select * from register where id not in(
  2      select min(id) from register group by email
  3  );

no rows selected

HONG@pdb1> 

把Null排除掉

select * from register where id not in(
    select min(id) from register where id is not null group by email
);

### 分数排名

drop table if exists scores;
create table if not exists scores (id int, score number(3,2));
insert into Scores (id, score) values ('1', '3.5');
insert into Scores (id, score) values ('2', '3.65');
insert into Scores (id, score) values ('3', '4.0');
insert into Scores (id, score) values ('4', '3.85');
insert into Scores (id, score) values ('5', '4.0');
insert into Scores (id, score) values ('6', '3.65');
commit;


Scores 表:
+----+-------+
| id | score |
+----+-------+
| 1  | 3.50  |
| 2  | 3.65  |
| 3  | 4.00  |
| 4  | 3.85  |
| 5  | 4.00  |
| 6  | 3.65  |
+----+-------+
输出: 
+-------+------+
| score | rank |
+-------+------+
| 4.00  | 1    |
| 4.00  | 1    |
| 3.85  | 2    |
| 3.65  | 3    |
| 3.65  | 3    |
| 3.50  | 4    |
+-------+------+


select
    score,
    dense_rank() over(order by score desc) as rank
from scores a
order by score desc;

HONG@pdb1> 
select
    score,
    dense_rank() over(order by score desc) as rank
  3    4  from scores a
  5  order by score desc;

     SCORE	 RANK
---------- ----------
	 4	    1
	 4	    1
      3.85	    2
      3.65	    3
      3.65	    3
      3.45	    4

6 rows selected.

HONG@pdb1> 

DENSE_RANK 函数与 RANK 存在以下一点不同：如果两个或两个以上的行结合，则一系列排名的值之间没有间隔。例如，如果两个行的排名为 1，则下一个排名则为 2。

select
    score,
    rank() over(order by score desc) as rank
from scores a
order by score desc;


HONG@pdb1> select
  2      score,
    rank() over(order by score desc) as rank
  4  from scores a
  5  order by score desc;

     SCORE	 RANK
---------- ----------
	 4	    1
	 4	    1
      3.85	    3
      3.65	    4
      3.65	    4
      3.45	    6

6 rows selected.

HONG@pdb1> 


### 连续出现三次的数字

drop table if exists logs;
Create table If Not Exists Logs (id int, num int);
insert into Logs (id, num) values ('1', '1');
insert into Logs (id, num) values ('2', '1');
insert into Logs (id, num) values ('3', '1');
insert into Logs (id, num) values ('4', '2');
insert into Logs (id, num) values ('5', '1');
insert into Logs (id, num) values ('6', '2');
commit;

输入：
Logs 表：
+----+-----+
| Id | Num |
+----+-----+
| 1  | 1   |
| 2  | 1   |
| 3  | 1   |
| 4  | 2   |
| 5  | 1   |
| 6  | 2   |
| 7  | 2   |
+----+-----+
输出：
Result 表：
+-----------------+
| ConsecutiveNums |
+-----------------+
| 1               |
+-----------------+
解释：1 是唯一连续出现至少三次的数字。

select
    distinct b.num ConsecutiveNums
from (
    select  
        a.num,
        (row_number() over (order by a.id asc) - 
        row_number() over (partition by a.num order by a.id asc)) as series_id
    from logs a
) b
group by b.num, b.series_id
having count(1) >= 3;


select
    a.id,
    a.num,
    row_number() over (order by a.id asc)
from logs a;

select  
    a.id,
    a.num,
    row_number() over (partition by a.num order by a.id asc)
from logs a;



select row_number() over(partition by A order by B ) as rowIndex from table

A：为分组字段
B：为分组后的排序字段。
table 表的结构 多为：  多人 多条的相关数据。（比如：订单信息）
此条sql语句，多用于对数据进行分组排序，并对每个组中的数据分别进行编号，编号从1开始递增，每个组内的编号不会重复；


HONG@pdb1> select * from logs;

 ID	   NUM
--- ----------
  1	     1
  2	     1
  3	     1
  4	     2
  5	     1
  6	     2

6 rows selected.

select a.id,
  2      a.num,
    row_number() over (order by a.id asc)
  4  from logs a;

 ID	   NUM ROW_NUMBER()OVER(ORDERBYA.IDASC)
--- ---------- --------------------------------
  1	     1				      1
  2	     1				      2
  3	     1				      3
  4	     2				      4
  5	     1				      5
  6	     2				      6

6 rows selected.

HONG@pdb1> 
select  
  2      a.id,
  3      a.num,
    row_number() over (partition by a.num order by a.id asc)
  5  from logs a;

 ID	   NUM ROW_NUMBER()OVER(PARTITIONBYA.NUMORDERBYA.IDASC)
--- ---------- ------------------------------------------------
  1	     1						      1
  2	     1						      2
  3	     1						      3
  5	     1						      4
  4	     2						      1
  6	     2						      2

6 rows selected.

HONG@pdb1> 


select
    a.id,
    a.num,
    row_number() over (order by a.id asc)  aaa,
    row_number() over (partition by a.num order by a.id asc) bbb,
    (row_number() over (order by a.id asc) - 
    row_number() over (partition by a.num order by a.id asc)) as series_id
from logs a

HONG@pdb1> 
select
  2      a.id,
  3      a.num,
    row_number() over (order by a.id asc)  aaa,
    row_number() over (partition by a.num order by a.id asc) bbb,
    (row_number() over (order by a.id asc) - 
    row_number() over (partition by a.num order by a.id asc)) as series_id
  8  from logs a
  9  ;

 ID	   NUM	      AAA	 BBB  SERIES_ID
--- ---------- ---------- ---------- ----------
  1	     1		1	   1	      0
  2	     1		2	   2	      0
  3	     1		3	   3	      0
  4	     2		4	   1	      3
  5	     1		5	   4	      1
  6	     2		6	   2	      4

6 rows selected.

HONG@pdb1> 


在使用over等开窗函数时，over里头的分组及排序的执行晚于“where，group by，order by”的执行。



with tmp as (
select 
    a.id,a.num,
    row_number() over(order by a.id) rn
from Logs a
where (a.id,a.num) not in (select b.id+1,b.num from Logs b)
or (a.id,a.num) not in (select c.id-1,c.num from Logs c)
) 
select * from tmp;


### 连续区间


Create table If Not Exists Logs (log_id int);
insert into Logs (log_id) values ('1');
insert into Logs (log_id) values ('2');
insert into Logs (log_id) values ('3');
insert into Logs (log_id) values ('7');
insert into Logs (log_id) values ('8');
insert into Logs (log_id) values ('10');


select 
    min(a.log_id) start_id,
    max(a.log_id) end_id
from
(
    select
        a.log_id,
        a.log_id - row_number() over(order by a.log_id) rn
    from Logs a
)a
group by a.rn;



HONG@pdb1> select a.log_id,row_number() over(order by a.log_id) rn from logs a;

    LOG_ID	   RN
---------- ----------
	 1	    1
	 2	    2
	 3	    3
	 7	    4
	 8	    5
	10	    6

6 rows selected.

HONG@pdb1> select a.log_id,row_number() over(order by a.log_id) rn, a.log_id - row_number() over(order by a.log_id) from logs a;

    LOG_ID	   RN A.LOG_ID-ROW_NUMBER()OVER(ORDERBYA.LOG_ID)
---------- ---------- ------------------------------------------
	 1	    1					       0
	 2	    2					       0
	 3	    3					       0
	 7	    4					       3
	 8	    5					       3
	10	    6					       4

6 rows selected.

HONG@pdb1> 

按照log_id排序分rownum，
之后 跟log_id相差，连续值的话，相差是一样的结果，
再按照这个结果进行group by分组，分组后在找每组的最小值和最大值

### 超过经理收入的员工

drop table if exists employee;
Create table If Not Exists Employee (id int, name varchar(255), salary int, managerId int);
insert into Employee (id, name, salary, managerId) values ('1', 'Joe', '70000', '3');
insert into Employee (id, name, salary, managerId) values ('2', 'Henry', '80000', '4');
insert into Employee (id, name, salary, managerId) values ('3', 'Sam', '60000', null);
insert into Employee (id, name, salary, managerId) values ('4', 'Max', '90000', null);
commit;

输入: 
Employee 表:
+----+-------+--------+-----------+
| id | name  | salary | managerId |
+----+-------+--------+-----------+
| 1  | Joe   | 70000  | 3         |
| 2  | Henry | 80000  | 4         |
| 3  | Sam   | 60000  | Null      |
| 4  | Max   | 90000  | Null      |
+----+-------+--------+-----------+
输出: 
+----------+
| Employee |
+----------+
| Joe      |
+----------+
解释: Joe 是唯一挣得比经理多的雇员。


HONG@pdb1> select * from employee;

 ID NAME   SALARY  MANAGERID
--- ----- ------- ----------
  1 Joe     70000	   3
  2 Henry   80000	   4
  3 Sam     60000
  4 Max     90000

HONG@pdb1> 


select * from employee a left join employee b on a.managerid=b.id where a.salary > b.salary;

#方法一
select
    a.name Employee
from Employee a
where a.salary > (select b.salary from Employee b where a.managerId = b.id);

#方法二
select
    a.name Employee
from Employee a
inner join Employee b
on a.managerId = b.id
where a.salary > b.salary;


### 查找重复的电子邮箱

//测试数据
drop table if exists person;
Create table If Not Exists Person (id int, email varchar(255));
insert into Person (id, email) values ('1', 'a@b.com');
insert into Person (id, email) values ('2', 'c@d.com');
insert into Person (id, email) values ('3', 'a@b.com');
commit;

示例：
+----+---------+
| Id | Email   |
+----+---------+
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |
+----+---------+
根据以上输入，你的查询应返回以下结果：
+---------+
| Email   |
+---------+
| a@b.com |
+---------+
说明：所有电子邮箱都是小写字母。

select a.email,count(a.email) from person a group by email;

HONG@pdb1> select a.email,count(a.email) from person a group by email having(count(a.email)>1);

EMAIL	 COUNT(A.EMAIL)
------- ---------------
a@b.com 	      2

HONG@pdb1> 


重复的Email，是指那些出现次数超过1次的Email。那么，直接统计每个Email出现的次数，然后过滤出次数超过1次的即可。
统计每个Email出现的次数，可以使用GROUP BY+COUNT的方式实现。
而过滤COUNT的结果，SQL提供了HAVING关键字，从而可以节省一层子查询的嵌套。

select a.email,count(a.email) from person a group by email having(count(a.email)>1);

-----------------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name   | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
-----------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	    |	   1 |	      |       |     3 (100)|	      |      1 |00:00:00.01 |	    3 |
|*  1 |  HASH GROUP BY	   |	    |	   1 |	    3 |   387 |     3  (34)| 00:00:01 |      1 |00:00:00.01 |	    3 |
|   2 |   TABLE ACCESS FULL| PERSON |	   1 |	    3 |   387 |     2	(0)| 00:00:01 |      3 |00:00:00.01 |	    3 |
-----------------------------------------------------------------------------------------------------------------------

select b.email from (select a.email,count(a.email) cnt from person a group by email) b where b.cnt>1;

------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	    | Name   | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT    |	     |	    1 |        |       |     3 (100)|	       |      1 |00:00:00.01 |	     3 |
|*  1 |  FILTER 	    |	     |	    1 |        |       |	    |	       |      1 |00:00:00.01 |	     3 |
|   2 |   HASH GROUP BY     |	     |	    1 |      3 |   387 |     3	(34)| 00:00:01 |      2 |00:00:00.01 |	     3 |
|   3 |    TABLE ACCESS FULL| PERSON |	    1 |      3 |   387 |     2	 (0)| 00:00:01 |      3 |00:00:00.01 |	     3 |
------------------------------------------------------------------------------------------------------------------------


### 部门工资最高的员工

输入：
Employee 表:
+----+-------+--------+--------------+
| id | name  | salary | departmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 70000  | 1            |
| 2  | Jim   | 90000  | 1            |
| 3  | Henry | 80000  | 2            |
| 4  | Sam   | 60000  | 2            |
| 5  | Max   | 90000  | 1            |
+----+-------+--------+--------------+
Department 表:
+----+-------+
| id | name  |
+----+-------+
| 1  | IT    |
| 2  | Sales |
+----+-------+
输出：
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Jim      | 90000  |
| Sales      | Henry    | 80000  |
| IT         | Max      | 90000  |
+------------+----------+--------+

解释：Max 和 Jim 在 IT 部门的工资都是最高的，Henry 在销售部的工资最高。

drop table if exists Employee;
drop table if exists Department;

Create table If Not Exists Employee (id int, name varchar(255), salary int, departmentId int);
Create table If Not Exists Department (id int, name varchar(255));
insert into Employee (id, name, salary, departmentId) values ('1', 'Joe', '70000', '1');
insert into Employee (id, name, salary, departmentId) values ('2', 'Jim', '90000', '1');
insert into Employee (id, name, salary, departmentId) values ('3', 'Henry', '80000', '2');
insert into Employee (id, name, salary, departmentId) values ('4', 'Sam', '60000', '2');
insert into Employee (id, name, salary, departmentId) values ('5', 'Max', '90000', '1');
insert into Department (id, name) values ('1', 'IT');
insert into Department (id, name) values ('2', 'Sales');
commit;



select a.name, a.salary, a.departmentid, dense_rank() over(partition by departmentid order by salary desc) rank from employee a order by departmentid;

HONG@pdb1> select a.name, a.salary, a.departmentid, dense_rank() over(partition by departmentid order by salary desc) rank from employee a order by departmentid;

NAME   SALARY  DEPARTMENTID  RANK
----- ------- ------------- -----
Jim	90000		  1	1
Max	90000		  1	1
Joe	70000		  1	2
Henry	80000		  2	1
Sam	60000		  2	2

HONG@pdb1> 

select d.name Department,c.name Employee,c.salary Salary from department d left join 
(select a.name, a.salary, a.departmentid, dense_rank() over(partition by departmentid order by salary desc) rank from employee a order by departmentid) c
on d.id=c.departmentid where c.rank=1 order by 3 desc,1,2;

NAME  NAME   SALARY
----- ----- -------
IT    Jim     90000
IT    Max     90000
Sales Henry   80000

HONG@pdb1> 


select
    c.name Department,
    b.name Employee,
    b.salary
from (
select
    a.name,a.salary,a.departmentId,
    rank() over(partition by a.departmentId order by a.salary desc) rk
from Employee a
)b
left join Department c
on b.departmentId = c.id
where b.rk = 1 ;


### 部门工资前三高的所有员工

输入: 
Employee 表:
+----+-------+--------+--------------+
| id | name  | salary | departmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 85000  | 1            |
| 2  | Henry | 80000  | 2            |
| 3  | Sam   | 60000  | 2            |
| 4  | Max   | 90000  | 1            |
| 5  | Janet | 69000  | 1            |
| 6  | Randy | 85000  | 1            |
| 7  | Will  | 70000  | 1            |
+----+-------+--------+--------------+
Department  表:
+----+-------+
| id | name  |
+----+-------+
| 1  | IT    |
| 2  | Sales |
+----+-------+
输出: 
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Max      | 90000  |
| IT         | Joe      | 85000  |
| IT         | Randy    | 85000  |
| IT         | Will     | 70000  |
| Sales      | Henry    | 80000  |
| Sales      | Sam      | 60000  |
+------------+----------+--------+
解释:
在IT部门:
- Max的工资最高
- 兰迪和乔都赚取第二高的独特的薪水
- 威尔的薪水是第三高的
在销售部:
- 亨利的工资最高
- 山姆的薪水第二高
- 没有第三高的工资，因为只有两名员工
- 
//测试数据
drop table if exists employee;
drop table if exists department;
Create table If Not Exists Employee (id int, name varchar(255), salary int, departmentId int);
Create table If Not Exists Department (id int, name varchar(255));
insert into Employee (id, name, salary, departmentId) values ('1', 'Joe', '85000', '1');
insert into Employee (id, name, salary, departmentId) values ('2', 'Henry', '80000', '2');
insert into Employee (id, name, salary, departmentId) values ('3', 'Sam', '60000', '2');
insert into Employee (id, name, salary, departmentId) values ('4', 'Max', '90000', '1');
insert into Employee (id, name, salary, departmentId) values ('5', 'Janet', '69000', '1');
insert into Employee (id, name, salary, departmentId) values ('6', 'Randy', '85000', '1');
insert into Employee (id, name, salary, departmentId) values ('7', 'Will', '70000', '1');
insert into Department (id, name) values ('1', 'IT');
insert into Department (id, name) values ('2', 'Sales');
commit;

根据题目要求：取出每个部门赚钱最多的前3个人，也就是工资排名前3的人。如果工资相同，则作为并列名次返回。
那么，很明显，按部门开窗排名，是最直观的实现方式。而开窗函数有3个：
* **row_number**：为每一行返回一个唯一的数字，排名相等则按随机顺序返回排名。
* **rank**：排名相等的情况下返回相同的排名，但排名结果会有断档。
* **dense_rank**：排名相等的情况下返回相同的排名，但排名结果不会有断档。
* 
select a.name, a.salary, a.departmentid, dense_rank() over(partition by departmentid order by salary desc) rank from employee a order by departmentid;

select * from (select a.name, a.salary, a.departmentid, dense_rank() over(partition by departmentid order by salary desc) rank from employee a order by departmentid) where rank<=3;

### 温度增长的那一天


lag与lead函数是跟偏移量相关的两个分析函数，通过这两个函数可以在一次查询中取出同一字段的前N行的数据(lag)和后N行的数据(lead)作为独立的列,从而更方便地进行进行数据过滤。这种操作可以代替表的自联接，并且LAG和LEAD有更高的效率。

over()表示 lag()与lead()操作的数据都在over()的范围内，他里面可以使用partition by 语句（用于分组） order by 语句（用于排序）。partition by a order by b表示以a字段进行分组，再 以b字段进行排序，对数据进行查询。

　　例如：lead(field, num, defaultvalue) field需要查找的字段，num往后查找的num行的数据，defaultvalue没有符合条件的默认值。

一般按要求排名后，向上或者向下取排名第几的数值

lag(字段名称 , 向上偏移量 , 超出范围时默认值) over (partion by …order by …)
lead(字段名称 , 向下偏移量 , 超出范围时默认值) over (partion by …order by …)



输入：
Weather 表：
+----+------------+-------------+
| id | recordDate | Temperature |
+----+------------+-------------+
| 1  | 2024-01-01 | 10          |
| 2  | 2024-01-02 | 25          |
| 3  | 2024-01-03 | 20          |
| 4  | 2024-01-04 | 30          |
+----+------------+-------------+
输出：
+----+
| id |
+----+
| 2  |
| 4  |
+----+
解释：
2024-01-02 的温度比前一天高（10 -> 25）
2024-01-04 的温度比前一天高（20 -> 30）

drop table if exists weather;
Create table If Not Exists Weather (id int, recordDate date, temperature int);
insert into Weather (id, recordDate, temperature) values (1, to_date('2024-01-01','yyyy-mm-dd'), 10);
insert into Weather (id, recordDate, temperature) values (2, to_date('2024-01-02','yyyy-mm-dd'), 25);
insert into Weather (id, recordDate, temperature) values (3, to_date('2024-01-03','yyyy-mm-dd'), 20);
insert into Weather (id, recordDate, temperature) values (4, to_date('2024-01-04','yyyy-mm-dd'), 30);
commit;


select id,recordDate,temperature,
lag(recordDate,1,null) over(order by recordDate) pre_recordDate,
lag(temperature,1,null) over(order by temperature) pre_temperature
from weather;

	ID RECORDDATE	       TEMPERATURE PRE_RECORDDATE      PRE_TEMPERATURE
---------- ------------------- ----------- ------------------- ---------------
	 1 2024-01-01 00:00:00		10
	 3 2024-01-03 00:00:00		20 2024-01-02 00:00:00		    10
	 2 2024-01-02 00:00:00		25 2024-01-01 00:00:00		    20
	 4 2024-01-04 00:00:00		30 2024-01-03 00:00:00		    25


select id,recordDate,temperature,
lag(recordDate,1,null) over(order by recordDate) pre_recordDate,
lag(temperature,1,null) over(order by temperature) pre_temperature
from weather 


select * from (
select id,recordDate,temperature,
lag(recordDate,1,null) over(order by recordDate) pre_recordDate,
lag(temperature,1,null) over(order by temperature) pre_temperature
from weather 
) b where recordDate - pre_recordDate = 1;

	ID RECORDDATE	       TEMPERATURE PRE_RECORDDATE      PRE_TEMPERATURE
---------- ------------------- ----------- ------------------- ---------------
	 3 2024-01-03 00:00:00		20 2024-01-02 00:00:00		    10
	 2 2024-01-02 00:00:00		25 2024-01-01 00:00:00		    20
	 4 2024-01-04 00:00:00		30 2024-01-03 00:00:00		    25



日期/时间增减函数
      Oracle 
            增减一小时：
                         createDate+1/24 
                         createDate-1/24
            增减一天：
                         createDate+1
                         createDate-1
            增减一月：
                         add_months(createDate, 1)
                         add_months(createDate, -1)
           增减一季度：
                         add_months(createDate, 3)
                         add_months(createDate, -3)
           增减一年：
                        add_months(createDate, 12) 
                        add_months(createDate, -12)
      Mysql
           增减一小时：
                        date_sub(createDate, interval -1 hour)
                        date_sub(createDate, interval 1 hour)
           增减一天：
                        date_sub(createDate, interval -1 day)
                        date_sub(createDate, interval 1 day)
           增减一月：
                        date_sub(createDate, interval -1 month)
                        date_sub(createDate, interval 1 month)
           增减一季度：
                        date_sub(createDate, interval -3 month)
                        date_sub(createDate, interval 3 month)
           增减一年：
                        date_sub(createDate, interval -1 year)
                        date_sub(createDate, interval 1 year)




select * from (
select id,recordDate,temperature,
lag(recordDate,1,null) over(order by recordDate) pre_recordDate,
lag(temperature,1,null) over(order by temperature) pre_temperature
from weather 
) b where recordDate - pre_recordDate = 1 and (temperature - pre_temperature) > 5;

	ID RECORDDATE	       TEMPERATURE PRE_RECORDDATE      PRE_TEMPERATURE
---------- ------------------- ----------- ------------------- ---------------
	 3 2024-01-03 00:00:00		20 2024-01-02 00:00:00		    10



