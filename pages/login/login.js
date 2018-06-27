// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoImg: "../../images/MeiSiLogo-short.png", 
    tel:"",
    password: "" 
  },
  userLogin:function(){
    var self = this
    if (self.data.password == "" || self.data.tel == ""){
      wx.showToast({
        title: '登陆失败,请正确输入登录信息',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        url:'http://localhost:8080/MeiSI/User_meidalogin',
        method: 'POST',
        data: {
          userId: this.data.tel,
          password: this.data.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          app.globalData.userInfo = res.data
          if (!app.globalData.userInfo) {
            wx.showToast({
              title: '登陆失败，请检查帐号密码是否正确',
              icon: 'none',
              duration: 2000            
            })
          } else {
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 1500,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    
                  })
                }, 1500)
              }
            })
          }
        },
        fail: function (err) {
          console.log(err);
        }
      })
    }    
  },
  telInput:function(e){
    this.setData({
      tel:e.detail.value
    }) 
  },
  passwordInput:function(e){
    this.setData({
      password: e.detail.value
    })
  },
  userRegist:function(){
    wx.navigateTo({
      url: 'page/regist',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }
})