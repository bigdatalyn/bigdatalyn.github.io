


【MySQL】MySQL启动定制脚本

```
#!/bin/sh
port=3306  
cmdPath="/usr/local/mysql/bin"
myPath="/storage/mysql/$port"
softPath="/usr/local/mysql"
socketfile="/tmp/mysql$port.sock"
my_user="root"
my_pass="123456"
  
start(){
        if [ ! -e "$socketfile" ];then
                printf "Mysqldstarting......\n"
                $cmdPath/mysqld --defaults-file=/etc/my$port.cnf --user=mysql  &>/dev/null &
                sleep 2
       else
                printf "Mysqld alreadyrunning\n" && exit 1
       fi
}
  
  
stop(){
       if [ -e "$socketfile" ];then
                printf "Mysqldstoping......\n"
                $cmdPath/mysqladmin -u"$my_user" -p"$my_pass" \
-S "$socketfile" shutdown &>/dev/null
                [ $? -ne 0 ] && echo"error username or password!!!" && exit 1
                sleep 3
       else
                printf "Mysqld alreadyclosed\n" && exit 1
       fi
}
  
  
restart(){
       stop
        start
}
  
case "$1" in
       start)
                start
       ;;
       stop)
                stop
       ;;
       restart)
                restart
       ;;
       status)
                status mysqld
       ;;
       *)
                echo "Usage: $0{start|stop|restart|status}"
                exit 1
esac

```