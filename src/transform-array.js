const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const transformArr = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const next = arr[i + 1];
    const prev = arr[i - 1];

    switch (current) {
      case "--discard-next":
        i++;
        break;
      case "--discard-prev":
        if (prev !== undefined && arr[i - 2] !== "--discard-next") {
          transformArr.pop();
        }
        break;
      case "--double-next":
        if (next !== undefined) {
          transformArr.push(next);
        }
        break;
      case "--double-prev":
        if (prev !== undefined && arr[i - 2] !== "--discard-next") {
          transformArr.push(prev);
        }
        break;
      default:
        transformArr.push(current);
        break;
    }
  }

  return transformArr;
  // remove line with error and write your code here
}

module.exports = {
  transform
};
