
//顶部悬浮
//当页面发生  滚动事件
$(window).scroll(function(){
    console.log($(this).scrollTop());
    console.log($(".header").height());
    if($(this).scrollTop()>$(".header").height()){
        $(".nav").css({
            "position":"fixed",
            "top": 0,
            "left":0
        });
    } else if ($(this).scrollTop() <= $(".header").height()){
        $(".nav").css({
            "position": "relative"
        });
    }
});

