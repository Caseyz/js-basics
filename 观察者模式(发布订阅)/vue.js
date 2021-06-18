/**
 *  vue里的
 *
 */

// 实现observer
// observer方法遍历并包装对象属性
function observer(target) {
  // 若target是一个对象，则遍历它
  if (target && typeof target === "object") {
    Object.keys(target).forEach((key) => {
      defineReactive(target, key, target[key]);
    });
  }
}

// 定义defineReactive方法
function defineReactive(target, key, value) {
  const dep = new Dep()
  // 属性值也可能是object，这种情况下，需要调用observer递归调用
  observer(value);
  // 为当前属性安装监听器
  Object.defineProperty(target, key, {
    // 可枚举
    enumerable: true,
    // 不可配置
    configurable: false,
    get: function () {
      return value;
    },
    // 监听器函数
    set: function (val) {
      console.log(`${target}的${key}属性值，从${value}变成${val}`);
      dep.notify()
    },
  });
}

// 实现订阅者Dep
class Dep {
    constructor(){
        // 初始化订阅队列
        this.subs = []
    }

    // 增加订阅者
    addSub(sub){
        this.subs.push(sub)
    }

    // 通知订阅者
    notify(){
        this.subs.forEach(key => {
            sub.update()
        })
    }
}
