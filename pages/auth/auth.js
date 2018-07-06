const app=getApp();
// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 用户授权方法
   */
  getUserInfo:function(Info){
      wx.setStorage({
            key: 'userInfo',
            data: Info.detail.userInfo,
            success:res=>{
                  console.log('授权了', Info.detail.userInfo)
                  wx.redirectTo({
                        url: '../main/main',
                  })
            }
      })
  }
})