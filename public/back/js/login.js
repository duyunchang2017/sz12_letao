/**
 * Created by lenovo on 2017/11/9 0009.
 */
$(function(){
    //登录表单校验
    //用户名不能为空
    //用户密码不能为空
    //密码的长度是6-12位
    //获取到表单
    var $form = $('form');
    //校验表单

    $form.bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格,配置校验是的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. ，规则，指定校验字段fields(字段)
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                //validators里面写username所有的校验规则
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    //stringLength: {
                    //    min: 6,
                    //    max: 30,
                    //    message: '用户名长度必须在6到30之间'
                    //},
                    //正则校验
                    //regexp: {
                    //    regexp: /^[a-zA-Z0-9_\.]+$/,
                    //    message: '用户名由数字字母下划线和.组成'
                    //}
                }
            },
            password:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    ///长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    },
                }

            }

        }

    });
    //给表单注册一个校验成功事件 success.form.bv
    $form.on('success.form.bv', function (e) {
        //阻止默认行为
        e.preventDefault();
        console.log($form.serialize());
        //使用ajax发送登录请求
        $.ajax({
            url:'/employee/employeeLogin',
            type:"post",
            data:$form.serialize(),
            dataType:'json',//dataType默认是json格式的数据类型，如果
            //dataType是json格式的数据类型，dataType就可以不写，如果
            //是text/html,即字符串就需要写
            success:function(data){
                //做判断data是一个对象
                if(data.success){
                    //跳转到首页
                    location.href = "index.html";
                }
                if(data.error === 1000){
                   alert('用户名不存在');
                }
                if(data.error === 1001 ){
                    alert('密码错误');
                }

            }


        });

    });
});