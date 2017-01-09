#!/bin/bash

#pid=`ps aux |grep jekyll|grep -v grep |awk '{print $2}' | xargs kill -9`
pid=`ps aux |grep jekyll|grep -v grep |awk '{print $2}'`
#echo $pid
if [[ -n "$pid" ]];then
#echo $pid
kill -9 $pid
fi

cd /home/linhong/Blog/NewBlog/bigdatalyn.github.io
#jekyll serve --watch &
jekyll serve  &
