


-- ddl
```
drop table if exists student;
create table student(
    s_id int not null primary key,
    s_name varchar(20) not null,
    s_birth date not null,
    s_sex varchar(10) not null
);

drop table if exists course;
create table course(
    c_id int not null primary key,
    c_name varchar(20) not null,
    t_id int not null
);

drop table if exists teacher;
create table teacher(
    t_id int not null primary key,
    t_name varchar(20) not null
);

drop table if exists score;
create table score(
    id int not null primary key auto_increment, 
    s_id int not null,
    c_id int not null,
    s_score smallint not null
);
```

-- load

https://www.cnblogs.com/wkfvawl/p/17053815.html


```
insert into student values
(1,'赵雷','1990-01-01','男'),
(2,'钱电','1990-12-21','男'),
(3,'孙风','1990-05-20','男'),
(4,'李云','1990-08-06','男'),
(5,'周梅','1991-12-01','女'),
(6,'吴兰','1992-03-01','女'),
(7,'郑竹','1989-07-01','女'),
(8,'王菊','1990-01-20','女');


insert into course values
(1,'语文',2),
(2,'数学',1),
(3,'英语',4);

insert into teacher values
(1,'张三'),
(2,'李四'),
(3,'王五');

insert into score(s_id,c_id,s_score) values
(1,1,80),
(1,2,90),
(1,3,99),
(2,1,70),
(2,2,60),
(2,3,180),
(3,1,80),
(3,2,80),
(3,3,80),
(4,1,50),
(4,2,30),
(4,3,-20),
(5,1,76),
(5,2,87),
(6,1,31),
(6,3,34),
(7,2,89),
(7,3,98);
```

```
Hive SQL题库-初级
https://www.cnblogs.com/wkfvawl/p/17053815.html

drop table if exists student;
create table student(
    stu_id int not null primary key,
    stu_name varchar(20) not null,
    birthday date not null,
    sex varchar(10) not null
);

drop table if exists course;
create table course(
    course_id int not null primary key,
    course_name varchar(20) not null,
    tea_id int not null
);

drop table if exists teacher;
create table teacher(
    tea_id int not null primary key,
    tea_name varchar(20) not null
);

drop table if exists score;
create table score(
    id int not null primary key auto_increment, 
    stu_id int not null,
    course_id int not null,
    score smallint not null
);

insert into student values
(01,'彭于晏','1995-05-16','男'),
(02,'胡歌歌','1994-03-20','男'),
(03,'周杰伦','1995-04-30','男'),
(04,'刘德华','1998-08-28','男'),
(05,'唐国强','1993-09-10','男'),
(06,'陈道明','1992-11-12','男'),
(07,'陈坤坤','1999-04-09','男'),
(08,'吴京京','1994-02-06','男'),
(09,'郭德纲','1992-12-05','男'),
(10,'于谦谦','1998-08-23','男'),
(11,'潘长江','1995-05-27','男'),
(12,'杨紫紫','1996-12-21','女'),
(13,'蒋欣欣','1997-11-08','女'),
(14,'赵丽颖','1990-01-09','女'),
(15,'刘亦菲','1993-01-14','女'),
(16,'周冬雨','1990-06-18','女'),
(17,'范冰冰','1992-07-04','女'),
(18,'李冰冰','1993-09-24','女'),
(19,'邓紫棋','1994-08-31','女'),
(20,'宋丹丹','1991-03-01','女');

insert into course values
(1,'语文',1003),
(2,'数学',1001),
(3,'英语',1004),
(4,'体育',1002),
(5,'音乐',1002);

insert into teacher values
(1001,'张高数'),
(1002,'李体音'),
(1003,'王子文'),
(1004,'刘丽英');

insert into score(stu_id,course_id,score) values
(01,01,94),
(02,01,74),
(04,01,85),
(05,01,64),
(06,01,71),
(07,01,48),
(08,01,56),
(09,01,75),
(10,01,84),
(11,01,61),
(12,01,44),
(13,01,47),
(14,01,81),
(15,01,90),
(16,01,71),
(17,01,58),
(18,01,38),
(19,01,46),
(20,01,89),
(01,02,63),
(02,02,84),
(04,02,93),
(05,02,44),
(06,02,90),
(07,02,55),
(08,02,34),
(09,02,78),
(10,02,68),
(11,02,49),
(12,02,74),
(13,02,35),
(14,02,39),
(15,02,48),
(16,02,89),
(17,02,34),
(18,02,58),
(19,02,39),
(20,02,59),
(01,03,79),
(02,03,87),
(04,03,89),
(05,03,99),
(06,03,59),
(07,03,70),
(08,03,39),
(09,03,60),
(10,03,47),
(11,03,70),
(12,03,62),
(13,03,93),
(14,03,32),
(15,03,84),
(16,03,71),
(17,03,55),
(18,03,49),
(19,03,93),
(20,03,81),
(01,04,54),
(02,04,100),
(04,04,59),
(05,04,85),
(07,04,63),
(09,04,79),
(10,04,34),
(13,04,69),
(14,04,40),
(16,04,94),
(17,04,34),
(20,04,50),
(05,05,85),
(07,05,63),
(09,05,79),
(15,05,59),
(18,05,87);

```


