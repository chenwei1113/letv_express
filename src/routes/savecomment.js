var express = require('express');
var router = express.Router();
var commentsdb = require("../db/commentsdb");//引入commentsdb，对用户数据的增删改查都在里面

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//post方式
router.post('/',function(req,res){

  //1. 接收前端的传来的数据
  let goodsid = req.body.goodsid;
  let comment = req.body.comment;
  //得到当前的时间
  let now = new Date();
  //得到当前登录的手机号
  let userphone = req.session.userphone;

  //2. 链接数据库，添加数据
  commentsdb.add({
    "goodsid":goodsid,
    "userphone":userphone,
    "comment":comment,
    "commentimg":req.session.commentimg,
    "commentdate":now
  },function(isSuccess){
    //3.响应
    if(isSuccess){
      res.redirect("goodsdetail?goodsid="+goodsid);
    }else{
        res.send("评论失败！");
    }
  });
});
module.exports = router;
