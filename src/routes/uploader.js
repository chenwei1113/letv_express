var express = require('express');
var fs = require("fs");
var router = express.Router();
var formidable = require('formidable');

router.post('/',function(req,res,next){
    //1、创建表单对象，并设置对应的属性（编码，服务器端保存的路径，文件大小的限制，）
    //1)、创建表单对象
    var form = new formidable.IncomingForm();//创建上传表单

    //2)、设置表单对象的属性
    form.encoding = 'utf-8';//设置编码
    form.uploadDir = '../public/uploader';//设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = '2*1024*1024';//文件大小

    //2、调用parse方法对应传来的数据解析。
    form.parse(req,function(err,fields,files){
        if(err){
            res.locals.error = err;
            console.log("上传文件出错了:"+ err);
            return;
        }
        //扩展名
        var extName = ''; //后缀名
        switch (files.imgfile.type){
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if(extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            //res.render('index', {title: TITLE});
            return;
        }

        //服务器端对上传的文件重新起名
        //new Date().toLocaleDateString();
        let str = new Date().getTime();
        
        var imgFileName ="goodsimg_"+ str + '.' + extName;//文件名
        //图片写入地址;
        var newPath = form.uploadDir+"/" + imgFileName ;

        //显示地址；
        //var showUrl = "http://localhost:706" + "upload"+ imgFileName ;
        console.log("newPath="+newPath);

        //在服务器端对文件进行重命名
        fs.renameSync(files.imgfile.path, newPath); //重命名
        // res.send("上传成功！");
        let commentimg = "uploader/"+ imgFileName;  //上传多张图片，后端应该怎么去处理？？？？？？？怎么放在一个数组中？？？
        console.log(commentimg);
        req.session.commentimg = commentimg;
        res.render("showimg",{"imgsrc":commentimg});

    });
});
module.exports = router;