import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {  
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  elem;


  render(){
    this.elem = createElement(`<div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>`);

    this.renderContent();
  }

  renderContent(){
    this.getSubElement('inner').innerHTML = '';

    for(let product of this.products){
      if(this.filters.noNuts && product.nuts) continue;
      if(this.filters.vegeterianOnly && !product.vegeterian) continue;
      if(this.filters.maxSpiciness && this.filters.maxSpiciness < product.spiciness) continue;
      if(this.filters.category && this.filters.category !== product.category) continue;

      let card = new ProductCard(product);

      this.getSubElement('inner').append(card.elem);
    }
  }

  updateFilter(filters) {
    this.filters = {...this.filters, ...filters};
    this.renderContent();
  }

  getSubElement(ref){
    return this.elem.querySelector(`.products-grid__${ref}`);
  }
}
