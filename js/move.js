/*
* @Author: anchen
* @Date:   2017-01-22 15:52:08
* @Last Modified by:   anchen
* @Last Modified time: 2017-02-06 09:54:45
*/
// 宽高 透明度变化
function getStyle(obj,attr){
if(obj.currentStyle){
    return obj.currentStyle[atrr];
}else{
    return getComputedStyle(obj,false)[attr];
}
}

function startMove(obj,attr,iTarget,fn){
        clearInterval(obj.timer);//目的是不要让多次点击的时候出现速度加倍（同时开了很多定时器）
        obj.timer=setInterval(function(){
            var icur=0;
            if(attr=='opacity'){
                icur=parseInt(parseFloat(getStyle(obj,attr)*100));
            }else{
                 icur=parseInt(getStyle(obj,attr));
            }
            var iSpeed=(iTarget-icur)/8;//取整
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
            if(icur==iTarget){
                clearInterval(obj.timer);
                if(fn){
                fn();
                }
            }else{
               if(attr=='opacity'){
               obj.style.filter='alpha(opacity:+'+icur+iSpeed+')';
               obj.style[attr]=(icur+iSpeed)/100;
            }else{
                obj.style[attr]=icur+iSpeed+'px';
            }
            }
        }, 30);
    }