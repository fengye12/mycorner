/*
* @Author: anchen
* @Date:   2016-12-06 15:25:19
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-08 17:41:46
*/
window.onload = function() {
    $(function(){
            // dropload
            $('.ContentBox').dropload({
                scrollArea : window,
                distance:70,
                domUp : {
                    domClass   : 'dropload-up',
                    domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
                    domUpdate  : '<div class="dropload-update">↑释放更新</div>',
                    domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
                },
                loadUpFn : function(me){
                  var TextDiv=$('#content');
                  TextDiv.prepend("<div class='consultant clearfix'><p class='textcenter date'>10-12 10:25</p><img src='images/personalH.png' class='conHeader'/><div class='bgColor content'><p>您好，我有题目不会做,您这边能帮我解答一下吗？</p><div class='Triangle1'></div></div></div>")
                  me.resetload();
              },
          });
        });
        var maoC=$("#subBtn");
        maoC.trigger('click');
        var sendBtn=$(".send");
        sendBtn.on("click",function(){
         maoC.trigger('click');
     })
}