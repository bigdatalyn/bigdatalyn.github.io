

MySql-hot-raw-backup/mysql-backup.sh

https://github.com/francesco81rs/MySql-hot-raw-backup/blob/main/mysql-backup.sh

```
#!/bin/bash

# some useful colors for the console
#Black        0;30     Dark Gray     1;30
#Red          0;31     Light Red     1;31
#Green        0;32     Light Green   1;32
#Brown/Orange 0;33     Yellow        1;33
#Blue         0;34     Light Blue    1;34
#Purple       0;35     Light Purple  1;35
#Cyan         0;36     Light Cyan    1;36
#Light Gray   0;37     White         1;37

DATE=$(date '+%Y/%m/%d %H:%M:%S')
TODAY_DIR=$(date '+%Y_%m_%d')
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color
USER='MySql-username'
PASS='MySql-pwd'
BKP_DIR='/var/mysql_backups' # or wherever you want
# numeber of full backup to retain
RETENTION_POLICY=5 # consider your disk space

printf "MySql hot raw backup (not incremental)\n"
printf "Start at: $DATE \n"

DATADIR=$(mysql -u$USER -p$PASS  -e "SHOW VARIABLES WHERE Variable_Name = 'datadir';" | grep "datadir" | cut -c9-)
printf "\n"
printf "Data directory: $DATADIR\n"
printf "Test if backup dir exist, if not exist it will be create for you\n"
if [ -d $BKP_DIR ]
then 
	printf "${YELLOW}$BKP_DIR created yet\n${NC}"
else
	mkdir $BKP_DIR  
	printf "${GREEN} $BKP_DIR created\n${NC}"
fi
BACKUPS_NUMBER=$(find $BKP_DIR/* -maxdepth 0 -type d | wc -l)
printf "Numbers of backups: ${GREEN}$BACKUPS_NUMBER\n${NC}"
if [ $BACKUPS_NUMBER -gt $RETENTION_POLICY ]
then
  read -r -d $'\0' line < <(find "$BKP_DIR" -maxdepth 1 -printf '%T@ %p\0' 2>/dev/null | sort -z -n)
  dirToDelete="${line#* }"
  rm -r ${dirToDelete}
  printf "${GREEN}Deleted oldest dir: ${dirToDelete}\n${NC}"
fi
printf "${RED}Lock DB\n${NC}"
mysql -u$USER -p$PASS  -e "FLUSH TABLES WITH READ LOCK; SET GLOBAL read_only = 1;"
printf "\n"
if [ $BACKUPS_NUMBER -lt $RETENTION_POLICY ]
then
	mkdir $BKP_DIR/$TODAY_DIR
	printf "${GREEN}Making backup on $BKP_DIR/$TODAY_DIR\n${NC}"
        cp -r $DATADIR/. $BKP_DIR/$TODAY_DIR
fi
printf "${GREEN}Unlock DB\n${NC}"
mysql -u$USER -p$PASS  -e "SET GLOBAL read_only = 0; UNLOCK TABLES;"
printf "\n"
DATE=$(date '+%Y/%m/%d %H:%M:%S')
printf "End at: $DATE \n"

```