参考:

原文链接：https://blog.csdn.net/GodSuzzZ/article/details/106935523

```
load data local infile '/vagrant/student.csv' into table student
CHARACTER SET utf8 -- 可选，指定导入文件的编码，避免中文乱码问题。假如这里文件 my_user_info.txt 的编码为 gbk，那么这里编码就应该设为 gbk 了
FIELDS TERMINATED BY '/t' -- 字段分隔符，每个字段(列)以什么字符分隔，默认是 \t
	OPTIONALLY ENCLOSED BY '' -- 文本限定符，每个字段被什么字符包围，默认是空字符
	ESCAPED BY '\\' -- 转义符，默认是 \
LINES TERMINATED BY '\n' -- 记录分隔符，如字段本身也含\n，那么应先去除，否则load data 会误将其视作另一行记录进行导入
(s_id, s_name, s_birth, s_sex) -- 每一行文本按顺序对应的表字段，建议不要省略
;

1.一定要开启local_infile模块，否则报错ERROR 1148 (42000): The used command is not allowed with this MySQL version
2.整个操作是在mysql的root用户下操作完成的，不要去你自定义的用户下操作。
3.注意整个load语句中单词不要写错了，文件地址用’/’。
4.重新登录的时候记得带上--local-infile=1这个参数。

解决方法是需要以mysql -u 用户名 -p --local-infile的命令登陆，如：
mysql -u root -p --local-infile
```



create table if not exists course_new as
with
-- t1：正确的课程信息及教员编号：c_id,c_name,t_id
t1 as (select c_id,c_name,t_id from course c where exists(select * from teacher t where t.t_id = c.t_id)),
-- t2：教员编号错误的课程信息：c_id,c_name
t2 as (select c.c_id,c.c_name from course c where not exists(select * from t1 where t1.t_id = c.t_id)),
-- t3：未担任课程的教员编号：t_id
t3 as (select t.t_id from teacher t where not exists(select * from course c where c.t_id = t.t_id)),
-- t4：t2和t3拼接（交叉连接），将未担任课程的教员编号拼到教员编号错误的课程信息后，再与t1合并，即为正确的数据
t4 as (select c_id,c_name,t_id from t1 union all select c_id,c_name,t_id from t2,t3)
-- union后顺序会乱，需要按照课程id排下序
select * from t4 order by c_id;

alter table course rename course_old;
alter table course_new rename course;



### 查询姓名中带“冰”的学生名单

```
mysql [localhost:8032] {msandbox} (testsql) > select* from student where stu_name like "%冰%";
+--------+-----------+------------+-----+
| stu_id | stu_name  | birthday   | sex |
+--------+-----------+------------+-----+
|     17 | 范冰冰    | 1992-07-04 | 女  |
|     18 | 李冰冰    | 1993-09-24 | 女  |
+--------+-----------+------------+-----+
2 rows in set (0.00 sec)

mysql [localhost:8032] {msandbox} (testsql) >  
```

### 查询姓“王”老师的个数

```
select count(*)  wang_count from teacher where tea_name like "王%";

mysql [localhost:8032] {msandbox} (testsql) > select count(*)  wang_count from teacher where tea_name like "王%";
+------------+
| wang_count |
+------------+
|          1 |
+------------+
1 row in set (0.00 sec)

mysql [localhost:8032] {msandbox} (testsql) > 
```

### 检索课程编号为“04”且分数小于60的学生的课程信息，结果按分数降序排列

```
select * from student where stu_id=4

select st.*,sc.score score from score sc left join student st on sc.stu_id=st.stu_id where sc.stu_id=4;

select stu_id,course_id,score from score where course_id=4 and score < 60 order by score desc;

select stu_id,course_id,score from score where course_id=4 order by score desc;


```