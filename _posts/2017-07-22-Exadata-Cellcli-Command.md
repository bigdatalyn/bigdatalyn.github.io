---
layout: post
title: "[原创]Exadata Cellcli命令汇总"
category: Oracle
tags: Exadata cellcli
---

* content
{:toc}

[原创]Exadata Cellcli命令汇总

Exadata Cellcli使用







###  cellcli commands in Oracle Exadata


CellCLI  --- Cell Command Line Interface/Interpreter

CellCLI manages Exadata Storage Servers (Cells). The scope of the CellCLI command is the cell where it is run, not in other cells. To invoke the CellCLI, login to the Exadata cell as cellmonitor, celladmin, or root, and type "cellcli".

	# cellcli
	# cellcli -e list cell
	# cellcli -x -n -e "list metrichistory where objectType='CELL'"
	# cellcli <mycellci.commands >mycellci.output

                                                                                                                                       

History Calibrates Descriptor Flashdisk Imports Interpreter Manages Metric Newer 

	Help
	CellCLI> help
	HELP [topic]
		Available Topics:
			ALTER
			ALTER ALERTHISTORY
			ALTER CELL
			ALTER CELLDISK
			ALTER GRIDDISK
			ALTER IBPORT
			ALTER IORMPLAN
			ALTER LUN
			ALTER PHYSICALDISK
			ALTER QUARANTINE
			ALTER THRESHOLD
			ASSIGN KEY
			CALIBRATE
			CREATE
			CREATE CELL
			CREATE CELLDISK
			CREATE FLASHCACHE
			CREATE GRIDDISK
			CREATE KEY
			CREATE QUARANTINE
			CREATE THRESHOLD
			DESCRIBE
			DROP
			DROP ALERTHISTORY
			DROP CELL
			DROP CELLDISK
			DROP FLASHCACHE
			DROP GRIDDISK
			DROP QUARANTINE
			DROP THRESHOLD
			EXPORT CELLDISK
			IMPORT CELLDISK
			LIST
			LIST ACTIVEREQUEST
			LIST ALERTDEFINITION
			LIST ALERTHISTORY
			LIST CELL
			LIST CELLDISK
			LIST FLASHCACHE
			LIST FLASHCACHECONTENT
			LIST GRIDDISK
			LIST IBPORT
			LIST IORMPLAN
			LIST KEY
			LIST LUN
			LIST METRICCURRENT
			LIST METRICDEFINITION
			LIST METRICHISTORY
			LIST PHYSICALDISK
			LIST QUARANTINE
			LIST THRESHOLD
			SET
			SPOOL
			START
	CellCLI> help list ibport
	CellCLI> help alter cell

	Describe       --- Will display all attributes
	CellCLI> describe cell
	CellCLI> describe physicaldisk
	CellCLI> describe lun
	CellCLI> describe celldisk
	CellCLI> describe griddisk
	CellCLI> describe flashcache
	CellCLI> describe flashcachecontent
	CellCLI> describe metriccurrent
	CellCLI> describe metricdefinition
	CellCLI> describe metrichistory 

	List
	CellCLI> help list
	Enter HELP LIST <object_type> for specific help syntax.
		<object_type>:  {ACTIVEREQUEST | ALERTDEFINITION | ALERTHISTORY | CELL | CELLDISK | FLASHCACHE | FLASHCACHECONTENT | GRIDDISK | IBPORT | IORMPLAN | KEY | LUN | METRICCURRENT | METRICDEFINITION | METRICHISTORY | PHYSICALDISK | QUARANTINE | THRESHOLD }

	CellCLI> list cell   - Will display Oracle Exadata Storage Servers/Cells information
	CellCLI> list cell detail
	CellCLI> list cell attributes all
	CellCLI> list cell attributes rsStatus

	CellCLI> list physicaldisk           - Will display physical disks information
	CellCLI> list physicaldisk detail
	CellCLI> list physicaldisk 34:5
	CellCLI> list physicaldisk 34:11 detail
	CellCLI> list physicaldisk attributes all
	CellCLI> list physicaldisk attributes name, id, slotnumber
	CellCLI> list physicaldisk attributes name, disktype, makemodel, physicalrpm, physicalport, status
	CellCLI> list physicaldisk attributes name, disktype, errCmdTimeoutCount, errHardReadCount, errHardWriteCount
	CellCLI> list physicaldisk where diskType='Flashdisk'
	CellCLI> list physicaldisk attributes name, id, slotnumber where disktype="flashdisk" and status != "not present"
	CellCLI> list physicaldisk attributes name, physicalInterface, physicalInsertTime where disktype = 'Harddisk'
	CellCLI> list physicaldisk where diskType=flashdisk and status='poor performance' detail

	CellCLI> list lun             - Will display LUNs information
	CellCLI> list lun detail
	CellCLI> list lun 0_8 detail
	CellCLI> list lun attributes all
	CellCLI> list lun attributes name, cellDisk, raidLevel, status
	CellCLI> list lun where disktype=flashdisk

	CellCLI> list celldisk        - Will display cell disks information
	CellCLI> list celldisk detail
	CellCLI> list celldisk FD_01_cell07
	CellCLI> list celldisk FD_01_cell13 detail
	CellCLI> list celldisk attributes all
	CellCLI> list celldisk attributes name, devicePartition
	CellCLI> list celldisk attributes name, devicePartition where size>20G
	CellCLI> list celldisk attributes name,interleaving where disktype=harddisk

	CellCLI> list griddisk      - Will display grid disks information
	CellCLI> list griddisk detail
	CellCLI> list griddisk DG_01_cell03 detail
	CellCLI> list griddisk attributes all
	CellCLI> list griddisk attributes name, size
	CellCLI> list griddisk attributes name, cellDisk, diskType
	CellCLI> list griddisk attributes name, ASMDeactivationOutcome, ASMModeStatus     --- describe command does not show these two attributes
	CellCLI> list griddisk attributes name,cellDisk,status where size=476.546875G
	CellCLI> list griddisk attributes name where asmdeactivationoutcome != 'Yes'

	CellCLI> list flashcache     - Will display flash cache information
	CellCLI> list flashcache detail
	CellCLI> list flashcache attributes all
	CellCLI> list flashcache attributes degradedCelldisks


	CellCLI> help list FLASHCACHECONTENT
	  Usage: LIST FLASHCACHECONTENT [<filters>] [<attribute_list>] [DETAIL]
	  Purpose: Displays specified attributes for flash cache entries.
	  Arguments:
	   <filters>: An expression which determines the entries to be displayed.
	   <attribute_list>: The attributes that are to be displayed. ATTRIBUTES {ALL | attr1 [, attr2]... }
	   [DETAIL]: Formats the display as an attribute on each line, with an attribute descriptor preceding each value.

	CellCLI> list flashcachecontent        - Will display flash cache content information
	CellCLI> list flashcachecontent detail
	CellCLI> list flashcachecontent where objectnumber=161441 detail
	CellCLI> list flashcachecontent where dbUniqueName like 'EX.?.?' and hitcount > 100 attributes dbUniqueName, objectNumber, cachedKeepSize, cachedSize
	CellCLI> list flashcachecontent where dbUniqueName like 'EX.?.?' and objectNumber like '.*007'
	CellCLI> list flashcachecontent where dbUniqueName like '.*X.?.?' and objectNumber like '.*456' detail

	CellCLI> list metriccurrent    - Will display metrics information
	CellCLI> list metriccurrent gd_io_rq_w_sm
	CellCLI> list metriccurrent n_nic_rcv_sec detail
	CellCLI> list metriccurrent attributes name,metricObjectName,metricType, metricValue,objectType where alertState != 'normal'
	CellCLI> list metriccurrent attributes name,metricObjectName,metricType, metricValue,alertState where objectType = 'HOST_INTERCONNECT'
	CellCLI> list metriccurrent attributes all where objectType = 'CELL'
	CellCLI> list metriccurrent attributes all where objectType = 'GRIDDISK' -
	> and metricObjectName = 'DATA_CD_09_cell01' and metricValue > 0

	CellCLI> list metricdefinition        - Will display metric's definitions
	CellCLI> list metricdefinition cl_cput detail
	CellCLI> list metricdefinition attributes all where objecttype='CELL'

	CellCLI> list metrichistory           - Will display metric's history
	CellCLI> list metrichistory cl_cput
	CellCLI> list metrichistory where objectType = 'CELL'
	CellCLI> list metrichistory where objectType = 'CELL' and name = 'CL_TEMP'
	CellCLI> list metrichistory cl_cput where collectiontime > '*2011-10-15T22:56:04-04:00*'
	# cellcli -x -n -e "list metrichistory where objectType='CELL' and name='CL_TEMP'"
	--- -x to suppress the banner, and the -n to suppress the command line

	CellCLI> list alertdefinition detail    - Will display alert's definitions
	CellCLI> list alertdefinition attributes all where alertSource!='Metric'

	CellCLI> list alerthistory        - Will display alert's history
	CellCLI> list alerthistory detail
	CellCLI> list alerthistory where notificationState like '[023]' and severity like '[warning|critical]' and examinedBy = NULL;

	CellCLI> list activerequest

	CellCLI> list ibport       - Will display InfiniBand configuration details
	CellCLI> list ibport detail

	CellCLI> list iormplan       - Will display IORM plan details

	CellCLI> list key

	CellCLI> list quarantine

	CellCLI> list threshold      - Will display threshold details

	Create
	CellCLI> CREATE CELL [cellname] [realmname=realmvalue,] [interconnect1=ethvalue,] [interconnect2=ethvalue,][interconnect3=ethvalue,] [interconnect4=ethvalue,]
	 ( ([ipaddress1=ipvalue,] [ipaddress2=ipvalue,] [ipaddress3=ipvalue,] [ipaddress4=ipvalue,]) | ([ipblock=ipblkvalue, cellnumber=numvalue]) )  --- To configure the Oracle Exadata cell network and starts services.

	CellCLI> create celldisk all harddisk
	CellCLI> create celldisk all
	CellCLI> create celldisk all harddisk interleaving='normal_redundancy'
		interleaving -- none(default), normal_redundancy or high_redundancy
	CellCLI> create celldisk all flashdisk

	CellCLI> create griddisk RECO_CD_11_cell01 celldisk=CD_11_cell01
	CellCLI> create griddisk RECO_CD_11_cell01 celldisk=CD_11_cell01 size=100M
	CellCLI> create griddisk all prefix RECO 
	CellCLI> create griddisk all flashdisk prefix FLASH
	CellCLI> create griddisk all harddisk prefix HARD
	CellCLI> create griddisk all harddisk prefix='data', size='270g'
	CellCLI> create griddisk all prefix='data', size='300g'
	CellCLI> create griddisk all prefix='redo', size='150g'
	CellCLI> create griddisk all harddisk prefix=systemdg

	CellCLI> create flashcache celldisk='FD_00_cell01'
	CellCLI> create flashcache celldisk='FD_13_cell01,FD_00_cell01,FD_10_cell01,FD_02_cell01,FD_06_cell01, FD_12_cell01,FD_05_cell01,FD_08_cell01,FD_15_cell01,FD_14_cell01,FD_07_cell01,FD_04_cell01,FD_03_cell01,FD_11_cell01,FD_09_cell01,FD_01_cell01'
	CellCLI> create flashcache all
	CellCLI> create flashcache all size=365.25G

	CellCLI> create key

	CellCLI> create quarantine

	CellCLI> create threshold cd_io_errs_min.prodb comparison=">", critical=10
	CellCLI> create threshold CD_IO_ERRS_MIN warning=1, comparison='>=', occurrences=1, observation=1

	Alter
	CellCLI> alter cell shutdown services rs - To shutdown the Restart Server service
	CellCLI> alter cell shutdown services MS - To shutdown the Management Server service
	CellCLI> alter cell shutdown services CELLSRV - To shutdown the Cell Services
	CellCLI> alter cell shutdown services all -To shutdown the RS, CELLSRV and MS services
	CellCLI> alter cell restart services rs
	CellCLI> alter cell restart services all

	CellCLI> alter cell led on
	CellCLI> alter cell led off

	CellCLI> alter cell validate mail
	CellCLI> alter cell validate configuration
	CellCLI> alter cell smtpfromaddr='cell07@orac.com'
	CellCLI> alter cell smtpfrom='Exadata Cell 07'
	CellCLI> alter cell smtptoaddr='satya@orac.com'
	CellCLI> alter cell emailFormat='text'
	CellCLI> alter cell emailFormat='html'


	CellCLI> alter cell validate snmp type=ASR - Automatic Service Requests (ASRs)
	CellCLI> alter cell snmpsubscriber=((host='snmp01.orac.com,type=ASR'))

	CellCLI> alter cell restart bmc  - BMC, Baseboard Management Controller, controls the compoments of the cell.
	CellCLI> alter cell configure bmc

	CellCLI> alter physicaldisk 34:2,34:3 serviceled on
	CellCLI> alter physicaldisk 34:6,34:9 serviceled off
	CellCLI> alter physicaldisk harddisk serviceled on
	CellCLI> alter physicaldisk all serviceled on

	CellCLI> alter lun 0_10 reenable
	CellCLI> alter lun 0_04 reenable force

	CellCLI> alter celldisk FD_01_cell07 comment='Flash Disk'
	CellCLI> alter celldisk all harddisk comment='Hard Disk'
	CellCLI> alter celldisk all flashdisk comment='Flash Disk'

	CellCLI> alter griddisk RECO_CD_10_cell06 comment='Used for Reco'
	CellCLI> alter griddisk all inactive
	CellCLI> alter griddisk RECO_CD_11_cell12 inactive
	CellCLI> alter griddisk RECO_CD_08_cell01 inactive force
	CellCLI> alter griddisk RECO_CD_11_cell01 inactive nowait
	CellCLI> alter griddisk DATA_CD_00_CELL01,DATA_CD_02_CELL01,...DATA_CD_11_CELL01 inactive
	CellCLI> alter griddisk all active
	CellCLI> alter griddisk RECO_CD_11_cell01 active
	CellCLI> alter griddisk all harddisk comment='Hard Disk'

	CellCLI> alter ibport ibp2 reset counters

	CellCLI> alter iormplan active

	CellCLI> alter quarantine

	CellCLI> alter threshold DB_IO_RQ_SM_SEC.PRODB comparison=">", critical=100

	CellCLI> alter alerthistory

	Drop
	CellCLI> drop cell --- To reset the cell to its factory settings, removes the cell related properties of the server; it does not actually remove the physical server.
	CellCLI> drop cell force

	CellCLI> drop celldisk CD_01_cell05
	CellCLI> drop celldisk CD_00_cell09 force
	CellCLI> drop celldisk harddisk
	CellCLI> drop celldisk flashdisk
	CellCLI> drop celldisk all
	CellCLI> drop celldisk all flashdisk force

	CellCLI> drop griddisk DBFS_DG_CD_02_cel14
	CellCLI> drop griddisk RECO_CD_11_cell01 force
	CellCLI> drop griddisk prefix=DBFS
	CellCLI> drop griddisk flashdisk
	CellCLI> drop griddisk harddisk
	CellCLI> drop griddisk all
	CellCLI> drop griddisk all prefix=temp_dg

	CellCLI> drop flashcache

	CellCLI> drop quarantine

	CellCLI> drop threshold DB_IO_RQ_SM_SEC.PRODB

	CellCLI> drop alerthistory

	Export
	CellCLI> export celldisk

	Import
	CellCLI> import celldisk

	Assign
	CellCLI> assign key

	Calibrate
	CellCLI> calibrate
	CellCLI> calibrate force

	Set
	CellCLI> help set
	  Usage: SET <variable> <value>
	  Purpose: Sets a variable to alter the CELLCLI environment settings for your current session.
	  Arguments: variable and value represent one of the following clauses:
		DATEFORMAT { STANDARD | LOCAL }
		ECHO { ON | OFF }

	CellCLI> set dateformat local
	CellCLI> set dateformat standard

	CellCLI> set echo on
	CellCLI> set echo off

	Spool
	CellCLI> spool myCellCLI.txt
	CellCLI> spool myCellCLI.txt append
	CellCLI> spool myCellCLI.txt replace
	CellCLI> spool off
	CellCLI> spool     --- Will give spool file name

	Scripts execution
	CellCLI> @listdisks.cli
	CellCLI> start listdisks.cli

	Comments
	REM This is a comment
	REMARK This is another comment
	-- This is yet another comment

	Continuation Character
	CellCLI> list metriccurrent attributes name,metricObjectName,metricValue, -
	objectType where alertState != 'normal'   --- continuation character for queries spanned in multiple lines

	Exit/Quit
	CellCLI> exit
	CellCLI> quit	

~~ 2017/07/21 bigdata_lyn ~~
