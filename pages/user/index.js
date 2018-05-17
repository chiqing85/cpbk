//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '点击头像登录 更多精彩',
    hasUserInfo: false,
  },
  onShow() {
    if (wx.getStorageSync("openid"))
    {
      var self = this;
      wx.request({
        url: 'https://csbd.ga/api/cart/getcart',
        data: {
          openid: wx.getStorageSync("openid")
        },
        success:res => {
          self.setData({ car: res.data})
        }
      })
    }
  },
  onLoad: function () {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  //删除收藏
  chstart:function(e)
  {
    var id = e.target.dataset.id;
    var cart = this.data.car;
    for(var i in cart)
    {
      if (cart[i]['cid'] == id) cart.splice(i,1);
    }
    this.setData({
      car: cart
    });
    if (!cart.length) {
      this.setData({
        car: false
      });
    }
    wx.request({
      url: 'https://csbd.ga/api/cart/del',
      data: {
        cid: id,
        openid: wx.getStorageSync("openid")
      },
      success: res => {
      }
    })
  },
  //登录
  userinfo:function(e){
    var sefl = this;
    wx.checkSession({
      success: res => {
        sefl.getUserInfo();
      },
      fail: res => {
        wx.login({
          success: res => {
            wx.request({
              url: 'https://csbd.ga/api/login/index.shtml',
              data: {
                code: res.code,
                key: 'e309f6effa1a39fb462e985da98b84a517956118'
              },
              success: function (res) {
                wx.setStorageSync('openid', res.data['openid'])
                sefl.getUserInfo();
              },
            })
          }
        })
      }
    })
  },

  getUserInfo:function() {
    var self = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              //查看是否注册，如若没有注册，自动注册
              wx.request({
                url: 'https://csbd.ga/api/user/index.shtml',
                data:{
                  info: res.userInfo,
                  openid: wx.getStorageSync('openid')
                },
                success: res => {
                }
              })
              return false;

              app.globalData.userInfo = res.userInfo
              self.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              });
              //更新收藏
              if (wx.getStorageSync("cart")) {
                wx.request({
                  url: 'https://csbd.ga/api/cart/index.shtml',
                  data: {
                    cart: wx.getStorageSync("cart"),
                    openid: wx.getStorageSync("openid")
                  },
                  success: res => {}
                })
              };
              //获取收藏
              wx.request({
                url: 'https://csbd.ga/api/cart/getcart.shtml',
                data: {
                  openid: wx.getStorageSync("openid")
                },
                success: res => {
                  self.setData({ car: res.data })
                }
              })
            }
          })
          wx.showToast({
            title: '登录成功',
            image: '/images/font/showToast.svg'
          })
        }
      },
    });
  },
  //查看本地启动日志
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
})