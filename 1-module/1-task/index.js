/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if(n > 1){
    return n * factorial(n - 1);
  } else {
    return 1;
  }
}