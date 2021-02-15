/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  const numbers = str.replaceAll(' ', ',').split(',')
    .filter(el => !isNaN(+el));
    
   const min = Math.min(...numbers);
   const max = Math.max(...numbers);
   
   return {
   	min,
    max
   }
}
