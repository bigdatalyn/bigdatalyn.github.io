
### Docker 安装

[基于minikube快速搭建kubernetes单节点环境](https://www.cnblogs.com/zlt2000/p/17136336.html)

[Minikube 安装和简单使用](https://www.cnblogs.com/jhxxb/p/15220729.html)

[CentOS Docker 安装](https://www.runoob.com/docker/centos-docker-install.html)

centos7
- CentOS-7-x86_64-Vagrant-2004_01.VirtualBox.box
- centos7/Vagrantfile
file:
```
# -*- mode: ruby -*-
# vi: set ft=ruby

VAGRANTFILE_API_VERSION = '2'

servers = {
    :centos7 => '192.168.56.130'
}

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "centos/7"
    config.vm.box_check_update = false
##  config.vm.network 'forwarded_port', guest: 1521, host: 1521
    servers.each do | server_name, server_ip |
        config.vm.define server_name do | server_config |
            server_config.vm.hostname = "#{server_name.to_s}"
            server_config.vm.network :private_network, ip: server_ip
            server_config.vm.network :public_network
            server_config.vm.provider "virtualbox" do |vb|
                vb.name = server_name.to_s
                vb.memory = "2048"
                vb.cpus = 2
            end
        end
    end
end
```

Docker Install
```
$   yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2

阿里云

$ yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

安装 Docker Engine-Community
安装最新版本的 Docker Engine-Community 和 containerd，或者转到下一步安装特定版本：
$ yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```
```
systemctl start docker
systemctl enable docker.service
```



```
安装 kubectl：https://kubernetes.io/docs/tasks/tools/

curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client
 

安装 Minikube https://minikube.sigs.k8s.io/docs/start/

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```


要多个vcpu
```
[root@centos7 ~]# minikube start
😄  minikube v1.29.0 on Centos 7.8.2003
✨  Automatically selected the docker driver. Other choices: none, ssh

⛔  Exiting due to RSRC_INSUFFICIENT_CORES: Requested cpu count 2 is greater than the available cpus of 1

[root@centos7 ~]#
```

需要force启动
```
[root@centos7 ~]# minikube start

😄  minikube v1.29.0 on Centos 7.8.2003
✨  Automatically selected the docker driver. Other choices: ssh, none
🛑  The "docker" driver should not be used with root privileges. If you wish to continue as root, use --force.
💡  If you are running minikube within a VM, consider using --driver=none:
📘    https://minikube.sigs.k8s.io/docs/reference/drivers/none/

❌  Exiting due to DRV_AS_ROOT: The "docker" driver should not be used with root privileges.

[root@centos7 ~]# 

minikube start --force --driver=docker
```


```
[root@centos7 ~]# minikube start --force --driver=docker
😄  minikube v1.29.0 on Centos 7.8.2003
❗  minikube skips various validations when --force is supplied; this may lead to unexpected behavior
✨  Using the docker driver based on user configuration
🛑  The "docker" driver should not be used with root privileges. If you wish to continue as root, use --force.
💡  If you are running minikube within a VM, consider using --driver=none:
📘    https://minikube.sigs.k8s.io/docs/reference/drivers/none/

⛔  Requested memory allocation (1837MB) is less than the recommended minimum 1900MB. Deployments may fail.


🧯  The requested memory allocation of 1837MiB does not leave room for system overhead (total system memory: 1837MiB). You may face stability issues.
💡  Suggestion: Start minikube with less memory allocated: 'minikube start --memory=1837mb'

📌  Using Docker driver with root privileges
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
💾  Downloading Kubernetes v1.26.1 preload ...
    > gcr.io/k8s-minikube/kicbase...:  407.19 MiB / 407.19 MiB  100.00% 9.70 Mi
    > preloaded-images-k8s-v18-v1...:  397.05 MiB / 397.05 MiB  100.00% 9.00 Mi
🔥  Creating docker container (CPUs=2, Memory=1837MB) ...
🐳  Preparing Kubernetes v1.26.1 on Docker 20.10.23 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔗  Configuring bridge CNI (Container Networking Interface) ...
🔎  Verifying Kubernetes components...
❗  Executing "docker container inspect minikube --format={{.State.Status}}" took an unusually long time: 2.090817452s
💡  Restarting the docker service may improve performance.
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: default-storageclass, storage-provisioner
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
[root@centos7 ~]# 
```

```
minikube start --image-mirror-country='cn' --kubernetes-version=v1.23.8
image-mirror-country 为指定使用国内源

kubernetes-version 指定部署的版本（最新版兼容性坑比较多，所以选择低版本）
```

```
[root@centos7 ~]# minikube status
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured

[root@centos7 ~]# minikube kubectl get nodes

    > kubectl.sha256:  64 B / 64 B [-------------------------] 100.00% ? p/s 0s
    > kubectl:  45.80 MiB / 45.80 MiB [------------] 100.00% 16.45 MiB p/s 3.0s
NAME       STATUS   ROLES           AGE     VERSION
minikube   Ready    control-plane   7m44s   v1.26.1
[root@centos7 ~]# 
[root@centos7 ~]# 
[root@centos7 ~]# 
[root@centos7 ~]# minikube kubectl get nodes
NAME       STATUS   ROLES           AGE     VERSION
minikube   Ready    control-plane   7m46s   v1.26.1
[root@centos7 ~]# 
[root@centos7 ~]# minikube kubectl get namespaces
NAME              STATUS   AGE
default           Active   7m48s
kube-node-lease   Active   7m51s
kube-public       Active   7m51s
kube-system       Active   7m52s
[root@centos7 ~]# minikube kubectl -- get pods -A
NAMESPACE     NAME                               READY   STATUS    RESTARTS        AGE
kube-system   coredns-787d4945fb-6hwn5           1/1     Running   0               7m35s
kube-system   etcd-minikube                      1/1     Running   0               7m49s
kube-system   kube-apiserver-minikube            1/1     Running   0               7m49s
kube-system   kube-controller-manager-minikube   1/1     Running   1 (7m55s ago)   7m55s
kube-system   kube-proxy-2pc44                   1/1     Running   0               7m36s
kube-system   kube-scheduler-minikube            1/1     Running   0               7m49s
kube-system   storage-provisioner                1/1     Running   1 (7m2s ago)    7m43s
[root@centos7 ~]# 
[root@centos7 ~]# minikube ssh -- docker info
Client:
 Context:    default
 Debug Mode: false
 Plugins:
  app: Docker App (Docker Inc., v0.9.1-beta3)
  buildx: Docker Buildx (Docker Inc., v0.10.0-docker)

Server:
 Containers: 16
  Running: 14
  Paused: 0
  Stopped: 2
 Images: 9
 Server Version: 20.10.23
 Storage Driver: overlay2
  Backing Filesystem: xfs
  Supports d_type: true
  Native Overlay Diff: true
  userxattr: false
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Cgroup Version: 1
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
 Swarm: inactive
 Runtimes: io.containerd.runc.v2 io.containerd.runtime.v1.linux runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 5b842e528e99d4d4c1686467debf2bd4b88ecd86
 runc version: v1.1.4-0-g5fd4c4d
 init version: de40ad0
 Security Options:
  seccomp
   Profile: default
 Kernel Version: 3.10.0-1127.el7.x86_64
 Operating System: Ubuntu 20.04.5 LTS (containerized)
 OSType: linux
 Architecture: x86_64
 CPUs: 2
 Total Memory: 1.795GiB
 Name: minikube
 ID: ANK7:UTFT:6NPQ:WC27:FW2Y:EYSF:L7J4:V7KT:ETHJ:OF5Z:CKNK:GFR2
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 No Proxy: control-plane.minikube.internal
 Registry: https://index.docker.io/v1/
 Labels:
  provider=docker
 Experimental: false
 Insecure Registries:
  10.96.0.0/12
  127.0.0.0/8
 Live Restore Enabled: false

WARNING: bridge-nf-call-iptables is disabled
WARNING: bridge-nf-call-ip6tables is disabled
[root@centos7 ~]# 
```


```
minikube dashboard
集群外部想要直接访问 dashboard 还需要设置代理才能访问，执行以下命令：

kubectl proxy --port=8001 --address='192.168.28.138' --accept-hosts='^.*'
--port 需要暴露的端口号
--address 服务器外网IP（宿主机IP）
--accept-hosts 外部访问服务器的IP（白名单）

这样就可以在浏览器上通过以下地址访问 Kubernetes Dashboard：

http://192.168.28.138:8001/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/
```



