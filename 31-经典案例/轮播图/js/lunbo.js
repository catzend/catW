var oBox = document.getElementById("box");
var list = document.getElementById("list");
var leftBtn = document.getElementById("leftBtn");
var rightBtn = document.getElementById("rightBtn");
var cloneLi = list.firstElementChild.cloneNode(true);
list.appendChild(cloneLi);
var left = 0;
var timer;
var idx = 0;

// 节流锁
var lock = true;
rightBtn.onclick = function () {
    if (!lock) return;
    list.style.transition = "left .5s ease 0s";
    // 核心代码
    idx++;
    if (idx > 4) {
        setTimeout(() => {
            list.style.transition = "none";
            idx = 0;
            list.style.left = -idx * 650 + "px";
        }, 500);
    }
    list.style.left = -idx * 650 + "px";
    lock = false;
    setTimeout(() => {
        lock = true;
    }, 500);
}
leftBtn.onclick = function () {
    if (!lock) {
        return
    };
    if (idx == 0) {
        list.style.transition = "none";
        idx = 5;
        list.style.left = -idx * 650 + "px";
        setTimeout(function () {
            list.style.transition = "left .5s ease 0s";
            idx = 4;
            list.style.left = -idx * 650 + "px";
        }, 0)
    } else {
        idx--;
        list.style.left = -idx * 650 + "px";
    }
    lock= false;
    setTimeout(() => {
        lock = true;
    }, 500);
}

