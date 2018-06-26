---
layout: post
title: "Oracle Some Tips for Expdp/Impdp"
category: Oracle
tags: Oracle expdp Tips
---

* content
{:toc}




Oracle Some Tips for Expdp/Impdp

Some tips ....







### Export some tables or schema

	expdp test01/test01 directory=out_dir dumpfile=t1_t2.dump tables=(t1,t2)

	Use "content" to control whether it is export table ddl and records or not include records.
	In exp/imp , it will used "rows=n" to control it.

	expdp test01/test01 directory=out_dir dumpfile=t1_t2.dump tables=(t1,t2) query='t1":where 1=2"'
	--> if the records are huge, it will take much time to execute it.
	In this time, it's recommondated that using "execlude".

	expdp test01/test01 directory=out_dir dumpfile=t1_t2.dump tables=(t1,t2) execlude=table/table_data:\"=\'T1\'\"

	For partition table: p1:partition p1 p2:partition p2
	expdp test01/test01 directory=out_dir dumpfile=t1_t2.dump tables=(t1,t2) execlude=table/table_data:\"=\(\'P1\',\'P2\'\)\"



###



###

To be continue....

Have a good life! 2018/06 via LinHong


