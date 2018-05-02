// pages/course/page/appointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topImg:"../images/appt-top.png",
    time: [],
    timeone: [],
    index: 0,
    courseInfo:null,
    userInfo:{}
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (!app.globalData.userInfo) {
    //   wx.redirectTo({
    //     url: '../../login/login',
    //   })
    // } else {
    //   this.setData({
    //     userInfo:app.globalData.userInfo
    //   })
    // }
    console.log(options.courseId)
    var self = this;
    wx.request({
      url: 'http://localhost:8080/MeiSI/Course_meidaFindByID',
      method: 'POST',
      data: {
        courseId: options.courseId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        self.setData({
         courseInfo: res.data,
         timeone: res.data.startDate
        });
        for (var i in self.data.timeone) {
          self.data.timeone[i] = self.data.timeone[i].replace('T', ' ')
        }
        self.setData({
          time: self.data.timeone
        });
      }
    })    
  },
 appointmen:function(){
   wx.request({
     url: 'http://localhost:8080/MeiSI/Course_meidaAppt',
     method: 'POST',
     data: {
       courseId: options.courseId,
       userId: userInfo.userId
     },
     header: {
       'content-type': 'application/x-www-form-urlencoded'
     },
     success: function (res) {
       console.log(res.data)
     }
   })  
 }
})