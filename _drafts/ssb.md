[oracle@ol8-23c ssb-dbgen-master]$ ls -l dbgen
-rwxr-xr-x. 1 oracle oinstall 71448 Dec 22 18:50 dbgen
[oracle@ol8-23c ssb-dbgen-master]$ ./dbgen -h
SSBM (Star Schema Benchmark) Population Generator (Version 1.0.0)
Copyright Transaction Processing Performance Council 1994 - 2000
USAGE:
dbgen [-{vfFD}] [-O {fhmsv}][-T {pcsdla}]
	[-s <scale>][-C <procs>][-S <step>]
dbgen [-v] [-O {dfhmr}] [-s <scale>] [-U <updates>] [-r <percent>]

-b <s> -- load distributions for <s>
-C <n> -- use <n> processes to generate data
          [Under DOS, must be used with -S]
-D     -- do database load in line
-d <n> -- split deletes between <n> files
-f     -- force. Overwrite existing files
-F     -- generate flat files output
-h     -- display this message
-i <n> -- split inserts between <n> files
-n <s> -- inline load into database <s>
-O d   -- generate SQL syntax for deletes
-O f   -- over-ride default output file names
-O h   -- output files with headers
-O m   -- produce columnar output
-O r   -- generate key ranges for deletes.
-O v   -- Verify data set without generating it.
-q     -- enable QUIET mode
-r <n> -- updates refresh (n/100)% of the
          data set
-s <n> -- set Scale Factor (SF) to  <n> 
-S <n> -- build the <n>th step of the data/update set
-T c   -- generate cutomers dimension table ONLY
-T p   -- generate parts dimension table ONLY
-T s   -- generate suppliers dimension table ONLY
-T d   -- generate date dimension table ONLY
-T l   -- generate lineorder fact table ONLY
-U <s> -- generate <s> update sets
-v     -- enable VERBOSE mode

To generate the SF=1 (1GB), validation database population, use:
	dbgen -vfF -s 1

To generate updates for a SF=1 (1GB), use:
	dbgen -v -U 1 -s 1
[oracle@ol8-23c ssb-dbgen-master]$ cp makefile.suite makefile
[oracle@ol8-23c ssb-dbgen-master]$ vi makefile

CC = gcc
DATABASE = oracle
MACHINE = LINUX
WORKLOAD = SSBM

[oracle@ol8-23c ssb-dbgen-master]$ ./dbgen -s 4 -T p
SSBM (Star Schema Benchmark) Population Generator (Version 1.0.0)
Copyright Transaction Processing Performance Council 1994 - 2000
[oracle@ol8-23c ssb-dbgen-master]$ ./dbgen -s 4 -T s
SSBM (Star Schema Benchmark) Population Generator (Version 1.0.0)
Copyright Transaction Processing Performance Council 1994 - 2000
[oracle@ol8-23c ssb-dbgen-master]$ ./dbgen -s 4 -T d
SSBM (Star Schema Benchmark) Population Generator (Version 1.0.0)
Copyright Transaction Processing Performance Council 1994 - 2000
[oracle@ol8-23c ssb-dbgen-master]$ ./dbgen -s 4 -T l
SSBM (Star Schema Benchmark) Population Generator (Version 1.0.0)
Copyright Transaction Processing Performance Council 1994 - 2000
[oracle@ol8-23c ssb-dbgen-master]$ mv *.tbl /u02/oradata/ssb/
[oracle@ol8-23c ssb-dbgen-master]$ du -sm /u02/oradata/ssb/
2370	/u02/oradata/ssb/
[oracle@ol8-23c ssb-dbgen-master]$ ls -tlr /u02/oradata/ssb/
total 2426804
-rw-r--r--. 1 oracle oinstall   11399031 Dec 22 18:56 customer.tbl
-rw-r--r--. 1 oracle oinstall   51639483 Dec 22 18:56 part.tbl
-rw-r--r--. 1 oracle oinstall     669999 Dec 22 18:56 supplier.tbl
-rw-r--r--. 1 oracle oinstall     229965 Dec 22 18:56 date.tbl
-rw-r--r--. 1 oracle oinstall 2421099998 Dec 22 18:57 lineorder.tbl
[oracle@ol8-23c ssb-dbgen-master]$ 


