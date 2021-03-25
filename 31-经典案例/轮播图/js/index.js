/*
 * @Description:
 * @Version: 1.0
 * @Autor: catzend
 * @Date: 2021-03-25 17:39:17
 * @LastEditors: catzend
 * @LastEditTime: 2021-03-25 18:19:12
 */

var oBox = document.getElementById("box");
var list = document.getElementById("list");
list.innerHTML += list.innerHTML;


var left = 0;
var timer;
move()
function move() {
    // 先取消动画
    clearInterval(timer);
    timer = setInterval(() => {
        left -= 4;
        if(left<-1260){
            left = 0;
            list.style.left = left+"px"
        }
        list.style.left = left+"px";
    }, 50);

}
oBox.onmouseenter = function(){
    clearTimeout(timer)
}
oBox.onmouseleave = function(){
    move();
}
