window.addEventListener("load", function () {
    // 使用事件委托
    var oUl = document.getElementById("list");
    var contents = document.querySelectorAll(".content-part");
    var lists = oUl.querySelectorAll("li");
    // 事件委托点击事件
    // oUl.onclick = function () {
    //   var e = window.event || event;

    // }
    var result = [];
    colotArr = ["blue", "aqua", "darksalmon", "darkorange", "green"]
    for (var i = 0; i < contents.length; i++) {
      result.push(contents[i].offsetTop);
      contents[i].style.backgroundColor = colotArr[i]
    }
    result.push(Infinity);
    var num = 0;
    window.onscroll = function () {
      var scrollTop = document.documentElement.scrollTop;
      for (var i = 0; i < result.length; i++) {
        if (result[i] <= scrollTop && result[i + 1] > scrollTop) {
          lists[i].className = "current";
          num = i;
        } else {
          lists[i].className = " ";
        }
      }
    }
    for (let i = 0; i < lists.length; i++) {
      (function (i) {
        lists[i].onclick = function () {
          // lists[i].className = "current";
          for (var j = 0; j < lists.length; j++) {
            lists[j].className = '';
          }
          this.className = "current";
          console.log(i);
          document.documentElement.scrollTop = result[i];
        }
      })(i)
    }

  })
