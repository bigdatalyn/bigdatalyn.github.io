---
layout: post
title: "Oracle OCW2022 RWP Performance Up Tips"
category: Oracle
tags: Oracle Performance Tips
---

* content
{:toc}

Oracle OCW2022 RWP Performance Up Tips

Study case

```
• Better cardinality estimates
• Better execution plans
• More access paths available
• Ability for the optimizer to perform many transformations and optimizations (join elimination,materialized view rewrites, In-Memory Aggregation transformation, and many more)
• Partition pruning
• Exploit other technologies for optimal performance
    • Parallel Execution
    • Materialized Views
    • Compression
    • Database In-Memory
```

ADW 
```
Autonomous Database can help address some problems:
• Augments bad/stale stats
• Dynamic statistics may correct some cardinality estimates (do not solely rely on dynamic statistics)
• Stats quality (every column has a histogram)
• Use of features like IMA, Columnar Cache in Flash is available

Where Autonomous Database cannot help:
• Suboptimal schema design
• Wrong data types on join keys
• Lack of constraints
• Sub-optimal partitioning strategy
```









### Some slides

![OCW2022_Query]({{ "/files/Oracle/23c/OCW2022_Query.png"}})	

![InitialPerformance]({{ "/files/Oracle/23c/InitialPerformance.png"}})	

![ocw_2022_rwp]({{ "/files/Oracle/23c/ocw_2022_rwp.png"}})	




### Reference 

[Hints and Tips for Fast and Predictable Query Performance with Star Schemas Session LRN3511](https://static.rainfocus.com/oracle/cloudworld/sess/1657090896477001W6Zk/finalsessionfile/LRN3511_OCW_RWP_STAR_FINAL_1666055065567001XB2U.pdf)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


