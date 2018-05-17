// pages/list/index.js
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.request({
      url:'https://csbd.ga/api/cook/index.shtml',
      data:{
        cid: options.id,
        key:'e309f6effa1a39fb462e985da98b84a517956118'
      },
      success: function (res) {
        self.setData({ list: res.data})
      }
    }),

    wx.setNavigationBarTitle({
      title: options.name //页面标题为路由参数
    })
  
  },
})