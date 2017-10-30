(function($) {
  "use strict";
  var areaSelection = (function() {
    function areaSelection(element, options) {
      this.settings = $.extend(true, $.fn.areaSelection.defaults, options || {});
      this.element = element;
      this.init();
    }
    // jQuery.fn = jQuery.prototype
    // jQuery.extend = jQuery.fn.extend = function() {
    //这里可以看出jQuery.extend和jQuery.fn.extend其实是同一个方法
    //不同的地方只是内部的this不同
    //调用$.extend() this 为$
    //调用$.fn.extend() this 为$.fn
    //所以如果传入两个对象的话，其功能是一样的
    //$.fn=$.prototype, so, $.fn.extend相当于是在jq中添加成员函数,只有jq实例调用
    //而$.extend是命名空间上添加新的函数,$.xxx()直接调用

    areaSelection.prototype = {
      /*说明：初始化插件*/
      /*实现：初始化dom结构，布局，分页及绑定事件*/

      init: function() {
        var me = this;
        // me.selectors = me.settings.selectors;
        // me.sections = me.selectors.sections;
        me.province_code = me.settings.province_code;
        me.city_code = me.settings.city_code;
        me.area_code = me.settings.area_code;
        me.street_code = me.settings.street_code;
        me.ltype = me.settings.ltype;
        me.animateFunction = me.settings.animateFunction;

        var html = '<div class="dataList"><div class="checkTab"><a class="active" data-count="0">省份</a> <a data-count="1" class="">城市</a> <a data-count="2" class="">区县</a> <a data-count="3" class="">街道</a></div><div class="arealist"><ul class="provinceData"></ul><ul class="cityData"></ul><ul class="areaData"></ul><ul class="streetData"></ul></div></div>'
        me.element.append(html);
        me.element.css({
          // "width": "100%",
          "position": "relative",

        });
        me.element.find('.dataList').css({
          "display": "none"

        });

        me.element.find('input').click(function(event) {
          me.element.find(".dataList").slideToggle(100);
          $(document).click(function(e) {
            var _con = me.element; // 设置目标区域
            if (!_con.is(e.target) && _con.has(e.target).length === 0) {
              me.element.find('.dataList').slideUp(100);
              // if(me.animateFunction=="fadeToggle"){
              //    me.element.find(".dataList").fadeToggle(100);
              // }else  if(me.animateFunction=="slideToggle"){
              //     me.element.find(".dataList").slideToggle(100);
              // }else if(me.animateFunction=="toggle"){
              //     me.element.find(".dataList").slideUp(100);
              // }
            }
          });


        });
        me.element.find(".checkTab a").click(function(event) {
          var index = $(this).data('count');
          var $current = me.element.find(".arealist ul").eq(index).find("li");
          if ($current.length == 0) {
            return
          } else {
            $(this).siblings('a').removeClass('active');
            $(this).addClass('active');
            me.element.find(".arealist ul").eq(index).css('display', 'block').siblings('ul').css('display', 'none');
          }
        });
        me._select();
        me._getData("0", "");
        //  document.onclick = function(){
        //       me.element.find('.dataList').hide();
        //     };
        //     me.element.click(function(e) {
        //       stopPropagation(e);
        //     });
        // function stopPropagation(e) {
        // if (e.stopPropagation)
        // e.stopPropagation();
        // else
        // e.cancelBubble = true;
        // }

      },
      _getData: function(ltype, skey) {
        var dataJson = '{"action":"17","time":"","sessid":"","rannum":"","md5ver":"","param":[{"ltype":"' + ltype + '","skey":"' + skey + '"}]}';

        var me = this;
        $.ajax({
          async: true,
          url: systemUrl + '/request/action',
          data: dataJson,
          method: 'POST',
          contentType: 'application/json;charset=UTF-8',
          success: function(res, tstatus, jqxhr) {
            var data = GetOjson(json_parse(res));
            if (data.status == 0) {
              if (ltype == 0) {
                me.element.find(".provinceData").empty();
                $.each(data.param, function(index, val) {
                  me.element.find(".provinceData").append('<li data-id="' + val.did + '" title="' + val.dname + '" data-ltype="' + ltype + '">' + val.dname + '</li>');
                  me.element.find(".provinceData").css('display', 'block').siblings('ul').css('display', 'none');
                });
                if (me.province_code != "") {
                  var idList = me.element.find(".provinceData li");
                  $.each(idList, function(index, val) {
                    if (me.province_code == $(this).data('id')) {
                      $(this).click();
                    }
                  });
                }
              } else if (ltype == 1) {
                me.element.find(".cityData").empty();
                $.each(data.param, function(index, val) {
                  me.element.find(".cityData").append('<li data-id="' + val.did + '" title="' + val.dname + '" data-ltype="' + ltype + '">' + val.dname + '</li>')
                  me.element.find(".cityData").css('display', 'block').siblings('ul').css('display', 'none');
                });
                if (me.city_code != "") {
                  var idList = me.element.find(".cityData li");
                  $.each(idList, function(index, val) {
                    if (me.city_code == $(this).data('id')) {
                      $(this).click();
                    }
                  });
                }
              } else if (ltype == 2) {
                me.element.find(".areaData").empty();
                $.each(data.param, function(index, val) {
                  me.element.find(".areaData").append('<li data-id="' + val.did + '" title="' + val.dname + '" data-ltype="' + ltype + '">' + val.dname + '</li>')
                  me.element.find(".areaData").css('display', 'block').siblings('ul').css('display', 'none');
                });
                if (me.area_code != "") {
                  var idList = me.element.find(".areaData li");
                  $.each(idList, function(index, val) {
                    if (me.area_code == $(this).data('id')) {
                      $(this).click();
                    }
                  });
                }
              } else if (ltype == 3) {
                me.element.find(".streetData").empty();
                $.each(data.param, function(index, val) {
                  me.element.find(".streetData").append('<li data-id="' + val.did + '" title="' + val.dname + '" data-ltype="' + ltype + '">' + val.dname + '</li>')
                  me.element.find(".streetData").css('display', 'block').siblings('ul').css('display', 'none');
                });
                if (me.street_code != "") {
                  var idList = me.element.find(".streetData li");
                  $.each(idList, function(index, val) {
                    if (me.street_code == $(this).data('id')) {
                      $(this).click();
                    }
                  });
                }
              }
            } else if (data.status == 9) {
              window.location.href = "index.html?loginOut=true"
            } else {
              layer.msg(data.info)
            }
          },
          error: function(jqxhr, tstatus, errmsg) {
            layer.msg('网络链接失败')
          }
        });

      },
      _select: function() {
        var me = this;
        me.element.find(".arealist").on('click', 'li', function(event) {
          var ltype = $(this).data('ltype') + 1;
          $(this).closest('ul').find('li').removeClass('active');
          $(this).addClass('active');
          if (ltype == 4) {
            me.element.find(".dataList").slideUp(100);

            var select = [me.element.find(".provinceData .active").text(), me.element.find(".cityData .active").text(), $(".areaData .active").text(), me.element.find(".streetData .active").text()]
            var selectCode = [me.element.find(".provinceData .active").data('id'), me.element.find(".cityData .active").data('id'), me.element.find(".areaData .active").data('id'), me.element.find(".streetData .active").data('id')]
            me.element.find('input').val(select.join(''));
            me.element.find('input').attr('code', selectCode.join(','))
            me.element.find('input').attr('name', select.join(','))
            console.log(selectCode)
            me._callback();
            return;
          } else {
            me.element.find(".checkTab a").removeClass('active');
            me.element.find(".checkTab a").eq(ltype).addClass('active');
            var skey = $(this).data('id');
            me._getData(ltype, skey);
          }

        });
      },
      _callback: function() {
        var me = this;
        if (me.settings.callback && $.type(me.settings.callback) === "function") {
          me.settings.callback();
        }
      }


    }
    return areaSelection;
  })();
  $.fn.areaSelection = function(options) {
    return this.each(function() {
      var me = $(this),
        instance = me.data("areaSelection");

      if (!instance) {
        me.data("areaSelection", (instance = new areaSelection(me, options)));
      }

      if ($.type(options) === "string") return instance[options]();
    });
  };
  $.fn.areaSelection.defaults = {
    // selectors : {
    //     sections : ".selectBox"
    // },
    animateFunction: "slideToggle", //动画效果
    callback: "", //回调函数
    province_code: "370000", //默认城市的code
    city_code: "370300", //默认城市的code
    area_code: "370305", //默认城市的code
    street_code: "370305003", //默认城市的code
    ltype: "0" //获取省市县的方式
  };
})(jQuery);