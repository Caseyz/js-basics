class Promise {
  // 定义Promise的初始状态
  status = "pending";
  data = "";
  // onResoved回调函数集
  onResolvedCallback = [];
  onRejectedCallback = [];

  constructor(executor) {
    // resolve函数负责把状态转化为resolved
    function resolve(value) {
      this.status = "resolved";
      this.data = value;
      for (const func of this.onResolvedCallback) {
        func(this.data);
      }
    }

    // reject函数负责把状态转化为rejected
    function reject(reason) {
      this.status = "rejected";
      this.data = reason;
      for (const func of this.onRejectedCallback) {
        func(this.data);
      }
    }

    // 直接执行executor，执行中可能出错，出错执行reject
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  /**
   * 拥有一个then方法，
   * then方法提供：状态为resolved时的回调函数onResolved，状态为rejected时的回调函数onRejected
   * 返回一个新的promise
   */

  then(onResolved, onRejected) {
    // 设置then的默认参数，默认参数实现promise的值的穿透
    onResolved =
      typeof onResolved === "function"
        ? onResolved
        : function (v) {
            return v;
          };
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : function (e) {
            return e;
          };

    let promise2 = new Promise((resolve, reject) => {
      // 如果状态为resolved，则执行onResolved
      if (this.status === "resolved") {
        setTimeout(function () {
          try {
            // onResolved/onReject有返回值测定义为x
            const x = onResolved(this.data);
            // 执行[[Resolve]](promose2, x)
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      // 如果状态为rejected， 则执行onRejected
      if (this.status === "rejected") {
        setTimeout(function () {
          try {
            const x = onRejected(this.data);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
    });

    return promise2;
  }
}
