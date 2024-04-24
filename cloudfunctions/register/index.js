//获得微信服务端开发工具包
const cloud = require('wx-server-sdk');
//初始化一下
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

//设置一个数据库变量
const db = cloud.database();
//module.export包裹的内容会在调用云函数createGroup.js时候调用，async是异步调用


exports.main = async (event) => {
  let u = event.data;  //获得小程序前端发送的数据
  //获得用户唯一ID
  let wxContext = cloud.getWXContext();
  let openID = wxContext.OPENID;

  await db.collection("user").add({   //将数据添加进数据库中
    data:{
      openID,
      nickname: u.nickname,
      account: u.account,
      password: u.password,
      identity:"stu",
      
      message:[],  //创建列表，帖子，菜式，收藏
      fav:[],  
      bookmark:[],

      have_reply:false
    },
  });
  
  return {
    success: true,  //给前端返回成功
  };
};