// pages/user/page/myInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.setData({
      userInfo: app.globalData.userInfo
    });  
    setTimeout(function () {  
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  onShow:function(){
    this.data.userInfo = app.globalData.userInfo
  },
   toMyCard: function () {
    wx.navigateTo({
      url: 'myCard',
    })
  },
   toChangeSex() {
     wx.navigateTo({
       url: 'changeSex',
     })
   },
  toChangeTel: function () {
     wx.navigateTo({
       url: 'change?flag=联系电话',
     })
   },
  
  toChangeName(){
    wx.navigateTo({
      url: 'change?flag=会员姓名',
    })
  }
})