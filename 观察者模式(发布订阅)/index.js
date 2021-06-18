/**
 *  观察者模式
 * 
 */

// 定义发布者类
class Publisher {
  constructor() {
    this.observers = [];
    console.log("Publisher created");
  }
  // 增加订阅者
  add(observer) {
    console.log("Publisher.add");
    this.observers.push(observer);
  }
  // 移除订阅者
  remove(observer) {
    console.log("Publisher.remove");
    this.observers.forEach((item, i) => {
      if (observer === item) {
        this.observers.splice(i, 1);
      }
    });
  }
  // 通知所有订阅者
  notify() {
    console.log("Publisher.notify");
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}

// 定义订阅者类
class Observer {
  constructor() {
    console.log("Observer created");
  }
  update() {
    console.log("Observer.update");
  }
}

// 实现 定义一个具体的需求文档（prd）发布类
class PrdPublisher extends Publisher {
  constructor() {
    super();
    // 初始化需求文档
    this.prdState = null;
    // 项目经理还没拉群，目前开发群为空
    this.observers = [];
    console.log("PrdPublisher created");
  }

  // 该方法用于获取当前的prdState
  getState() {
    console.log("PrdPublisher.getState");
    return this.prdState;
  }

  // 该方法用于改变prdState的值
  setState(state) {
    console.log("PrdPublish.setState");
    this.prdState = state;
    this.notify();
  }
}

// 实现 定义一个订阅方，开发的任务也变得具体起来
class DeveloperObserver extends Observer {
  constructor() {
    super();
    // 一开始需求文档还不存在，初始为空对象
    this.prdState = {};
    console.log("DeveloperObserver create");
  }

  // 重写一个具体的update
  update(publisher) {
    console.log("DeveloperObserver.update");
    // 更新需求文档
    this.prdState = publisher.getState();
    // 调用工作函数
    this.work();
  }

  // 工作函数
  work() {
    // 获取需求文档
    const prd = this.prdState;

    // 开始基于需求文档开始开发
    console.log("996 begin...");
  }
}

// 创建订阅者：zhao
const zhao = new DeveloperObserver();
// 创建订阅者：qian
const qian = new DeveloperObserver();
// 创建订阅者
const sun = new DeveloperObserver();
// 产品经理出现
const pm = new PrdPublisher();

// 需求文档出现了
const prd = {
  // 具体内容
  // ...
};

// 开始建群
pm.add(zhao);
pm.add(qian);
pm.add(sun);

// 产品经理发送需求文档，并@所有人
pm.setState(prd)
