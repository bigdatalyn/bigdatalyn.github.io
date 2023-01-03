honglin@honglin-mac linux % ls -tlr
total 8
-rw-r--r--  1 honglin  staff  853 12 23 11:33 Vagrantfile
honglin@honglin-mac linux % cat Vagrantfile 
# -*- mode: ruby -*-
# vi: set ft=ruby

VAGRANTFILE_API_VERSION = '2'

servers = {
    :ol801 => '192.168.56.111',
    :ol802 => '192.168.56.112',
    :ol803 => '192.168.56.113'
}

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "oraclelinux/8"
##  config.ssh.insert_key = false
    config.vm.box_check_update = false
##  config.vm.network 'forwarded_port', guest: 1521, host: 1521
    servers.each do | server_name, server_ip |
        config.vm.define server_name do | server_config |
            server_config.vm.hostname = "#{server_name.to_s}"
##            server_config.vm.network "private_network", ip: server_ip
            server_config.vm.provider "virtualbox" do |vb|
                vb.name = server_name.to_s
                vb.memory = "1024"
                vb.cpus = 1
            end
        end
    end
end

honglin@honglin-mac linux % vagrant ssh-config
Host ol801
  HostName 127.0.0.1
  User vagrant
  Port 2200
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /Users/honglin/01_VMs/linux/.vagrant/machines/ol801/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL

Host ol802
  HostName 127.0.0.1
  User vagrant
  Port 2201
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /Users/honglin/01_VMs/linux/.vagrant/machines/ol802/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL

Host ol803
  HostName 127.0.0.1
  User vagrant
  Port 2202
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /Users/honglin/01_VMs/linux/.vagrant/machines/ol803/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL

honglin@honglin-mac linux % 







Bringing machine 'ol801' up with 'virtualbox' provider...
Bringing machine 'ol802' up with 'virtualbox' provider...
Bringing machine 'ol803' up with 'virtualbox' provider...
An action 'up' was attempted on the machine 'ol801',
but another process is already executing an action on the machine.
Vagrant locks each machine for access by only one process at a time.
Please wait until the other Vagrant process finishes modifying this
machine, then try again.

If you believe this message is in error, please check the process
listing for any "ruby" or "vagrant" processes and kill them. Then
try again.


honglin@honglin-mac linux % ps -ef | grep ruby
  501  7426  7425   0  1:01下午 ttys003    0:02.94 ruby /opt/vagrant/embedded/gems/2.3.2/gems/vagrant-2.3.2/bin/vagrant up
  501  7777   747   0  1:07下午 ttys003    0:00.00 grep ruby
honglin@honglin-mac linux % kill -9 7426
honglin@honglin-mac linux % ps -ef | grep ruby
  501  7782   747   0  1:08下午 ttys003    0:00.01 grep ruby
honglin@honglin-mac linux % vagrant up




Vagrant was unable to mount VirtualBox shared folders. This is usually
because the filesystem "vboxsf" is not available. This filesystem is
made available via the VirtualBox Guest Additions and kernel module.
Please verify that these guest additions are properly installed in the
guest. This is not a bug in Vagrant and is usually caused by a faulty
Vagrant box. For context, the command attempted was:

mount -t vboxsf -o uid=1000,gid=1000,_netdev vagrant /vagrant

The error output from the command was:

/sbin/mount.vboxsf: mounting failed with the error: No such device



Then run: sudo "/Library/Application Support/VirtualBox/LaunchDaemons/VirtualBoxStartup.sh" restart


vi /etc/ssh/sshd_config
PasswordAuthentication yes
PermitRootLogin yes


systemctl restart sshd

passwd
