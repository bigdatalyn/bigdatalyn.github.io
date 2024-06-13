
### 安装package

https://www.spyder-ide.org/

pip install streamlit

### 参考资料

https://cloud.tencent.com/developer/article/2319407

https://github.com/oracle-devrel/langchain-oci-genai

### 启动
streamlit run hello_st.py

### 指定端口
streamlit run hello_st.py --server.port 1688

```
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon May 20 12:19:17 2024

@author: honglin
"""

import streamlit as st 
st.title('Hello,Streamlit!')
### streamlit run temp01.py
```

### st.write


st.markdown("# Markdown #")
st.markdown('''
:red[streamlit] :oragen[can] :green[write]
:gray[pretty]
''')

st.markdown("bouquet;\
      #:tulip::cherry_blossom::rose::hibiscus::sunflower:")


st.header("header ::::",divider='rainbow')
st.header('_Streamlist_ is :blue[cool] :sungloasses')





import streamlit as st
import random
import pandas as pd
import numpy as np

df = pd.DataFrame(np.random.randn(10, 10), columns=("col %d" % i for i in range(10)))
st.dataframe(df)  # Same as st.write(df)
st.dataframe(df.style.highlight_max(axis=0))

df = pd.DataFrame(
    {
        "name": ["Roadmap", "Extras", "Issues"],
        "url": ["https://roadmap.streamlit.app", "https://extras.streamlit.app", "https://issues.streamlit.app"],
        "stars": [random.randint(0, 1000) for _ in range(3)],
        "views_history": [[random.randint(0, 5000) for _ in range(30)] for _ in range(3)],
    }
)
st.dataframe(
    df,
    column_config={
        "name": "App name",
        "stars": st.column_config.NumberColumn(
            "Github Stars",
            help="Number of stars on GitHub",
            format="%d ⭐",
        ),
        "url": st.column_config.LinkColumn("App URL"),
        "views_history": st.column_config.LineChartColumn(
            "Views (past 30 days)", y_min=0, y_max=5000
        ),
    },
    hide_index=True
)


, use_container_width=True



st.table
df = pd.DataFrame(np.random.randn(5, 10), columns=("col %d" % i for i in range(10)))
st.dataframe(df)  # Same as st.write(df)

df = pd.DataFrame(np.random.randn(5, 10), columns=("col %d" % i for i in range(10)))
st.table(df)  # Same as st.write(df)

df



st.metric(label="溫度", value="30 °C", delta="1.2 °C")


col1, col2, col3 = st.columns(3)
col1.metric("溫度", "30 °C", "1.2 °C")
col2.metric("風力", "9 mph", "-8%")
col3.metric("濕度", "86%", "4%")



st.metric(label="金價", value=3580, delta=-250,
    delta_color="inverse")

st.metric(label="聯發科", value=1100, delta=80,
    delta_color="inverse")

st.metric(label="台積電", value=512, delta=0,
    delta_color="off")


data = {
    '姓名': '王小明',
    '年齡': 30,
    '地址': '台北市',
    '學歷': {
        '學士學位': '資訊科學',
        '碩士學位': '資訊管理',
    },
    '興趣': [
        '運動',
        '讀書',
        '旅遊',
    ],
}

st.json(data)


image = Image.open('girl.jpg')

st.image(image, caption='這是DALL-E 3，做出來的日式漫畫風美少女，可以參考龍龍DALL-E 3的教程')


### 图表

import streamlit as st
import pandas as pd
import numpy as np

#面積圖

chart_data = pd.DataFrame(np.random.randn(20, 3), columns=["a", "b", "c"])

st.area_chart(chart_data)

st.area_chart(
   chart_data, x="a", y=["b", "c"], color=["#FF0000", "#00FF00"]  # Optional
)

#長條圖
st.bar_chart(chart_data)


chart_data = pd.DataFrame(
   {"col1": list(range(20)), "col2": np.random.randn(20), "col3": np.random.randn(20)}
)

st.bar_chart(
   chart_data, x="col1", y=["col2", "col3"], color=["#00FF00", "#0000FF"]  # Optional
)


#折線圖
date_rng = pd.date_range(start='2023-01-01', end='2023-01-20', freq='D')
data = {
    "日期": date_rng,
    "A產品": np.random.randint(1000, 5000, len(date_rng)),
    "B產品": np.random.randint(1000, 5000, len(date_rng))
}

