// pages/dailylist/dailylist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    duration: 1500,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    loading: false,
    plain: false,
    circular: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.firstLoad()
  },

  bindViewTap(e) {
    wx.navigateTo({
      url: '../dailydetail/dailydetail?id=' + e.target.dataset.id
    })
  },

  loadMore() {
    if (this.data.list.length === 0) return
    var date = this.getNextDate()
    var that = this
    var utils = require('../../utils/util.js')
    that.setData({ loading: true })
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
      success(res) {
        that.setData({
          loading: false,
          list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
        })
      }
    })
  },

  getNextDate() {
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },

  firstLoad: function(){
    console.log("---------firstLoad----------")
    wx.showNavigationBarLoading()
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success: function (res) {
        console.log(res.data.top_stories)
        that.setData({
          list: res.data.stories,
          banner: res.data.top_stories,
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
    this.index = 1
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    this.firstLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})