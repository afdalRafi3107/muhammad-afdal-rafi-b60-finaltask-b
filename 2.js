let array= [20,12,35,11,17,9,58,23,69,21]


function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Tukar posisi arr[j] dan arr[j+1]
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

var sortedNumbers = bubbleSort(array);
console.log(sortedNumbers); // Output: [10, 11, 12, 13, 14, 15, 16]
