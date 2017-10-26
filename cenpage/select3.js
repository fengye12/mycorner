/*
* @Author: anchen
* @Date:   2017-09-09 14:39:56
* @Last Modified by:   anchen
* @Last Modified time: 2017-10-20 09:58:58
*/

// 'use strict';
// ;(function(){
//     $.fn.extend({
//             'affix':function(opt){
//                 var DEFAULT = {
//                     'offLeft':'0',
//                     'offT':'0'
//                 };
//                 var options = $.extend({},DEFAULT,opt);
//                 this.each(function(){
//                     var obj = $(this);
//                     var offTop = obj.offset().top;
//                     $(window).bind('scroll',checkTop);
//                     function checkTop(){
//                         var scrollT = $(window).scrollTop();
//                         if(scrollT >= offTop) {
//                             obj.css({'position':'fixed','left':'0','top':options.offT});
//                         } else {
//                             obj.css({'position':'static'});
//                         }
//                     }
//                 });

//         }
//     });
// })($)
'use strict';
;(function(){
    $.fn.extend({
            'select3':function(opt){
                var DEFAULT = {
                    'animate':'slide',//动画方式,slide slideToggle fade ==fadeToggle
                    // 'time':'5',//动画时间
                    'value':"",//设置默认选中
                    callback:""//初始化后回调函数
                };
                var options = $.extend({},DEFAULT,opt);
                var initValue=options.value;
                    var obj = $(this);
                    var me2=this;
                    obj.find('select').remove();
                    var html='<select style="display:none">';
                    obj.find(".op-item").each(function(index, el) {
                      var value=$(this).data('value');
                      html+='<option value="'+value+'">'+$(this).text()+'</option>'
                    });
                    html+='</select>';
                    obj.append(html);
                    _callback(obj.find('select'));
                    function _callback(obj){
                        // var me=me2;
                        if(options.callback && $.type(options.callback) === "function"){
                            options.callback(obj);
                        }
                    }
                    if(options.value !=""){
                      obj.find('select').val(options.value);
                      obj.find('.op-item').each(function(index, el) {
                        if($(this).data('value')==options.value){
                          obj.find('.selected-item').text($(this).text());
                          $(this).addClass('op-itemSelect');
                        }else{
                          $(this).removeClass('op-itemSelect');
                        }
                      });
                    }
                    obj.find('.sel-wrap').unbind('click').bind('click', function(event) {
                     // if($(this).is(':hover')){
                    //   if(options.animate=="slide"){
                    //   $(this).next('.optionB').slideToggle(20);
                    // }else{
                      $(this).closest('.selectedB').find('.optionB').fadeToggle(20);
                      var _top= $(this).closest('.selectedB').find('.optionB').find('.op-item').last().offset().top-$(window).scrollTop();
                      console.log(_top)
                      if(_top>=$(window).height()-20){
                        var _height =-$(this).closest('.selectedB').find('.optionB').outerHeight()-5+"px";
                        $(this).next('.optionB').css({
                          top:_height
                        });
                      }
                      var selectedInit=obj.find("select").val();
                      obj.find('.op-item').each(function(index, el) {
                        if($(this).data('value')==selectedInit){
                          obj.find('.selected-item').text($(this).text());
                          $(this).addClass('op-itemSelect');
                        }else{
                          $(this).removeClass('op-itemSelect');
                        }
                      });
                    // }
                     // }
                    });
                     obj.find('.op-item').hover(function(event) {
                        // $(this).removeClass('op-itemSelect');
                          $(this).siblings().removeClass('op-itemSelect')
                      });
                      obj.find('.op-item').unbind('click').bind('click',function(event) {
                        $(this).closest('.selectedB').find('.selected-item').text($(this).text());
                        $(this).addClass('op-itemSelect');
                        $(this).siblings().removeClass('op-itemSelect')
                        var val=$(this).data('value');
                        if(val != initValue){
                         obj.find('select').val(val);
                         initValue=val;
                         obj.find('select').change();
                        }
                      obj.find('.optionB').slideUp(20);
                    });

                      $(document).click(function(e){
                        var _con = obj;   // 设置目标区域
                        if(!_con.is(e.target) && _con.has(e.target).length === 0){
                                if(options.animate=="slide"){
                                obj.find('.optionB').slideUp(20);
                              }else{
                                obj.find('.optionB').fadeOut(20);
                              }

                        }
                      });

        }
    });
})($)