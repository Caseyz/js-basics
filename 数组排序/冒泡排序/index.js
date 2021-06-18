/**
 *  冒泡排序
 */

var a = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];

function bubbling(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    var flag = true;
    var sortBorder = len - 1;
    var lastExchangeIndex = 0;

    for (var j = 0; j < sortBorder - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var _arr = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = _arr;
        flag = false;
        // 更新最后一次交换的下标
        lastExchangeIndex = j;
      }
    }
    // 上次交换最后的下标
    sortBorder = lastExchangeIndex;
    // 无交换直接跳出循环
    if (flag) {
      break;
    }
  }

  return arr;
}
console.log(bubbling(a));
