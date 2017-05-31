/*
* @Author: anchen
* @Date:   2016-12-03 11:54:13
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-08 14:04:33
*/
jQuery(document).ready(function($) {
  //选中添加对号
        var EachLi=$('.ConsultantsMes');
        EachLi.each(function(index, el) {
            $(this).on("click",function(){
                EachLi.find(".checked").removeClass('none')
                $(this).find(".checked").addClass("none")
            })
        });
        //查找哪个是选中状态
        var cBtn=$("#cBtn");
        var consultantM=$(".ConsultantM")
            cBtn.on("click",function(){
                var checkedC=consultantM.find(".none").eq(0).parents(".ConsultantsBox").find(".named").text();
                console.log(checkedC)
                window.open("chart.html", "_self")
            })
        var Box1=$(".box1");
        var add=$(".box1 .img2");
        var imgback=$(".box1 .img1");
        var bianjiBtn=$(".bianji");
        //返回上一页面
        imgback.on("click",function(){
            window.history.go(-1);
        })
        //添加 编辑时页面跳转
        add.on('click', function(event) {
            window.open("add-modify-con.html","_self")
        });
       bianjiBtn.on('click', function(event) {
         window.open("add-modify-con.html","_self")
       });

});