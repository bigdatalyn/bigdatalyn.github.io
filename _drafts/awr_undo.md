


Undo Statistics in AWR Shows Null (Doc ID 2575998.1)	

The undo statistics and its underlying sections Undo Segment Summary, Undo Segment Stats shows null data in AWR:
By the way, when AWR report was
generated, There was no UNDO STATISTICS Information in AWR report but other
statistics exists.
Actually, we can see the following part in AWR report. There is only heading
title without statistic values

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Undo Segment Summary DB/Inst: TEST Snaps: 35408-35467

No data exists for this section of the report.
-------------------------------------------------------------

Undo Segment Stats DB/Inst: TEST Snaps: 35408-35467

No data exists for this section of the report.
-------------------------------------------------------------


Undo autotune disabled v$undostat will not be populated. Hence the lack of statistics for AWR.

Set

alter system set "_undo_autotune" = true;


* 遅延ブロッククリーンアウトのタイミングではなく、その元となる
ブロック変更時のトランザクションがコミットされるタイミングの情報が
必要な点はご注意ください。

========================================
1) DML 実行前後のセッション統計値

-- DML 実行前の統計値
set tab off
set lines 200
select sn.name, ms.value
from v$mystat ms,v$statname sn
where ms.statistic# = sn.statistic#
and sn.name like 'commit cleanout%'
order by ms.statistic#;

-- DML 実行+コミット
update xxx set ... ;
commit;

-- DML 実行後の統計値
select sn.name, ms.value
from v$mystat ms,v$statname sn
where ms.statistic# = sn.statistic#
and sn.name like 'commit cleanout%'
order by ms.statistic#;

* v$service_stats、v$sysstat からサービス単位やインスタンス単位の情報を
取得することも可能ですが、その場合他のトランザクションによる統計値の
カウントと区別ができません。そのため、可能な限りセッション単位で取得ください。
* 計上される統計値にもよりますが、クリーンアウトに失敗したことのみ
が判明し、それ以上の要因の特定は困難なケースもございますが
あらかじめご了承ください。
========================================












++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Undo Statistics - Undo Segment Summary 

观点1: MaxTR/MaxQryLen的 趋势图 去看某个时间段 是否有长事务
观点2: Num Undo Blocks, Number of Transactions, Max Tx Concurcy ->数据比较，如果峰值 说明这个时间段:事务多,UNDO header的事务表 写的负荷也多
这个时候是否 可以结合下吗的user call/commits/rollback结合起来

Key Instance Activity Stats
user calls
user commits
user rollbacks

Seeing High User Rollbacks in AWR (Doc ID 2694491.1)
The "user rollbacks" is Number of times users manually issue the rollback statement or an error occurs during a user's transactions.
Find out if it is a specific session doing it or if all sessions do it via v$sesstat.If one session does it then it can be investigate why or else if all session do it then there could be problem in application that needs to be investigated and fixed.

观点3: STO/OOS 快照太久，没有足够undo空间 确实可以去分析某个时间段是否有 ORA-1555/ORA-30036错误等
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

查看undo表空间变化

