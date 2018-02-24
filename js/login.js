/**
 * Created by GXiong on 2017/5/7.
 */
/***1 login***/
$(function(){
    $('#top').load('data/1_header.php');
    $('#footer').load('data/2_footer.php');
});
var loginName = null; //当前登录的用户名
$('#login').click(function(){
    console.log("a");
    var data = $('#login-user-form').serialize();
    $.post('data/13_login.php', data, function(obj){
        //console.log('开始处理登录验证结果');
        console.log(arguments);
        if(obj.code===1000){
            loginName = $('[name="uname"]').val();
            location.href="index.html?loginName="+loginName;
            //window.history.go(-1);
            $('#welcome').html('欢迎回来：'+loginName);
            ////TODO 将用户信息保存到sessionStorage中
            //sessionStorage.setItem("loginName",loginName);
        }else {
            $('.modal .alert').html(obj.msg);
        }
    });
});