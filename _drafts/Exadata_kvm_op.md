

### 


kvm 
$ORACLE_HOME和$GRID_HOME的空间扩张需要停vm

查看

df -hT

vm_make --list --disk-image

    /EXAVMIMAGES/db-klone-Linux-x86-64-19000200714.20.img

vm_make --list --disk-image exavm11

    File /EXAVMIMAGES/GuestImages/exavm09.jp.osc.oracle.com/db19.8.0.0.200714-3.img

停止：
vm_maker  --list --domain

vm_maker --stop-domain exavm11

备份：relink

cd /EXAVMIMAGES/GuestImages/exavm11.jp.osc.oracle.com/

cp --reflink db19.8.0.0.200714-3.img  pre_resize.db19.0.0.img

创建 disk image 50g

vm_maker --create --disk-image /EXAVMIMAGES/db03.img --size 50G --attach --domain exavm11

启动：

vm_maker --start-domain exavm11

kvm host上查看

lvs

LVDBDisk            VGExaDbDisk.db03.img                -wi-a-----  50.00g                                                    

lvdisplay /dev/VGExaDbDisk.db03.img/LVDBDisk

lvremove /dev/VGExaDbDisk.db03.img/LVDBDisk
  --- Logical volume ---
  LV Path                /dev/VGExaDbDisk.db03.img/LVDBDisk
  LV Name                LVDBDisk
  VG Name                VGExaDbDisk.db03.img

lvremove /dev/VGExaDbDisk.db03.img/LVDBDisk

vgs

vgremove VGExaDbDisk.db03.img

vgs

pvs

pvdisplay

  "/dev/sdb1" is a new physical volume of "<52.00 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sdb1

pvdisplay -s

vgdisplay -s

    "VGExaDbDisk.db19.8.0.0.200714-3.img" <22.00 GiB [20.00 GiB used / <2.00 GiB free]

vgextend VGExaDbDisk.db19.8.0.0.200714-3.img /dev/sdb1

vgdisplay -s

    "VGExaDbDisk.db19.8.0.0.200714-3.img" 73.99 GiB [20.00 GiB used / 53.99 GiB free]

vgs

lvs

lvextend -L +10G /dev/VGExaDbDisk.db19.8.0.0.200714-3.img/LVDBDisk

lvs

xfs_growfs /u01/app/oracle/product/19.0.0.0/dbhome_1/








### vm_make 

[root@cancerdb01 ~]# vm_maker --help
usage: vm_maker [-h] [--create --disk-image image [--size size]
                [--filesystem filesystem] [--from-zip zipfile] [--attach]
                [--no-reflink] [--domain domain]]
                [--attach --disk-image image --domain domain [--no-reflink]]
                [--detach --disk-image image --domain domain [--delete]]
                [--list --disk-image [--domain domain]]
                [--autostart domain-name [--enable|--disable]]
                [--dumpxml domain-name] [--list --domain [domain [--detail]]]
                [--list-domains] [--reboot domain-name]
                [--remove-domain [domain-name|--all [--reset-kvmhost]]]
                [--start-domain [[XML-config-file-or-name|--all]
                [--no-discovery] [--keep] [--locked] [--ssh-key] [--console]
                [--console-log enable|disable]]]
                [--stop-domain [domain-name|--all|--force]]
                [--boot-from-iso iso [--domain domain-name]]
                [--boot-from-hd [--domain domain-name]]
                [--list --vcpu [--domain domain]]
                [--set --vcpu vcpu [--domain domain [--config] [--force]]]
                [--list --memory [--domain domain]]
                [--set --memory size --domain domain [--restart-domain]
                [--force]]
                [--add-bonded-bridge bridge --first-slave slave --second-slave slave [--vlan vlanid]
                [--bond-mode lacp|active-backup]]
                [--add-single-bridge bridge [--vlan vlanid]]
                [--set --mac mac --interface interface --domain domain [--restart-domain]]
                [--validate-ip ip-address --interface interface --netmask netmask --gateway gateway [--vlan vlanid]]
                [--setup-ip ip-address --interface interface --netmask netmask --gateway gateway [--vlan vlanid]]
                [--cleanup-ip interface  [--vlan vlanid]]
                [--validate-ip ip-address --discover --netmask netmask --gateway gateway [--vlan vlanid]]
                [--allocate-bridge bridge [--vlan vlanid] --domain domain]
                [--create --domain-group group --pcpu pcpu]
                [--remove-domain-group [group-name|--all]]
                [--set --domain-group group --domain domain-name]
                [--set --domain-group group --pcpu pcpu]
                [--list-domain-groups]
                [--list --domain-group-info [group|--all|--by-domain]]
                [--detach-domain-group --domain domain-name]
                [--rename-domain-group old-group-name new-group-name]
                [--network-discovery XML-config-file]
                [--remove-bridge bridge [--vlan vlanid] [--force]] [--check]
                [--configure-system [--no-build-base-image]] [--qinq]
                [--vhostmd {enable,disable,status}]
                [--console-log [enable|disable|status] --domain domain-name
                [--restart-domain]]
                [--change-sf-vlan [--new-cluster-vlan vlan]
                [--new-storage-vlan vlan] --domain domain --restart-domain]
                [--update-mac --domain domain-name]

