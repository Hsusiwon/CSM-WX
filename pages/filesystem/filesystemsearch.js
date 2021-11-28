// pages/filesystem/filesystemview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:'',
    dataList:[],
    savedFilePath:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      inputVal:options.stitle
    });
    wx.request({
      url: 'https://www.metrocsm.top/wxdisplaysearch.up',
      data: {
        stitle: this.data.inputVal
      },
      success :(res) => {
        this.setData({
          dataList: res.data
        }); 
      },
      fail:function(){
        wx.showToast({
          title: '请检查网络！',
        })
      }
    })

  },

  goDownload:function(e){
    var urlLink = 'https://www.metrocsm.top'+e.currentTarget.dataset.path+'/'+e.currentTarget.dataset.name;
    var fileName = e.currentTarget.dataset.name;
    wx.downloadFile({
      url: urlLink,
      success (res) {
        var downFilePath = res.tempFilePath
        var fileEx = fileName.substring(fileName.lastIndexOf(".")+1);
        if(fileEx=='doc'||fileEx=='docx'||fileEx=='xls'||fileEx=='xlsx'||fileEx=='ppt'||fileEx=='pptx'||fileEx=='pdf'){
          wx.openDocument({
            filePath: downFilePath,
            fileType: fileEx
          })
        }else{
          wx.showToast({
            title: '不支持打开'+fileEx+'的文件类型！',
          })
        }
      },
      fail (res) {
        　wx.showToast({
          title: '请检查网络！',
        })
      }
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