//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    motto: 'Hello wiexi',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    var now = new Date(), hour = now.getHours(), scene;
    if(hour < 11){
      scene = 37;
    } else if(hour < 14) {
      scene = 38;
    } else if(hour < 17) {
      scene = 39;
    } else if(hour < 19) {
      scene = 40;
    } else {
      scene = 41;
    }
    var self = this;
    //推荐
    wx.request({
      url:'https://csbd.ga/api/index.shtml',
      data: {
        'cid': scene,
        'key': 'e309f6effa1a39fb462e985da98b84a517956118'
      },
      dataType: 'json',
      success: function(res) {
        self.setData({ scene: res.data.result.data});
      },
    });
  },

  onShow() {
    var self = this;
    //轮播图
    wx.request({
      url: 'https://csbd.ga/api/imgUrls/index.shtml',
      data: {
        'key': 'e309f6effa1a39fb462e985da98b84a517956118'
      },
      dataType: 'json',
      success: function (res) {
        self.setData({ imgUrls: res.data })
      }
    })
  },

  swipclick:function(e)
  {
    var id = e.target.dataset.id;
    var url = '/pages/info/index?id=' + id;

    wx.redirectTo({
      url :url,
    })
  }
})