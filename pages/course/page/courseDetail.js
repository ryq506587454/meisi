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
    index: 0,
    courseItems:[],
    courseType:"",
    coachName:[],
    date: "全部日期"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    self.setData({
      courseType: options.courseType
    })
    wx.request({
      url: 'http://localhost:8080/MeiSI/Course_meidaFindByType',
      method: 'POST',
      data: {
        courseType: self.data.courseType
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {   
        self.setData({
          courseItems:res.data         
        });          
        wx.request({
          url: 'http://localhost:8080/MeiSI/User_FindCoachByType',
          method: 'POST',
          data: {          
            courseType: self.data.courseType
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },         
          success: function (res) {
            var coachList = ['全部教练']          
            for (var i of res.data.list) {
              coachList.push(i.coachName)
            }
            self.setData({
             coachName: coachList
            })
          }
        })
      }
    })    
  },
  bindPickerChange: function (e) {
    var self = this
    this.setData({
      index: e.detail.value
    })
    if (self.data.index == 0 && self.data.date == "全部日期"){
      wx.request({
        url: 'http://localhost:8080/MeiSI/Course_meidaFindByType',
        method: 'POST',
        data: {
          courseType: self.data.courseType
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          self.setData({
            courseItems: res.data
          });        
        }
      }) 
    } else if (self.data.index != 0 && self.data.date == "全部日期"){
      wx.request({
        url: 'http://localhost:8080/MeiSI/Course_meidaFindByCoach',
        method: 'POST',
        data: {
          coachName: self.data.coachName[self.data.index],
          courseType: self.data.courseType
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          self.setData({
            courseItems: res.data
          });
        }
      }) 
    } else if (self.data.index == 0 && self.data.date != "全部日期"){
      wx.request({
        url: 'http://localhost:8080/MeiSI/Course_meidaFindByDate',
        method: 'POST',
        data: {
          courseDate: self.data.date,
          courseType: self.data.courseType
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          self.setData({
            courseItems: res.data
          });
        }
      })
    }else{
      wx.request({
        url: 'http://localhost:8080/MeiSI/Course_meidaFindByDateAndCoach',
        method: 'POST',
        data: {
          courseDate: self.data.date,
          courseType: self.data.courseType,
          coachName: self.data.coachName[self.data.index]
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          self.setData({
            courseItems: res.data
          });
        }
      })
    }  
  },
  bindDateChange: function (e) {
    var self = this
    this.setData({
      date: e.detail.value
    })
    if (self.data.index==0){
      wx.request({
        url: 'http://localhost:8080/MeiSI/Course_meidaFindByDate',
        method: 'POST',
        data: {
          courseDate: self.data.date, 
          courseType: self.data.courseType       
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          self.setData({
            courseItems: res.data
          });
        }
      }) 
    }else{
      wx.request({
        url: 'http://localhost:8080/MeiSI/Course_meidaFindByDateAndCoach',
        method: 'POST',
        data: {
          courseDate: self.data.date,
          courseType: self.data.courseType,
          coachName: self.data.coachName[self.data.index]
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          self.setData({
            courseItems: res.data
          });
        }
      })
    }
  },
  AllCourse:function(){
    var self = this
    self.setData({
      index: 0,
      date: "全部日期"
    }),
      wx.request({
        url: 'http://localhost:8080/MeiSI/Course_meidaFindByType',
        method: 'POST',
        data: {
          courseType: self.data.courseType
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          self.setData({
            courseItems: res.data
          });
          wx.request({
            url: 'http://localhost:8080/MeiSI/User_FindCoachByType',
            method: 'POST',
            data: {
              courseType: self.data.courseType
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              var coachList = ['全部教练']
              for (var i of res.data.list) {
                coachList.push(i.coachName)
              }
              self.setData({
                coachName: coachList
              })
            }
          })
        }
      }) 

  }
})