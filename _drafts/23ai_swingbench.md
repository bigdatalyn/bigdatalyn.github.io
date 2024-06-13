

### account


https://www.oracle.com/cloud/sign-in.html?accountname=sehubjapacprod

Choose oracleidentitycloudservice


### Download and unzip

https://github.com/oracle-livelabs/database/blob/main/23aifree/install-swingbench/install-swingbench.md

wget https://c4u04.objectstorage.us-ashburn-1.oci.customer-oci.com/p/EcTjWk2IuZPZeNnD_fYMcgUhdNDIDA6rt9gaFj_WZMiL7VvxPBNMY60837hu5hga/n/c4u04/b/livelabsfiles/o/data-management-library-files/23c/swingbench15082023_jdk11.zip


unzip swingbench15082023_jdk11.zip


### OS Setting


# sudo cp /etc/localtime /etc/localtime.org
# sudo ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
# sudo ls -ltr /etc/localtime*

# df -h
# sudo /usr/libexec/oci-growfs
# df -h


# sudo yum groupinstall "Server with GUI" -y
# sudo systemctl set-default graphical
# sudo reboot


# sudo rpm -qa | grep vnc
# sudo yum install -y tigervnc-server tigervnc-server-module


[root@inst-client ~]# vncpasswd
Password:
Verify:
Would you like to enter a view-only password (y/n)? n
A view-only password is not used
[root@inst-client ~]# vncserver

WARNING: vncserver has been replaced by a systemd unit and is now considered deprecated and removed in upstream.
Please read /usr/share/doc/tigervnc/HOWTO.md for more information.
xauth:  file /root/.Xauthority does not exist

New 'inst-client:1 (root)' desktop is inst-client:1

Creating default startup script /root/.vnc/xstartup
Creating default config /root/.vnc/config
Starting applications specified in /root/.vnc/xstartup
Log file is /root/.vnc/inst-client:1.log

[root@inst-client ~]# ps -ef | grep vnc
root       11603       1  1 14:09 pts/0    00:00:00 /usr/bin/Xvnc :1 -auth /root/.Xauthority -desktop inst-client:1 (root) -fp catalogue:/etc/X11/fontpath.d -geometry 1024x768 -pn -rfbauth /root/vnc/passwd -rfbport 5901
root       11608       1  0 14:10 pts/0    00:00:00 /bin/sh /root/.vnc/xstartup
root       12167   11112  0 14:10 pts/0    00:00:00 grep --color=auto vnc
[root@inst-client ~]#
[root@inst-client ~]# vncserver -list

WARNING: vncserver has been replaced by a systemd unit and is now considered deprecated and removed in upstream.
Please read /usr/share/doc/tigervnc/HOWTO.md for more information.

TigerVNC server sessions:

X DISPLAY #	PROCESS ID
:1		11603
[root@inst-client ~]# 


# ssh -v -i oci_key -L 5901:localhost:5901 opc@XXX.XXX.XXX.XXX
TigerVNC Viewerからログインする


ssh -v -i ssh-key-2024-04-17.key -L 5901:localhost:5901 opc@141.147.153.83


# sudo yum list jdk*
# sudo yum install jdk-20 -y
# sudo alternatives --config java
# java -version



cd ./swingbench/bin

./oewizard

141.147.153.83


SQL> grant execute on dbms_lock to system container=all;

Grant succeeded.

SQL> grant execute on dbms_random to system container=all;

Grant succeeded.

SQL> 

OCI 开通 1521 端口

sqldeveloper 连接

https://qiita.com/yunagash/items/e2c6c40e1f82ca40deac

basedb23ai-scan.sub01030811150.dbvcn.oraclevcn.com:1521/DB23ai_Osaka.sub01030811150.dbvcn.oraclevcn.com

141.147.159.53	
141.147.153.83



 sqlplus system/oracle@basedb23ai-scan.sub01030811150.dbvcn.oraclevcn.com/DB23ai_PDB1.sub01030811150.dbvcn.oraclevcn.com



