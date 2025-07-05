function findMaxSumOfTwoElements(arr) {
  // Handle edge cases: array with less than two elements
  if (arr.length < 2) {
    return "Array must contain at least two elements.";
  }

  let largest = -Infinity; // Initialize with the smallest possible number
  let secondLargest = -Infinity; // Initialize with the smallest possible number
  bjbj,

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest; // The current largest becomes the second largest
      largest = arr[i]; // The current element becomes the new largest
    } else if (arr[i] > secondLargest) {
      secondLargest = arr[i]; // The current element is larger than the second largest
    }
  }

  return largest + secondLargest;
}

// Example usage:
const numbers1 = [12, 34, 10, 6, 40];
console.log(findMaxSumOfTwoElements(numbers1)); // Output: 74 (40 + 34)

const numbers2 = [1, 2, 3, 4, 5];
console.log(findMaxSumOfTwoElements(numbers2)); // Output: 9 (5 + 4)

const numbers3 = [-5, -2, -8, -1];
console.log(findMaxSumOfTwoElements(numbers3)); // Output: -3 (-1 + -2)

const numbers4 = [7];
console.log(findMaxSumOfTwoElements(numbers4)); // Output: Array must contain at least two elements.