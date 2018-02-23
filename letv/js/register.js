/**
 * Created by Administrator on 2018/2/5.
 */
//----------入口函数----------
$(function(){
   //----------页面一加载时，就产生随机验证码并显示
    var str = randomCode();
    $("#randomcode").html(str);
    
});

//----------手机号正则验证----------
var regPhone = /^1[34578]\d{9}$/;
$("#userphone").blur(function(){
    $(".username").css({ "border": "1px solid #ccc" });
    //判断当前输入框是否为空：不为空的话，再去校验；为空的话，不进行验证
    if($(this).val()!=''){
        if (regPhone.test($(this).val())) { //验证通过时
            $(".username").css({ "border": "1px solid #ccc" });
            $(".errmsg").css("display", "none");
            $("#usermsg").css({ "display": "block" });//显示后端查询结果的盒子
            //在后端进行 用户名 存在性验证
            $.ajax({
                "url": "../usercheck",
                "data": {
                    "userphone": $(this).val()
                },
                "success": function (data) {
                    if (data == 1) {
                        $("#usermsg").html("对不起，该手机号已被注册");
                        $("#usermsg").css({"color":"red"});
                    } else {
                        $("#usermsg").html("该手机号可用");
                        $("#usermsg").css({ "color": "green" });                        
                    }
                }
            });    
        } else { //验证不通过时
            $(".errmsg").css("display", "block");
            $(".errmsg").find("span").html("手机号格式不正确");
            $(".username").css({ "border": "1px solid red" });
            $("#usermsg").css({"display":"none"});
        }
    }
});
$("#userphone").focus(function(){
    $(".username").css({ "border": "1px solid #2c83c6" });
});
//-------------密码正则验证----------
var regPass = /^\w{6,12}/;
$("#userpass").blur(function(){
    $(".userpass").css({ "border": "1px solid #ccc" });
    if($(this).val()!=''){
        if (regPass.test($(this).val())) {
            $(".userpass").css({ "border": "1px solid #ccc" });
            $(".errmsg").css("display", "none");
        } else {
            $(".errmsg").css("display", "block");
            $(".errmsg").find("span").html("密码格式为6-12位的数字、字母或下划线");
            $(".userpass").css({ "border": "1px solid red" });
        }
    }
});
$("#userpass").focus(function () {
    $(".userpass").css({ "border": "1px solid #2c83c6" });
});
//-------------随机验证码的校验-----------
$("#checkcode").blur(function(){
    $(".checkcode").css({ "border": "1px solid #ccc" });
    if($(this).val()!=""){
        if ($(this).val() != $("#randomcode").html()) {
            $(".checkcode").css({ "border": "1px solid red" });            
            $(".errmsg").css("display", "block");
            $(".errmsg").find("span").html("验证码输入错误");
        } else {
            $(".errmsg").css("display", "none");
            $(".checkcode").css({ "border": "1px solid #ccc" });
        }
    } 
});
$("#checkcode").focus(function(){
    $(".checkcode").css({ "border": "1px solid #2c83c6" });
});
//--------手机验证码的验证----------------
$(".telcheckcode").find("input").blur(function(){
    $(".telcheckcode").css({ "border": "1px solid #ccc" });
});
$(".telcheckcode").find("input").focus(function(){
    $(".telcheckcode").css({ "border": "1px solid #2c83c6" });
});
//---------点击得到随机验证码---------
$("#randomcode").click(function(){
    var str = randomCode();
    $(this).html(str);
});

//点击立即注册(submit提交)时，对文本框的内容进行判断，如果有为空的，就不让其提交(注册)
$(".form").submit(function () {
    if ($("#userphone").val() == "" || $("#userpass").val() == "" || $("#checkcode").val() == "") {
        $(".errmsg").css("display", "block");
        $(".errmsg").find("span").html("输入框不能为空");
        return false; //阻止浏览器的默认行为。
    } else if ($('.errmsg').css("display") == "block"){
        $(".errmsg").css("display", "block");
        $(".errmsg").find("span").html("请输入正确的信息");
        return false;
    }
});

//----------产生随机验证码 (数字加字母)-----------
function randomCode(){
    var letter = ['a','b','c','d','e','f','g','h','i','j','k','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var str = "";
    var let1 = letter[parseInt(Math.random()*50)];
    var let2 = letter[parseInt(Math.random()*50)];
    var num1 = parseInt(Math.random()*10);
    var num2 = parseInt(Math.random()*10);
    var arr = [let1,let2,num1,num2];
    for(var i=0;i<arr.length;i++){
        str += arr[parseInt(Math.random()*4)];
    }
    return str;
}
