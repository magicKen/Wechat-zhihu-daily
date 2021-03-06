# 支付日报微信小程序
小程序版知乎日报是仿照知乎日报app的简化版本，提供了最新/往期日报列表和详情的查看。
使用到的网络请求接口由[izzyleung](https://github.com/izzyleung)整理提供，项目地址：[ZhihuDailyPurify](https://github.com/izzyleung/ZhihuDailyPurify).

#### 声明
『知乎』是 知乎. Inc 的注册商标。本软件与其代码非由知乎创作或维护。软件中所包含的信息与内容皆违反版权与知乎用户协议。它是一个免费软件，使用它不收取您任何费用。其中的所有内容均可在知乎获取。

## 功能特性
* 日报列表
* 日报详情

## 功能详解
### 日报列表
日报列表上方以滑块视图容器展示了日报top内容，滑块视图容器下方为常规列表视图，控件样式使用官方提供的[weui](https://github.com/Tencent/weui-wxss)配置；日报列表支持下拉刷新和上拉加载更多，并以[年-月-日]为标题分隔不同日期数据。点击滑块内容或者列表项都可以跳转到日报详情页面
日报列表界面共调用两个接口，一个是获取最新日报，另一个是获取指定日期前一日的数据。获取最新日报接口在首次进入列表界面和下拉刷新时调用，获取前一日数据的接口在每次滑动到底部或者点击底部的加载更多文字时调用。

### 日报详情
日报详情展示当前日报的详细内容，包括顶部图片，作者信息，和文章主体内容。因为详情报文body为HTML 格式，小程序无法直接展示，故使用第三方工具[wxParse](https://github.com/icindy/wxParse)转换。

## 小程序和Android开发对比
小程序有自己的开发工具和开发语言。小程序的wxml可以理解为android中的界面布局xml，wxss可以理解为android中的样式配置style，js可以理解为主要的逻辑控制java代码。
小程序的页面也有自己的生命周期，可以理解为android中的activity和fragment。小程序中界面的数据绑定/更新开发起来相对android更简单、方便。


