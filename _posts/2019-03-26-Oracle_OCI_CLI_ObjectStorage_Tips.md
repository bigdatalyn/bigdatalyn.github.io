---
layout: post
title: "Oracle OCI CLI Setup Tips"
category: Oracle
tags: Oracle ADW Tips
---

* content
{:toc}

Oracle OCI CLI Setup Tips


Linux下OCICLI环境的搭建和上传文件到ObjectStorage






### 安装 Oracle Cloud Infrastructure CLI

Linux 版本下安装:

	bash -c "$(curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh)"

参考：

[OCI](https://cloud.oracle.com/cloud-infrastructure)

[Installing the CLI](https://docs.cloud.oracle.com/iaas/Content/API/SDKDocs/cliinstall.htm)

[oracle/oci-cli](https://github.com/oracle/oci-cli)

如：Linux 7下安装OCI

配置需要python环境并且符合一定版本以上的python

	[oracle@inst01 ~]$ python --version
	Python 2.7.5
	[oracle@inst01 ~]$ 
	[oracle@inst01 ~]$ bash -c "$(curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh)"
	  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
									 Dload  Upload   Total   Spent    Left  Speed
	100  6283  100  6283    0     0  33574      0 --:--:-- --:--:-- --:--:-- 33598
	Downloading Oracle Cloud Infrastructure CLI install script from https://raw.githubusercontent.com/oracle/oci-cli/6dc61e3b5fd2781c5afff2decb532c24969fa6bf/scripts/install/install.py to /tmp/oci_cli_install_tmp_B5C4.
	######################################################################## 100.0%
	System version of Python must be either a Python 2 version >= 2.7.5 or a Python 3 version >= 3.5.0.
	Running install script.
	python /tmp/oci_cli_install_tmp_B5C4  < /dev/tty
	-- Verifying Python version.
	-- Python version 2.7.5 okay.
	-- Verifying native dependencies.
	-- Unable to verify native dependencies. dist=oracle linux server, version=7.6. Continuing...

	===> In what directory would you like to place the install? (leave blank to use '/home/oracle/lib/oracle-cli'):
	-- Creating directory '/home/oracle/lib/oracle-cli'.
	-- We will install at '/home/oracle/lib/oracle-cli'.

	===> In what directory would you like to place the 'oci' executable? (leave blank to use '/home/oracle/bin'):
	-- Creating directory '/home/oracle/bin'.
	-- The executable will be in '/home/oracle/bin'.

	===> In what directory would you like to place the OCI scripts? (leave blank to use '/home/oracle/bin/oci-cli-scripts'):
	-- Creating directory '/home/oracle/bin/oci-cli-scripts'.
	-- The scripts will be in '/home/oracle/bin/oci-cli-scripts'.
	-- Downloading virtualenv package from https://github.com/pypa/virtualenv/archive/15.0.0.tar.gz.
	-- Downloaded virtualenv package to /tmp/tmpsMjGYW/15.0.0.tar.gz.
	-- Checksum of /tmp/tmpsMjGYW/15.0.0.tar.gz OK.
	-- Extracting '/tmp/tmpsMjGYW/15.0.0.tar.gz' to '/tmp/tmpsMjGYW'.
	-- Executing: ['/bin/python', 'virtualenv.py', '--python', '/bin/python', '/home/oracle/lib/oracle-cli']
	Already using interpreter /bin/python
	New python executable in /home/oracle/lib/oracle-cli/bin/python
	Installing setuptools, pip, wheel...done.
	-- Executing: ['/home/oracle/lib/oracle-cli/bin/pip', 'install', '--cache-dir', '/tmp/tmpsMjGYW', 'oci_cli', '--upgrade']
	DEPRECATION: Python 2.7 will reach the end of its life on January 1st, 2020. Please upgrade your Python as Python 2.7 won't be maintained after that date. A future version of pip will drop support for Python 2.7.
	Collecting oci_cli
	  Downloading https://files.pythonhosted.org/packages/3b/8e/dd495ec5eff6bbe8e97cb84db9a1f1407fe5ee0e901f5f2833bb47920ae3/oci_cli-2.5.4-py2.py3-none-any.whl (3.7MB)
		100% |████████████████████████████████| 3.7MB 6.0MB/s
	Collecting terminaltables==3.1.0 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/9b/c4/4a21174f32f8a7e1104798c445dacdc1d4df86f2f26722767034e4de4bff/terminaltables-3.1.0.tar.gz
	Collecting idna<2.7,>=2.5 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/27/cc/6dd9a3869f15c2edfab863b992838277279ce92663d334df9ecf5106f5c6/idna-2.6-py2.py3-none-any.whl (56kB)
		100% |████████████████████████████████| 61kB 18.6MB/s
	Collecting arrow==0.10.0 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/54/db/76459c4dd3561bbe682619a5c576ff30c42e37c2e01900ed30a501957150/arrow-0.10.0.tar.gz (86kB)
		100% |████████████████████████████████| 92kB 23.5MB/s
	Collecting jmespath==0.9.3 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/b7/31/05c8d001f7f87f0f07289a5fc0fc3832e9a57f2dbd4d3b0fee70e0d51365/jmespath-0.9.3-py2.py3-none-any.whl
	Collecting configparser==3.5.0 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/7c/69/c2ce7e91c89dc073eb1aa74c0621c3eefbffe8216b3f9af9d3885265c01c/configparser-3.5.0.tar.gz
	Collecting pyOpenSSL==18.0.0 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/96/af/9d29e6bd40823061aea2e0574ccb2fcf72bfd6130ce53d32773ec375458c/pyOpenSSL-18.0.0-py2.py3-none-any.whl (53kB)
		100% |████████████████████████████████| 61kB 19.8MB/s
	Collecting httpsig-cffi==15.0.0 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/93/f5/c9a213c0f906654c933f1192148d8aded2022678ad6bce8803d3300501c6/httpsig_cffi-15.0.0-py2.py3-none-any.whl
	Collecting cryptography==2.4.2 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/7f/ba/383b51cc26e3141c689ce988814385c7659f5ba01c4b5f2de38233010b5f/cryptography-2.4.2-cp27-cp27mu-manylinux1_x86_64.whl (2.1MB)
		100% |████████████████████████████████| 2.1MB 7.6MB/s
	Collecting oci==2.2.3 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/d9/e1/1301df1b5ae84aa01188e5c42b41c1ad44739449ff3af2ab81790a952bb3/oci-2.2.3-py2.py3-none-any.whl (2.0MB)
		100% |████████████████████████████████| 2.0MB 5.8MB/s
	Collecting click==6.7 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/34/c1/8806f99713ddb993c5366c362b2f908f18269f8d792aff1abfd700775a77/click-6.7-py2.py3-none-any.whl (71kB)
		100% |████████████████████████████████| 71kB 21.3MB/s
	Collecting cx-Oracle==7.0 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/a8/84/5b5d39c8197ff06d47e5f06dd4244ce84894696465e02b3e5bd39357de25/cx_Oracle-7.0.0-cp27-cp27mu-manylinux1_x86_64.whl (668kB)
		100% |████████████████████████████████| 675kB 13.2MB/s
	Collecting retrying==1.3.3 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/44/ef/beae4b4ef80902f22e3af073397f079c96969c69b2c7d52a57ea9ae61c9d/retrying-1.3.3.tar.gz
	Collecting pytz==2016.10 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/f5/fa/4a9aefc206aa49a4b5e0a72f013df1f471b4714cdbe6d78f0134feeeecdb/pytz-2016.10-py2.py3-none-any.whl (483kB)
		100% |████████████████████████████████| 491kB 15.0MB/s
	Collecting PyYAML==3.13 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/9e/a3/1d13970c3f36777c583f136c136f804d70f500168edc1edea6daa7200769/PyYAML-3.13.tar.gz (270kB)
		100% |████████████████████████████████| 276kB 23.6MB/s
	Collecting certifi (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/60/75/f692a584e85b7eaba0e03827b3d51f45f571c2e793dd731e598828d380aa/certifi-2019.3.9-py2.py3-none-any.whl (158kB)
		100% |████████████████████████████████| 163kB 23.2MB/s
	Collecting python-dateutil==2.7.3 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/cf/f5/af2b09c957ace60dcfac112b669c45c8c97e32f94aa8b56da4c6d1682825/python_dateutil-2.7.3-py2.py3-none-any.whl (211kB)
		100% |████████████████████████████████| 215kB 25.4MB/s
	Collecting six==1.11.0 (from oci_cli)
	  Downloading https://files.pythonhosted.org/packages/67/4b/141a581104b1f6397bfa78ac9d43d8ad29a7ca43ea90a2d863fe3056e86a/six-1.11.0-py2.py3-none-any.whl
	Collecting enum34; python_version < "3" (from cryptography==2.4.2->oci_cli)
	  Downloading https://files.pythonhosted.org/packages/c5/db/e56e6b4bbac7c4a06de1c50de6fe1ef3810018ae11732a50f15f62c7d050/enum34-1.1.6-py2-none-any.whl
	Collecting cffi!=1.11.3,>=1.7 (from cryptography==2.4.2->oci_cli)
	  Downloading https://files.pythonhosted.org/packages/9d/6f/aea9f5559fb593da07ff34e67513bd62483b45715b4a5f5fae6a0a5792ea/cffi-1.12.2-cp27-cp27mu-manylinux1_x86_64.whl (413kB)
		100% |████████████████████████████████| 419kB 20.7MB/s
	Collecting asn1crypto>=0.21.0 (from cryptography==2.4.2->oci_cli)
	  Downloading https://files.pythonhosted.org/packages/ea/cd/35485615f45f30a510576f1a56d1e0a7ad7bd8ab5ed7cdc600ef7cd06222/asn1crypto-0.24.0-py2.py3-none-any.whl (101kB)
		100% |████████████████████████████████| 102kB 25.9MB/s
	Collecting ipaddress; python_version < "3" (from cryptography==2.4.2->oci_cli)
	  Downloading https://files.pythonhosted.org/packages/fc/d0/7fc3a811e011d4b388be48a0e381db8d990042df54aa4ef4599a31d39853/ipaddress-1.0.22-py2.py3-none-any.whl
	Collecting pycparser (from cffi!=1.11.3,>=1.7->cryptography==2.4.2->oci_cli)
	  Downloading https://files.pythonhosted.org/packages/68/9e/49196946aee219aead1290e00d1e7fdeab8567783e83e1b9ab5585e6206a/pycparser-2.19.tar.gz (158kB)
		100% |████████████████████████████████| 163kB 27.0MB/s
	Building wheels for collected packages: terminaltables, arrow, configparser, retrying, PyYAML, pycparser
	  Building wheel for terminaltables (setup.py) ... done
	  Stored in directory: /tmp/tmpsMjGYW/wheels/30/6b/50/6c75775b681fb36cdfac7f19799888ef9d8813aff9e379663e
	  Building wheel for arrow (setup.py) ... done
	  Stored in directory: /tmp/tmpsMjGYW/wheels/ce/4f/95/64541c7466fd88ffe72fda5164f8323c91d695c9a77072c574
	  Building wheel for configparser (setup.py) ... done
	  Stored in directory: /tmp/tmpsMjGYW/wheels/a3/61/79/424ef897a2f3b14684a7de5d89e8600b460b89663e6ce9d17c
	  Building wheel for retrying (setup.py) ... done
	  Stored in directory: /tmp/tmpsMjGYW/wheels/d7/a9/33/acc7b709e2a35caa7d4cae442f6fe6fbf2c43f80823d46460c
	  Building wheel for PyYAML (setup.py) ... done
	  Stored in directory: /tmp/tmpsMjGYW/wheels/ad/da/0c/74eb680767247273e2cf2723482cb9c924fe70af57c334513f
	  Building wheel for pycparser (setup.py) ... done
	  Stored in directory: /tmp/tmpsMjGYW/wheels/f2/9a/90/de94f8556265ddc9d9c8b271b0f63e57b26fb1d67a45564511
	Successfully built terminaltables arrow configparser retrying PyYAML pycparser
	Installing collected packages: terminaltables, idna, six, python-dateutil, arrow, jmespath, configparser, enum34, pycparser, cffi, asn1crypto, ipaddress, cryptography, pyOpenSSL, httpsig-cffi, pytz, certifi, oci, click, cx-Oracle, retrying, PyYAML, oci-cli
	Successfully installed PyYAML-3.13 arrow-0.10.0 asn1crypto-0.24.0 certifi-2019.3.9 cffi-1.12.2 click-6.7 configparser-3.5.0 cryptography-2.4.2 cx-Oracle-7.0.0 enum34-1.1.6 httpsig-cffi-15.0.0 idna-2.6 ipaddress-1.0.22 jmespath-0.9.3 oci-2.2.3 oci-cli-2.5.4 pyOpenSSL-18.0.0 pycparser-2.19 python-dateutil-2.7.3 pytz-2016.10 retrying-1.3.3 six-1.11.0 terminaltables-3.1.0

	===> Modify profile to update your $PATH and enable shell/tab completion now? (Y/n):

	===> Enter a path to an rc file to update (leave blank to use '/home/oracle/.bashrc'):
	-- Backed up '/home/oracle/.bashrc' to '/home/oracle/.bashrc.backup'
	-- Tab completion set up complete.
	-- If tab completion is not activated, verify that '/home/oracle/.bashrc' is sourced by your shell.
	--
	-- ** Run `exec -l $SHELL` to restart your shell. **
	--
	-- Installation successful.
	-- Run the CLI with /home/oracle/bin/oci --help
	[oracle@inst01 ~]$

配置OCI环境

OCI Tenancy Information/User/Conpartment的信息的确认和获取

![Install_05]({{ "/files/Oracle/18c/XE/Install_05.png"}})

Oracle Object Storage:

![Memu_ObjectStorage]({{ "/files/Oracle/OCI/Memu_ObjectStorage.png"}})

创建测试使用：

![Memu_ObjectStorage]({{ "/files/Oracle/OCI/ObjectStorage_CreateBucket00.png"}})


![Memu_ObjectStorage]({{ "/files/Oracle/OCI/ObjectStorage_CreateBucket01.png"}})


![Memu_ObjectStorage]({{ "/files/Oracle/OCI/ObjectStorage_CreateBucket02.png"}})


OCI User和租户的ID

![Memu_ObjectStorage]({{ "/files/Oracle/OCI/OCID_01.png"}})


![Memu_ObjectStorage]({{ "/files/Oracle/OCI/OCID_02.png"}})



OCI Cli Setup配置

	[oracle@inst01 ~]$ mkdir config
	[oracle@inst01 ~]$ oci setup config
		This command provides a walkthrough of creating a valid CLI config file.

		The following links explain where to find the information required by this
		script:

		User OCID and Tenancy OCID:

			https://docs.cloud.oracle.com/Content/API/Concepts/apisigningkey.htm#Other

		Region:

			https://docs.cloud.oracle.com/Content/General/Concepts/regions.htm

		General config documentation:

			https://docs.cloud.oracle.com/Content/API/Concepts/sdkconfig.htm


	Enter a location for your config [/home/oracle/.oci/config]:
	Enter a user OCID: ocid1.user.oc1..xxxxxxxxxxxxxxxxxxxxxx
	Enter a tenancy OCID: ocid1.tenancy.oc1..aaaaaaaalylrk6bjiuxqryukd6jrlxgfbwjuulnavxqehvv3crknt7ewhlpa
	Enter a region (e.g. ca-toronto-1, eu-frankfurt-1, uk-london-1, us-ashburn-1, us-gov-ashburn-1, us-gov-chicago-1, us-gov-phoenix-1, us-langley-1, us-luke-1, us-phoenix-1): us-ashburn-1
	Do you want to generate a new RSA key pair? (If you decline you will be asked to supply the path to an existing key.) [Y/n]: y
	Enter a directory for your keys to be created [/home/oracle/.oci]:
	Enter a name for your key [oci_api_key]:
	Public key written to: /home/oracle/.oci/oci_api_key_public.pem
	Enter a passphrase for your private key (empty for no passphrase):
	Private key written to: /home/oracle/.oci/oci_api_key.pem
	Fingerprint: 27:52:93:6f:99:ce:76:6a:e1:1c:13:c3:7d:29:c0:11
	Config written to /home/oracle/.oci/config


		If you haven't already uploaded your public key through the console,
		follow the instructions on the page linked below in the section 'How to
		upload the public key':

			https://docs.cloud.oracle.com/Content/API/Concepts/apisigningkey.htm#How2


	[oracle@inst01 ~]$


PublicKey，追加api user

	[oracle@inst01 ~]$ cat ./.oci/oci_api_key_public.pem
	-----BEGIN PUBLIC KEY-----
	MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkp3DJ1o36sVG+nL6vSul
	PzDbY7znX/Ij5bkiEi8T9+kW+fRhaJ8YGjdDzfVuCCwJvYZFGj6PEgJDbmfMG9ld
	OjKawFLJ+XTSS5GVCvhoxQ1TLsfhyhK+F+q4T8koHIFr+eQ5RMzfNxoSZJTTq/lx
	y+RdSbKsyut/4TiJWImkjnbRCVWHGYrdMLLQTGc4keu3uKAWBUHgelJHDWOQjU/5
	wy7n4KIpDC1n5L2BwU02hU/Y4WjIxvqkFpJMBiKxWUUc0jO5ycrGZTOiFpT5wfiN
	0AZCmsVre4C6KFuF6ZDskMURCMsvzlbo+vs6ARYctsCSa3Pzm1Lt7RmR01eo1k2U
	JQIDAQAB
	-----END PUBLIC KEY-----
	[oracle@inst01 ~]$


API.User

![Memu_ObjectStorage]({{ "/files/Oracle/OCI/APIUser01.png"}})


![Memu_ObjectStorage]({{ "/files/Oracle/OCI/APIUser02.png"}})


![Memu_ObjectStorage]({{ "/files/Oracle/OCI/APIUser03.png"}})
	
	
ocicli通过compartment名获取bucket信息

	[oracle@inst01 ~]$ oci os bucket list -c ocid1.compartment.oc1..YYYYYYYYYYYYYYYYY
	{
	  "data": [
		{
		  "compartment-id": "ocid1.compartment.oc1..YYYYYYYYYYYYYYYYY",
		  "created-by": "ocid1.user.oc1..xxxxxxxxxxxxxxxxxxxxxx",
		  "defined-tags": XXXXXXXXXX,
		  "etag": "b29fc9ec-fc76-4365-98d3-b2e16a21c3fd",
		  "freeform-tags": XXXXXXXXXX,
		  "name": "Bucket01",
		  "namespace": "XXXXXXXXXX",
		  "time-created": "2019-03-24T05:31:23.153000+00:00"
		}
	  ]
	}
	[oracle@inst01 ~]$


默认环境配置


	[oracle@oel72 ~]$ oci setup oci-cli-rc
	Predefined queries written under section OCI_CLI_CANNED_QUERIES
	Command aliases written under section OCI_CLI_COMMAND_ALIASES
	Parameter aliases written under section OCI_CLI_PARAM_ALIASES
	[oracle@oel72 ~]$

编辑 ~\.oci\oci_cli_rc 追加：

	[DEFAULT]
	compartment-id = <compartment名的OCID>

获取namespace名称，通过oci上传文件到objectstorage中

	[oracle@oel72 ~]$ oci os ns get
	{
	  "data": "xxxxxxx"
	}
	[oracle@oel72 ~]$ 

如： oci命令参数可以通过--help查看使用方法

	oci os object bulk-upload -ns xxxxxxxx -bn yyyyyyyy-objs001 --src-dir /XXXXX/YYYY/


![oci_os_put_object]({{ "/files/Oracle/OCI/oci_os_put_object.png"}})



	
Have a good work&life! 2019/03 via LinHong



