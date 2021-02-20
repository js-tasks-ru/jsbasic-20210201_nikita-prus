function makeDiagonalRed(table) {
  for(let row of table.rows){
    row.cells[row.rowIndex].style.backgroundColor = 'red';
  }
}
