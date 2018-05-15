var express = require('express');
var router = express.Router();

// 后台用户信息
const userInfodata=[
    {
      username:"admin",
      password:"1008611",
      id:"001"
    },
    {
      username:"haurui",
      password:"10010",
      id:"002"
    }
]

// 新闻列表
const newsdata=[
  {
    time:"2018/4/25",
    match:"勇士vs马刺"
  },
  {
    time:"2018/4/24",
    match:"雷霆vs爵士"
  },
  {
    time:"2018/4/23",
    match:"开拓者vs醍醐"
  },
  {
    time:"2018/4/22",
    match:"奇才vs猛龙"
  },
  {
    time:"2018/4/21",
    match:"凯尔特人vs雄鹿"
  },
  {
    time:"2018/4/20",
    match:"热火vs76人"
  }
]

// 又定义了一个账户信息
const userinfo={
  "acount":"13691158201",
  "pwd":"123456"
}

/* 自定义后端接口请求*/
// 判断登录的接口

router.post('/login', function(req, res, next) {
   var username=req.body.username;
   var password=req.body.password;
   let state = false;
   let user = false;
   let userI = null
   userInfodata.forEach(function(i) {
       if (username === i.username) {
           user = true
           state = password === i.password
           userI = i
       }
   })
   // 判断用户是否存在
   if (user) {
       // 判断用户名密码是否正确
       if (state) {   
         //  window.localStorage.setItem("user","admin")   //  不允许在此处设置
           res.send({
               code: "200",
               userid: userI.id,
               msg: "登录成功"
           })
       } else {
           res.send({
               code: "400",
               userid: null,
               msg: "登录失败"
           })
       }
   } else {
       res.send({
           code: "1003",
           userid: null,
           msg: "用户名不存在"
       })
   }
})

// 同类设备获取用户登录信息
router.post('/getuserinfo',function(req,res){
  res.send({
     code:"1004",
     msg:"成功",
     data:userinfo
  })
})

//  同类设备获取新闻列表
router.post('/getnewlist',function(req,res){
  res.send({
     code:"1005",
     msg:"成功",
     data:newsdata
  })
})

module.exports = router
