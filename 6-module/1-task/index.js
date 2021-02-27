/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement('table');
    this.generateTBody();
    this.generateTHead();
    this.deleteTRow();
  }

  generateTHead(){
    const thead = this.elem.createTHead();
    const row = thead.insertRow();

    for(let key in this.rows[0]){
      let th = document.createElement('th');
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }


  generateTBody(){
    for(let element of this.rows){
      let row = this.elem.insertRow();
      for(let key in element){
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      row.insertAdjacentHTML('beforeend', '<td><button>X</button></td>');
    }
  }

  deleteTRow(){
    this.elem.onclick = (event) => {
      let target = event.target;

      if(target.tagName === 'BUTTON'){
        const row = target.parentElement.parentElement;
        this.elem.deleteRow(row.rowIndex);
      }
    }
  }
}
