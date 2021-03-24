var eventUntil = {
  // 输入一个值，返回其数据类型
  type: function (para) {
    return Object.prototype.toString.call(para)
  },
  // 数组去重
  // function unique1(arr) {
  //   return [...new Set(arr)]
  // }

  // function unique2(arr) {
  //   var obj = {};
  //   return arr.filter(ele => {
  //       if (!obj[ele]) {
  //           obj[ele] = true;
  //           return true;
  //       }
  //   })
  // } 

  unique: function (arr) {
    var result = [];
    arr.forEach(ele => {
      if (result.indexOf(ele) == -1) {
        result.push(ele)
      }
    })
    return result;
  },
  // 封装mychildren，解决浏览器的兼容问题
  myChildren: function (e) {
    var children = e.childNodes,
      arr = [],
      len = children.length;
    for (var i = 0; i < len; i++) {
      if (children[i].nodeType === 1) {
        arr.push(children[i])
      }
    }
    return arr;
  },
  // 判断元素有没有子元素
  hasChildren: function (e) {
    var children = e.childNodes,
      len = children.length;
    for (var i = 0; i < len; i++) {
      if (children[i].nodeType === 1) {
        return true;
      }
    }
    return false;
  },
  getDateTime: function () {
    var date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours() + 1,
      minute = date.getMinutes(),
      second = date.getSeconds();
    month = checkTime(month);
    day = checkTime(day);
    hour = checkTime(hour);
    minute = checkTime(minute);
    second = checkTime(second);
    function checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    return "" + year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒"
  },
  // 获取任一元素的任意属性
  getStyle: function (elem, prop) {
    return window.getComputedStyle ? window.getComputedStyle(elem, null)[prop] : elem.currentStyle[prop]
  },
  // 运动函数
  animate: function (obj, json, callback) {
    clearInterval(obj.timer);
    var speed,
      current;
    obj.timer = setInterval(function () {
      var lock = true;
      for (var prop in json) {
        if (prop == 'opacity') {
          current = parseFloat(window.getComputedStyle(obj, null)[prop]) * 100;
        } else {
          current = parseInt(window.getComputedStyle(obj, null)[prop]);
        }
        speed = (json[prop] - current) / 7;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (prop == 'opacity') {
          obj.style[prop] = (current + speed) / 100;
        } else {
          obj.style[prop] = current + speed + 'px';
        }
        if (current != json[prop]) {
          lock = false;
        }
      }
      if (lock) {
        clearInterval(obj.timer);
        typeof callback == 'function' ? callback() : '';
      }
    }, 30)
  },
  // 弹性运动
  ElasticMovement: function (obj, target) {
    clearInterval(obj.timer);
    var iSpeed = 40,
      a, u = 0.8;
    obj.timer = setInterval(function () {
      a = (target - obj.offsetLeft) / 8;
      iSpeed = iSpeed + a;
      iSpeed = iSpeed * u;
      if (Math.abs(iSpeed) <= 1 && Math.abs(a) <= 1) {
        console.log('over')
        clearInterval(obj.timer);
        obj.style.left = target + 'px';
      } else {
        obj.style.left = obj.offsetLeft + iSpeed + 'px';
      }
    }, 30);
  },
  // 获取url中的参数
  getWindonHref: function () {
    var sHref = window.location.href;
    var args = sHref.split('?');
    if (args[0] === sHref) {
      return '';
    }
    var hrefarr = args[1].split('#')[0].split('&');
    var obj = {};
    for (var i = 0; i < hrefarr.length; i++) {
      hrefarr[i] = hrefarr[i].split('=');
      obj[hrefarr[i][0]] = hrefarr[i][1];
    }
    return obj;
  },
  // 原生js封装ajax
  ajax: function (method, url, callback, data, flag) {
    var xhr;
    flag = flag || true;
    method = method.toUpperCase();
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(2)
        callback(xhr.responseText);
      }
    }

    if (method == 'GET') {
      var date = new Date(),
        timer = date.getTime();
      xhr.open('GET', url + '?' + data + '&timer' + timer, flag);
      xhr.send()
    } else if (method == 'POST') {
      xhr.open('POST', url, flag);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(data);
    }
  },
  // 异步加载script
  loadScript: function (url, callback) {
    var oscript = document.createElement('script');
    if (oscript.readyState) { // ie8及以下版本
      oscript.onreadystatechange = function () {
        if (oscript.readyState === 'complete' || oscript.readyState === 'loaded') {
          callback();
        }
      }
    } else {
      oscript.onload = function () {
        callback()
      };
    }
    oscript.src = url;
    document.body.appendChild(oscript);
  },
  // cookie = {
  //   set: function (name, value, time) {
  //     document.cookie = name + '=' + value + '; max-age=' + time;
  //     return this;
  //   },
  //   remove: function (name) {
  //     return this.setCookie(name, '', -1);
  //   },
  //   get: function (name, callback) {
  //     var allCookieArr = document.cookie.split('; ');
  //     for (var i = 0; i < allCookieArr.length; i++) {
  //       var itemCookieArr = allCookieArr[i].split('=');
  //       if (itemCookieArr[0] === name) {
  //         return itemCookieArr[1]
  //       }
  //     }
  //     return undefined;
  //   }
  // },
  // 防抖
  debounce: function (handle, delay) {
    var timer = null;
    return function () {
      var _self = this,
        _args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        handle.apply(_self, _args)
      }, delay)
    }
  },
  // 节流
  throttle: function (handler, wait) {
    var lastTime = 0;
    return function (e) {
      var nowTime = new Date().getTime();
      if (nowTime - lastTime > wait) {
        handler.apply(this, arguments);
        lastTime = nowTime;
      }
    }
  },
  // jsonp底层方法
  jsonp: function (url, callback) {
    var oscript = document.createElement('script');
    if (oscript.readyState) { // ie8及以下版本
      oscript.onreadystatechange = function () {
        if (oscript.readyState === 'complete' || oscript.readyState === 'loaded') {
          callback();
        }
      }
    } else {
      oscript.onload = function () {
        callback()
      };
    }
    oscript.src = url;
    document.body.appendChild(oscript);
  },
  // 获取url上的参数
  getUrlParam:function (sUrl, sKey) {
    var result = {};
    sUrl.replace(/(\w+)=(\w+)(?=[&|#])/g, function (ele, key, val) {
        if (!result[key]) {
            result[key] = val;
        } else {
            var temp = result[key];
            result[key] = [].concat(temp, val);
        }
    })
    if (!sKey) {
        return result;
    } else {
        return result[sKey] || '';
    }
}
}