Create, destroy, and otherwise manipulate KVM guests. Some options take a
domain name as an argument. Only enough characters to uniquely specify the
domain name are required.

optional arguments:
  -h, --help            show this help message and exit
  --create --disk-image image [--size size] [--filesystem filesystem] [--from-zip zipfile] [--attach] [--no-reflink] [--domain domain]
                        Create diskimage. Optionally specify size and
                        filesystem. Use additional options to create diskimage
                        from zipfile. Use optional flags '--attach' and '--
                        domain' to directly attach the diskimage to a domain
                        after creation. Do not specify a path for image if the
                        image will be reflink'd by one or more domains. For
                        example: vm_maker --create --disk-image shared.img. To
                        create an image that is not reflink'd, specify '--no-
                        reflink'. Diskimage files will be created on the
                        kvmhost with 50GB size unless another size or unit is
                        provided. The default file system is xfs.
  --attach --disk-image image --domain domain [--no-reflink]
                        Attach diskimage to a domain. Diskimage must be
                        created by vm_maker --create --disk-image. If
                        diskimage is to be created by a reflink, diskimage
                        must exist in /EXAVMIMAGES. For example vm_maker
                        --attach shared.img --domain my-domain. If diskimage
                        is not to be reflink'd, specify the '--no-reflink'
                        flag.
  --detach --disk-image image --domain domain [--delete]
                        Detach diskimage from a domain. Optional '--delete'
                        only possible when diskimage is not in use by any
                        other domain.
  --list --disk-image [--domain domain]
                        List all shared disk images in /EXAVMIMAGES . Specify
                        domain to display only images for domain.
  --autostart domain-name [--enable|--disable]
                        Manages autostart for specified domain.
  --dumpxml domain-name
                        Show XML definition of specified domain.
  --list --domain [domain [--detail]]
                        List all domains and their status. Specify domain to
                        display only one domain. --detail lists detailed
                        information.
  --list-domains        List all domains.
  --reboot domain-name  Reboot specified domain.
  --remove-domain [domain-name|--all [--reset-kvmhost]]
                        Force a shutdown of domain-name, and delete. If '--
                        all' is specified using this flag will shutdown and
                        delete all domains and intermediate image files.
                        Underlying bridges will be removed if not in use
                        anymore. Optional flag '--reset-kvmhost' brings the
                        system back to the state when the kvmhost had no
                        domains. This is only possible when specifying '--
                        all'. Optional flag '--with--images' removes all files
                        and directories from /EXAVMIMAGES. This is only
                        possible when using the '--all' flag.
  --start-domain [[XML-config-file-or-name|--all] [--no-discovery] [--keep] [--locked] [--ssh-key] [--console] [--console-log enable|disable]]
                        Create and start a domain. Pass a full file name of
                        the XML configuration file if creating a new domain,
                        or a domain name if restarting an existing domain.
                        Based on XML input 'discovery' will be performed and
                        if needed bridges created. '--keep' option does not
                        remove domain if first boot fails.'--locked forces
                        users to choose a new password at first login. Using
                        '--ssh-key' guests will be created with login for root
                        enabled for the ssh key in the specified file. Flag '
                        --console' will display console messages as the guest
                        is booting, but only when (re)starting existing
                        guests. Flag '--console-log' redirects console output
                        to a log file when specified with option 'enable', and
                        redirects console output to pty with option 'disable'.
                        NOTE: if '--locked' is also specified, the guest will
                        be created limiting root ssh access to the supplied
                        ssh key.
  --stop-domain [domain-name|--all|--force]
                        Stop the specified domain. Perform a graceful shut
                        down. If --force specified, do not shut down
                        gracefully, but rather shut down immediately.
  --boot-from-iso iso [--domain domain-name]
                        Boot the specified domain using the diagnostic iso.
                        Specify the full path for the iso. The domain must be
                        shut down.
  --boot-from-hd [--domain domain-name]
                        Restore a domain previously set to boot from a
                        diagnostic iso to boot from hard disk. This command
                        undoes 'vm_maker --boot-from-iso'.
  --list --vcpu [--domain domain]
                        List VCPU for a specific domain. Not specifying a
                        domain will display VCPU usage system wide
  --set --vcpu vcpu [--domain domain [--config] [--force]]
                        Specifies number of vcpus for a domain. Requires '--
                        domain' flag for specifying domain to set vcpus for.
                        Changing vcpus for a domain by default happens
                        'immediately'. Changing vcpu settings happens live.
                        Use the optional flag '--config' to make the change
                        only become effective at domain restart. Use flag '--
                        force' flag to force vcpu settings.
  --list --memory [--domain domain]
                        List memory for a specific domain. Not specifying a
                        domain will display memory usage system wide
  --set --memory size --domain domain [--restart-domain] [--force] 
                        Setting memory requires size and '--domain' flag for
                        specifying domain to set memory for. Memory can be
                        specifies in 'K','M', or 'G'. For example: '--memory
                        40G' or '--memory 25000M'.Changing memory settings
                        always requires a domain restart. Use optional
                        '--restart-domain'flag to restart domain. Use '--
                        force' flag toforce memory settings.
  --add-bonded-bridge bridge --first-slave slave --second-slave slave [--vlan vlanid] [--bond-mode lacp|active-backup]
                        Add a bridge over a bonded Ethernet interface. The
                        bridge name must begin with 'vm' followed by an
                        interface name. For example: 'vmbondeth0'. The default
                        bond-mode is active-backup.
  --add-single-bridge bridge [--vlan vlanid]
                        Add a bridge over a single Ethernet interface. The
                        bridge name must begin with 'vm' followed by an
                        interface name. For example: 'vmeth1'.
  --set --mac mac --interface interface --domain domain [--restart-domain] 
                        Set MAC for specified Ethernet interface.
  --validate-ip ip-address --interface interface --netmask netmask --gateway gateway [--vlan vlanid] 
                        Validate ip for specified Ethernet interface.
  --setup-ip ip-address --interface interface --netmask netmask --gateway gateway [--vlan vlanid] 
                        Setup ip for specified Ethernet interface.
  --cleanup-ip interface  [--vlan vlanid] 
                        Cleanup routing rule and ip from specified Ethernet
                        interface.
  --validate-ip ip-address --discover --netmask netmask --gateway gateway [--vlan vlanid] 
                        Discover interfaces valid for specified ip, netmask
                        and gateway. Optinally use vlan
  --allocate-bridge bridge [--vlan vlanid] --domain domain 
                        Assign a bridge with optional vlan id to the specified
                        domain.
  --create --domain-group group --pcpu pcpu 
                        Create a domain group with the specified number of
                        physical CPUs.
  --remove-domain-group [group-name|--all]
                        Remove the domain group group-name. No domains can
                        belong to group-name. Argument --all removes all
                        domain groups.
  --set --domain-group group --domain domain-name 
                        Associate domain with domain-group 'group'. Group must
                        exist, and domain-name must be shut down.
  --set --domain-group group --pcpu pcpu 
                        Change the number of pCPU associated with group.
  --list-domain-groups  List all domain groups.
  --list --domain-group-info [group|--all|--by-domain]
                        List domain group information for a group. If --all is
                        specified, show information for all groups. If --by-
                        domain is specified, show which domains belong to
                        which domain groups.
  --detach-domain-group --domain domain-name 
                        Disassociate domain group from domain-name. Domain-
                        name must be shut down. Domain-name must be associated
                        with a different domain group before it can restart,
                        if any domain groups have been defined.
  --rename-domain-group old-group-name new-group-name
                        Rename domain group old-group-name to new-group-name.
  --network-discovery XML-config-file
                        Discover network for the SCAN and other interfaces.
  --remove-bridge bridge [--vlan vlanid] [--force]
                        Remove bridge. Only possible if bridge is not in use
                        by host or other domains.
  --check               Check and display system configuration status.
  --configure-system [--no-build-base-image]
                        Configure system. Create /EXAVMIMAGES and create
                        virtual functions.Specifying '--no-build-base-image'
                        does not check for the existence of the base image.
  --qinq                Configure system for Secure Fabric support. This
                        option can be supplied with --configure-system. A
                        reboot is required.
  --vhostmd {enable,disable,status}
                        Enable, disable, or show status of vhostmd service.
  --console-log [enable|disable|status] --domain domain-name [--restart-domain]
                        Redirect console output to log file with option
                        'enable'. Redirect console output to pty with option
                        'disable'. Check console output status with option
                        'status'. Changing domain output always requires a
                        domain restart. Use optional '--restart-domain' to
                        restart domain.
  --change-sf-vlan [--new-cluster-vlan vlan] [--new-storage-vlan vlan] --domain domain --restart-domain 
                        Change secure fabric cluster VLAN id or storage VLAN
                        id or both. VLAN ids are integers. '--restart-domain'
                        is required. The domain will be restarted.
  --update-mac --domain domain-name 
                        Complete guest copying process as described in section
                        'Moving a Guest to a Different Database Server' within
                        the Exadata Maintenance Guide chapter 'Managing Oracle
                        Linux KVM Guests'.
[root@cancerdb01 ~]# 