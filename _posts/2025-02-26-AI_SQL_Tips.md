---
layout: post
title: "AI SQL Tips"
category: AI
tags: AI Oracle Tips
---

* content
{:toc}

AI SQL Tips

本文是通过 [Qwen2.5-Max](https://chat.qwen.ai) 生成

This tips are from [Qwen2.5-Max](https://chat.qwen.ai).

输入: Oracle 执行计划

Input: Oracle executeion plan







## English version

Below is the English translation of the content you requested:

---

### **1. Methods to View Execution Plans**
Oracle provides several tools and commands to view execution plans:

#### **(1) Using `EXPLAIN PLAN`**
`EXPLAIN PLAN` is a static analysis tool used to generate an execution plan for an SQL query without actually executing it.
```sql
-- Generate the execution plan
EXPLAIN PLAN FOR
SELECT * FROM employees WHERE department_id = 10;

-- View the execution plan
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```
- **Advantages**: Simple and easy to use, suitable for quickly viewing execution plans.
- **Disadvantages**: Only shows the theoretical execution plan, which may differ from actual runtime behavior.

#### **(2) Using `DBMS_XPLAN`**
`DBMS_XPLAN` is a more powerful tool that can display detailed execution plan information.
```sql
-- View the execution plan of the most recently executed SQL
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(NULL, NULL, 'ALLSTATS LAST'));
```
- Parameter explanation:
  - `NULL, NULL`: Refers to the most recent SQL in the current session.
  - `'ALLSTATS LAST'`: Displays actual execution statistics (e.g., number of rows, buffer reads).

#### **(3) Using `AUTOTRACE`**
`AUTOTRACE` is a feature in SQL*Plus that directly displays the execution plan and statistical information.
```sql
SET AUTOTRACE ON;

-- Execute the query
SELECT * FROM employees WHERE department_id = 10;

SET AUTOTRACE OFF;
```
- **Advantages**: Displays both the execution plan and actual runtime statistics.
- **Disadvantages**: Requires use in SQL*Plus or similar tools.

#### **(4) Using AWR Reports**
AWR (Automatic Workload Repository) reports capture historical performance data of the database, including execution plans for high-load SQL statements.
- Use case: Suitable for analyzing historical performance issues in production environments.

---

### **2. Key Fields in Execution Plans**
Execution plans are typically displayed in a tree structure, with each operation corresponding to one row. Below are some key fields and their meanings:

| Field Name      | Meaning                                                                 |
|-----------------|-------------------------------------------------------------------------|
| **ID**          | Unique identifier for the operation, indicating the execution order (top-down). |
| **OPERATION**   | Type of operation (e.g., `TABLE ACCESS FULL`, `INDEX RANGE SCAN`, etc.). |
| **NAME**        | Name of the accessed object (e.g., table name or index name).           |
| **ROWS**        | Estimated number of rows returned.                                      |
| **BYTES**       | Estimated amount of data returned (in bytes).                           |
| **COST**        | Query cost value (calculated by the optimizer, lower is better).        |
| **TIME**        | Estimated execution time.                                               |
| **PSTART/PSTOP**| Start and end partition numbers for partitioned tables (if applicable). |

---

### **3. Common Operation Types**
The operation types in execution plans reflect how the query is executed. Below are some common operations and their meanings:

#### **(1) Table Access Methods**
- **TABLE ACCESS FULL**: Full table scan, reading the entire table row by row.
  - **Optimization Tip**: Check if indexes are missing or if filters can reduce the scan range.

- **TABLE ACCESS BY INDEX ROWID**: Locates specific rows in the table via an index.
  - **Optimization Tip**: Ensure the index has high selectivity and avoid unnecessary table lookups.

- **INDEX RANGE SCAN**: Scans the index within a range.
  - **Optimization Tip**: Check the selectivity of indexed columns and avoid inefficient range queries.

- **INDEX UNIQUE SCAN**: Unique index scan, often used for primary keys or unique constraints.
  - **Optimization Tip**: Ensure query conditions fully utilize the unique index.

#### **(2) Join Methods**
- **NESTED LOOPS**: Nested loop join, suitable for small driving tables and large driven tables.
  - **Optimization Tip**: Ensure the driving table is small and the join columns are indexed.

- **HASH JOIN**: Hash join, suitable for joining large tables.
  - **Optimization Tip**: Ensure sufficient memory is allocated for the hash table.

- **MERGE JOIN**: Sort-merge join, suitable for pre-sorted datasets.
  - **Optimization Tip**: Leverage indexes or pre-sort data whenever possible.

#### **(3) Sorting and Aggregation**
- **SORT ORDER BY**: Sorts the result set.
  - **Optimization Tip**: Try to leverage indexes to avoid explicit sorting.

- **SORT GROUP BY**: Sorts grouped data.
  - **Optimization Tip**: Reduce the number of grouping columns or use covering indexes.

---

### **4. Steps to Analyze Execution Plans**
When analyzing execution plans, follow these steps to identify potential issues:

#### **(1) Check for Full Table Scans**
- If `TABLE ACCESS FULL` is found, it means the query is not using an index.
- **Optimization Direction**:
  - Check if indexes can be added to the `WHERE` condition.
  - Ensure statistics are up-to-date (use `DBMS_STATS.GATHER_TABLE_STATS` to update statistics).

#### **(2) Check Index Usage**
- Confirm whether the query is using appropriate indexes (e.g., `INDEX RANGE SCAN` or `INDEX UNIQUE SCAN`).
- If no index is used, it could be due to:
  - Low selectivity of the index.
  - Use of functions in the query condition (e.g., `UPPER(column)`), causing the index to become invalid.
  - Outdated or inaccurate statistics.

#### **(3) Check Join Methods**
- For multi-table joins, confirm whether the optimal join method is selected (e.g., `HASH JOIN` or `NESTED LOOPS`).
- If join efficiency is low, consider adjusting the join order or creating appropriate indexes.

#### **(4) Check Cost and Row Estimates**
- Pay attention to the `COST` and `ROWS` columns to determine if the optimizer's estimates are reasonable.
- If there is a significant discrepancy between estimated and actual row counts, it may be due to outdated or unevenly distributed statistics.

---

### **5. Example Analysis**
Here is a simple example of an execution plan:

```sql
EXPLAIN PLAN FOR
SELECT e.employee_id, e.first_name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > 5000;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

Execution plan output:

```
---------------------------------------------------------------
| Id | Operation          | Name        | Rows | Bytes | Cost |
---------------------------------------------------------------
|  0 | SELECT STATEMENT   |             |  100 |  5000 |   15 |
|  1 |  HASH JOIN         |             |  100 |  5000 |   15 |
|  2 |   TABLE ACCESS FULL| DEPARTMENTS |   10 |   200 |    5 |
|  3 |   TABLE ACCESS FULL| EMPLOYEES   |  500 | 15000 |   10 |
---------------------------------------------------------------
```

**Analysis**:
1. The query uses a `HASH JOIN`, which is suitable for joining large tables.
2. Both tables perform full table scans (`TABLE ACCESS FULL`), likely due to the absence of indexes.
3. **Optimization Suggestions**:
   - Create an index on `employees(salary)` to avoid full table scans.
   - Ensure there is an index on `departments(department_id)`.

---

### **6. Summary**
Execution plans are essential tools for optimizing SQL queries. By analyzing execution plans, you can identify performance bottlenecks (e.g., full table scans, ineffective indexes, inefficient joins) and take appropriate optimization measures. Here are a few key points:
- Regularly update statistics to ensure the optimizer generates accurate execution plans.
- Design indexes reasonably, avoiding redundant or inefficient indexes.
- Choose appropriate join methods and sorting strategies based on business requirements.

If you have a specific SQL query or execution plan output, feel free to provide more details, and I can further analyze and optimize it for you!


## 中文版本

在 Oracle 数据库中，执行计划（Execution Plan）是查询优化器生成的一个详细步骤列表，用于描述 SQL 查询的执行方式。通过分析执行计划，可以了解查询是如何访问数据、使用索引以及处理连接等操作的，从而发现潜在的性能瓶颈并进行优化。

以下是关于 Oracle 执行计划的关键内容和分析方法：

---


### **1. 查看执行计划的方法**
Oracle 提供了多种工具和命令来查看执行计划：

#### **(1) 使用 `EXPLAIN PLAN`**
`EXPLAIN PLAN` 是一种静态分析工具，用于生成 SQL 查询的执行计划，但不会实际执行查询。
```sql
-- 生成执行计划
EXPLAIN PLAN FOR
SELECT * FROM employees WHERE department_id = 10;

-- 查看执行计划
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```
- **优点**：简单易用，适合快速查看执行计划。
- **缺点**：仅显示理论上的执行计划，可能与实际运行时的行为不同。

#### **(2) 使用 `DBMS_XPLAN`**
`DBMS_XPLAN` 是一个更强大的工具，可以显示详细的执行计划信息。
```sql
-- 查看最近执行的 SQL 的执行计划
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(NULL, NULL, 'ALLSTATS LAST'));
```
- 参数说明：
  - `NULL, NULL`：表示当前会话的最近一条 SQL。
  - `'ALLSTATS LAST'`：显示实际执行的统计信息（如行数、缓冲区读取次数等）。

#### **(3) 使用 `AUTOTRACE`**
`AUTOTRACE` 是 SQL*Plus 中的一个功能，可以直接显示执行计划和统计信息。
```sql
SET AUTOTRACE ON;

-- 执行查询
SELECT * FROM employees WHERE department_id = 10;

SET AUTOTRACE OFF;
```
- **优点**：同时显示执行计划和实际运行的统计信息。
- **缺点**：需要在 SQL*Plus 或类似工具中使用。

#### **(4) 使用 AWR 报告**
AWR（Automatic Workload Repository）报告可以捕获数据库的历史性能数据，包括高负载 SQL 的执行计划。
- 使用场景：适用于分析生产环境中的历史性能问题。

---

### **2. 执行计划的关键字段**
执行计划通常以树状结构展示，每个操作对应一行。以下是一些关键字段及其含义：

| 字段名         | 含义                                                                 |
|----------------|----------------------------------------------------------------------|
| **ID**         | 操作的唯一标识符，表示执行顺序（从上到下）。                          |
| **OPERATION**  | 操作类型（如 `TABLE ACCESS FULL`、`INDEX RANGE SCAN` 等）。           |
| **NAME**       | 访问的对象名称（如表名或索引名）。                                    |
| **ROWS**       | 预估返回的行数。                                                     |
| **BYTES**      | 预估返回的数据量（字节数）。                                         |
| **COST**       | 查询的成本值（由优化器计算得出，越低越好）。                         |
| **TIME**       | 预估执行时间。                                                       |
| **PSTART/PSTOP** | 分区表的起始和结束分区号（如果涉及分区表）。                        |

---

### **3. 常见的操作类型**
执行计划中的操作类型反映了查询的具体执行方式。以下是一些常见的操作及其含义：

#### **(1) 表访问方式**
- **TABLE ACCESS FULL**：全表扫描，逐行读取整个表的数据。
  - **优化建议**：检查是否缺少索引，或者是否可以通过过滤条件减少扫描范围。
  
- **TABLE ACCESS BY INDEX ROWID**：通过索引定位到表中的具体行。
  - **优化建议**：确保索引选择性高，并避免回表操作。

- **INDEX RANGE SCAN**：范围扫描索引。
  - **优化建议**：检查索引列的选择性，避免低效的范围查询。

- **INDEX UNIQUE SCAN**：唯一索引扫描，通常用于主键或唯一约束。
  - **优化建议**：确保查询条件能够充分利用唯一索引。

#### **(2) 连接方式**
- **NESTED LOOPS**：嵌套循环连接，适合小表驱动大表。
  - **优化建议**：确保驱动表较小，并且连接列有索引。

- **HASH JOIN**：哈希连接，适合大表之间的连接。
  - **优化建议**：确保有足够的内存分配给哈希表。

- **MERGE JOIN**：排序合并连接，适合已排序的数据集。
  - **优化建议**：尽量利用索引或预排序数据。

#### **(3) 排序与聚合**
- **SORT ORDER BY**：对结果进行排序。
  - **优化建议**：尽量利用索引避免显式排序。

- **SORT GROUP BY**：对分组数据进行排序。
  - **优化建议**：减少分组列的数量，或者使用覆盖索引。

---

### **4. 分析执行计划的步骤**
分析执行计划时，可以按照以下步骤逐步排查问题：

#### **(1) 检查是否有全表扫描**
- 如果发现 `TABLE ACCESS FULL`，说明查询没有使用索引。
- **优化方向**：
  - 检查 `WHERE` 条件是否可以添加索引。
  - 确保统计信息是最新的（使用 `DBMS_STATS.GATHER_TABLE_STATS` 更新统计信息）。

#### **(2) 检查索引使用情况**
- 确认查询是否使用了合适的索引（如 `INDEX RANGE SCAN` 或 `INDEX UNIQUE SCAN`）。
- 如果未使用索引，可能是以下原因：
  - 索引选择性不足。
  - 查询条件中使用了函数（如 `UPPER(column)`），导致索引失效。
  - 统计信息不准确。

#### **(3) 检查连接方式**
- 对于多表连接，确认是否选择了最优的连接方式（如 `HASH JOIN` 或 `NESTED LOOPS`）。
- 如果连接效率低下，可以尝试调整连接顺序或创建适当的索引。

#### **(4) 检查成本和行数**
- 关注 `COST` 和 `ROWS` 列，判断优化器的估算是否合理。
- 如果估算的行数与实际行数差距较大，可能是统计信息过期或分布不均。

---

### **5. 示例分析**
以下是一个简单的执行计划示例：

```sql
EXPLAIN PLAN FOR
SELECT e.employee_id, e.first_name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > 5000;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

执行计划输出：

```
---------------------------------------------------------------
| Id | Operation          | Name        | Rows | Bytes | Cost |
---------------------------------------------------------------
|  0 | SELECT STATEMENT   |             |  100 |  5000 |   15 |
|  1 |  HASH JOIN         |             |  100 |  5000 |   15 |
|  2 |   TABLE ACCESS FULL| DEPARTMENTS |   10 |   200 |    5 |
|  3 |   TABLE ACCESS FULL| EMPLOYEES   |  500 | 15000 |   10 |
---------------------------------------------------------------
```

**分析**：
1. 查询使用了 `HASH JOIN`，适合大表连接。
2. 两个表都进行了全表扫描（`TABLE ACCESS FULL`），可能是因为缺少索引。
3. **优化建议**：
   - 在 `employees(salary)` 上创建索引，避免全表扫描。
   - 确保 `departments(department_id)` 上有索引。

---

### **6. 总结**
执行计划是优化 SQL 查询的重要工具。通过分析执行计划，可以发现查询中的性能瓶颈（如全表扫描、索引失效、连接效率低下等），并采取相应的优化措施。以下是几个关键点：
- 定期更新统计信息，确保优化器生成准确的执行计划。
- 合理设计索引，避免冗余或低效的索引。
- 根据业务需求选择合适的连接方式和排序策略。

如果你有具体的 SQL 查询或执行计划输出，可以提供更多信息，我可以进一步为你分析和优化！



Have a good work&life! 2025/02 via LinHong
