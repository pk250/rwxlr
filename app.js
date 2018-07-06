//app.js
App({
  globalData: {
      userInfo: null,
      isLogin: false,
      url:'http://127.0.0.1:8000/'
  },
  onLaunch: function () {
    // 展示本地存储能力
    var that=this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
      wx.setStorage({
            key: 'url',
            data: that.globalData.url,
      })
    // 登录
    wx.getStorage({
          key: 'uid',
          success: function(res) {
                  wx.request({
                        url: that.globalData.url+'getUserInfo',
                        data:{
                              uid:res.data
                        },
                        method:'POST',
                        success:res=>{
                              if(res.data=='error'){
                                    wx.setStorage({
                                          key: 'isLogin',
                                          data: false,
                                    })
                                    that.getInfo();
                              }else{
                                    wx.setStorage({
                                          key: 'isLogin',
                                          data: true,
                                          key:'userInfo',
                                          data:res.data[0],
                                    })
                                    
                              }
                        },
                        fail:res=>{
                              
                        }
                  })
          },
          fail:function(res){
                wx.login({
                      success: res => {
                            if (res.code) {
                                  wx.request({
                                        url: that.globalData.url+'login',
                                        data: {
                                              code: res.code
                                        },
                                        success: function (res) {
                                              console.log(res.data)
                                              wx.setStorage({
                                                    key: 'uid',
                                                    data: res.data,
                                              })
                                        }

                                  })
                            }
                      },
                      fail: res => {
                            console.log('登陆失败' + res.errMsg)
                      }
                })
          },
    })
    
  },
  getInfo:function(rs){
        // 获取用户信息
        wx.getSetting({
              success: res => {
                    if (res.authSetting['scope.userInfo']) {
                          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                          wx.getUserInfo({
                                success: res => {
                                      // 可以将 res 发送给后台解码出 unionId
                                      this.globalData.userInfo = res.userInfo
                                      console.log(this.globalData.userInfo,'hdhs')
                                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                      // 所以此处加入 callback 以防止这种情况
                                      if (this.userInfoReadyCallback) {
                                            this.userInfoReadyCallback(res)
                                            wx.request({
                                                  url: this.globalData.url+'insertInfo',
                                                  data:{
                                                        userInfo: this.globalData.userInfo
                                                  },
                                                  method:'POST',
                                                  success:res=>{

                                                  }
                                            })
                                      }
                                }
                          })
                    }
              },
              fail: function (res) {
                    console.log("授权失败")
              }
        })
  }
})