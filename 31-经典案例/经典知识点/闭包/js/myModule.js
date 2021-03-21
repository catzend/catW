(
  function () {
    var msg = "BEIJing";//私有数据
    // 操作数据的函数
    function doSomething() {
      console.log('doSomething() '+msg.toUpperCase());
    }
    function doOtherthing () {
      console.log('doOtherthing() '+msg.toLowerCase())
    }
    // 向外暴露对象

    window.myModule2={
      doSomething:doSomething,
      doOtherthing: doOtherthing
    }
  }
)()
