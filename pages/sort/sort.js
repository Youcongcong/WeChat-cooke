var sortData = require('../../utils/sortData')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortData1:[],
    curNav:1,
    navRightItems: sortData.data[0].listData
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sortData1: sortData.data
      
    })
    console.log(sortData)
  },
  tap: function (event) {
    const type = event.currentTarget.dataset.viewpointName;
    const classId = event.currentTarget.dataset.viewpointUuid;
    wx.navigateTo({ url: '../search/search?type=' + type + '&classId=' + classId })
  },
  //事件处理函数
  switchRightTab: function (e) {
    let id = e.target.dataset.id;
    this.setData({
      curNav: id,
      navRightItems: this.data.sortData1[id-1].listData
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