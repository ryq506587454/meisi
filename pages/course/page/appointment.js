// pages/course/page/appointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseInfo:{},
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
         courseInfo: res.data
        });
      }
    })    
  },
  /**
* 生命周期函数--监听页面初次渲染完成
*/
  onReady: function () {
    // if (!app.globalData.userInfo) {
    //   wx.redirectTo({
    //     url: '../../login/login',
    //   })
    // } else {
    //   this.setData({
    //     userInfo:app.globalData.userInfo
    //   })
    // }
   
  },
})