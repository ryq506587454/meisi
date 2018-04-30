//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    welcomeImg:"../images/logo.png",
    logo:"MeiSi健身预约系统",
    motto:"爱生命，爱生活，从健身房开始！",
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(function () {
      wx.switchTab({
        url: 'index/index'
      })
    },2500
    )
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})