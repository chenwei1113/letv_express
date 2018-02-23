var express = require('express');
var router = express.Router();
var goodslistdb = require("../db/goodslistdb");//引入vipdb，对用户数据的增删改查都在里面

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//post方式
router.get('/',function(req,res){
  //2. 链接数据库，查询所有商品
  goodslistdb.find({},function(data){
    //3.用查询到的结果（数据）渲染模板，并响应给前端
      res.render('goodslist',{'goodslist':data});
    
  });

});
module.exports = router;
