// pages/login/page/regist.js
var interval = null //倒计时函数
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoImg: "../../../images/MeiSiLogo-short.png",
    tel:"",
    password: "",
    code: "",
    rightcode:"",
    time: '获取验证码',
    disabled:false,
    currentTime: 61
  },
  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
    console.log()
  },
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getVerificationCode(){
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)  
  },
  getCode:function(){
    var self = this
    if (this.data.tel.length != 11){
      wx.showToast({
        title: '获取验证码失败,请输入正确手机号',
        icon: 'none',
        duration: 2000
      })
    }else if (this.data.tel=="" || this.data.password==""){
      wx.showToast({
        title: '获取验证码失败,请输入正确注册信息',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        url: 'http://localhost:8080/MeiSI/User_GetCode',
        method: 'POST',
        data: {
          userId:self.data.tel
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
        console.log(res)
          if(res.data=="存在"){
            wx.showToast({
              title: '获取验证码失败,该手机号已被注册',
              icon: 'none',
              duration: 2000
            })
          }else{ 
            self.getVerificationCode();
            self.setData({
              disabled: true
            })          
            self.setData({
              rightcode: res.data
            })
            console.log(res.data)
          }        
        }
      })
    }
  },
  regist:function(){
    var self = this
    if (self.data.tel == "" || self.data.password == "") {
      wx.showToast({
        title: '注册失败,请输入正确注册信息',
        icon: 'none',
        duration: 2000
      })
    } else if (self.data.code == "" ){
      wx.showToast({
        title: '注册失败,请输入验证码',
        icon: 'none',
        duration: 2000
      })
    } else if (self.data.code != self.data.rightcode){
      wx.showToast({
        title: '注册失败,验证码错误',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        url: 'http://localhost:8080/MeiSI/User_Regist',
        method: 'POST',
        data: {
          userId: self.data.tel,
          password: self.data.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.request({
            url: 'http://localhost:8080/MeiSI/User_meidalogin',
            method: 'POST',
            data: {
              userId: self.data.tel,
              password: self.data.password
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              app.globalData.userInfo = res.data      
                wx.showToast({
                  title: '注册成功,请尽快完善个人信息',
                  icon: 'none',
                  duration: 1500,
                  success: function () {
                    setTimeout(function () {
                      wx.switchTab({
                        url: "../../user/user"
                      })
                    }, 1500)
                  }
                })
            },
            fail: function (err) {
              console.log(err);
            }
          })
        }
      })
    }
  }

})