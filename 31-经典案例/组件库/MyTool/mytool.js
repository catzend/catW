var mytool = {
  // 1.绑定事件
  addHandler: (element, type, handler) => {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  // 2.取消绑定事件
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
  // 3.跨浏览器添加事件
  addEvent: function (obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) { //IE
      obj.attchEvent('on' + type, fn);
    }
  },
  // 4.跨浏览器移除事件
  removeEvent: function (obj, type, fn) {
    if (obj.removeEventListener) {
      obj.removeEventListener(type, fn, false);
    } else if (obj.detachEvent) { //兼容IE
      obj.detachEvent('on' + type, fn);
    }
  },
  //5.使用这个方法跨浏览器取得event对象
  getEvent: (event) => {
    return event ? event : window.event;
  },
  // 6.跨浏览器获取目标对象
  getTarget: (event) => {
    return event.target || event.srcElement;
  },
  // 7.跨浏览器阻止默认行为
  preventDefault: (event) => {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  // 8.阻止了事件冒泡，但不会阻击默认行为
  stopPropagation: (event) => {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },


  // 跨浏览器获取滚动条位置
  //跨浏览器获取滚动条位置，sp == scroll position
  /**
   * 返回网页被卷去的高、网页被卷去的左
   * @returns {{top: *, left: *}} top：被卷去的高 left：被卷去的左
   */
  scroll: function () {
    if (window.pageYOffset !== null) { // 最新的浏览器
      return {
        "top": window.pageYOffset,
        "left": window.pageXOffset
      }
    } else if (document.compatMode === 'CSS1Compat') { // W3C
      return {
        "top": document.documentElement.scrollTop,
        "left": document.documentElement.scrollLeft
      }
    }
    return {
      "top": document.body.scrollTop,
      "left": document.body.scrollLeft
    }
  },
  /**
    * 返回当前界面宽度和高度
    * @returns {{width: *, height: *}} width：当前界面宽度 height：当前界面高度
    */
  client: function () {
    if (window.innerWidth !== null) { // 最新的浏览器
      return {
        "width": window.innerWidth,
        "height": window.innerHeight
      }
    } else if (document.compatMode === 'CSS1Compat') { // W3C
      return {
        "width": document.documentElement.clientWidth,
        "height": document.documentElement.clientHeight
      }
    }
    return {
      "width": document.body.clientWidth,
      "height": document.body.clientHeight
    }
  },
  // 返回当前元素的上边界到它的包含元素的上边界的偏移量：obj.offset().top（在元素的包含元素含滚动条的情况下）
  // 返回当前元素的左边界到它的包含元素的左边界的偏移量：obj.offset().left（在元素的包含元素含滚动条的情况下）
  getOff: function (obj) {
    var top = obj.offset().top;
    var left = obj.offset().left;
    return {
      top: top,
      left: left
    }
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
  //以跨浏览器取得相同的字符编码，需在keypress事件中使用
  getCharCode: function (event) {
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
  },
  // 获取url地址？后面的具体参数值
  GetArgsFromHref: function (sArgName) {
    var sHref = top.location.href;
    var args = sHref.split("?");
    var retval = "";
    if (args[0] == sHref) {
      return retval;
    }
    var str = args[1];
    args = str.split("&");
    for (var i = 0; i < args.length; i++) {
      str = args[i];
      var arg = str.split("=");
      if (arg.length <= 1) continue;
      if (arg[0] == sArgName) retval = arg[1];
    }
    return retval;
  },

  /**
    * 检查obj元素是否的类名中是否有cs
    * @param {Element}obj
    * @param {string}cs
    * @returns {boolean} true有 false无
    */
  hasClassName: function (obj, cs) {
    var reg = new RegExp('\\b' + cs + '\\b');
    return reg.test(obj.className);
  },

  /**
   * 为obj添加类名cs
   * @param {Element}obj
   * @param {string}cs
   */
  addClassName: function (obj, cs) {
    if (!this.hasClassName(obj, cs)) {
      obj.className += ' ' + cs;
    }
  },

  /**
   * 移除所有 obj的cs类：
   * @param {Element}obj
   * @param {string}cs
   */
  removeClassName: function (obj, cs) {
    var reg = new RegExp('\\b' + cs + '\\b');
    // 删除class
    obj.className = obj.className.replace(reg, '');
  },

  /**
   * 对设置和移除obj元素的cs类进行切换：
   * @param {Element}obj
   * @param {string}cs
   */
  toggleClassName: function (obj, cs) {
    if (this.hasClassName(obj, cs)) {
      // 有， 删除
      this.removeClassName(obj, cs);
    } else {
      // 没有，则添加
      this.addClassName(obj, cs);
    }
  },

  /**
   * 控制元素是否显示
   * @param {Element}ele 元素节点
   */
  hide: function (ele) {
    ele.style.display = 'none'
  },
  show: function (ele) {
    ele.style.display = 'block'
  },

  /**
   * 获得某个元素的某个CSS属性
   * @param {Element}obj
   * @param {string}attr
   * @returns {string}
   */
  getCSSAttr: function (obj, attr) {
    if (obj.currentStyle) { // IE 和 opera
      return obj.currentStyle[attr];
    } else {
      return window.getComputedStyle(obj, null)[attr];
    }
  },

  /**
   * 更改某个元素的某个CSS属性
   * @param {Element}eleObj
   * @param {string}attr
   * @param {string | number}value
   */
  setCssAttr: function (eleObj, attr, value) {
    eleObj.style[attr] = value;
  },
  /**
   * 传入总秒数返回对应小时、分钟以及秒数
   * @param second 总秒数
   * @returns {{min: number , hour: number, second: number}}
   */
  secondToHourMinSecond: function (second) {
    return {
      "hour": Math.floor(second / (60 * 60)),
      "min": Math.floor(second % (60 * 60) / 60),
      "second": Math.floor(second % 60)
    }
  },
  // 毫秒格式化时间
  getLocalTime: function (time) {
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  },
  /**
   * 传入一个数字，如果是一位数字，前面补0.如果是两位，返回原值。
   * @param {number}num
   * @returns {number}
   */
  addZero: function (num) {
    return num < 10 ? '0' + num : num;
  },

  /**
   * 获取字符串真实长度，目前仅针对中文和英文字符串
   * @param {string}str
   * @returns {number}
   */
  getStrLength: function (str) {
    var len = 0, code = 0;
    for (var i = 0; i < str.length; i++) {
      code = str.charCodeAt(i);
      if (code >= 0 && code <= 127) {
        len += 1;
      } else {
        len += 2;
      }
    }
    return len;
  },
  // 判断是否是手机
  plat_is_mobile: function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return true;
    } else {
      return false;
    }
  },
  // 判断是否是微信
  isWeiXin: function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
  //前端手机px、rem尺寸转换js代码
  mobile: function () {
    var size = 100, //规定rem与px之间值的转换
      maxWidth = 750; //设置基准宽度。
    ratio = function () {
      var r = document.documentElement.clientWidth / maxWidth;
      return r >= 1 ? 1 : r <= 0.234 ? 0.234 : r;
    };
    set = function () {
      document.documentElement.style.fontSize = ratio() * size + 'px';
    }();
    window.onresize = mobile;
  }
}
