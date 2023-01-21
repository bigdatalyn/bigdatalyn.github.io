

mysqlslap 是MySQL自带的压测工具：


 time ./mysqlslap --no-defaults -usa -pcc.123 -P 18601  --create-schema=test -S /tmp/mysql_sandbox18601.sock --number-of-queries=1000000 --concurrency=10 --query="select * from tb where a='1';"


  上面：  mysqlslap压测 ，端口是18601 ，sock文件，  查询次数100万次，10个并发，看其耗时情况

Benchmark
    Average number of seconds to run all queries: 30.556 seconds  --100客户端（并发）同时运行这些SQL语句平均要花30多秒
    Minimum number of seconds to run all queries: 30.556 seconds
    Maximum number of seconds to run all queries: 30.556 seconds
    Number of clients running queries: 10                         --总共10个客户端（并发）运行这些sql查询
    Average number of queries per client: 100000