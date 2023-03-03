
# [Pycharm](https://www.jetbrains.com/pycharm/)
# 
# [Download](https://www.jetbrains.com/pycharm/download/download-thanks.html)
# 
# Pip for tsinghua setting:
# ```
# File->Settings->project interperter
# https://pypi.tuna.tsinghua.edu.cn/simple/
# ```



# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.


def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press ⌘F8 to toggle the breakpoint.


def print_test_type():
    name = '1111'
    print(type(name))
    age = 18
    print(type(age))


def print_type_convert_test():
    # 数字类型转换整数
    aaa = 18
    num_str = str(aaa)
    print(type(num_str), num_str)
    # 字符串转整数
    num = int("23")
    print(type(num), num)
    # 字符串转浮点数
    numb = float("11.22")
    print(type(numb), numb)
    # 整数转浮点数
    num2 = float(45)
    print(type(num2), num2)
    # 浮点数转整数
    num3 = int(45.67)
    print(type(num3), num3)


def print_test_math():
    # 加法+
    print('1+1=', 1 + 1)
    # 减法-
    print('2-1=', 2 - 1)
    # 乘法*
    print('2*1=', 2 * 1)
    # 除法*
    print('2/1=', 2 / 1)
    # 取整
    print('8//3=', 8 // 3)
    # 取余
    print('9%4=', 9 % 4)


def print_input():
    name = input("Input your name: ")
    print("Your name is ", name)


def test_boolen():
    bool_1 = True
    bool_2 = False
    print("bool_1内容是：", bool_1, "类型是：", {type(bool_1)})
    print("bool_1内容是：", bool_2, "类型是：", {type(bool_2)})
    a = 10
    b = 12
    print("a:", a)
    print("b:", b)
    print("a等于b：", a == b)
    print("a不等于b：", a != b)
    print("a大于b：", a > b)
    print("a小于b：", a < b)
    print("a小于等于b：", a <= b)
    print("a大于等于b：", a >= b)


def test_if():
    print("Hello")
    age = int(input("Input your age: "))
    if age < 18:
        print("Hello, little friend, welcome back.")
    elif age > 60:
        print("Hello, old friend, welcome back.")
    else:
        print("Hello, welcome back.")


def test_while():
    suma = 0
    i = 0
    str_sum = ""
    while i <= 10:
        suma += i
        if i == 0:
            temp = str("0")
        else:
            temp = "+" + str(i)
        i += 1
        str_sum = str_sum + temp
    print("sum:0-10=", str_sum, suma)

    op = "HelloWorld"
    for a in op:
        print(a)

    text_str = "Hello world! Welcome to Python World!"
    count = 0
    for x in text_str:
        if x == "o":
            count += 1
    print("The number of 'o' is ", count)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')
    # print_test_type()
    # print_type_convert_test()
    # print_test_math()
    # print_input()
    # test_boolen()
    # test_if()
    test_while()


### 交互式

% pip install matplotlib

>>> import matplotlib.pyplot as p
Matplotlib is building the font cache; this may take a moment.
>>> p.plot([1,2,4,8]);p.show()
[<matplotlib.lines.Line2D object at 0x10ea03e80>]
>>> 

### 计算相关的运算


>>> 5*3
15
>>> 5/3
1.6666666666666667
>>> 

运算优先：都是括号去限制和定义范围
括号是半角字符
注意：半角和全角的问题

Python3:
>>> 7/2
3.5
>>> 
Python2:
>>> 7/2
3
>>> 

避免python2/python3的除法问题


整除//
小于真实结果的最大整数
>>> 7//2
3
>>> -7//2
-4
>>> 

剩方/幂运算
>>> 2**3
8
>>> 2**(1/2)
1.4142135623730951
>>> 

求余数(模运算)
>>> 7%2
1
>>> 

### 多行

多行用 反斜线 \
尽量不使用

>>> 4/3*3.14 + 5**2\
... +2324/12+111
333.85333333333335
>>> 

### 模块

math: 
    abs()   取绝对值
    sin()   求正xuan函数
    log()   求对数

random:
    randint()   生成随机函数
    randrange() 生成指定范围随机数

zipfile
    testzip()   测试zip压缩文件
    exract()    解压zip文件

OS
    rename()    给文件改名
    remove()    删除文件
    mkdir()     新建文件夹



>>> import math
>>> math.sin(3)
0.1411200080598672
>>> 


__builtins__ 内置模块
print()
不需要import
其他内置函数
取最大值/最小值
max(3,8,2,7,4)
min(3,8,2,7,4)

import winsound
winsound.Beep(1000,500)
winsound.Beep(1500,1000)
1000Hz/500ms

python 库
第三方 库

>>> import random
>>> print(random.randint(10,20))
20
>>> print(random.randint(10,20))
13
>>>


### 转换

int(x)

print(math.log(0.5*65*3**2*(1+0.13)))

winsound.Beep(int(math.log(0.5*65*3**2*(1+0.13))), 1000)

>>> print(math.log(0.5*65*3**2*(1+0.13)))
5.80068229939616
>>> 

### 变量

x = math.log(0.5*65*3**2*(1+0.13))
print(x)
winsound.Beep(int(x), 1000)

注意:
1.名字规则
有意义，长一点的变量
特殊字符不行:空格
字母数字下划线组合，首字母不能是数字
2.有些单词不行
pass:特殊关键词
保留字:and del from not while print 等
避免一下麻烦:
>>> print=3
>>> print(3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'int' object is not callable
>>> 

print_ 
单词后面加下划线(前面加也可以，但大部分认同是后面加)
__print__   (前后两个下划线): python 内部使用的特殊变量

3.小写字母多个单词加下划线
python是大小写敏感

赋值语句:
右边赋予计算结果给左边变量

### 字符串

半角单引号或者双引号

>>> print('字符串')
字符串
>>> name='张三'
>>> print(name)
张三
>>> 

python2: raw_python()
input会猜测数字int和float，一般用raw_input


### 播放音频文件

调用WinAPI系统接口

第三方库:
- pygame
- pyaudio

OS模块，请求OS打开文件并播放
- 默认播放器

import os
system()

os.system('start d:/...mp3')
os.system('open /User/...mp3')


os.system('open /Users/honglin/Desktop/WechatIMG3753.jpeg')