/*
 * @Author: your name
 * @Date: 2021-03-23 16:17:56
 * @LastEditTime: 2021-03-24 23:00:04
 * @LastEditors: catzend
 * @Description: In User Settings Edit
 * @FilePath: \catW\JavaScript设计模式\01-认识对象类.js
 */
// 1.用对象收编变量
var checkObject = {
  checkName: function () { },
  checkEmail: function () { },
  checkPassword: function () { }
}
// 2.用类创建对象


var CheckObj = function () {
  this.checkName = function () { },
    this.checkName = function () { },
    this.checkName = function () { }
}

//实例化
var a = new CheckObj();
a.checkName();


// 3.方法的另类使用方式

var Check = function () { };

Check.prototype.checkName = function () { };
Check.prototype.checkEmail = function () { };
Check.prototype.checkPassword = function () { };

var a = new Check();
a.checkName();

// 4.链式方法
// 方法一
var MObj = function () { };
MyObj.prototype = {
  checkName: function () {
    return this;
  },
  checkEmail: function () {

    return this;
  },
  checkPassword: function () {

    return this;
  }
}
var My = new MObj();
My.checkName().checkEmail().checkPassword();
// 方法二

var CheckObj = {
  checkName: function () { return this },
  checkEmail: function () { return this },
  checkPassword: function () { return this },
};
var a = new CheckObj();
a.checkName().checkEmail().checkPassword();

console.log(object);
