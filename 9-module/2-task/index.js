import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  carousel;
  menu;
  slider;
  cartIcon;
  cart;

  constructor() {
    this.carousel = new Carousel(slides);
    this.menu = new RibbonMenu(categories);
    this.slider = new StepSlider({
      steps: 5,
      value: 3
    });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
  }

  async render() {
    document.querySelector('div[data-carousel-holder]').append(this.carousel.elem);
    document.querySelector('div[data-ribbon-holder]').append(this.menu.elem);
    document.querySelector('div[data-slider-holder]').append(this.slider.elem);
    document.querySelector('div[data-cart-icon-holder]').append(this.cartIcon.elem);

    const products = await this.getProducts();
    const grid = new ProductsGrid(products);

    document.querySelector('div[data-products-grid-holder]').append(grid.elem);
    grid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.slider.value,
      category: this.menu.value
    });

    document.body.addEventListener('product-add', (event) => {
      const product = products.find((product) => product.id === event.detail);
      this.cart.addProduct(product);
    });

    document.body.addEventListener('slider-change', (event) => {
      grid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    document.body.addEventListener('ribbon-select', (event) => {
      grid.updateFilter({
        category: event.detail
      });
    });

    document.getElementById('nuts-checkbox').addEventListener('change', (event) => {
      grid.updateFilter({
        noNuts: event.target.checked
      });
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', (event) => {
      grid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    });
  }

  async getProducts() {
    const res = await fetch('products.json');
    const data = await res.json();
    return data;
  }
}