spool &&report_dir/&&instance_name/tablespace_undo.xml
select dbms_xmlgen.getxml('
select to_char(BEGIN_TIME,''YYYY/MM/DD HH24:MI'') BEGIN_TIME, ''UNDOTBS'' || TO_CHAR(INSTANCE_NUMBER) "TSNAME", 307200 "TOTAL_MB", ROUND((ACTIVEBLKS+UNEXPIREDBLKS)/(1024*1024/8192)) "USED_MB", TO_CHAR(ROUND(((ACTIVEBLKS+UNEXPIREDBLKS)/(300*1024*1024*1024/8192)),4), ''90.9999'') "USED_RATE"
from DBA_HIST_UNDOSTAT
where BEGIN_TIME between to_date(''&&begin_snap_time'',''YYYY/MM/DD HH24:MI'') and to_date(''&&end_snap_time'',''YYYY/MM/DD HH24:MI'')
and INSTANCE_NUMBER='||:instance_number||'
order by INSTANCE_NUMBER,BEGIN_TIME
')
as xml from dual;
spool off

FileName
----------------
if_dbreport_tablespace_undo.sql

+++++++++++++++++++++++++++++++++++++++++


rem -----------------------------
rem DB稼働状況報告詳細出力（if_dbreport_detail.bat）
rem -----------------------------
rem Description
rem DB稼働状況報告詳細Excelレポートを出力する。
rem Option
rem 無し
rem Histroy
rem 新規作成：2018/MM/DD TIS

@echo off
cd /d %~dp0

set RepDir=C:\work\reports
set RepLogDir=%RepDir%\logs
set TempXmlDir=%RepDir%\xml_files
set ReportList=%RepDir%\report.lst

set Ret=0
set Suc=0
set Err=1


rem レポート対象一覧取得([クラスタ名],[インスタンス名])
for /f "eol=# tokens=1-2 delims=," %%i in (%ReportList%) do (
rem XMLファイル読込用一時ファイル削除
echo [INFO] XMLファイル読込用一時ファイルを削除します。
del %TempXmlDir%\*.xml

echo [INFO] クラスタ関連XMLファイルを配置します。
if exist "%RepDir%\input_xml_files\%%i\" (
rem クラスタ関連XMLファイル配置
copy %RepDir%\input_xml_files\%%i\*.xml %TempXmlDir%\
)else (
echo [ERROR] [%RepDir%\input_xml_files\%%i] にXMLファイルを配置してください。
set Ret=%Err%
)

echo [INFO] DBインスタンス関連XMLファイルを配置します。
if exist "%RepDir%\input_xml_files\%%j\" (
rem DBインスタンス関連XMLファイル配置
copy %RepDir%\input_xml_files\%%j\*.xml %TempXmlDir%\
)else (
echo [ERROR] [%RepDir%\input_xml_files\%%j] にXMLファイルを配置してください。
set Ret=%Err%
)

echo [INFO] Excel一時レポートを配置します。
rem Excel一時レポートファイル配置
copy %RepDir%\templates\master_report.xlsx %RepDir%\reports\temp_report.xlsx

echo [INFO] Excelレポートを更新します。
rem Excelレポート更新(xmllファイル読込)
C:\work\reports\if_dbreport_refresh.xlsm

echo [INFO] Excelレポート名を変更します。
rem Excelレポートファイル名変更
move %RepDir%\reports\temp_report.xlsx %RepDir%\reports\DB稼働状況報告詳細_%%j.xlsx

)

exit /b %Ret%

FileName
----------------
if_dbreport_detail.txt

FileComment
----------------------


下記★のところに表示したように、
unexpired の Stolen と Released は発生した時間帯がありますので、
ご指摘の(ドキュメントID 2266415.1)の記載の通り、unexpired は再利用される
場合もございます。

awrrpt_1_13716_13717.txt
===============================================================================
Undo Segment Summary DB/Inst: XXXXXX/XXXXX Snaps: 13716-13717
-> Min/Max TR (mins) - Min and Max Tuned Retention (minutes)
-> STO - Snapshot Too Old count, OOS - Out of Space count
-> Undo segment block stats:
-> uS - unexpired Stolen, uR - unexpired Released, uU - unexpired reUsed
-> eS - expired Stolen, eR - expired Released, eU - expired reUsed

Undo Num Undo Number of Max Qry Max Tx Min/Max STO/ uS/uR/uU/
TS# Blocks (K) Transactions Len (s) Concurcy TR (mins) OOS eS/eR/eU
---- ---------- --------------- -------- -------- --------- ----- --------------
2 3,933.5 1,927,214 1,476 5 36.3/45 0/0 11/6672/0/220/　★
------------------------------------------------------

Undo Segment Stats DB/Inst: XXXXXX/XXXXX Snaps: 13716-13717
-> Most recent 35 Undostat rows, ordered by Time desc

