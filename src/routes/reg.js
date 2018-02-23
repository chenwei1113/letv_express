var express = require('express');
var router = express.Router();
var vipdb = require("../db/vipdb");//引入vipdb，对用户数据的增删改查都在里面

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//post方式
router.post('/',function(req,res,next){
  //1. 接收前端的数据（用户名/手机号，密码）
  let userphone = req.body.userphone;
  let userpass = req.body.userpass;

  //2. 链接数据库，进行保存
  vipdb.regsave({
    "userphone":userphone,
    "userpass":userpass
  },function(isSuccess){
    console.log(isSuccess);
    //3.响应
    if(isSuccess){
      res.redirect("html/login.html");
    }else {
      res.render('register', { 'errmsg': "注册失败","showorhide":"block"});
    }
  });

});
module.exports = router;
