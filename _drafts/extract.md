
oracle中extract()函数从oracle 9i中引入的,主要作用于一个date或者interval类型中截取特定的部分
extract()语法如下：
extract (
{ year | month | day | hour | minute | second | 某一时区 }
from { date类型值 | interval类型值} )


SELECT 
EXTRACT (YEAR FROM DATE '2021-07-22') AS YEAR,
EXTRACT (MONTH FROM DATE '2021-07-22') AS MONTH,
EXTRACT (DAY FROM DATE '2021-07-22') AS DAY
FROM DUAL;


SELECT 
EXTRACT( HOUR FROM CAST( datetime AS TIMESTAMP ) ) AS Hours,
EXTRACT( MINUTE FROM CAST( datetime AS TIMESTAMP ) ) AS Minutes,
EXTRACT( SECOND FROM CAST( datetime AS TIMESTAMP ) ) AS Seconds
FROM (
SELECT TO_DATE( '2021-07-22 09:13:10', 'YYYY-MM-DD HH24:MI:SS' ) AS datetime FROM DUAL);


SELECT 
EXTRACT (YEAR FROM DATE '2021-07-12') AS YEAR
FROM DUAL;