/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  const filteredValues = Object.values(salaries)
    .filter((val) => isFinite(val) && Number(val));
  
  return filteredValues.length ? 
    filteredValues.reduce((acc, val) => acc + val) : 0;
}
