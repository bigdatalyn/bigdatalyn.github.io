#!/bin/bash

############################################################################
#Skillset2 initialization scritp
############################################################################
echo "Starting Skillset2 initialization process,please wait."
cp ./questions/images /home/ocm/ > /dev/null 2>&1
mv /home/ocm/Skillset1.html ./questions/Skillset1 > /dev/null 2>&1
mv ./questions/Skillset2/Skillset2.html /home/ocm/ > /dev/null 2>&1
cd ./questions/Skillset2 > /dev/null 2>&1
tar -zcvf Skillset2.tar.gz * > /dev/null 2>&1

#Transferring files
echo "Transferring files to Database Server Machine, Please wait..."
expect -c "
           set timeout 30;
           spawn ssh oracle@host01 -p 22;
            expect {
                    yes/no {send \"yes\r\";exp_continue}
                    password {send \"oracle\r\"}
           }; 
           expect oracle@* {send \"rm -rf /home/oracle/scripts/\*\r\" } ; 
           expect oracle@* {send exit\r } ; 
           expect eof;
          "> /dev/null 2>&1
expect -c "
           set timeout 30;
           spawn scp Skillset2.tar.gz oracle@host01:/home/oracle/scripts;
           expect {
                   yes/no {send \"yes\r\";exp_continue}
                   password {send \"oracle\r\"}
           };
           expect eof;
          "> /dev/null 2>&1
expect -c "
           set timeout 30;
           spawn ssh oracle@host01 -p 22;
            expect {
                    yes/no {send \"yes\r\";exp_continue}
                    password {send \"oracle\r\"}
           }; 
           expect oracle@* {send \"tar -zxvf /home/oracle/scripts/Skillset2.tar.gz -C /home/oracle/scripts\r\" } ; 
           expect oracle@* {send \"rm -rf /home/oracle/scripts/Skillset2.tar.gz\r\" }; 
           expect oracle@* {send exit\r } ; 
           expect eof;
          "> /dev/null 2>&1          
echo "Transferring files is completed."
rm -rf Skillset2.tar.gz
echo "Skillset2 initialization is successfully completed."
