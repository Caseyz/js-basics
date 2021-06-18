/**
 *  高阶函数
 */

// 函数作为参数
// function add(a, b, fn) {
//   return fn(a) + fn(b);
// }

// var fn = function (a) {
//   return a * a;
// };

// console.log(add(2, 4, fn))

// 函数作为返回值
// function getSimple(fn) {
//   var ret;
//   return function () {
//     return ret || (ret = fn.apply(this, arguments));
//   };
// }

// function hello(name) {
//   console.log(name);
// }

// var get = getSimple(hello);
// get(2);

// 函数柯里化应用
// function currying(fn) {
//   let args = [];
//   return function () {
//     if (arguments.length === 0) {
//       return fn.apply(this, arguments);
//     } else {
//        Array.prototype.push.apply(args, arguments);
//        return arguments.callee
//     }
//   };
// }

// var sell = function () {
//   var sum = 0;
//   for (var i = 0, len = arguments.length; i < len; i++) {
//     sum += arguments[i];
//   }
//   return sum;
// };

// var sellAmount = currying(sell);
// sellAmount(100);
// sellAmount(200);
// sellAmount(300);
// console.log(sellAmount());

// 节流
function throttle(fn, interval) {
  var doing = false;

  return function () {
    if (doing) return;
    doing = true;
    fn.apply(this, arguments);
    setTimeout(function () {
      doing = false;
    }, interval);
  };
}

window.onresize = throttle(function () {
  console.log(123);
}, 500);
