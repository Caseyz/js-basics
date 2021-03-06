/**
 *  JS实现继承
 */

// 定义一个父类Animal
function Animal(name) {
  // 属性
  this.name = name;
  // 方法
  this.sleep = function () {
    console.log(this.name + "正在睡觉~");
  };
}

Animal.prototype.eat = function (foods) {
  console.log(this.name + "正在吃" + foods);
};

// 1. 原型链继承
// 核心：将父类的实例作为子类的原型
// 特点：1. 非常纯粹的继承关系，实例是子类的实例，也是父类的实例
//      2. 父类新增原型方法/原型属性，子类能访问到
//      3. 简单，易于实现
// 缺点：1. 要想在子类原型上新增属性和方法，必须要在new Animal这样的语句之后执行，不能放到构造器中
//      2. 无法实现多继承
//      3. 来自原型对象的所有属性被所有实例共享
//      4. 创建子类实例时，无法向父类构造函数传参

// function Cat() {}
// Cat.prototype = new Animal();
// Cat.prototype.name = "cat";

//-----------------------------------------------------------------------------

// 2. 构造函数继承
// 核心：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）
// 特点：1. 解决了1中的子类实例共享父类引用属性的问题
//      2. 创建子类实例时，可以向分类传递参数
//      3. 可以实现多继承（call多个父类对象）
// 缺点：1. 实例并不是父类的实例，只是子类的实例
//      2. 只能继承父类的实例属性和方法，不能继承原型属性和方法
//      3. 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

// function Cat(name) {
//   Animal.call(this);
//   this.name = name || "Caseyz";
// }

//-----------------------------------------------------------------------------

// 3. 实例继承
// 核心：为父类实例添加新特性，作为子类实例返回
// 特点：1. 不限制调用方式，不管是new 子类() 还是 子类()，返回的对象具有相同的效果
// 缺点：1. 实例是父类的实例，不是子类的实例
//      2. 不支持多继承

// function Cat(name) {
//   var instance = new Animal();
//   instance.name = name || "Caseyz";
//   return instance;
// }

//-----------------------------------------------------------------------------

// 4. 拷贝继承
// 核心：
// 特点：1. 支持多继承
// 缺点：1. 效率比较低（因为要拷贝父类属性）
//      2. 无法获取到父类不可枚举的方法（不可枚举的方法不能使用for in）

// function Cat(name) {
//   var animal = new Animal();
//   for (const p in animal) {
//     Cat.prototype[p] = animal[p];
//   }

//   this.name = name || "Caseyz";
// }

//-----------------------------------------------------------------------------

// 5. 组合继承
// 核心：通过父类的构造函数，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类型，实现函数复用
// 特点：1. 可以继承实例属性/方法，也可以继承原型属性/方法；2. 既是子类的实例，也是父类的实例；3. 不存在引用属性共享问题；4. 可传参；5. 函数可复用
// 缺点：1. 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）

// function Cat(name) {
//   Animal.call(this);
//   this.name = name || "Caseyz";
// }
// Cat.prototype = new Animal();

//-----------------------------------------------------------------------------

// 6. 寄生组合继承
// 核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造函数的时候，就不会初始化两次实例方法/属性，避免组合继承的缺点
// 特点：1. 完美
// 缺点：1. 实现有点复杂

function Cat(name) {
  Animal.call(this);
  this.name = name || "Caseyz";
}
(function () {
  var Super = function () {};
  Super.prototype = Animal.prototype;
  Cat.prototype = new Super();
})();

//-----------------------------------------------------------------------------

// test code
var cat = new Cat();
console.log(cat.name);
console.log(cat.eat("fish"));
console.log(cat.sleep());
console.log(cat instanceof Animal);
console.log(cat instanceof Cat);
