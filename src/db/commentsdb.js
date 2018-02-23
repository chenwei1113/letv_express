/**
 * Created by Administrator on 2018/2/6.
 */
const mongoose = require("mongoose");
const dbconn = require("./dbconn");

//创建模板
let commentsSchema = new mongoose.Schema({
    "goodsid":String,
    "userphone":String,
    "comment":String,
    "commentimg":String,
    "commentdate":Date
});

//创建模型(将数据库与模板链接起来)
let commentsModel = dbconn.model("comments",commentsSchema);

//开放接口
module.exports = {
    "add":function(data,callback){
        //创建实体
        let commentsEntity = new commentsModel(data);
        //保存
        commentsEntity.save((err,data)=>{
            if(err){
                console.log(err);
                callback(false);
            }else {
                callback(true);
            }
        });
    },
    "find": function(condition,callback){
        commentsModel.find(condition,(err,data)=>{
            if(err){
                callback([]);
            }else {
                callback(data);
            }
        });
    },
    "findByPageIndex":function (condition,pageIndex,callback) {
        commentsModel.count((err,count)=>{
            if(err){
                console.log("获得总记录数出错："+err);
            }else{
                console.log("总记录的条数："+count);
                //每页有10条记录
                //db.集合名.find().skip(5).limit(5);
                commentsModel.find(condition,(err,data)=>{
                    if(err){
                        console.log("查询评论出错："+err);
                        callback([],0);
                    }else{
                        callback(data, Math.ceil(count / 5));//data:某个商品的所有评论内容；Math.ceil(count/10)：显示的最大页码数
                    }
                }).sort({"commentdate":-1}).skip((pageIndex-1)*5).limit(5);
            }
        });
    }
}