st.line_chart(data, x="日期", y=["A產品","B產品"])
st.line_chart(data, x="日期", y=["A產品","B產品"], color=["#FF0000", "#00FF00"])


#散點圖

chart_data = pd.DataFrame(np.random.randn(20, 3), columns=["a", "b", "c"])

st.scatter_chart(chart_data)

#加上size大小變化
chart_data = pd.DataFrame(np.random.randn(20, 3), columns=["col1", "col2", "col3"])
chart_data['col4'] = np.random.choice(['A','B','C'], 20)

st.scatter_chart(
    chart_data,
    x='col1',
    y='col2',
    color='col4',
    size='col3',
)

再舉一個例子
創建身高和體重的散點圖
students = ["學生A", "學生B", "學生C", "學生D", "學生E", "學生F", "學生G", "學生H", "學生I", "學生J",
            "學生K", "學生L", "學生M", "學生N", "學生O", "學生P", "學生Q", "學生R", "學生S", "學生T"]
heights = np.random.uniform(150, 190, len(students))  # 虛構身高數據，範圍在150到190之間
weights = np.random.uniform(45, 90, len(students))   # 虛構體重數據，範圍在45到90之間

df = pd.DataFrame({"學生姓名": students, "身高": heights, "體重": weights})


df = pd.DataFrame(df)
st.scatter_chart(df,
    x='體重',y='身高',color='學生姓名')




st.pyplot
Streamlit Version
v1.28.0
Display a matplotlib.pyplot figure.


import streamlit as st
import matplotlib.pyplot as plt
import numpy as np

arr = np.random.normal(1, 1, size=100)
fig, ax = plt.subplots()
ax.hist(arr, bins=20)

st.pyplot(fig)


arr = np.random.normal(1, 1, size=100)：這行代碼使用NumPy的random.normal函數生成一個包含100個隨機數的數組，這些數據是從均值為1、標準差為1的正態分佈中生成的。

fig, ax = plt.subplots()：這行代碼創建一個Matplotlib的圖形對象（fig）和軸對象（ax）。圖形對象代表整個圖表，而軸對象用於繪製具體的圖表元素。

ax.hist(arr, bins=20)：這行代碼使用軸對象（ax）繪製直方圖，arr是要繪製直方圖的數據，bins=20指定將數據劃分為20個柱子。

st.pyplot(fig)：最後，這行代碼使用Streamlit的st.pyplot函數將Matplotlib創建的圖表（fig）顯示在Streamlit應用中。


#地圖的說明
import streamlit as st
import pandas as pd
import numpy as np

df = pd.DataFrame(
    np.random.randn(1000, 2) / [50, 50] + [37.76, -122.4],
    columns=['lat', 'lon'])

st.map(df)



定義台北市各區域的邊界座標
taipei_boundaries = {
    "區域": ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"],
    "西經度": [121.506623, 121.511034, 121.527879, 121.566173, 121.552743, 121.500144, 121.578663, 121.521708, 121.667708, 121.588943, 121.618678, 121.570432],
    "東經度": [121.529235, 121.525196, 121.570859, 121.583734, 121.577419, 121.518360, 121.592992, 121.540610, 121.529424, 121.639907, 121.632538, 121.611367],
    "南緯度": [25.032883, 25.062731, 25.069360, 25.048741, 25.026515, 25.035154, 25.031934, 25.089020, 25.110381, 25.073524, 25.044769, 24.989247],
    "北緯度": [25.041144, 25.066231, 25.080802, 25.050934, 25.041457, 25.046256, 25.050930, 25.146468, 25.153252, 25.123361, 25.091840, 25.006014]
}

df_boundaries = pd.DataFrame(taipei_boundaries)

生成隨機數據，例如人口數
df_boundaries['人口數'] = np.random.randint(100, 1000, len(df_boundaries))

創建一個包含隨機顏色的數據列
df_boundaries['顏色'] = ['#{:02x}{:02x}{:02x}'.format(np.random.randint(0, 256), np.random.randint(0, 256), np.random.randint(0, 256)) for _ in range(len(df_boundaries))]

顯示地圖，將台北市各區域標記在地圖上，大小和顏色表示人口數
st.map(df_boundaries,
    latitude='南緯度',
    longitude='西經度',
    size='人口數',
    color='顏色'
)

st.map(df_boundaries,
    latitude='南緯度',
    longitude='西經度', size=100, color='#0044ff')