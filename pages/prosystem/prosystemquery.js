// pages/prosystem/prosystemquery.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelPicker: ['', '故障', '警告','提示','施工','升级'],
    repairPicker: ['', '未处理', '执行中','已关闭'],
    levelPickerValue:'',
    repairPickerValue:'',
    stitle:'',
    stime:'',
    etime:'',
    level:'',
    repaired:'',
    dataList:[],
    txtTemp:[],
    total:'',
    page: [],
    pageValue:'1',
    limit:'10',

  },

  detail: function(e) {
    var serial = e.currentTarget.dataset.index
    var title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: 'prosystemdetail?serial='+serial+'&title='+title,
    })
  },
  update: function(e) {
    var serial = e.currentTarget.dataset.index
    var title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: 'prosystemedit?serial='+serial+'&title='+title,
    })
  },
  pagePickerChange: function(e) {
    this.setData({
      pageValue: e.detail.value
    }),
    wx.redirectTo({
      url: 'prosystemquery?stitle='+this.data.stitle+'&stime='+this.data.stime+'&etime='+this.data.etime+'&level='+this.data.levelPickerValue+'&repaired='+this.data.repairPickerValue+'&page='+this.data.pageValue,
    })
  },
  viewPic: function(e) {
    wx.previewImage({
      urls: e.currentTarget.dataset.index,
    })
  },
  downTxt: function(txtT,i) {
    var j = txtT.length
    var urlLink = 'https://www.metrocsm.top'+txtT[i]
    var that = this
    wx.downloadFile({
      url: urlLink,
      success (res) {
        var fs=wx.getFileSystemManager()
        var result = fs.readFileSync(res.tempFilePath,"utf-8")
        txtT[i]=result
        i++
      },
      fail (res) {
        　
      },
      complete(){
        if(i!=0&&i!=j){
          that.downTxt(txtT,i)
        }else{
          that.setData({
            txtTemp:txtT
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.page!=undefined&&options.page!=0){
      this.setData({
        stitle:options.stitle,
        stime:options.stime,
        etime:options.etime,
        level:options.level,
        repaired:options.repaired,
        pageValue:options.page,
      });
    }else{
      this.setData({
        stitle:options.stitle,
        stime:options.stime,
        etime:options.etime,
        level:options.level,
        repaired:options.repaired,
      });
    }
    wx.request({
      url: 'https://www.metrocsm.top/wxquery.pdo',
      data: {
        stitle:this.data.stitle,
        stime:this.data.stime,
        etime:this.data.etime,
        level:this.data.level,
        repaired:this.data.repaired,
      },
      success :(res) => {
        var pageNum = res.data.length/this.data.limit
        var pageTemp=['请选择页数']
        for(var i=0;i<pageNum;i++){
          pageTemp[i+1]=i+1
        }
        this.setData({
          total: res.data.length,
          page: pageTemp,
        }) 
      },
      fail:function(){
      }
    })
    wx.request({
      url: 'https://www.metrocsm.top/wxquerypage.pdo',
      data: {
        stitle:this.data.stitle,
        stime:this.data.stime,
        etime:this.data.etime,
        level:this.data.level,
        repaired:this.data.repaired,
        page:this.data.pageValue,
        limit:this.data.limit,
      },
      success :(res) => {
        var datas=res.data;//res.data就是从后台接收到的值
        var txtT=[]
        for(var i=0;i<datas.length;i++){//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
          datas[i].recordtime = util.formatTime(new Date(datas[i].recordtime.time))
          datas[i].level = this.data.levelPicker[datas[i].level]
          datas[i].repaired = this.data.repairPicker[datas[i].repaired]
          //将图片路径分解，由previewImage指令点击获取
          var picpath = datas[i].recordpic.split("trace_")
          picpath = 'https://www.metrocsm.top'+picpath[0]
          var picname = datas[i].recordpic.split("/")
          picname = picname[picname.length-1]
          picname = picname.split("add").filter(item => item != '')
          for(var j=0;j<picname.length;j++){
            picname[j]=picpath+picname[j]
          }
          datas[i].recordpic= picname
          //将文本路径重构为数字下标，由downloadfile指令存放内容至另一个内容数组
          txtT[i]=datas[i].recordcont
          datas[i].recordcont = i
        }
        this.setData({
          dataList: datas
        }) 
        //下载文件是异步命令，所以要用递归函数执行才能对应顺序
        this.downTxt(txtT,0)
      },
      fail:function(){
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