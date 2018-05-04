//index.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperImgs: [
      'images/ceshi-gundong1.jpg',
      'images/ceshi-gundong2.jpg',
      'images/ceshi-gundong3.jpg'
    ],
    sugImgs:[
      'images/ceshi1.jpg',
      'images/ceshi2.jpg',
      'images/ceshi3.jpg',
      'images/ceshi4.jpg'
    ],
    adviceImgs:[
      'images/advice1.jpg',
      'images/advice2.jpg',
      'images/advice3.jpg'
    ],
    courseInfo:[]
  },
  toAllCourse:function(){
    wx.switchTab({
      url: '../course/course',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    wx.request({
     url: 'http://localhost:8080/MeiSI/Course_meidaAdvice',
       method: 'POST',
     data: {
      },
       header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        self.setData({
          courseInfo:res.data
        })            
       }
     })  
   }
})