var eventUntil = {
  // 绑定事件
  addHandler: (element, type, handler) => {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  // 取消绑定事件
  removeHandler: (element, type, handler) => {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler);
    } else if (element.attachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      //属性置空就可以
      element['on' + type] = null;
    }
  },
  // 跨浏览器添加事件
  addEvent: function (obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) { //IE
      obj.attchEvent('on' + type, fn);
    }
  },
  // 跨浏览器移除事件
  removeEvent: function (obj, type, fn) {
    if (obj.removeEventListener) {
      obj.removeEventListener(type, fn, false);
    } else if (obj.detachEvent) { //兼容IE
      obj.detachEvent('on' + type, fn);
    }
  },
  //使用这个方法跨浏览器取得event对象
  getEvent: (event) => {
    return event ? event : window.event;
  },
  // 跨浏览器获取目标对象
  getTarget: (event) => {
    return event.target || event.srcElement;
  },
  // 跨浏览器阻止默认行为
  preventDefault: (event) => {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  stopPropagation: (event) => {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },


  // 跨浏览器获取滚动条位置
  //跨浏览器获取滚动条位置，sp == scroll position
  // getSP: function () {
  //     return {
  //         top = document.documentElement.scrollTop || document.body.scrollTop,
  //         left = document.documentElement.scrollLeft || document.body.scrollLeft
  //     }
  // },
  getTop: function () {
    return document.documentElement.scrollTop || document.body.scrollTop
  },
  getLeft: function () {
    return document.documentElement.scrollLeft || document.body.scrollLeft
  },
  // 返回当前元素的上边界到它的包含元素的上边界的偏移量：obj.offset().top（在元素的包含元素含滚动条的情况下）
  // 返回当前元素的左边界到它的包含元素的左边界的偏移量：obj.offset().left（在元素的包含元素含滚动条的情况下）
  getOffTop: function (obj) {
    return obj.offset().top;
  },
  getOffLeft: function (obj) {
    return obj.offset().left;
  },
  // e.scrrenX,e.scrent.Y表示鼠标距离屏幕的距离
  getScreeX: function (event) {
   return e.scrrenX;
  },
  getScreeY: function (event) {
    return e.screntY;
  },
    // 获取鼠标相对于文档的位置,即页面坐标位置
    getPagePosition: function (event) {
      var pageX = event.pageX,
        pageY = event.pageY;
      if (pageX == undefined) {
        pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
      }
      if (pageY == undefined) {
        pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
      }
      return {
        pageX: pageX,
        pageY: pageY
      };
    },
    // e.offsetX,e.offsetY表示鼠标点击位置距离事件源对象的位置
    getOffsetX: function (event) {
      return e.offsetX;
     },
     getOffsetX: function (event) {
       return e.offsetY;
     },
  // 获取浏览器显示区域（可视区域）的高度 ：
  // $(window).height();
  // 获取浏览器显示区域（可视区域）的宽度 ：
  // $(window).width();
  // 获取页面的文档高度
  // $(document).height();
  // 获取页面的文档宽度 ：
  // $(document).width();
  // 浏览器当前窗口文档body的高度：
  // $(document.body).height();
  // 浏览器当前窗口文档body的宽度：
  // $(document.body).width();
  // 获取滚动条到顶部的垂直高度 (即网页被卷上去的高度)
  // $(document).scrollTop();
  // 获取滚动条到左边的垂直宽度 ：
  // $(document).scrollLeft();
  // 获取或设置元素的宽度：
  // $(obj).width();
  // 获取或设置元素的高度：
  // $(obj).height();
  // 某个元素的上边界到body最顶部的距离：obj.offset().top;（在元素的包含元素不含滚动条的情况下）
  // 某个元素的左边界到body最左边的距离：obj.offset().left;（在元素的包含元素不含滚动条的情况下）

  // 跨浏览器获取可视窗口大小
  getWindow: function () {
    if (typeof window.innerWidth != 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  },
  // IE下： mousewheel事件，wheelDelta属性表示鼠标滚动方向，是120的倍数。向上表示+120，向下表示-120。
  // FF下：DOMMouseScroll事件，detail属性。向上表示-3，向下表示+3。
  getWheelDelta: function (event) { //获取表示鼠标滚轮滚动方向的数值
    if (event.wheelDelta) {
      return event.wheelDelta;
    } else {
      return -event.detail * 40;
    }
  },
  getCharCode: function (event) { //以跨浏览器取得相同的字符编码，需在keypress事件中使用
    if (typeof event.charCode == "number") {
      return event.charCode;
    } else {
      return event.keyCode;
    }
  },
  //获取mouseover和mouseout相关元素
  //  mouseout以及mouseover事件中，有元素得到光标，就一定有元素失去光标。对于mouseout来说，失去光标的是主元素，得到光标的则是相关元素。mouseover则正好相反。
  getRelatedTarget: function (event) {
    if (event.relatedTarget) {
      return event.relatedTarget;
    } else if (event.toElement) { //兼容IE8-
      return event.toElement;
    } else if (event.formElement) {
      return event.formElement;
    } else {
      return null;
    }
  },
  //获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
  // case 0: do something
  //     case 1: do something
  //     case 2: do something
  //     case 3: do something
  //     case 4: do something
  //     case 5: do something
  //     case 6: do something
  //     case 7: do something
  getButton: function (event) {
    if (document.implementation.hasFeature("MouseEvents", "2.0")) {
      return event.button;
    } else {
      switch (event.button) { //将IE模型下的button属性映射为DOM模型下的button属性
        case 0: //表示没有按下按钮
        case 1: //按下主鼠标按钮
        case 3: //同时按下，主次鼠标按钮
        case 5: //按下主，中间按钮
        case 7: //同时按下三个按钮
          return 0; //按下的是鼠标主按钮（一般是左键）
        case 2: //按下次鼠标按钮
        case 6: //按下次，中间按钮
          return 2; //按下的是中间的鼠标按钮
        case 4: //按下中间按钮
          return 1; //鼠标次按钮（一般是右键）
      }
    }
  },
  //获取剪切板中的值
  getClipboardText: function (event) {
    var clipboardData = (event.clipboardData || window.clipboardData);
    return clipboardData.getData("text");
  },
  //设置剪切板中的值
  setClipboardText: function (event, value) {
    if (event.clipboardData) {
      return event.clipboardData.setData("text/plain", value);
    } else if (window.clipboardData) {
      window.clipboardData.setData("text", value);
    }
  },
  // (1) 对表单字段的名称和值进行 URL 编码,使用和号(&)分隔。

  // (2) 不发送禁用的表单字段。

  // (3) 只发送勾选的复选框和单选按钮。

  // (4) 不发送 type 为"reset"和"button"的按钮。

  // (5) 多选选择框中的每个选中的值单独一个条目。

  // (6) 在单击提交按钮提交表单的情况下,也会发送提交按钮;否则,不发送提交按钮。也包括 type为"image"的<input>元素。

  // (7) <select>元素的值,就是选中的<option>元素的 value 特性的值。如果<option>元素没有value 特性,则是<option>元素的文本值。
  serialize: function (form) {
    var parts = [],
      field = null,
      i,
      len,
      j,
      optLen,
      option,
      optValue;
    for (i = 0, len = form.elements.length; i < len; i++) {
      field = form.elements[i];
      switch (field.type) {
        case "select-one":
        case "select-multiple":
          if (field.name.length) {
            for (j = 0, optLen = field.options.length; j < optLen; j++) {
              option = field.options[j];
              if (option.selected) {
                optValue = "";
                if (option.hasAttribute) {
                  optValue = (option.hasAttribute("value") ? option.value : option.text);
                } else {
                  optValue = (option.attributes["value"].specified ? option.value : option.text);
                }
                parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
              }
            }
          }
          break;
        case undefined: //字段集
        case "file": //文件输入
        case "submit": //提交按钮
        case "reset": //重置按钮
        case "button": //自定义按钮
          break;
        case "radio": //单选按钮
        case "checkbox": //复选框
          if (!field.checked) {
            break;
          }
        // 执行默认操作
        default:
          //不包含没有名字的表单字段
          if (field.name.length) {
            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
          }
      }
    }
    return parts.join("&");
  }



};
document.body.onscroll = function () {
  e = eventUntil.getEvent(e);
  // console.log(document.body.scrollTop);
  // console.log(document.documentElement.scrollTop);
  console.log(eventUntil.getTop())
}
document.body.onmousedown = function () {
  e = eventUntil.getEvent(e);
  console.log(eventUntil.getPagePosition(e));
  console.log(eventUntil.getPagePosition(e).pageY)

}
