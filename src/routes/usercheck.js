var express = require('express');
var router = express.Router();
var vipdb = require("../db/vipdb");//引入vipdb，对用户数据的增删改查都在里面


//get方式
router.get('/',function(req,res,next){
  //1. 接收前端的数据（用户名/手机号）
  let userphone = req.query.userphone;

  //2. 链接数据库，进行用户名存在性验证
  vipdb.find({"userphone":userphone},function(data){
      let t = data.length>0?1:0;
      res.send(String(t));//参数是字符串、布尔类型或json对象
  });

});
module.exports = router;
