const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiData: [
      {
        name: '热菜',
        classid: 102
      }, {
        name: '凉菜',
        classid: 202
      }, {
        name: '汤羹',
        classid: 57
      }, {
        name: '主食',
        classid: 59
      }, {
        name: '小吃',
        classid: 62
      }, {
        name: '西餐',
        classid: 160
      }, {
        name: '烘培',
        classid: 60
      }, {
        name: '自制食材',
        classid: 69
      }
    ],
    loading: true,
    goodFood: [],
    arr: [],
    imageDefault: '../../images/demo.png',
    itemHeight: 0,
    arrHeight: [],
    todayNew: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    app.foods.find('recipe', 'getMoreDiffStateRecipeList', 0, 'new', 2).then(data => {
        //轮播数据
        console.log(data)
        this.setData({
          todayNew: data
            .data
            .slice(9, 15),
          loading: false
        })
      })
    app.foods.find().then(data => {
        for (let i = 0; i < data.data.length; i++) {
          //图片显示默认样张
          that.data.arr.push(false)
        }
        this.setData({ goodFood: data.data, loading: false })
        setTimeout(() => {
          this.getRect()
        }, 100)
    })

  },
  bindViewTap: function () {
    console.log(11)
    wx.navigateTo({
      url: '../search/search?type="热菜"&classId=102' })
  },
  fun: function (event) {
    const type = event.currentTarget.dataset.viewpointName;
    const classId = event.currentTarget.dataset.viewpointUuid;
    wx.navigateTo({ url: '../search/search?type=' + type + '&classId=' + classId})
  },
  /**
   * 获取单个菜单的高度
   */
  getRect: function () {
    var that = this;
    wx.createSelectorQuery().select('.similar-li').boundingClientRect(function (rect) {
      console.log(rect)
      that.setData({ itemHeight: rect.height })
      that.init(rect.height)

    }).exec()
  },
  /**
   * 计算每屏幕能放多少图片
   */
  init: function (itemHeight) {
    let index = parseInt(app.globalData.windowHeight / itemHeight);
    for (let i = 0; i < index * 2; i++) {
      this.data.arr[i] = true
    }
    this.setData({ arr: this.data.arr });
    for (let i = 0; i < this.data.arr.length; i++) {
      this.data.arrHeight[i] = Math.floor(i / 2) * (itemHeight - 10)
    }
  },
  /**
   * 页面滚动
   */
  onPageScroll: function (e) {
    for (let i = 0; i < this.data.arrHeight.length; i++) {
      if (this.data.arrHeight[i] < e.scrollTop + app.globalData.windowHeight) {
        if (this.data.arr[i] === false) {
          this.data.arr[i] = true
        }
      }
    }
    this.setData({ arr: this.data.arr })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
})