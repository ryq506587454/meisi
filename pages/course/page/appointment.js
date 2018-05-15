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
    courseInfo:{},
    userInfo:{},
    classNumber:null
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    var self = this
    wx.request({      
      url: 'http://localhost:8080/MeiSI/Course_FindClassNumber',
      method: 'POST',
      data: {
        courseName: self.data.courseInfo.courseName,
        courseDate: self.data.time[self.data.index]
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        self.setData({
          classNumber:res.data
        })
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.userInfo) {
      wx.showModal({
        title: '登陆通知',
        cancelText: '返回首页',
        content: '用户未登陆,请先登陆,否则无法继续',
        success:function(res){
          if (res.confirm) {
            wx.redirectTo({
              url: '../../login/login',
            })
          }else if (res.cancel) {
            wx.switchTab({
              url: '../../index/index',
            })
          }  
        }
      })    
    } else {
      this.setData({
        userInfo:app.globalData.userInfo
      })
    }
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
        wx.request({
          url: 'http://localhost:8080/MeiSI/Course_FindClassNumber',
          method: 'POST',
          data: {
            courseName: self.data.courseInfo.courseName,
            courseDate: self.data.time[self.data.index]
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(self.data.courseInfo.courseName)
            self.setData({
              classNumber: res.data
            })
          }
        })
      }
    })
         
  },
 appointmen:function(){
   var self = this
   wx.showModal({    
     title: '预约确定',
     content: '请检查您的约课信息是否正确，取消预约将不退还扣除分数',
     success: function (res) {
       if (res.confirm) {       
         wx.request({
           url: 'http://localhost:8080/MeiSI/Course_meidaAppt',
           method: 'POST',
           data: {
             courseId: self.data.courseInfo.courseId,
             userId: self.data.userInfo.userId,
             courseDate: self.data.time[self.data.index]
           },
           header: {
             'content-type': 'application/x-www-form-urlencoded'
           },
           success: function (res) {
             if(res.data === "OK"){
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
                   wx.showModal({
                     title: '预约提示',
                     content: '恭喜你，所选课程预约成功',
                     success: function (res) {
                       wx.switchTab({
                         url: "../course"
                       })
                     }
                   })
                 }
               })
             } else if (res.data === "TIMEERRO"){
               wx.showModal({
                 title: '预约失败',
                 content: '已有相同时间段的课程',
                 success: function (res) {
                   wx.switchTab({
                     url: "../course"
                   })
                 }
               })
             } else if (res.data === "TIMESERRO"){
               wx.showModal({
                 title: '预约失败',
                 content: '您的剩余次数不足，请充值',
                 success: function (res) {
                   wx.switchTab({
                     url: "../course"
                   })
                 }
               })
             } else if (res.data === "CLASSNUMBERERRO"){
               wx.showModal({
                 title: '预约失败',
                 content: '您预约的人数已满',
                 success: function (res) {
                   wx.switchTab({
                     url: "../course"
                   })
                 }
               })
             }           
           }
         }) 
         console.log('用户点击确定')
       } else {
         console.log('用户点击取消')
       }
     }
   })    
 }
})