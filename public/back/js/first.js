/**
 * Created by lenovo on 2017/11/11 0011.
 */
$(function(){
    //发送ajax获取一级分类的数据
    var currentPage = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,//前面是接口文档上的，后面的是自己写的
                pageSize:pageSize//前面是接口文档上的，后面的是自己写的
            },
            success:function(data){
                console.log(data);
                $('tbody').html(template('tpl',data));
                //初始化分页的控件
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked:function(a,b,c,page){
                        //修改成当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }





                });
            }
        });
    }
    render();

    //添加显示模态框
    $('.btn_add').on('click',function(){
        $('#addModal').modal('show');
    });
     //表单校验
    var $form = $('form');
    $form.bootstrapValidator({
        //指定小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields:{
            categoryName:{

                validators:{
                    //非空
                    notEmpty: {
                        message: '请输入一级分类'
                    },
                }
            }
        }

    });
    //注册表单校验成功事件，成功之后发送ajax请求
    $form.on('success.form.bv',function(e){
        //阻止默认提交
        e.preventDefault();
        //使用ajax进行提交
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            //用这个方法可以拿到form表单里面的数据
            data:$form.serialize(),
            success:function(data){
                if(data.success){
                    //隐藏模态框
                    $('#addModal').modal('hide');
                    //重新渲染第一页，因为添加的最新的数据在第一页
                    currentPage = 1;
                    render();
                    //重置模态框，方便下一次使用
                    //获取到表单校验的实例，重置校验的样式，重置样式用resetForm()方法
                    $form.data('bootstrapValidator').resetForm();
                    //重置表单的数据
                    //reset()方法是dom的方法，要把jquery对象转化成dom对象
                    $form[0].reset();
                }
            }
        });
    });

});