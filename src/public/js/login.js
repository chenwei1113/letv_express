/**
 * Created by Administrator on 2018/2/5.
 */
//显示更多的 其他登录方式
$(".more").click(function(){
    if($(this).attr("isShowMore")=="true"){
        $(".regi-more").css({
            "padding-left":"54px"
        });
        $(".regi-more").find("ul").css({
            "width":"235px"
        });
        $(".more").html("&lt; 收起");
        $(this).attr("isShowMore",false);
    }else if($(this).attr("isShowMore")=="false"){
        $(".regi-more").css({
            "padding-left":"102px"
        });
        $(".regi-more").find("ul").css({
            "width":"125px"
        });
        $(".more").html("展开 &gt;");
        $(this).attr("isShowMore",true);
    }
});

//点击(表单提交)登录时，在前端验证 信息是否填写完整(手机号和密码)
//点击立即注册(submit提交)时，对文本框的内容进行判断，如果有为空的，就不让其提交(注册)
$(".form").submit(function () {
    if ($("#userphone").val() == "" || $("#userpass").val() == "") {
        $(".errmsg").css("display", "block");
        $(".errmsg").find("span").html("输入框不能为空");
        return false; //阻止浏览器的默认行为。
    }else {
        $(".errmsg").css("display", "none");
    }
});