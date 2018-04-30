// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoImg: "../../images/MeiSiLogo-short.png", 
    wechatImg: "../../images/WeChat.png",
    tel:null,
    password: null,
  },
  weixinLogin: function(){ 
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  console.log(res);
                  app.globalData.userInfo = res.userInfo
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                  wx.switchTab({
                    url: '../index/index'
                  })
                },
                fail: function (res) {
                  console.log(res);
                }
              })
            }
          })
        }
      }
    })    
  },
  userLogin:function(){
    wx.request({
      url: 'http://localhost:8080/MeiSI/User_meidalogin', 
      method: 'POST',
      data: {
        userId: this.data.tel,
        password: this.data.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {      
        app.globalData.userInfo = res.data
        console.log(app.globalData.userInfo)
        if (!app.globalData.userInfo){
          wx.showModal({
            title: '登录失败',
            content: '请检查您的账号密码是否比配',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }
            }
          })
        }else{
          wx.switchTab({
            url: '../index/index'
          })
        }
      }
    })
  },
  telInput:function(e){
    this.setData({
      tel:e.detail.value
    }) 
    console.log()
  },
  passwordInput:function(e){
    this.setData({
      password: e.detail.value
    })
    console.log()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }
})