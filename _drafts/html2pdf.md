
[root@ol8mysql01 vagrant]# cat /etc/redhat-release 
Red Hat Enterprise Linux release 8.6 (Ootpa)
[root@ol8mysql01 vagrant]# cat /etc/redhat-release
Red Hat Enterprise Linux release 8.6 (Ootpa)
[root@ol8mysql01 vagrant]# getconf LONG_BIT 
64
[root@ol8mysql01 vagrant]# uname -r
5.4.17-2136.309.4.el8uek.x86_64
[root@ol8mysql01 vagrant]# 

https://github.com/wkhtmltopdf/packaging/releases/

dnf install xorg-x11-fonts-75dpi -y
dnf install xorg-x11-fonts-Type1 -y
rpm -ivh wkhtmltox-0.12.6.1-2.almalinux8.x86_64.rpm 


如果中文变成了空白，则很好弄，Linux 系统不支持中文
https://blog.csdn.net/weixin_45019350/article/details/115799676
安装中文字体：
防止转换时乱码：
一 安装相关操作
1.安装字体命令

yum -y install fontconfig

2.查看已安装字体

（1）查看linux已安装字体

fc-list

（2）查看linux已安装中文字体

fc-list :lang=zh


可以看出，linux默认字体是没有中文字体的，需要手动安装。

3.安装中文字体

（1）创建目录

mkdir -p /usr/share/fonts/my_fonts

（2）将要安装的字体上传到该文件夹下
这里我们安装黑体常规，即simhei.ttf。

关于具体字体查找，我以windows为例。

进入C:\Windows\Fonts，该文件夹下就存放相关字体，将simhei.tty拷贝到linux 目录/usr/share/fonts/my_fonts下即可


（3）安装字体索引指令

   yum install mkfontscale

（4）生成字体索引
  进入目录 cd  /usr/share/fonts/my_fonts,执行索引字体生成

   mkfontscale

4.查看黑体常规字体是否安装成功

fc-list :lang=zh，如下表示安装成功

https://note.youdao.com/ynoteshare/index.html?id=b7d9c14684815f81fe7425ca5ce2dcd1&type=note&_time=1675244432288

yum install -y fontconfig libX11 libXext libXrender libjpeg libpng xorg-x11-fonts-75dpi xorg-x11-fonts-Type1

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

先查看当前的字符集

locale #查看环境字符集
locale -a #查看平台所有字符集

echo $LANG
en_US.UTF-8

安装中文字符集

 yum install glibc-common
 yum install -y langpacks-zh_CN

修改并配置 locale.conf文件

 vim /etc/locale.conf 
 LANG=zh_CN.utf8
 source /etc/locale.conf

查看修改后字符集

echo $LANG
zh_CN.UTF-8

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





import pdfkit
import os, sys
cur_file_dir = os.path.abspath(__file__).rsplit("\\", 1)[0]

# 你自己填入url
url = "https://www.yuque.com/kennethcry/qzv4ul/sc5zl1"

output_path = os.path.join(cur_file_dir, '1.pdf')
pdfkit.from_url(url, output_path)