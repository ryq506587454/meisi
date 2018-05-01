// pages/course/page/courseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circleClass:[
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
    courseItems:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.courseType)
    var self = this;
    wx.request({
      url: 'http://localhost:8080/MeiSI/Course_meidaFindByType',
      method: 'POST',
      data: {
        courseType: options.courseType,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)       
        self.setData({
          courseItems:res.data
        });
      }
    })    
  }
})