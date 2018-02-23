/**
 * Created by Administrator on 2018/2/2.
 */
//该文件（公共文件）的功能：链接数据库的代码
const mongoose = require("mongoose");

module.exports = mongoose.createConnection("localhost","letvdb");
