/**
 * Created by lenovo on 2017/11/10 0010.
 */
$(function(){
    //ҳ��һ���ؾ�Ҫ���û�������������������ajax���󣬻�ȡ���û�������
    //���ģ�����棬��������Ⱦ��ҳ��
    var currentPage = 1;//������¼��ǰҳ
    var pageSize = 5;//������¼ÿҳ������


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
                //��Ⱦ��ҳ
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,//Ĭ����2�������bootstrap3�汾�������������
                    currentPage:currentPage,//��ǰҳ
                    totalPages:Math.ceil(data.total/ pageSize),//��ҳ��
                    size:"small",//���ÿؼ��Ĵ�С

                    //numberOfPages:10
                    //size:"small",//���ÿؼ��Ĵ�С��mini, small, normal,large
                    //ǰ�����������ùܣ�ֱ��дa,b,c�Ϳ���
                    onPageClicked:function(a, b, c,page){
                        //    //Ϊ��ť�󶨵���¼� page:��ǰ����İ�ťֵ
                        //pageָ�����ǵ����ҳ�룬�޸��˵�ǰҳ
                        currentPage = page;
                        //������Ⱦҳ��
                        render();
                    }


                })
            }
        });
    }
    //����render
    render();

});