// pages/my/register/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: '',
    nickname: '',
    loginErrorCount: 0,
    // loading: false //防止多次按提交造成重复创建
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
    /**
   * 在数据库中进行注册
   */
  registerfunction: function (e) {
    // if (this.data.loading) {
    //   return;   //如果已经点击提交了就不再重复提交
    // }
    var that = this;
    // 处理空输入
    if (that.data.password.length < 1 || that.data.nickname.length < 1 || that.data.account.length < 1) {
      wx.showModal({
        title: '错误信息',
        content: '请输入完整信息',
        showCancel: false
      });
      console.log('sth null')
      return false;
    }

    // this.setData({   //this.setData用于修改data中的属性
    //   loading: true,
    // });
    // let u = e.detail.value;  //创建一个临时变量u
console.log(that)

    //从云数据库获取用户信息
    wx.cloud.init()
    //根据account判断数据库中是否有被注册过
    wx.cloud.database().collection('user').where({
      account: that.data.account
    }).get({
      success: res => {
        console.log('query success')
        console.log(res.data)
        if(res.data[0]){
          wx.showModal({
            title: '错误信息',
            content: '用户已注册',
            showCancel: false
          });
          console.log('用户已注册')
          // this.setData({
          //   loading: false,
          // });
          return false
        }else{
          console.log('用户未注册')
          
          }
        },

        fail: err => {
          wx.showToast({
            icon: 'none',
          })
          console.error('[数据库] [查询记录] 失败：', err)
          // this.setData({
          //   loading: false,
          // });
          return false;
        }
      })

      // return;
      //调用云函数为用户注册
      wx.cloud.callFunction({   //wx.cloud为云开发环境，callFunction调用云开发函数
        name: "register",  //云开发文件夹名称
        data: {
          data: {
            //...u是js中的拆分语法，将u（这里是form表达）发送过去
            nickname:that.data.nickname,
            account:that.data.account,
            password:that.data.password,
          },
        },
      }).then((res) => {   //执行完成后，res为云开发环境返回的数据
            // this.setData({
            //   loading: false,
            // });
            console.log(res);
            //返回上一页
            wx.showModal({
              // title: '',
              content: '注册成功',
              showCancel: false,
              complete: wx.navigateBack()
            })
          
      });
      

  },



  /**
   * 获取输入学号
   */
  bindaccountInput: function (e) {

    this.setData({
      account: e.detail.value
    });
  },


  /**
   * 获取输入密码
   */
  bindPasswordInput: function (e) {

    this.setData({
      password: e.detail.value
    });
  },


    /**
   * 获取名称
   */
  bindnicknameInput: function (e) {

    this.setData({
      nickname: e.detail.value
    });
  },


  /**
   * 一键删除输入
   */
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-account':
        this.setData({
          account: ''
        });
        break;
        case 'clear-nickname':
        this.setData({
          nickname: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
})
