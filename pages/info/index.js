// pages/info/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: wx.getSystemInfoSync().screenWidth - 70,
    y: wx.getSystemInfoSync().screenHeight - 170
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    wx.request({
      url: 'https://csbd.ga/api/info/index',
      data: {
        'id': options.id,
        'key': 'e309f6effa1a39fb462e985da98b84a517956118'
      },
      success: function (res) {
        var info = res.data.result.data[0];
        info.ingredients = info.ingredients.split(',');
        info.burden = info.burden.split(';');
        for (var i in info.burden)
        {
          info.burden[i] = info.burden[i].split(',');
        }
        self.setData({ info: info });

        wx.setNavigationBarTitle({
          title: res.data.result.data[0]['title'] //页面标题为路由参数
        })
        self.setData({ id: options.id, title: res.data.result.data[0]['title']})
      }
    })
  },

  tabBar: function (e) {
    var Url = e.currentTarget.dataset.url;
    wx.switchTab({
      url: Url,
    })
  },

  onShareAppMessage: function (res) {
    var self = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res);
    }
    return {
      title: '菜谱百科 - ' + self.data.title,
      path: '/page/info/index?id=' + self.data.id,
      success: function (res) {
        wx.showToast({
          title: '成功分享',
          image: '/images/font/showToast.svg',
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 收藏
  cart: function (e) {
    var car = JSON.parse(e.target.dataset.cart);
    var cart = wx.getStorageSync("cart");
    if (cart.length)
    {
      for(var i in cart)
      {        
        if(car['cid'] == cart[i]['cid']) return false;
      }
    } else {
      cart= [];
    }
    cart.push(car);
     //判断用户是否登录
    if (wx.getStorageSync("openid"))
    {
      //cart 上传信息
      wx.request({
        url: 'https://csbd.ga/api/cart/index.shtml',
        data:{
          cart: car,
          openid: wx.getStorageSync("openid")
        },
        success:res => {
        }
      })
    } else {
      wx.setStorageSync("cart", cart);
    }
    //弹出收藏成功提示信息
    wx.showToast({
      title: '收藏成功',
      image: '/images/font/showToast.svg',
      duration: 1000,
      mask:true
    })
  }
})