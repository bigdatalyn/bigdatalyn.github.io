


### Download

Download the following packages.

- instantclient-basic-macos.x64-19.8.0.0.0dbru.dmg
- instantclient-tools-macos.x64-19.8.0.0.0dbru.dmg
- instantclient-sqlplus-macos.x64-19.8.0.0.0dbru.dmg

[Oracle Instant Client Downloads for macOS (Intel x86)](https://www.oracle.com/database/technologies/instant-client/macos-intel-x86-downloads.html)

### Problem

```
“libsqlplus.dylib” cannot be opened because the developer cannot be verified.
```
Fix:
```
mac-os : System Preferences / General / Allow apps downloaded from ...
```
### Install by following the dmg's readme

Install like the following steps
```
1. In Finder, double click on all desired Instant Client .dmg packages to mount them

2. Open a terminal window and change directory to one of the packages, for example:
   $ cd /Volumes/instantclient-basic-macos.x64-19.8.0.0.0dbru

3. Run the install_ic.sh script:
   $ ./install_ic.sh
   This copies the contents of all currently mounted Instant Client .dmg packages to /User/$USER/Downloads/instantclient_19_8

4. In Finder, eject the mounted Instant Client packages
```

### Mac-os user profile

Edit .bash_profile and add the following contents.
```shell
vi .bash_profile

# oracle client 19.8
export ORACLE_HOME=/Users/lin/instantclient_19_8
export DYLD_LIBRARY_PATH=$ORACLE_HOME
export LD_LIBRARY_PATH=$ORACLE_HOME
export PATH=/Users/lin/instantclient_19_8:$PATH

source ~/.bash_profile
```

Test
```sql
lin@lin-mac admin % pwd
/Users/lin/instantclient_19_8/network/admin
lin@lin-mac admin % cat tnsnames.ora
PDB1 =
  (DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.56.22)(PORT = 1521))
    )
    (CONNECT_DATA =
      (SERVICE_NAME = pdb1)
    )
  )
lin@lin-mac admin % sqlplus hong/oracle@pdb1

SQL*Plus: Release 19.0.0.0.0 - Production on Wed Aug 18 19:16:19 2021
Version 19.8.0.0.0

Copyright (c) 1982, 2020, Oracle.  All rights reserved.

Last Successful login time: Wed Aug 18 2021 19:16:09 +08:00

Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.10.0.0.0

SQL> select * from v$version;

BANNER
--------------------------------------------------------------------------------
BANNER_FULL
--------------------------------------------------------------------------------
BANNER_LEGACY
--------------------------------------------------------------------------------
    CON_ID
----------
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.10.0.0.0
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
	 0

BANNER
--------------------------------------------------------------------------------
BANNER_FULL
--------------------------------------------------------------------------------
BANNER_LEGACY
--------------------------------------------------------------------------------
    CON_ID
----------


SQL>
SQL> exit
Disconnected from Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.10.0.0.0

lin@lin-mac admin %
```

