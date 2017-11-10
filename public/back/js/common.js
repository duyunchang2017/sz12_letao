/**
 * Created by lenovo on 2017/11/9 0009.
 */

////开启进度条 发ajax的时候开始
//NProgress.start();
////关闭进度条,ajax success的时候结束，即响应成功的时候结束
//setTimeout(function(){
//    NProgress.done();
//},1000)
//$(document).ajaxStart(function(){
//   console.log("ajax开始了");
//});
//
//
//$(document).ajaxStop(function(){
//    console.log("ajax结束了");
//});


//关闭进度环
NProgress.configure({ showSpinner: false });
$(document).ajaxStart(function(){
    NProgress.start();
});

$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },500)//因为是本地的，速度比较快，为了模拟真实性，给了500ms

});
//页面一加载，先发送一个判断用户是否登陆的请求，如果登录就不做任何事情，如果没有登录就跳转到登录页面
//非登录页发送这个ajax请求
//拿到这个登录地址，然后判断登录地址中是否有"index.html"这个字符串，用location.href.indexOf()这个方法
//只要包含肯定是>=0,只有-1才是不包含的
if(location.href.indexOf('login.html') == -1){
    $.ajax({
        type:'get',
        url:'/employee/checkRootLogin',
        success:function(data){
            //console.log(data);
            if(data.error === 400){
                location.href = "login.html";
            }
        }
    });
}

//二级菜单显示隐藏
$('.child').prev().on('click',function(){
    $(this).next().slideToggle();

});
//侧边栏显示隐藏
$('.btn_menu').on('click',function(){
    $('.lt_aside').toggleClass("now")
    $('.lt_main').toggleClass('now')
})
//退出功能
$('.btn_logout').on('click',function(){
  $('#logoutModal').modal('show');
    //on注册事件不会覆盖
//off()不传参时解绑所有的事件
//off('click')只解绑click事件
    $('.btn_conform').off().on('click',function(){
        //给服务器发送ajax请求，让服务器清除session
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            success:function(data){
                console.log(data);
                //先看打印出的结果，结果是{success: true}
               // {success: true}
                if(data.success){
                    //如果退出成功就跳到登录页去
                    location.href = "login.html";
                }
            }
        });
    });
});
