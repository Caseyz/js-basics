function create(Con, ...args) {
  var obj = {};
  Object.setPrototypeOf(obj, Con.prototype);
  var result = Con.apply(obj, args);
  return result instanceof Object ? result : obj;
}

Function.prototype.myCall = function (context) {
  context = context || window;
  context.fn = this;
  var args = [...arguments].slice(1);
  var result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  context = context || window;
  context.fn = this;
  var result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

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
    return fn.apply(this instanceof noop ? this : context, args.concat(rest));
  };

  // 保存原型
  if (this.prototype) {
    noop.prototype = this.prototype;
  }
  res.prototype = new noop();
  return res;
};
