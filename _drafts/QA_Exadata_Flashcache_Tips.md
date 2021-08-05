
QUESTION
===========
Exadata Smart Flash Cache でキャッシュしているオブジェクト情報を参照した場合のAWRレポートへの集計仕様を教えてください
　　- Logical Reads で処理されるのか、Physical Reads で処理されるのか
　　- SGA のバッファキャッシュとの関係性（SGAのキャッシュと重複するのか、いずれかが優先されるのか）
　　- Foreground/Background Event で可視化されるイベントの有無


ANSWER
===========
以下のように回答させていただきます。

- Physical Reads で処理されております。
- SGA のバッファキャッシュとは違って、Flash Cache はストレージサーバ側のキャッシュとして使用
されます。最終的に DBサーバでのバッファキャッシュで処理されます。
- 可視化されるイベントがございません。



Exadata固有の機能として、Exadata Smart Flash Cache が存在します。

以下の手段は把握しています。

- Flash Cache の全オブジェクトの容量
cellcli -e "list metriccurrent where name='FC_BY_USED'"

- Flash Cache の全オブジェクト
cellcli -e "list flashcachecontent detail"

- Flash Cache の特定のオブジェクト
cellcli -e "list flashcachecontent where objectNumber = <Obj#> detail"

より容易に確認する手段、より掘り下げて確認する手段を探しています。



dba_segments
https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/DBA_SEGMENTS.html#GUID-7BF4F8C7-1917-4532-B048-C044E17A1754

sql> alter table xxxxx storage (cell_flash_cache keep);
---执行这一步显示成功，dba_segments.cell_flash_cache为keep

cellcli> list FLASHCACHECONTENT where objectnumber=17425 detail ；-----执行这一个显示空白

有多个存储，每个存储去查看

select OWNER,SEGMENT_NAME,SEGMENT_TYPE,BUFFER_POOL,FLASH_CACHE,CELL_FLASH_CACHE from dba_segments where BUFFER_POOL='KEEP' or FLASH_CACHE='KEEP' or CELL_FLASH_CACHE='KEEP';




set linesize 300 pagesize 300
COL "OWNER"                          FOR A5
COL "SEGMENT_NAME"                   FOR A12
COL "SEGMENT_TYPE"                   FOR A12
COL "BUFFER_POOL"                    FOR A11
COL "FLASH_CACHE"                    FOR A11
COL "CELL_FLASH_CACHE"               FOR A16
select OWNER,SEGMENT_NAME,SEGMENT_TYPE,BUFFER_POOL,FLASH_CACHE,CELL_FLASH_CACHE from dba_segments where BUFFER_POOL='KEEP' or FLASH_CACHE='KEEP' or CELL_FLASH_CACHE='KEEP';

alter table t1 storage(cell_flash_cache keep);


sample:

SQL> 
COL "OWNER"                          FOR A5
COL "SEGMENT_NAME"                   FOR A12
COL "SEGMENT_TYPE"                   FOR A12
COL "BUFFER_POOL"                    FOR A11
COL "FLASH_CACHE"                    FOR A11
COL "CELL_FLASH_CACHE"               FOR A16
SQL> select OWNER,SEGMENT_NAME,SEGMENT_TYPE,BUFFER_POOL,FLASH_CACHE,CELL_FLASH_CACHE from dba_segments where BUFFER_POOL='KEEP' or FLASH_CACHE='KEEP' or CELL_FLASH_CACHE='KEEP';

no rows selected

SQL> alter table t1 storage(cell_flash_cache keep);

Table altered.

SQL> select OWNER,SEGMENT_NAME,SEGMENT_TYPE,BUFFER_POOL,FLASH_CACHE,CELL_FLASH_CACHE from dba_segments where BUFFER_POOL='KEEP' or FLASH_CACHE='KEEP' or CELL_FLASH_CACHE='KEEP';

OWNER SEGMENT_NAME SEGMENT_TYPE BUFFER_POOL FLASH_CACHE CELL_FLASH_CACHE
----- ------------ ------------ ----------- ----------- ----------------
SYS   T1	   TABLE	DEFAULT     DEFAULT	KEEP

SQL> 




