


Java SE Development Kit 16 Downloads
https://www.oracle.com/java/technologies/javase-jdk16-downloads.html

SQL Developer 21.2 Downloads
Version 21.2.0.187.1842 - July 14, 2021

https://www.oracle.com/tools/downloads/sqldev-downloads.html

List your Java Versions
/usr/libexec/java_home -V

Remove the Applet Plugin
sudo rm -rf "/Library/Internet Plug-Ins/JavaAppletPlugin.plugin/"




honglin@honglin-mac ~ % /usr/libexec/java_home -V
Matching Java Virtual Machines (1):
    16.0.1 (x86_64) "Oracle Corporation" - "Java SE 16.0.1" /Library/Java/JavaVirtualMachines/jdk-16.0.1.jdk/Contents/Home
/Library/Java/JavaVirtualMachines/jdk-16.0.1.jdk/Contents/Home
honglin@honglin-mac ~ %
honglin@honglin-mac ~ % /usr/libexec/java_home -F -v
java_home: option requires an argument -- v
/Library/Java/JavaVirtualMachines/jdk-16.0.1.jdk/Contents/Home
honglin@honglin-mac ~ % /usr/libexec/java_home -F -v 16.0.1
/Library/Java/JavaVirtualMachines/jdk-16.0.1.jdk/Contents/Home
honglin@honglin-mac ~ %

honglin@honglin-mac ~ % cd /Applications/SQLDeveloper.app/Contents/MacOS/
honglin@honglin-mac MacOS % cp sqldeveloper.sh sqldeveloper.sh.init
honglin@honglin-mac MacOS % vi sqldeveloper.sh
honglin@honglin-mac MacOS %

