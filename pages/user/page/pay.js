// pages/user/page/pay.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circleClass: [
      "circle1",
      "circle2",
      "circle3",
      "circle4",
      "circle5",
      "circle6",
      "circle7",
      "circle8",
      "circle9",
      "circle10"
    ],
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  basicCard:function(){
    var self = this
    wx.request({
      url: 'http://localhost:8080/MeiSI/User_AddCard',
      method: 'POST',
      data: {
        userId: self.data.userInfo.userId,
        select: "普通会员"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
       if(res.data=="OK"){
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
               title: '办理成功',
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
  },
  advancedCard: function () {
    var self = this
    wx.request({
      url: 'http://localhost:8080/MeiSI/User_AddCard',
      method: 'POST',
      data: {
        userId: self.data.userInfo.userId,
        select: "高级会员"
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
                title: '办理成功',
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
})