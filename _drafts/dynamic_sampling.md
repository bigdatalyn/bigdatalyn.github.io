dynamic sampling（动态采样）

从Oracle 9i到Oracle 12c，Oracle优化器不断的进步使得Oracle运行的越来越好，相应的，数据库的统计信息也越来越重要，他影响着优化器的COST计划和执行计划的选择。
一般来说，表和索引的统计信息应该是up-to-date进行更新的，但是对于程序中使用的临时表(充当临时存取数据或者提供join的表)或者是Oracle提供的全局临时表，没有统计信息或者统计信息不够准确的情况是比较多见的。当然，从Oracle 12c开始，oracle提供了session级别的统计信息，可以参见Oracle optimizer team的global temporary table的文章。对于没有统计信息的表或者索引，Oracle会采用dynamic sampling的方式来帮助sql在parsing的阶段进行数据块的small random sample。

12c之前动态采样叫dynamic sampling，12c中叫dynamic statistics。
12c的官方文档对于动态采样的说明可以参见Oracle document about dynamic statistics

动态采样的级别由参数optimizer_dynamic_sampling控制，level从0到11，每个等级都代表着不同的意思。这个level在Oracle 10-12中默认是2，也就是默认下对于没有统计信息的表进行2级动态采样。当optimizer_dynamic_sampling为0的时候，关闭动态采样，当为10的时候Oracle会对全表进行采样，当为11的时候，由Oracle自己决定如何采样。

我们查看一下11g和12c中关于动态采样的参数，包含隐含参数。

pd.sql源自tanel poder。

11.2.0.4
SQL> @pd dynamic_sam
Show all parameters and session values from x$ksppi/x$ksppcv...

       NUM N_HEX NAME                                                   VALUE                          DESCRIPTION
---------- ----- ------------------------------------------------------ ------------------------------ ----------------------------------------------------------------------------------------------------
      2106   83A _px_dynamic_sample_size                                50                             num of samples for restartable qerpx dynamic optimization
      2219   8AB _optimizer_dyn_smp_blks                                32                             number of blocks for optimizer dynamic sampling
      2220   8AC optimizer_dynamic_sampling                             2                              optimizer dynamic sampling
      2301   8FD _ds_enable_auto_txn                                    FALSE                          Dynamic Sampling Service Autonomous Transaction control parameter
      2303   8FF _ds_parse_model                                        2                              Dynamic Sampling Service Parse Model control parameter
      2305   901 _ds_iocount_iosize                                     6553664                        Dynamic Sampling Service defaults: #IOs and IO Size

SQL> @pd dynamic_sam
Show all parameters and session values from x$ksppi/x$ksppcv...

       NUM N_HEX NAME                                                   VALUE                          DESCRIPTION
---------- ----- ------------------------------------------------------ ------------------------------ ----------------------------------------------------------------------------------------------------
      2856   B28 _px_dynamic_sample_size                                50                             num of samples for restartable qerpx dynamic optimization
      2969   B99 _optimizer_dyn_smp_blks                                32                             number of blocks for optimizer dynamic sampling
      2970   B9A optimizer_dynamic_sampling                             2                              optimizer dynamic sampling
      3051   BEB _ds_enable_auto_txn                                    FALSE                          Dynamic Sampling Service Autonomous Transaction control parameter
      3053   BED _ds_parse_model                                        2                              Dynamic Sampling Service Parse Model control parameter
      3055   BEF _ds_iocount_iosize                                     6553664                        Dynamic Sampling Service defaults: #IOs and IO Size
      3350   D16 _optimizer_dsdir_usage_control                         126                            controls optimizer usage of dynamic sampling directives
关于动态采样的级别控制可以采用直接修改上述参数中optimizer_dynamic_sampling参数的方法，可以是全库级别也可以是会话级别，当然全库级别的只能用于测试环境，生产环境还是要慎重，即使需要修改也最好在Oracle support的建议一下进行。另一种方式就是使用dynamic_sampling() hint的方式进行。针对这个hint，
Jonathan lewis在dynamic-sampling-1中有很详细描述，

一种是cursor级别(/* +dynamic_sampling(4) */)，

一种是表级别(/* +dynamic_sampling(t 4) */)。

_optimizer_dyn_smp_blks控制基本的采样数据块数，默认是32个block，当采样level=1的时候，为32 blocks，当level=2的时候为64 blocks，其他level的数值可以查看Oracle document（http://docs.oracle.com/database/121/TGSQL/tgsql_astat.htm#TGSQL453）
或者参考troubleshooting oracle performance第二版282页。

11.2.0.4

** Executed dynamic sampling query:
    level : 1
    sample pct. : 8.355795
    actual sample size : 891
    filtered sample card. : 32
    filtered sample card. (index T1_I1): 32
    orig. card. : 10000
    block cnt. table stat. : 371
    block cnt. for sampling: 371
    max. sample block cnt. : 32
    sample block cnt. : 31
    min. sel. est. : 0.00160000
    index T1_I1 selectivity est.: 0.03591470
** Using single table dynamic sel. est. : 0.03591470

12.1.0.2

** Executed dynamic sampling query:
    level : 2
    sample pct. : 0.451937
    actual sample size : 1137
    filtered sample card. : 1137
    orig. card. : 2914688
    block cnt. table stat. : 13940
    block cnt. for sampling: 13940
    max. sample block cnt. : 64
    sample block cnt. : 63
    min. sel. est. : -1.00000000
** Not using dynamic sampling for single table sel. or cardinality.

关于游标级别level=1未能发生动态采样的问题，jonathan在dynamic-sampling-3中进行了诠释。

一些特殊的场景会造成动态采样无法发生或者未能按照我们的预期发生，这个时候就需要一些好的思路来帮助我们进行troubleshooting了。比如创建虚拟列或者apply extended stats来帮助优化器。常用的outline，profile，sql plan baseline，还有oracle optimizer提供的sql patch，但是sql patch有字符500的限制。
Mohamed Houri使用SQL PROFILE针对第三方的软件进行了采样级别4到级别6的转变来解决问题。
Randolf Geist在https://community.oracle.com/thread/3729689中提出了很好的思路。

关于12c中的dynamic statistics可以查阅一下Chinar Aliyev在toad上的文章
dynamic-sampling-in-oracle-12c-part-1
dynamic-sampling-in-oracle-12c-part-2
dynamic-sampling-in-oracle-12c-part-3

10053 trace 语法
alter session set events ‘10053 trace name context forever, level 65535’;
alter session set events ‘10053 trace name context off’;