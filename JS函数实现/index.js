/**
 *  new之后做了什么？
 *
 *  1. 创建一个新的空的js对象
 *  2. 将空对象的原型prototype指向构造函数原型
 *  3. 将空对象作为构造函数的上下文(改变this的指向)
 *  4. 对构造函数有返回值的判断
 *
 *  关于构造函数的返回值：一般情况下构造函数没有返回值，但是作为函数，是可以有返回值的。
 *     在new的时候会对构造函数的返回值做一些判断：
 *      1. 如果返回值为基本类型，则忽略返回值
 *      2. 如果返回值是引用类型，则使用return的返回，也就是new操作符无效
 */

function create(Con, ...args) {
  // 1.创建一个空对象
  let obj = {};
  // 2.将空对象的原型prototype指向构造函数原型
  Object.setPrototypeOf(obj, Con.prototype); // obj.__proto__ = Con.prototype;
  // 3.将空对象作为构造函数的上下文
  let result = Con.apply(obj, args);
  // 4.在构造函数有返回值的情况进行判断
  return result instanceof Object ? result : obj;
}

//--------------------------------------------------------------------------------------------------------------

/**
 *  call、apply和bind
 */

// call

// 1. 首先context是可选参数，如果不传的话为window
// 2. 然后给context添加一个属性，将值设置为需要调用的函数
// 3. 因为call可以传递多个参数，所以需要将参数抽离出来
// 4. 最后调用函数并将对象上的函数删除

Function.prototype.myCall = function (context) {
  if (typeof context === "undefined" || context === null) {
    context = window;
  }
  // 等同于上边的代码
  // context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

// apply

// aplly和call类似，不过就是处理参数的不同

Function.prototype.myApply = function (context) {
  if (typeof context !== "function") {
    throw new TypeError("Error");
  }
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

// bind
// bind函数需要考虑的东西：返回执行函数，合并两次参数，bind之后的函数使用new
// 对于使用new的操作：1. 保留函数的原型  2. 判断是否对bind之后的结果使用new，如果使用new，传递给bind的第一个参数会被省略掉。

Function.prototype.myBind = function () {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }

  var args = Array.prototype.slice.call(arguments);
  var context = args.splice(0, 1)[0];
  var fn = this;
  var noop = function () {};
  var res = function () {
    var rest = Array.prototype.slice.call(arguments);
    return fn.apply(
      // this只和运行时有关系，所以这里的this和上边的fn是两码事，res()和new res()在调用的时候，this是不同的东西
      this instanceof noop ? this : (context, args.concat(rest))
    );
  };

  // 保存原型
  if (this.prototype) {
    noop.prototype = this.prototype;
  }
  res.prototype = new noop();

  return res;
};

// 节流
// 在制定间隔内任务只执行一次，节流的原理是不管你在一段时间内如何不停的触发事件，只要设置了节流，就会每隔一段时间执行一次。
// 使用场景：
//  1. click(不停快速点击按钮，减少触发频次)；
//  2. scroll(返回顶部按钮出现/隐藏事件触发)；
//  3. keyup(输入框文字与显示栏内容复制同步)
//  4. 减少发送ajax请求，降低请求频率

function throttle(fn, interval) {
  var flag = false;
  return function () {
    if (flag) return;
    flag = true;
    fn.apply(this, arguments);
    setTimeout(function () {
      console.log("函数节流");
      flag = false;
    }, interval);
  };
}

// 防抖
// 在任务高频率触发时，只有触发间隔超过制定间隔的任务才会执行。即一个动作连续触发则只执行最后一次。
// 防抖的原理则是不管你在一段时间内如何不停的触发事件，只要设置了防抖，则只在触发n秒后才执行，如果我们在一个事件触发n秒内又触发了相同的事件，
// 那我们便以新的事件时间为标准，n秒之后会执行。
// 使用场景：
// 1. scroll事件(资源加载)
// 2. mousemove事件(拖拽)
// 3. resize事件(响应式布局样式)
// 4. keyup事件(输入框停止打字后才开始校验)

function debounce(fn, interval) {
  var timer = null;
  return function () {
    clearTimeout(timer);
    var context = this;
    var args = arguments;
    timer = setTimeout(function () {
      console.log("函数防抖");
      fn.apply(context, args);
    }, interval);
  };
}

// 
