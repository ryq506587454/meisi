// pages/user/page/myCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardImg:"../image/card-top.png",
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }

 
  
  


})