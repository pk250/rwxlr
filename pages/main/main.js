// pages/main/main.js
const MENU_WIDTH_SCALE = 0.82;
const FAST_SPEED_SECOND = 300;
const FAST_SPEED_DISTANCE = 5;
const FAST_SPEED_EFF_Y = 50;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        ui: {
              windowWidth: 0,
              menuWidth: 0,
              offsetLeft: 0,
              tStart: true,
              windowHeight:0
        },
        url:'',
        inputValue:"",
        userInfo: '',
        scrollTop:1,
        numberArray: [1, 2, 3, 4]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        try {
              let res = wx.getSystemInfoSync()
              this.windowWidth = res.windowWidth;
              this.data.ui.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
              this.data.ui.offsetLeft = 0;
              this.data.ui.windowWidth = res.windowWidth;
              this.data.ui.windowHeight = res.windowHeight;
              this.setData({ ui: this.data.ui })
              this.data.url = app.globalData.url;
              this.init();
              wx.setStorage({
                    key: 'windowHeight',
                    data: res.windowHeight,
              })           
        } catch (e) {
        }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (res) {
        wx.getSetting({
              success: res => {
                        if (!res.authSetting['scope.userInfo'])                        {
                              wx.showModal({
                                    title: '请求授权',
                                    content: '由于本应用需要获得用户授权才能为用户提供服务，请点击确定后授权',
                                    success:res=>{
                                          if(res.confirm){
                                                wx.redirectTo({
                                          url: '../auth/auth',
                                                })
                                          }
                                    }
                              }) 
                        }
                  }
            })
      },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
        console.log("onPullDownRefresh")
        wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
        numberArray:[1,2,3,4,5,6,7,8]
        console.log("onReachBottom")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  handlerStart(e) {
        let { clientX, clientY } = e.touches[0];
        this.tapStartX = clientX;
        this.tapStartY = clientY;
        this.tapStartTime = e.timeStamp;
        this.startX = clientX;
        this.data.ui.tStart = true;
        this.setData({ ui: this.data.ui })
  },
  handlerMove(e) {
        let { clientX } = e.touches[0];
        let { ui } = this.data;
        let offsetX = this.startX - clientX;
        this.startX = clientX;
        ui.offsetLeft -= offsetX;
        if (ui.offsetLeft <= 0) {
              ui.offsetLeft = 0;
        } else if (ui.offsetLeft >= ui.menuWidth) {
              ui.offsetLeft = ui.menuWidth;
        }
        this.setData({ ui: ui })
  },
  handlerCancel(e) {
        // console.log(e);
  },
  handlerScroll(e){

  },
  handlerEnd(e) {
        this.data.ui.tStart = false;
        this.setData({ ui: this.data.ui })
        let { ui } = this.data;
        let { clientX, clientY } = e.changedTouches[0];
        let endTime = e.timeStamp;
        //快速滑动
        if (endTime - this.tapStartTime <= FAST_SPEED_SECOND) {
              //向左
              if (this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
                    ui.offsetLeft = 0;
              } else if (this.tapStartX - clientX < -FAST_SPEED_DISTANCE && Math.abs(this.tapStartY - clientY) < FAST_SPEED_EFF_Y) {
                    ui.offsetLeft = ui.menuWidth;
              } else {
                    if (ui.offsetLeft >= ui.menuWidth / 2) {
                          ui.offsetLeft = ui.menuWidth;
                    } else {
                          ui.offsetLeft = 0;
                    }
              }
        } else {
              if (ui.offsetLeft >= ui.menuWidth / 2) {
                    ui.offsetLeft = ui.menuWidth;
              } else {
                    ui.offsetLeft = 0;
              }
        }
        this.setData({ ui: ui })
  },
  handlerPageTap(e) {
        let { ui } = this.data;
        if (ui.offsetLeft != 0) {
              ui.offsetLeft = 0;
              this.setData({ ui: ui })
        }
  },
  handlerAvatarTap(e) {
        let { ui } = this.data;
        if (ui.offsetLeft == 0) {
              ui.offsetLeft = ui.menuWidth;
              this.setData({ ui: ui })
        }
  },
  search:function(e){
      this.setData({
            inputValue:e.detail.value
      })
      console.log(e.detail.value)
  },
  init:function(){
        var that=this
       wx.getStorage({
             key: 'userInfo',
             success: function(res) {
                   that.setData({
                         userInfo:res.data
                   })
             },
       })
  },
  onGoUp(){
        this.setData({
              scrollTop: 0
        })
  },
  scroll: function (e, res) {
        if (e.detail.scrollTop > 500) {
              this.setData({
                    floorstatus: true
              });
        } else {
              this.setData({
                    floorstatus: false
              });
        }
  },
  onGoRefresh(){
        wx.startPullDownRefresh({
              success:function(){
                    wx.stopPullDownRefresh()
                    console.log("onGoRefresh")
              }
        })
  },
  jianzi:function(e){
      console.log(e)
      wx.navigateTo({
            url: '../templates/template?id=1',
      })
  },
  ershou: function (e) {
        console.log(e)
        wx.navigateTo({
              url: '../templates/template?id=2',
        })
  },
  kuaidi: function (e) {
        console.log(e)
        wx.navigateTo({
              url: '../templates/template?id=3',
        })
  },
  liaotian: function (e) {
        console.log(e)
        wx.navigateTo({
              url: '../templates/template?id=4',
        })
  },
  maimai: function (e) {
        console.log(e)
        wx.navigateTo({
              url: '../templates/template?id=5',
        })
  },
  zixun: function (e) {
        console.log(e)
        wx.navigateTo({
              url: '../templates/template?id=6',
        })
  },
  gonggao: function (e) {
        console.log(e)
        wx.navigateTo({
              url: '../templates/template?id=7',
        })
  },
  kefu: function (e) {
        console.log(e)
        wx.navigateTo({
              url: '../templates/template?id=8',
        })
  },
  shiliuji: function (e) {
        console.log(e)
        wx.navigateTo({
              url: '../templates/template?id=9',
        })
  },
  gengduo: function (e) {
        console.log(e)
        wx.navigateTo({
              url: '../templates/template?id=10',
        })
  },
})