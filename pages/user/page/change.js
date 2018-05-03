// pages/user/page/change.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:null,
    userInfo:{},
    changeInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      flag:options.flag,
      userInfo:app.globalData.userInfo 
    })
    switch (this.data.flag) {
      case "会员姓名":
        this.setData({
          changeInfo: this.data.userInfo.name       
        })
      break;
      case "联系电话":
        this.setData({
          changeInfo: this.data.userInfo.tel
        })      
      break;
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    switch (this.data.flag){
      case "会员姓名":
        if (this.data.userInfo.name !== this.data.changeInfo){
          var self = this
          wx.request({
            url: 'http://localhost:8080/MeiSI/User_mediaUpdataInfo',
            method: 'POST',
            data: {
              userId: self.data.userInfo.userId,
              name: self.data.changeInfo,
              flag: 1
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
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
                }
              })
            }
          })
        }
      break;
      case "联系电话":
        if (this.data.userInfo.tel !== this.data.changeInfo) {
          if(this.data.changeInfo.length===11){
            var self = this
            wx.request({
              url: 'http://localhost:8080/MeiSI/User_mediaUpdataInfo',
              method: 'POST',
              data: {
                userId: self.data.userInfo.userId,
                tel:parseInt(self.data.changeInfo),
                flag:2
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
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
                  }
                })
              }
            })
          }
        }
      break;
    }
  }, 
  changeInput:function(e) {
    this.setData({
      changeInfo: e.detail.value
    })
  },
})