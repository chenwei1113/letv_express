/**
 * Created by Administrator on 2018/2/2.
 */

//该文件的功能：针对集合（表）vips的所有的数据库操作
const dbconn = require("./dbconn");
const mongoose = require("mongoose");

//1、创建模板（对应于数据库中集合（表）结构）
let vipSchema = new mongoose.Schema({
    "userphone":Number,
    "userpass":String
});
//2、创建模型model，把模板和数据库中的集合进行对应
let VipModel = dbconn.model("vips",vipSchema);

//3、开放的接口
module.exports = {
    //注册
    "regsave":function(data,func){
        //现在数据库中查询
        this.find({"userphone":data.userphone},(finddata)=>{
            if(finddata.length==0){//没有查到，就可以进行保存
                this.add(data,func);
            }else {//查到了，说明用户名已经存在，不能注册
                func(false);
            }
        });
    },
    //添加数据
    "add":function(data,func){
        //1、实体（要添加到数据库中数据（json对象））
        let vipEntity = new VipModel(data);
        vipEntity.save((err,data)=>{
            if(err){
                func(false);
            }else{
                func(true);
            }
        });
    },
    //查找
    "find":function(condition,func){
        VipModel.find(condition,(err,data)=>{
            if(err){
                console.log(err);
                func([]);
            }else{
                func(data);//返回的是查询到的数据，是个数组
            }
        });
    }
}