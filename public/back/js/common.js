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
