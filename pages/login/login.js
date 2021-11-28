var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //login登录后进行的操作
  formSubmit:function(e){
    //1.获取用户输入的信息
    var username=e.detail.value.username;
    var password=e.detail.value.password;
    //2.验证用户输入的信息的数据格式
    if(username==""||password==""){
      wx.showToast({
        icon: 'error',
        title: '请输入用户名和密码',
        duration:2000
      })
      return false;
    }
    //3.将用户信息发送值服务器，验证数据的正确性
    wx.request({
      url: 'https://www.metrocsm.top/wxlogin.udo',
      data:e.detail.value,

      success (res) {
        //4.结果验证，并处理
        if(res.data['0']!=null&&username==res.data['0']['username']){
          app.globalData.user=res.data['0']['username'],
          wx.redirectTo({
            url: '/pages/main/main',
          })
        }else{
          wx.showToast({
            icon: 'error',
            title: '用户名或密码错误！',
          })
        }
      },
      fail:function(){
        wx.showToast({
          icon: 'error',
          title: '请检查网络！',
        })
      }
    }) 
  },

  //login重置后进行的操作
  formReset:function(e){

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

  }
})