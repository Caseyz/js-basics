// console.log(1);

// setTimeout(function () {
//   console.log(2);
// }, 300);

// setTimeout(function () {
//   console.log(3);
// }, 400);

// for (let index = 0; index < 10000; index++) {
//   console.log(4);
// }

// setTimeout(function () {
//   console.log(5);
// }, 100);



// 延时
setTimeout(function () {
  console.log(1);
}, 100);

const start = new Date();
for (let index = 0; index < 1000; index++) {
  console.log("我在做延时。。。");
}
const end = new Date();
console.log(`延时：${Number(end - start)}ms`);

setTimeout(function () {
  console.log(2);
}, 10);
