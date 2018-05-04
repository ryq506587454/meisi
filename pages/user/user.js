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
    
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    if (!app.globalData.userInfo) {
      wx.showModal({
        title: '登陆通知',
        cancelText:'返回首页',
        content: '用户未登陆,请先登陆,否则无法继续',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../login/login',
            })
          } else if (res.cancel) {         
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })         
    } else {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }  
  },
  toMyInfo:function(){
    wx.navigateTo({
      url: 'page/myInfo',
    })
  },
  toMyCourse:function(){
    wx.navigateTo({
      url: 'page/myCourse',
    })
  },
  toNotic:function(){
    wx.navigateTo({
      url: 'page/notic',
    })
  },
  toAboutUs:function(){
    wx.navigateTo({
      url: 'page/aboutUs',
    })
  },
  quite: function () {
    app.globalData.userInfo=null
    wx.showModal({
      title: '提示',
      content: '注销成功',
      success:function(){
        wx.redirectTo({
          url: '../login/login',
        })
      }
    })
  }

  
})