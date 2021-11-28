// pages/filesystem/filesystemlc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    belong:'',
    dataList:[],
    belongDesc:'',
    savedFilePath:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      belong:options.belong
    });
    switch(this.data.belong){
        case '11':
          this.setData({
            belongDesc:'LC服务器与网络设备'
          });
          break;
        case '12':
        this.setData({
            belongDesc:'SC服务器与网络设备'
        });
        break;
        case '13':
          this.setData({
              belongDesc:'POST系统相关软硬件'
          });
          break;
        case '14':
        this.setData({
            belongDesc:'GATE系统相关软硬件'
        });
        break;
        case '15':
        this.setData({
            belongDesc:'TVM系统相关软硬件'
        });
        break;
        case '21':
        this.setData({
            belongDesc:'各类应急预案'
        });
        break;
        case '31':
        this.setData({
            belongDesc:'系统与硬件'
        });
        break;
        case '32':
        this.setData({
            belongDesc:'软件与数据'
        });
        break;
        case '41':
        this.setData({
            belongDesc:'各类信息文件汇总'
        });
        break;
    };
    wx.request({
      url: 'https://www.metrocsm.top/wxdisplaysection.up',
      data: {
        belong: this.data.belong
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

  goView:function(e){
    var urlLink = 'filesystemview?furl=http://110.40.133.35'+e.currentTarget.dataset.index+'/'+e.currentTarget.dataset.n;
    wx.navigateTo({
     url:urlLink, //
     success:function() {
     
     },  //成功后的回调；
     fail:function() { },   //失败后的回调；
     complete:function() { }  //结束后的回调(成功，失败都会执行)
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