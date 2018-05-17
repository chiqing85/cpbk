// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:'',
    searchlist: []
  },
  inputsearch:function(e)
  {
    this.setData({ search: e.detail.value})
  },
  formSubmit: function (e) {
    var self = this;
    if (self.data.search == undefined) return false;
    wx.request({
      url: 'https://csbd.ga/api/query/index.shtml',
      data:{
        name: self.data.search,
        key:'e309f6effa1a39fb462e985da98b84a517956118'
      },
      dataType: 'json',
      success: function (res) {
        if (res.data.resultcode == '204') {
          self.setData({search : false})
        } else {
          wx.setStorageSync("sear", res.data);
          wx.navigateTo({
            url: '../searchinfo/index?name=' + self.data.search
          })
        }
      }
    })

    if (this.data.search !== '')
    {
      var search = wx.getStorageSync('searchlist');

      if (search.length > 6) {
        search.shift ();
        wx.setStorage({
          key: "searchlist",
          data: search,
        })
      }
       if (search.length > 0)
      {
        for (var i in search)
        {
          if (this.data.search == search[i].name) return false;
        }
      } else {
        search = [];
      }

      search.push({
        id: search.length,
        name: this.data.search
      });
      wx.setStorageSync("searchlist", search);
    }
  },

  //点击搜索
  wxSearchKeyTap:function(e)
  {
    var key = e.target.dataset.key;
    this.setData({ search: key.name })
    this.formSubmit();
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if (wx.getStorageSync('searchlist'))
    {
      var searchlist = wx.getStorageSync('searchlist');
      this.setData({ searchHistory: searchlist.reverse() });
    }

    //热门搜索词
    var hot = [{id:1, name:'红烧肉'},{id:2,name:'糖醋排骨'}, {id:3, name:'红酒'}];
    this.setData({hot: hot});
  },

  //删除搜索历史
  del:function(e)
  {
    wx.clearStorageSync('searchlist')
    this.setData({
      searchHistory: false
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {   
      this.setData({ searchHistory: wx.getStorageSync("searchlist") })
  },
})