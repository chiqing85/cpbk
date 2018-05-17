// pages/searchinfo/index.js
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ list: wx.getStorageSync('sear') });
    wx.setNavigationBarTitle({
      title: options.name //页面标题为路由参数
    })
  },
})