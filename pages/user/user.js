// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechatImg: "../../images/WeChat.png",
    userInfo:{}   
  },
  /**
   * 自定义函数
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    if (!app.globalData.userInfo) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }  
  },

  toMyCourse:function(){
    wx.navigateTo({
      url: 'page/myCourse',
    })
  }
  
})