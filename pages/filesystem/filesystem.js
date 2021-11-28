var app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      picker: ['LC服务器与网络设备', 'SC服务器与网络设备', 'POST系统相关软硬件','GATE系统相关软硬件','TVM系统相关软硬件','各类应急预案','系统与硬件','软件与数据','各类信息文件汇总'],
      pickerValue: 0,
      pickerid: ['11', '12', '13','14','15','21','31','32','41'],
      tempFilePath:'',
      fileName:'',
      list: [
        {
            id: '10',
            name: '操作指导书',
            open: false,
            pages: [
              {
                des:'LC服务器与网络设备', 
                url:'filesystemsection',
                sec:'11'
              },
              {
                des:'SC服务器与网络设备', 
                url:'filesystemsection',
                sec:'12'
              },
              {
                des:'POST系统相关软硬件', 
                url:'filesystemsection',
                sec:'13'
              },
              {
                des:'GATE系统相关软硬件', 
                url:'filesystemsection',
                sec:'14'
              },
              {
                des:'TVM系统相关软硬件', 
                url:'filesystemsection',
                sec:'15'
              }
            ]
        },
        {
            id: '20',
            name: '应急预案',
            open: false,
            pages: [
              {
                des:'各类应急预案', 
                url:'filesystemsection',
                sec:'21'
              }
            ]
        },
        {
            id: '30',
            name: '经验札记交流',
            open: false,
            pages: [
              {
                des:'系统与硬件', 
                url:'filesystemsection',
                sec:'31'
              },
              {
                des:'软件与数据', 
                url:'filesystemsection',
                sec:'32'
              }
            ]
        },
        {
            id: '40',
            name: '公司重要下发文件',
            open: false,
            pages: [
              {
                des:'各类信息文件汇总', 
                url:'filesystemsection',
                sec:'41'
              }
            ]
        },
    ],
    inputShowed: false,
    inputVal: "",
    canUse:false,
  },

  showInput: function () {
    this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
      this.setData({
          inputVal: e.detail.value
      });
  },
  goSearch: function (e) {
    if(this.data.inputVal!=""&&this.data.inputVal!=null){
      wx.navigateTo({
        url: 'filesystemsearch?stitle='+this.data.inputVal,
      })
    }else{
      wx.showToast({
        icon: 'error',
        title: '请输入搜索内容！',
      })
    }
  },
  chooseFile: function(e) {
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success:function(res){
        that.setData({
          tempFilePath: res.tempFiles,
          fileName: res.tempFiles[0].name,
        })
      }
    })
  },
  uploadFile: function(e) {
    if(this.data.tempFilePath==""||this.data.tempFilePath==null){
      wx.showToast({
        icon: 'error',
        title: '请先选择文件！'
      })
      return false;
    }
    this.setData({
      canUse:true
    })
    wx.uploadFile({
      filePath: this.data.tempFilePath[0].path,
      name: this.data.tempFilePath[0].name,
      url: 'https://www.metrocsm.top/wxupload.up',
      formData: {
        'belong': this.data.pickerid[this.data.pickerValue],
        'username': app.globalData.user,
        'filename': this.data.tempFilePath[0].name
      },
      success (res){
        wx.showToast({
          title: '文件上传成功！',
        })
      },
      fail:function(res){
        wx.showToast({
          icon: 'error',
          title: '请检查网络！',
        })
      }
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      pickerValue: e.detail.value
    })
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
        if (list[i].id == id) {
            list[i].open = !list[i].open
        } else {
            list[i].open = false
        }
    }
    this.setData({
        list: list
    });
  },
  changeTheme: function() {
      console.log(this.data);
      getApp().themeChanged(this.data.theme === 'light' ? 'dark' : 'light');
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