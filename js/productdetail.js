/**
 * Created by GXiong on 2017/5/7.
 */
$(function(){
    $('#top').load('data/1_header.php',function(){
        var s = location.search; //当前地址栏中URL中的查询字符串部分
        var loginName = s.substring(s.indexOf('=')+1);
        console.log(loginName);
        if(loginName!==''){
            $('#welcome').html('欢迎回来：'+loginName);
            $(document.body).on('click','#cart',function(){
                location.href="shopcart.html?loginName="+loginName;
            });
        }
    });
    $('#nav').load('data/3_nav.php');
    $('#footer').load('data/2_footer.php');
});



//大小图切换
$('.icon-list img').mouseenter(function(){
    var url = $(this).attr('alt');  //GET
    console.log(url);
    $('#mImg').attr('src', url);  //SET
});