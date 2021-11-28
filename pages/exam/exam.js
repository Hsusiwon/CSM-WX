const zyxtwhtk = require('../../exam/zyxtwhtk.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:1,
    show:0,
    questions:'',
    right:0,
    wrong:0,
    faults:[],
    result:0
  },
  radioChange: function (e) {
    var data=this.data.questions
    for(var i=0;i<data[this.data.number-1].option.length;i++){
      if(data[this.data.number-1].option[i].optionid==e.detail.value){
        var array= this.data.number-1
        var checked = "data["+array+"].option["+i+"].checked";
        data[this.data.number-1].option[i].checked='true'
      }else{
        data[this.data.number-1].option[i].checked=''
      }
    }
    this.setData({
      questions:data
    })
  },
  handin: function (e) {
    if(this.data.questions[e.currentTarget.dataset.index-2].option[0].checked==undefined){
      wx.showToast({
        icon: 'error',
        title: '本题未作答！'
      })
      return false
    }
    for(var i=0;i<this.data.questions.length;i++){
      for(var j=0;j<this.data.questions[i].option.length;j++){
        if(this.data.questions[i].option[j].checked=="true"&&this.data.questions[i].option[j].optionid==this.data.questions[i].answer){
          this.setData({
            right:this.data.right+1
          })
        }
        if(this.data.questions[i].option[j].checked=="true"&&this.data.questions[i].option[j].optionid!=this.data.questions[i].answer){
          this.setData({
            wrong:this.data.wrong+1
          })
          this.data.faults.push(this.data.questions[i])
        }
      }
    }
    this.setData({
      result:1,
      faults:this.data.faults//要想页面刷新数据，需在setData里面重写一遍
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.url=='zyxtwhtk'){
    this.setData({
      questions:zyxtwhtk.zyxtwhtk
    })
    }
  },
  show:function(e){
    this.setData({
      show:1
    })
  },
  previous:function(e){
    if(this.data.questions[e.currentTarget.dataset.index-1]==undefined){
      wx.showToast({
        icon: 'error',
        title: '已经是第一题！'
      })
    }else{
      var currentNumber = e.currentTarget.dataset.index
      this.setData({
        show:0,
        number:currentNumber
      })
    }
  },
  next:function(e){
    if(this.data.questions[e.currentTarget.dataset.index-2].option[0].checked==undefined){
      wx.showToast({
        icon: 'error',
        title: '本题未作答！'
      })
      return false
    }
    if(this.data.questions[e.currentTarget.dataset.index-1]==undefined){
      wx.showToast({
        icon: 'error',
        title: '已经是最后一题！'
      })
    }else{
      var currentNumber = e.currentTarget.dataset.index
      this.setData({
        show:0,
        number:currentNumber
      })
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