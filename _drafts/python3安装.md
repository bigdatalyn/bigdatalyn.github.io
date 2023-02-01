# 下载
https://www.python.org/downloads/release/python-3111/

wget https://www.python.org/ftp/python/3.11.1/Python-3.11.1.tgz

tar -zxvf Python-3.11.1.tgz

yum -y install gcc gcc-c++ autoconf automake make zlib zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel libffi libffi-devel xz xz-devel


# 先进入解压后的文件夹下
# --prefix=选择安装路径
./configure --prefix=/usr/local/python3
# 等待一段时间后，编译并安装
make && make install


vim /etc/profile
# 在底部添加一行：
export PATH=$PATH:/usr/local/python3/bin
# 保存退出后刷新
source /etc/profile
# 配置环境变量后，终端输入python3查看是否成功


# 将原来python重命名为python2-6.6
mv /usr/bin/python /usr/bin/python-2.6.6
# 建立新的软连接，指向python-3.6.10
# 注意：软连接一定要使用绝对路径！！！
ln -s /usr/local/python3/bin/python3.6 /usr/bin/python


vim /usr/bin/yum
# 将第一行中python的路径替换为
# 虽然python3环境安装成功，但是由于yum依赖python2，我们还应该修改yum，让其指向旧版本
#!/usr/bin/python-2.6.6


pip3其实已经在python3安装时被安装了，所以我们只要建立软连接即可

ln -s /usr/local/python3/bin/pip3 /usr/bin/pip
# 完成后还需要配置pip国内源（这里采用阿里云的pip库）
mkdir ~/.pip
vim ~/.pip/pip.conf
# 输入以下内容后保存
[global]
index-url=http://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host=mirrors.aliyun.com

# 这里我用requests库进行测试
pip install requests
# 更新pip
pip install --upgrade pip
