var app = getApp();
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    hiddenLoading:false,
    page:1,
    id:null,
    listData:[]
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
  /**
   * 绑定bindconfirm 监听软键盘：完成
   */
  confirm: function (e) {
    console.log(e.detail.value)
  },
  onLoad: function (options) {
    console.log(options.classId)
    this.setData({
      inputVal: options.type.replace("\"", "").replace("\"", ""),
      inputShowed: true,
      id: options.classId
    })

    this.loadata()

  },
  loadata:function(){
    var that = this;
    app.foods.find('recipe', 'getMoreDiffStateRecipeList', that.data.id, 'tag', that.data.page).then(data => {
      //轮播数据
      console.log(data)
      this.setData({
        listData: this.data.listData.concat(data.data),
          hiddenLoading: true
      })
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(1)
    this.setData({
      page: this.data.page +1
    })
    this.loadata()
  },

});