Bug 36212293 - DBWR Blocking Sessions With Error "failed to renounce write permission after multiple tries" (Doc ID 36212293.8)	

Versions confirmed as being affected
19.23.0
19.22.0
19.20.0

Description
This bug is only relevant when using Real Application Clusters (RAC)
Clusterwide hang due to checkpoint stall and DBW hang waiting for 
 write permission.
 
REDISCOVERY INFORMATION:
    1) You will see DBW hang waiting for write permission resulting in 
     checkpoint incomplete.
    KCBB: going to write
    KCBB: rwrite status 1
    KCBB: write permission pending, requests 10, last successful write 9 seconds 
    ago
 
   2) The lock involved is a weak lock 
    (grant 1 cvt 2 mode 0x5 role 0x8 st 0x101 lst 0xc0 CONVERTQ rl LOCAL)
 
   3) And the lock has undergone an incomplete LSR before. The old request Xw->X
    could be a hang due to 'gc current request'. This was because master sees a 
    SH grant to the client but client lock doesn't have any SH lock hence, the 
    weak lock could not be converted to an X lock in the new request.
 
Workaround
     SQL> oradebug lkdebug -m reconfig lkdebug
	 
	 
