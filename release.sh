#! /bin/sh

if [[ -n $1 ]];then
git add --all 
git commit -m "release post"
git push origin
else
git add --all 
git commit -m "$1" 
git push origin
fi
