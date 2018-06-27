// pages/user/page/noticeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  notice:{},
  publishTime:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this
    wx.request({
      url: 'http://localhost:8080/MeiSI/Notice_FindByID',
      method: 'POST',
      data: {
        noticeId: options.noticeId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        self.setData({
          notice: res.data
        });
        var a = self.data.notice.publishTime.slice(0, 10);
        self.setData({
          publishTime:a
        })
      }
    })
  }
})