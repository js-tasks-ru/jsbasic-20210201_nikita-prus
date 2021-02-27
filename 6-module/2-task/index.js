import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.data = product;
    this.render();
    this.handleClick();
  }
  
  elem;

  render(){
    let { image, price, name } = this.data;
    const html = `
    <div class='card'>
      <div class="card__top">
        <img src="/assets/images/products/${image}" class="card__image" alt="product">
        <span class="card__price">€${price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;

    this.elem = createElement(html)
  }

  handleClick(){
    const addBtn = this.elem.querySelector('.card__button');
    const { id } = this.data;

    addBtn.addEventListener('click', () => {
      addBtn.dispatchEvent(new CustomEvent('product-add', {
        detail: id,
        bubbles: true
      }));
    });
  }
}
