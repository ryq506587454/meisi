// pages/user/page/changeSex.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    array: ['男', '女'],
    sex:null
  
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sex:this.data.array[e.detail.value]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userInfo=app.globalData.userInfo
    this.setData({    
      sex:this.data.userInfo.sex
    })
  },
  onUnload:function(){
    if (this.data.sex!==this.data.userInfo.sex){
      var self = this
      wx.request({
        url: 'http://localhost:8080/MeiSI/User_mediaUpdataInfo',
        method: 'POST',
        data: {
          userId: self.data.userInfo.userId,
          sex: self.data.sex,
          flag: 3
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
})