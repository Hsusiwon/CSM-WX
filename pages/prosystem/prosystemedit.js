var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    serial:'',
    dataList:[],
    txtTemp:[],
    updatetime:'',
    updater:'test',
    updatecont:'',
    repair:'2',
    repairPicker: ['执行中','已关闭'],
    repairPickerValue:'0',
    files: [],
    date:'',
    time:'',
    canUse:false,

  },

  uploadOneByOne: function(files,i,datas) {
    var that = this
    wx.uploadFile({
      filePath: files[i],
      name: files[i],
      url: 'https://www.metrocsm.top/wxeditpic.pdo',
      formData: {
        'picNum':i+1,
        'serial':datas.serial,
        'serialnum':datas.serialnum,
        'path':datas.updatecont,
        'updatepic':datas.updatepic,

      },
      success (res){

      },
      fail:function(res){
        wx.showToast({
          icon: 'error',
          title: '请检查网络！',
        })
      },
      complete:function(res){
        i++;
       
        datas = res.data
        if(i==files.length){
          wx.showToast({
            title: '更新录入成功（含图片）！',
          })
        }else{
          that.uploadOneByOne(files,i,JSON.parse(res.data))
        }
      }
    })
    
  },
  edit: function(e) {
    if(this.data.date==""||this.data.time==""){
      wx.showToast({
        icon: 'error',
        title: '请填完更新内容！'
      })
      return false;
    }
    this.setData({
      canUse:true
    })
    var that = this
    wx.request({
      url: 'https://www.metrocsm.top/wxedit.pdo',
      data:{
        'serial': this.data.serial,
        'repaired': this.data.repair,
        'updatetime': this.data.date+" "+this.data.time,
        'updater': app.globalData.user,
        'updatecont': this.data.updatecont,
      },
      success (res) {
        if(that.data.files.length==0){
          wx.showToast({
            title: '更新录入成功（无图片）！',
          })
        }else{

          that.uploadOneByOne(that.data.files,0,res.data)
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
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
        count:1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
                files: that.data.files.concat(res.tempFilePaths)
            });
        }
    })
  },
  previewImage: function(e){
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files // 需要预览的图片http链接列表
      })
  },
  repairPickerChange: function(e) {
    this.setData({
      repairPickerValue: e.detail.value,
      repair:parseInt(e.detail.value)+2
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    });
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value+':00'
    });
  },
  contChange: function (e) {
    this.setData({
      updatecont: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      serial:options.serial,
      title:options.title,
    })

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