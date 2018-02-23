/**
 * Created by Administrator on 2018/2/6.
 */
const mongoose = require("mongoose");
const dbconn = require("./dbconn");

//创建模板
let goodslistsSchema = new mongoose.Schema({
    "goodsid":String,
    "goodsname":String,
    "goodsprice":Number,
    "goodscount":Number,
    "goodspic":String
});

//创建模型(将数据库与模板链接起来)
let goodslistsModel = dbconn.model("goodslists",goodslistsSchema);

//开放接口
module.exports = {
    "add":function(data,callback){
        //创建实体
        let goodslistsEntity = new goodslistsModel(data);
        //保存
        goodslistsEntity.save((err,data)=>{
            if(err){
                console.log(err);
                callback(false);
            }else {
                callback(true);
            }
        });
    },
    "find": function(condition,callback){
        goodslistsModel.find(condition,(err,data)=>{
            if(err){
                callback([]);
            }else {
                callback(data);
            }
        });
    }
}
