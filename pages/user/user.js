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
      wx.redirectTo({
        url: '../login/login',
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