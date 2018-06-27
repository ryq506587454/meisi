// pages/user/page/payTimes.js
const app = getApp()
Page({
  data: {
   userInfo:{},
   restTimes:""
  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })

  },
  changeInput: function (e) {
    this.setData({
      restTimes: e.detail.value
    })
  },
  sure:function(){
    var self = this
    if (self.data.restTimes == "" || self.data.restTimes == null || self.data.restTimes.length>3){
      wx.showToast({
        title: '请输入正确数值',  
        icon:"none",
        duration: 1500
      })
    }else{
      wx.request({
        url: 'http://localhost:8080/MeiSI/User_AddRestimes',
        method: 'POST',
        data: {
          userId: self.data.userInfo.userId,
          resTimes: self.data.restTimes
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data == "OK") {
            wx.request({
              url: 'http://localhost:8080/MeiSI/User_meidalogin',
              method: 'POST',
              data: {
                userId: self.data.userInfo.userId,
                password: self.data.userInfo.password
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                app.globalData.userInfo = res.data
                wx.showToast({
                  title: '充次成功',
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
            })
           
          }
        }
      })
    }   
  }
})