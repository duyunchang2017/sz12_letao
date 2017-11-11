/**
 * Created by lenovo on 2017/11/10 0010.
 */
$(function(){
    //页面一加载就要把用户的数据拿下来，发送ajax请求，获取到用户的数据
    //结合模板引擎，把数据渲染到页面
    var currentPage = 1;//用来记录当前页
    var pageSize = 5;//用来记录每页的条数


    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            success:function(data){
                console.log(data);
                var html= template('tpl',data);
                $('tbody').html(html);
                //渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(data.total/ pageSize),//总页数
                    size:"small",//设置控件的大小

                    //numberOfPages:10
                    //size:"small",//设置控件的大小，mini, small, normal,large
                    //前三个参数不用管，直接写a,b,c就可以
                    onPageClicked:function(a, b, c,page){
                        //    //为按钮绑定点击事件 page:当前点击的按钮值
                        //page指定的是点击的页码，修改了当前页
                        currentPage = page;
                        //重新渲染页面
                        render();
                    }


                })
            }
        });
    }
    //调用render
    render();

});