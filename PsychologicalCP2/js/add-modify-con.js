/*
* @Author: anchen
* @Date:   2016-12-03 11:54:13
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-08 12:45:06
*/
jQuery(document).ready(function($) {
    //返回上一页
        var imgback=$(".box3 .img1");
        imgback.on("click",function(){
            window.history.go(-1);
        })

});