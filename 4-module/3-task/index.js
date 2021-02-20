function highlight(table) {
  const tBodyRows = table.tBodies[0].rows
  
  for(let row of tBodyRows){
    for(let cell of row.cells){
      if(cell.hasAttribute('data-available')){
        cell.getAttribute('data-available') === 'true' ?
          row.classList.add('available') : row.classList.add('unavailable');
      }

      
      if(cell.cellIndex === 2){
        cell.innerHTML === 'm' ? row.classList.add('male') : row.classList.add('female');
      }

      if(cell.cellIndex === 1){
        if(cell.innerHTML < 18){
          row.style.textDecoration = 'line-through';
        } 
      }
    }

    if(!row.cells[row.cells.length-1].hasAttribute('data-available')){
      row.setAttribute('hidden', true);
    }


    
  }
}
