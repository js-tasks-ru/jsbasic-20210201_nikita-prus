/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  return str ?
  	 str.split('-').map((word, index) => {
       if(index){
        return word[0].toUpperCase() + word.slice(1);
       } 
       return word;
     }).join('') : str;
}
