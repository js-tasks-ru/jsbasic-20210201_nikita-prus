/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  const lowerStr = str.toLowerCase();
	if(lowerStr.includes('xxx') || lowerStr.includes('1xbet')){
  	return true;
  }
  return false;
}
