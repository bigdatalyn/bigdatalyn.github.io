---
layout: post
title: "Markdown Tips"
category: Markdown
tags: Markdown Tips 
---

* content
{:toc}

Markdown Tips




#### Markdown 参考
- 在线编辑
- 各种语法 Tips
- 支持wx公众号/知乎/掘金号

[Markdown Nice](https://mdnice.com/)

- <span style="color:orangered;font-weight:bold;">橙心：</span>[终于等到你，公众号排版神器](https://mp.weixin.qq.com/s/raFgkqlV5hZmrXiEWVAyfQ)

#### 字体


    **这是加粗的文字**
    *这是倾斜的文字*`
    ***这是斜体加粗的文字***
    ~~这是加删除线的文字~~

**这是加粗的文字**
*这是倾斜的文字*`
***这是斜体加粗的文字***
~~这是加删除线的文字~~



#### 引用

    >引用的内容
    >>引用的内容
    >>>>引用的内容

>引用的内容
>>引用的内容
>>>>引用的内容


#### 分割线

三个或者三个以上的 - 或者 * 都可以

    ---
    ----
    ***
    *****

---
----
***
*****


#### 图片

    ![图片alt](图片地址 ''图片title'')

    图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
    图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加

例:

![Earth](http://img.baidu.com/img/iknow/r/image/2013-09-04/aec309f0d44c40eb20d9be65b7b97fd9.jpg "地球")

图床选择

- 对象存储里七牛云和又拍云需要备案域名，需要域名和服务器的开销。
- 腾讯云和阿里云收费项繁多。
- 第三方图床不稳定。
- 云盘图床、社交网站图床、云笔记图床等可能被限制。
- 代码托管网站本身比较稳定安全，可以用来存放少量图片。

推荐使用

- 利用码云仓库作为图床(github国内访问速度不是很快)
- 备用：sm.ms图床 / github / 百度网盘


#### 超链接

    [超链接名](超链接地址 "超链接title")     title可加可不加
    [百度](http://baidu.com)


[百度](http://baidu.com)


#### 列表

无序列表

语法：无序列表用 - + * 任何一种都可以

    - 列表内容
    + 列表内容
    * 列表内容

    注意：- + * 跟内容之间都要有一个空格


- 列表内容
+ 列表内容
* 列表内容

注意：- + * 跟内容之间都要有一个空格

有序列表

语法：数字加点


    1. 列表内容
    2. 列表内容
    3. 列表内容

    注意：序号跟内容之间要有空格


1. 列表内容
2. 列表内容
3. 列表内容

注意：序号跟内容之间要有空格


列表嵌套
上一级和下一级之间敲三个空格即可


#### 表格

表格语法：

    表头|表头|表头
    ---|:--:|---:
    内容|内容|内容
    内容|内容|内容

    第二行分割表头和内容。
    - 有一个就行，为了对齐，多加了几个
    文字默认居左
    -两边加：表示文字居中
    -右边加：表示文字居右
    注：原生的语法两边都要用 | 包起来。此处省略


表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容
内容|内容|内容


#### 代码

语法：单行代码：代码之间分别用一个反引号包起来

    `代码内容`

代码块：代码之间分别用三个反引号包起来，且两边的反引号单独占一行

单行代码

    `print hell world!`


`print hell world!`

代码块

    ```
    function main(){
    echo "Hello world!"
    }
    main();
    ```

```
function main(){
  echo "Hello world!"
}
main();
```

#### 流程图

```flow
st=>start: 开始
op=>operation: My Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
&```


***



Have a good work&life! 2020/04 via LinHong


