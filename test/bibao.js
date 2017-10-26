/*
* @Author: anchen
* @Date:   2017-09-30 09:44:55
* @Last Modified by:   anchen
* @Last Modified time: 2017-09-30 10:13:33
*/

'use strict';
function f1(){

 var n=999;

 function f2(){
console.log(n);
　 }

　　　　return f2;
}

var result=f1();

result(); // 999
// 闭包:讲白了就是 利用一种方式实现访问局部变量的功能；
// 所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
// 为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。
// 函数内部return一个函数的使用方法
// var result=f1();第一次调用时创建额一个函数体
// result();第二次调用是调用内部函数




// 这说明，类似于这种，在一个函数内返回一个已经声明的函数，其实是调用已经声明的函数，跟上面的情况是不一样的
function infun(obj1, obj2) {
    console.log(obj1 + " -- " + obj2);
        return obj1 + obj2;
}
function create2(pro) {
    console.log("pro = " + pro);
      var obj1 = 1, obj2 = 2;
        return infun(obj1, obj2); // 这个时候,会报错
}
var c1 = create2("pro");
console.log(c1)


// var add = function(x){
//     var sum = 1;
//     var tmp = function(x){
//         sum = sum + x;
//     return tmp;
//     }
//     tmp.toString = function(){
//         return sum;
//     }
//     return tmp;
// }
// var add=add();
// console.log(add(1)(2)(3));