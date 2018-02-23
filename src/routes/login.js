var express = require('express');
var router = express.Router();
var vipdb = require("../db/vipdb");//引入vipdb，对用户数据的增删改查都在里面

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//post方式
router.post('/',function(req,res){
  //1. 接收前端的数据（用户名/手机号，密码）
  let userphone = req.body.userphone;
  let userpass = req.body.userpass;

  //2. 链接数据库，进行保存
  vipdb.find({
    "userphone":userphone,
    "userpass":userpass
  },function(data){
    //3.响应
    if(data.length>=1){//表示该用户存在
      //用session 保存用户名 （后端），保存在服务器端的内存中
      req.session.userphone = userphone;
      //把用户名保存在 cookie中（前端），服务器端的代码，保存在客户端的硬盘中
      res.cookie("userphone",userphone);
      //重定向到 主页
      res.redirect("html/index.html");
    }else {
      res.render('login',{'errmsg':"用户名或密码错误","showorhide":"block"});
    }
  });

});
module.exports = router;
