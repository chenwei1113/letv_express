
$("#btnGo").click(function(){
    let pageindex = $("#txtpageIndex").val();
    if(pageindex<1){
        pageindex=1;
    }else if(pageindex><%=maxPageIndex%>){
        pageindex = <%=maxPageIndex%>;
    }
    location.href="goodsdetail?goodsid=<%=goodsdetail.goodsid%>&pageindex="+pageindex;
});