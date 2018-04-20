Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    loading: false,
    formatted_address: '',
    markers: [{
      latitude: 0,
      longitude: 0,
      name: '我的位置',
      desc: ''
    }],
    covers: [{
      latitude: 0,
      longitude: 0,
      iconPath: '../../images/search.png',
    }, {
      latitude: 0,
      longitude: 0,
      iconPath: '../../images/search.png',
      rotate: 180
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation()
  },
  getLocation: function () {
    var that = this;
    that.setData({
      loading: true
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: parseFloat(res.longitude),
          markers: [{
            latitude: res.latitude,
            longitude: parseFloat(res.longitude)
          }],
          covers: [{
            latitude: res.latitude,
            longitude: parseFloat(res.longitude)
          }, {
            latitude: res.latitude,
            longitude: parseFloat(res.longitude)
          }]
        });
        //获取中文地址
        var locationParam = res.latitude + ',' + res.longitude;
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/',
          data: {
            ak: 'Y1R5guY8Y2GNRdDpLz7SUeM3QgADAXec',
            location: locationParam,
            output: 'json',
            pois: '1'
          },
          method: 'GET',
          success: function (res) {
            that.setData({
              markers: [{
                latitude: res.latitude,
                longitude: res.longitude,
                name: '我的位置',
                desc: res.data.result.formatted_address
              }],
              loading: false,
              formatted_address: res.data.result.formatted_address
            })
          },
          fail:function(){
            wx.showToast({
              title: '请求失败',
              icon: 'none',
              duration: 3000
            });
          }
        })
      },
    })
  },
  refreshLocation: function () {
    this.getLocation()
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