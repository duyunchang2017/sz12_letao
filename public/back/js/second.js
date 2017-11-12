/**
 * Created by lenovo on 2017/11/12 0012.
 */
$(function(){

    //分页渲染
    var currentPage = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                //console.log(data);
                $('tbody').html(template('tpl',data));
                //渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                });
            }
        });


    }
    render();


//添加二级分类
//弹出模态框
    $('.btn_add').on('click',function(){
        $('#addModal').modal('show');

        //发送ajax请求，获取所有一级分类的数据，动态渲染到ul中
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(data){
                console.log(data);


                $(".dropdown-menu").html(template('tpl2',data));
            }
        });
    });

    //要给下拉框中所有的a标签注册点击事件（委托事件）
    $('.dropdown-menu').on('click','a', function () {
       //获取到当前a标签的内容，设置给谁
       $('.dropdown-text').text($(this).text());
        //修改input框的value值,获取到自定义属性id
        $('#categoryId').val($(this).data('id'));

    })







    //初始化文件上传
    $("#fileupload").fileupload({
        dataType:"json",
        //文件上传完成时，会执行的回调函数，通过这个函数就能获取到图片的地址
        //第二个参数就有上传的结果 data.result
        done:function (e, data) {
            //console.log("图片上传完成拉");
            console.log(data);
            //console.log(data.result.picAddr);
            $(".img_box img").attr("src", data.result.picAddr);
            ////把图片的地址放到隐藏域中
            $("#brandLogo").val( data.result.picAddr );
            //
            ////让brandLogo校验成功
            //$form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });







});