// pages/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    art: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var WxParse = require('../../wxParse/wxParse.js')
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.body) {
          var body = res.data.body;
          /**
            * WxParse.wxParse(bindName , type, data, target,imagePadding)
            * 1.bindName绑定的数据名(必填)
            * 2.type可以为html或者md(必填)
            * 3.data为传入的具体数据(必填)
            * 4.target为Page对象,一般为this(必填)
            * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
            */
          WxParse.wxParse('article', 'html', body, that, 5);
          body = body.match(/<p>.*?<\/p>/g);
          var ss = [];
          if (body) {
            for (var i = 0, len = body.length; i < len; i++) {
              ss[i] = /<img.*?>/.test(body[i]);
              if (ss[i]) {
                body[i] = body[i].match(/(http:|https:).*?\.(jpg|jpeg|gif|png)/);
              } else {
                body[i] = body[i].replace(/<p>/g, '')
                  .replace(/<\/p>/g, '')
                  .replace(/<strong>/g, '')
                  .replace(/<\/strong>/g, '')
                  .replace(/<a.*?\/a>/g, '')
                  .replace(/&nbsp;/g, ' ')
                  .replace(/&ldquo;/g, '"')
                  .replace(/&rdquo;/g, '"');
              }
            }
          }
          res.data.body = body
        }
        that.setData({
          art: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})