Num Undo Number of Max Qry Max Tx Tun Ret STO/ uS/uR/uU/
End Time Blocks Transactions Len (s) Concy (mins) OOS eS/eR/eU
------------ ----------- ------------ ------- ------- ------- ----- ------------
17-1月 16:5 355,352 97,858 0 4 45 0/0 0/0/0/22/196
4
17-1月 16:4 398,942 567,214 253 4 41 0/0 0/0/0/16/379
4
17-1月 16:3 696,854 204,281 862 4 37 0/0 0/0/0/40/701
8
17-1月 16:2 759,532 210,033 262 4 36 0/0 0/0/0/62/794
1
17-1月 16:1 539,755 434,426 872 4 39 0/0 11/6672/0/50　★
/
17-1月 16:0 1,183,087 413,402 1,476 5 37 0/0 0/0/0/30/177
2


１．
AWR レポートを確認したところ、14時頃から複数のテーブルに対して順次
alter table ... shrink を連続実行したが最初ではエラーが発生しませんでした。
その後に 19時頃 ORA-30036 は発生することになりました。
今後では、複数のテーブルに対する shrink 処理を連続実行の代わりに、
別々のテーブルの shrink 処理は時間を置いて実行することをご検討くださいませ。


２．
前回はすべてのテーブルの shrink 処理がノード１側のみで実行されたと見えますが、
今後では、両方のノードにて分散して実行することをご検討いただければと存じます。


３．
下記技術文書より紹介している "_smu_debug_mode=33554432" を設定することで、
unexpired から expired へ変換する時間間隔を短縮させることができますので、
本件事象がある程度改善できると想定されます。ご検討いただけますでしょうか。

参考資料：
自動 UNDO 管理を使用している環境で TUNED_UNDORETENTION が非常に大きな値となる(KROWN:143464) (Doc ID 1750279.1)




------ UNDO tablespace

SELECT a.tablespace_name,
       SIZEMB,
       USAGEMB,
       (SIZEMB - USAGEMB) FREEMB, (sizemb-(sizemb-usagemb))/sizemb*100 PERCENT_USED
  FROM (  SELECT SUM (bytes) / 1024 / 1024 SIZEMB, b.tablespace_name
            FROM dba_data_files a, dba_tablespaces b
           WHERE a.tablespace_name = b.tablespace_name AND b.contents = 'UNDO'
        GROUP BY b.tablespace_name) a,
       (  SELECT c.tablespace_name, SUM (bytes) / 1024 / 1024 USAGEMB
            FROM DBA_UNDO_EXTENTS c
           WHERE status <> 'EXPIRED'
        GROUP BY c.tablespace_name) b   
 WHERE a.tablespace_name = b.tablespace_name; 

Undo Statistics in AWR Shows Null (Doc ID 2575998.1)	

 Undo autotune disabled v$undostat will not be populated. Hence the lack of statistics for AWR.

Set

alter system set "_undo_autotune" = true;



Bug 26967713  No Data Exists For "Undo Segment Summary" And "Undo Segment Stats" in AWR Report in Non-CDB Database



SELECT a.tablespace_name,
       SIZEMB,
       USAGEMB,
       (SIZEMB - USAGEMB) FREEMB, (sizemb-(sizemb-usagemb))/sizemb*100 PERCENT_USED
  FROM (  SELECT SUM (bytes) / 1024 / 1024 SIZEMB, b.tablespace_name
            FROM dba_data_files a, dba_tablespaces b
           WHERE a.tablespace_name = b.tablespace_name AND b.contents = 'UNDO'
        GROUP BY b.tablespace_name) a,
       (  SELECT c.tablespace_name, SUM (bytes) / 1024 / 1024 USAGEMB
            FROM DBA_UNDO_EXTENTS c
           WHERE status <> 'EXPIRED'
        GROUP BY c.tablespace_name) b   
 WHERE a.tablespace_name = b.tablespace_name; 

COL "OWNER"                          FOR A5
COL "SEGMENT_NAME"                   FOR A12
COL "SIZE_MB"                        FOR 9999999.99999999999999
select owner,segment_name,bytes/1024/1024 as size_mb from dba_segments where segment_name like '%SSB_TEST%';



echo "exec dbms_workload_repository.create_snapshot();" | sqlplus sys/SysPassword1@ol8-23c/ssb as sysdba
echo "select max(snap_id) from dba_hist_snapshot group by con_id;" | sqlplus sys/SysPassword1@ol8-23c/ssb as sysdba