sqlplus system/oracle@basedb23ai-scan.sub01030811150.dbvcn.oraclevcn.com:1521/DB23ai_Osaka.sub01030811150.dbvcn.oraclevcn.com


### swingbench

./sbutil -cs //basedb23ai-scan.sub01030811150.dbvcn.oraclevcn.com/DB23ai_PDB1.sub01030811150.dbvcn.oraclevcn.com -u soe -p soe -soe -val



[root@inst-client bin]# ./sbutil -cs //basedb23ai-scan.sub01030811150.dbvcn.oraclevcn.com/DB23ai_PDB1.sub01030811150.dbvcn.oraclevcn.com -u soe -p soe -soe -val
The Order Entry Schema appears to be valid.
--------------------------------------------------
|Object Type    |     Valid|   Invalid|   Missing|
--------------------------------------------------
|Table          |        10|         0|         0|
|Index          |        26|         0|         0|
|Sequence       |         5|         0|         0|
|View           |         2|         0|         0|
|Code           |         1|         0|         0|
--------------------------------------------------

[root@inst-client bin]# 


https://github.com/oracle-livelabs/database/blob/main/23aifree/run-swingbench/run-swingbench.md

24 user:

### sqlcl

https://docs.oracle.com/en/database/oracle/apex/22.1/aeadm/downloading-and-installing-sqlcl.html

wget https://download.oracle.com/otn_software/java/sqldeveloper/sqlcl-latest.zip

unzip sqlcl*.zip

export PATH=/root/sqlcl/bin:$PATH

sql system/oracle@basedb23ai-scan.sub01030811150.dbvcn.oraclevcn.com:1521/DB23ai_Osaka.sub01030811150.dbvcn.oraclevcn.com

### AI Vector Search

https://oracle-one.slack.com/archives/C06RF3BF2JX/p1715711626212279

phoenix92872.dev3sub2phx.databasede3phx.oraclevcn.com:/scratch/sgreene/public/onnx_models-0.14.0.zip

Have you tried using OML4Py to convert the models to onnx format? Did you run into problems with it?
We cannot distribute 3rd party models - we checked with legal and there were concerns that they were built using copyrighted data. Perhaps we will get an approval for a sample model. However, the recommended approach is to go through the OML4Py conversion package.
The doc team put together these instructions which will be  in the doc:
https://confluence.oraclecorp.com/confluence/display/~NIKIL.THALAPANENI@ORACLE.COM/OML4PY+Installation


1. Setting up environment
1.1. Set proxy
Open terminal and run the following two commands




export http_proxy=http://www-proxy.us.oracle.com:80
export https_proxy=http://www-proxy.us.oracle.com:80



1.2. Python 3.12 Installation
In the previous terminal run this command to download the python zip file

wget https://www.python.org/ftp/python/3.12.3/Python-3.12.3.tgz
Now extract the files from the downloaded zip and go to the extracted files directory for running the given command

tar xzf Python-3.12.3.tgz
cd Python-3.12.x
./configure --enable-optimizations
Now you can compile and install using the following commands

  

make -j `nproc`
sudo make altinstall
After installation is complete, You can verify it by checking the python version assuming you are in the same directory

Refer this for more info

./bin/python3.12 --version
Refer this for more info

1.3. Create a Virtual environment
Now using the latest python we can create a virtual environment using the following command.(Assuming you are in the same directory)

./bin/python3.12 -m venv newenv
Your ouput should look like this

bash-4.4$ ./bin/python3.12 --version
Python 3.12.3
Also activate the new env using the following command

