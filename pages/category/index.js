// pages/category/index.js
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.request({
      url:'https://csbd.ga/api/category/index.shtml',
      data:{
        'key': 'e309f6effa1a39fb462e985da98b84a517956118'
      },
      success:function(res){
        self.setData({ category: res.data})
      }
    })
  },
})