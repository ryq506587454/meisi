// pages/user/page/myCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardImg:"../image/card-top.png",
    userInfo:{},
    startTime:"",
    endTime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var self = this 
    this.setData({
      userInfo: app.globalData.userInfo
    })
    if (self.data.userInfo.card==null){
      wx.showToast({
        title: '您还没有办会员卡，请先办卡',
        icon: 'none',
        duration: 1500,
        success: function () {
          setTimeout(function () {
            wx.navigateTo({
              url: "../../user/page/pay"
            })
          }, 1500)
        }
      })
    }else{
      var starttime = self.data.userInfo.card.startTime.slice(0, 10)
      var endtime = self.data.userInfo.card.endTime.slice(0, 10)
      self.setData({
        startTime: starttime,
        endTime:endtime
      })
    }
  },
  onShow:function(){
    var self = this
    self.setData({
      userInfo: app.globalData.userInfo
    })
    var starttime = self.data.userInfo.card.startTime.slice(0, 10)
    var endtime = self.data.userInfo.card.endTime.slice(0, 10)
    self.setData({
      startTime: starttime,
      endTime: endtime
    })
  }
})