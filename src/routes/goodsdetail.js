var express = require('express');
var router = express.Router();
var goodslistdb = require("../db/goodslistdb");//引入vipdb，对用户数据的增删改查都在里面
var commentsdb = require("../db/commentsdb");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//get方式
router.get('/',function(req,res){
  //1. 接收前端传来的数据
  var goodsid = req.query.goodsid;
  var pageindex = req.query.pageindex || 1;
  
  //2. 链接数据库，查询所有商品
  goodslistdb.find({"goodsid":goodsid},function(data){
    //2)、查询商品的评论
    commentsdb.findByPageIndex({"goodsid":goodsid},pageindex,function(comments,maxpageindex) {
      //comments：该goodsid所对应的所有评论；maxpageindex:最大的页码数
      let showcomment = req.session.userphone?"block":"none"; 
      res.render("goodsdetail",{
          "goodsdetail":data[0],
          "comments":comments,  //comments是个对象
          "showcomment":showcomment,
          "page":{
              "maxPageIndex":maxpageindex,
              "currPageIndex":pageindex
          }
      });
    });
    //3.用查询到的结果（数据）渲染模板，并响应给前端
      //console.log("data="+data[0].goodsid);
      //res.render('goodsdetail',{'goodsdetail':data[0]});
  });

});
module.exports = router;
