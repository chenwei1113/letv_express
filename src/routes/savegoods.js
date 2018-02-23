var express = require('express');
var router = express.Router();
var gooodslistdb = require("../db/goodslistdb");//引入goodslistdb，对用户数据的增删改查都在里面

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//post方式
router.post('/',function(req,res){
  //1. 接收前端的传来的商品数据
  let goodsid = req.body.goodsid;
  let goodsname = req.body.goodsname;
  let goodsprice = req.body.goodsprice;
  let goodscount = req.body.goodscount;
  let goodspic = req.body.goodspic;
  

  //2. 链接数据库，添加数据
  gooodslistdb.add({
    "goodsid":goodsid,
    "goodsname": goodsname,
    "goodsprice": goodsprice,
    "goodscount": goodscount,
    "goodspic": goodspic,
  },function(isSuccess){
    //3.响应
    if(isSuccess){
      res.send("添加成功，<a href='html/addGoods.html'>继续添加</a>");
    }else {
      res.send("添加失败，<a href='html/addGoods.html'>重新添加</a>");
    }
  });
});
module.exports = router;
