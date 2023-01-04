

https://docs.oracle.com/en/database/oracle/oracle-database/12.2/cwlin/changing-kernel-parameter-values.html#GUID-FB0CC366-61C9-4AA2-9BE7-233EB6810A31

If you used the Oracle Preinstallation RPM to complete you preinstallation configuration tasks, then the Oracle Preinstallation RPM sets these kernel parameters for you. However, if you did not use the Oracle Preinstallation RPM or the kernel parameters are different from the minimum recommended value, then to change these kernel parameter values:

Using any text editor, create or edit the /etc/sysctl.d/97-oracle-database-sysctl.conf file, and add or edit lines similar to:
fs.aio-max-nr = 1048576
fs.file-max = 6815744
kernel.shmall = 2097152
kernel.shmmax = 4294967295
kernel.shmmni = 4096
kernel.sem = 250 32000 100 128
net.ipv4.ip_local_port_range = 9000 65500
net.core.rmem_default = 262144
net.core.rmem_max = 4194304
net.core.wmem_default = 262144
net.core.wmem_max = 1048576
By specifying the values in the /etc/sysctl.d/97-oracle-database-sysctl.conf file, the values persist on system restarts.

To change the current values of the kernel parameters:
# /sbin/sysctl --system
Review the output. If the values are incorrect, edit the /etc/sysctl.d/97-oracle-database-sysctl.conf file, then enter this command again.
Confirm that the values are set correctly:
# /sbin/sysctl -a
Restart the computer, or run sysctl --system to make the changes in the /etc/sysctl.d/97-oracle-database-sysctl.conf file available in the active kernel memory.


