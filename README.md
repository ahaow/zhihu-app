## 知乎日报 

### 所用到的技术

- react + react-router
- react-transition-group
- axios
- swiper
- antd-mobile

### api接口地址


[知乎日报api](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90 "知乎日报api")


### 功能部分


1. 最新消息
2. 消息内容详情
3. 过往消息 -------- 功能为 滚动到底部 加载过往消息  与 知乎日报App中有些不一样
4. 新闻额外消息 -- 点赞数及评论数
5. 长评、短评查看
6. 热门消息
7. 栏目总览  ---- 知乎日报App现没有这些东西，自己简单设计做了个页面
8. 栏目具体消息查看

### 效果

![](https://i.imgur.com/I4eZ2Eq.gif)

![](https://i.imgur.com/1Ii17ob.gif)

![](https://i.imgur.com/bbd03RA.gif)


### axios拦截器

场景： 在所有的ajax请求时都出现loading图标，为图简单方便，使用了`antd-mobile` 中的 `Toast`

```js

import axios from 'axios';
import { Toast } from 'antd-mobile';

// 拦截请求
axios.interceptors.request.use(function(config) {
    Toast.loading('加载中',0)
    return config;
})

// 拦截相应
axios.interceptors.response.use(function(config){
	Toast.hide()
	return config
})


```


### 问题

#### 1、知乎日报中，查看新闻详情，返回了一段 CSS链接，打开是css文件代码；

解决办法：js 控制加载|移除 script 与 link 文件



### 启动

`npm install`


`npm start`