source newenv/bin/activate
2. OML4PY Installation
2.1. Instant client installation
Now you can comeback from the python directory and create a new directory (I'm calling it instant_client)

cd ..
mkdir instant_client
cd instant_client
pwd
Make sure to copy the pwd output which will be used for sharing file from your local machine using scp.

Download the instant client from this link.

Now use this command for sending it to your linux machine

scp -o MACs=hmac-sha2-256 <path_to_downloaded_file_in_local_machine> <guid>@<Virtual_machine_ip>:<copied_pwd_from_previous_step>
This will ask for your VM password, once given it will send the files to our VM.

You can check if the file is copied or not by doing ls in your virtual machine. Unzip it using the following command and also check for libaio  package:

unzip instantclient-basic-linux.x64-23.4.0.24.05.zip
rpm -qa libaio
And finally add path to LD_LIBRARY_PATH. 

Run pwd and get the current directory path and attach the extracted file path to it:

export LD_LIBRARY_PATH=<pwd_path>/instantclient_23_4:$LD_LIBRARY_PATH
Please refer this for more details.

2.2. OML4Py client installation
Install the OML4Py 2.0 client zip from here

we can copy this to Linux to the same directory which is used for instant client by this command:

scp -o MACs=hmac-sha2-256 <path_to_downloaded_file_in_local_machine> <guid>@<Virtual_machine_ip>:<copied_pwd_from_2.1_step>
Now Unzip the zip file on your Linux machine

unzip oml4py-client-linux-x86_64-2.0.zip
Run the installation script

perl -Iclient client/client.pl
It will prompt yes/no for to proceed , you can type yes and click enter.

Also run the following commands to install required packages

pip install --upgrade pip setuptools
pip install --upgrade "numpy>=1.26.4"
pip install --upgrade "pandas>=2.1.1"
pip install --upgrade "matplotlib>=3.7.2"
pip install --upgrade "oracledb>=2.0.1"
pip install --upgrade "scikit_learn>=1.2.1"
pip install transformers
pip install torch
pip install onnx
pip install onnxruntime_extensions, onnxruntime
pip install sentencepiece==0.2.0
Installation is complete, To verify you can run the command python3 on your terminal. And type import oml and press enter and use exit() to come out 

$ python3
Python 3.9.5 (default, Feb 23 2022, 17:12:33)
[GCC 4.8.5 20150623 (Red Hat 4.8.5-44.0.3)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import oml
>>> exit()
$
If it does not throw any error, your installation is successful

Now you can get a model using the following (here MiniLmv2 is used), Enter python 

(docenv) -bash-4.4$ python
Python 3.12.3 (main, May 10 2024, 04:34:21) [GCC 8.5.0 20210514 (Red Hat 8.5.0-18.0.6)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> from oml.utils import EmbeddingModel, EmbeddingModelConfig
>>> em = EmbeddingModel(model_name='sentence-transformers/all-MiniLM-L6-v2',settings={'ignore_checksum_error':True})
>>> em.export2file("minillm",output_dir=".")
>>> exit()
(docenv) -bash-4.4$
You can give any output_dir, It will export the model to onnx format to that directory. Also the first parameter is the name of the onnx file

You can also see alll the preconfigured models using the following commands:

(docenv) -bash-4.4$ python
Python 3.12.3 (main, May 10 2024, 04:34:21) [GCC 8.5.0 20210514 (Red Hat 8.5.0-18.0.6)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import oml
>>> oml.utils.EmbeddingModelConfig.show_preconfigured()
['sentence-transformers/all-mpnet-base-v2', 'sentence-transformers/all-MiniLM-L6-v2', 'sentence-transformers/multi-qa-MiniLM-L6-cos-v1', 'ProsusAI/finbert', 'medicalai/ClinicalBERT', 'sentence-transformers/distiluse-base-multilingual-cased-v2', 'sentence-transformers/all-MiniLM-L12-v2', 'BAAI/bge-small-en-v1.5', 'BAAI/bge-base-en-v1.5', 'taylorAI/bge-micro-v2', 'intfloat/e5-small-v2', 'intfloat/e5-base-v2', 'prajjwal1/bert-tiny', 'thenlper/gte-base', 'thenlper/gte-small', 'TaylorAI/gte-tiny', 'infgrad/stella-base-en-v2', 'sentence-transformers/paraphrase-multilingual-mpnet-base-v2', 'intfloat/multilingual-e5-base', 'intfloat/multilingual-e5-small', 'sentence-transformers/stsb-xlm-r-multilingual']
>>> exit()
(docenv) -bash-4.4$
refer this for more detailed guide 

You can deactivate your virtual environment by running deactivate command on your terminal.





### 


[root@inst-client ~]# whereis python
python: /usr/bin/python3.6 /usr/bin/python3.6m /usr/bin/python2.7 /usr/bin/python /usr/lib/python3.6 /usr/lib/python2.7 /usr/lib64/python3.6 /usr/lib64/python2.7 /usr/local/bin/python3.12 /usr/local/bin/python3.12-config /usr/local/lib/python3.12 /usr/include/python3.6m /usr/include/python2.7 /usr/share/man/man1/python.1.gz
[root@inst-client ~]# /usr/local/bin/python3.12
Python 3.12.3 (main, May 15 2024, 09:55:44) [GCC 8.5.0 20210514 (Red Hat 8.5.0-20.0.3)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()
[root@inst-client ~]# 
[root@inst-client ~]# /usr/local/bin/python3.12  -m venv newenv
[root@inst-client ~]# 


/usr/local/bin/python3.12  -m venv newenv

source newenv/bin/activate

wget https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-basic-linux.x64-23.4.0.24.05.zip
unzip instantclient-basic-linux.x64-23.4.0.24.05.zip 
rpm -qa libaio


export LD_LIBRARY_PATH=/root/instantclient_23_4:$LD_LIBRARY_PATH

### Python3 Install

https://docs.oracle.com/en/database/oracle/machine-learning/oml4py/1/mlpug/install-oml4py-client-linux-autonomous-database.html#GUID-4CF137D0-F70B-412A-81FB-8C0E32B7C73A

export PREFIX=`pwd`/Python-3.12.3
cd $PREFIX
./configure --prefix=$PREFIX --enable-shared

make clean; make
make altinstall


export PYTHONHOME=$PREFIX
export PATH=$PYTHONHOME/bin:$PATH
export LD_LIBRARY_PATH=$PYTHONHOME/lib:$LD_LIBRARY_PATH


export PYTHONHOME=/root/Python-3.12.3/Python-3.12.3
export PATH=$PYTHONHOME/bin:$PATH
export LD_LIBRARY_PATH=$PYTHONHOME/lib:$LD_LIBRARY_PATH


cd $PYTHONHOME/bin 
ln -s python3.12 python3
ln -s pip3.12 pip3 

python3

python3 -m pip install --upgrade pip


perl -Iclient client/client.pl


[root@inst-client ~]# perl -Iclient client/client.pl

Oracle Machine Learning for Python 2.0 Client.

Copyright (c) 2018, 2024 Oracle and/or its affiliates. All rights reserved.
Checking platform .................. Pass
Checking Python .................... Pass
Checking dependencies .............. Traceback (most recent call last):
  File "/root/check_deps.py", line 16, in <module>
    verify_module({'numpy':'1.26.4', 'pandas':'2.1.1', 'scipy':'1.12.0', 'matplotlib':'3.7.2', 'oracledb':'2.0.1', 'scikit_learn':'1.2.1'})
  File "/root/check_deps.py", line 2, in verify_module
    from pkg_resources import WorkingSet, VersionConflict, DistributionNotFound
ModuleNotFoundError: No module named 'pkg_resources'
Fail
  ERROR:  at client/client.pl line 141.
[root@inst-client ~]# 

pip3 uninstall numpy
pip3 install numpy==1.26.4
pip3 install pandas==2.1.1
pip3 install scipy==1.12.0
pip3 install matplotlib==3.7.2
pip3 install oracledb==2.0.1
pip3 install scikit_learn==1.2.1
