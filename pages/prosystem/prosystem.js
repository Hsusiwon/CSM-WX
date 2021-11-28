// pages/prosystem/prosystem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stitle:'',
    stime:'',
    etime:'',
    levelPicker: ['', '故障', '警告','提示','施工','升级'],
    repairPicker: ['', '未处理', '执行中','已关闭'],
    levelPickerValue:'',
    repairPickerValue:'',

  },

  levelPickerChange: function(e) {
    this.setData({
      levelPickerValue: e.detail.value
    }),
    console.log(this.data.levelPickerValue)
  },
  repairPickerChange: function(e) {
    this.setData({
      repairPickerValue: e.detail.value
    })
    console.log(this.data.repairPickerValue)
  },
  constitle: function (e) {
    this.setData({
      stitle: e.detail.value
    });
    console.log(this.data.stitle)
  },
  stimeChange: function (e) {
    this.setData({
      stime: e.detail.value
    });
    console.log(this.data.stime)
  },
  etimeChange: function (e) {
    this.setData({
      etime: e.detail.value
    });
    console.log(this.data.etime)
  },

  query: function (e) {
    if(this.data.levelPickerValue==0){
      this.setData({
        levelPickerValue: ''
      })
    };
    if(this.data.repairPickerValue==0){
      this.setData({
        repairPickerValue: ''
      })
    };

    wx.navigateTo({
      url: 'prosystemquery?stitle='+this.data.stitle+'&stime='+this.data.stime+'&etime='+this.data.etime+'&level='+this.data.levelPickerValue+'&repaired='+this.data.repairPickerValue,
    })
  },
  add: function (e) {
    wx.navigateTo({
      url: 'prosystemadd',
    })
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