// pages/user/page/myCourse.js.
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  onShow: function () {
   
  },
  quiteAppt:function(e){
    var self = this
    wx.showModal({
      title: '退订提示',
      content: '确认退订吗？',
      success: function (res) {
        if (res.confirm) {  
        wx.request({
          url: 'http://localhost:8080/MeiSI/User_mediaQuiteAppt',
          method: 'POST',
          data: {
            userId: self.data.userInfo.userId,
            appId: e.currentTarget.dataset.apptid,
            courseName: e.currentTarget.dataset.coursename
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            wx.showModal({
              title: '退订提示',
              content: '所选课程退订成功',
              showCancel:false,
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
                    wx.switchTab({
                      url: '../user',
                    })
                  }
                })
              }
            })
          }
        })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }          
      }
    })       
  }
})