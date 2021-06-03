import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal = null;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    const duplicatedProduct = this.cartItems.find(cartItem => cartItem.product.id === product.id);
    if(duplicatedProduct){
      this.updateProductCount(product.id, 'plus');
    } else {
      this.cartItems.push({product, count: 1});
    }
    this.onProductUpdate(duplicatedProduct);
  }

  updateProductCount(productId, option) {
    let deletedProduct = null;
    for(let item of this.cartItems){
      if(item.product.id === productId && option === 'plus'){
         item.count++;
      } else if(item.product.id === productId && option === 'minus') {
        item.count--;
      }
      if(item.count <= 0){
        let index = this.cartItems.indexOf(item);
        deletedProduct = item;
        this.cartItems.splice(index, 1);
      }
    }
    const updatedProduct = this.cartItems.find(cartItem => cartItem.product.id === productId);

    if(!updatedProduct){
      this.onProductUpdate(deletedProduct);
    }
    this.onProductUpdate(updatedProduct);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.map(item => totalCount += item.count);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.map(item => totalPrice += item.product.price * item.count);
    return totalPrice;
  }

  getProductById(productId){
    return this.cartItems.filter((item) => item.product.id === productId);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderSuccessMsg() {
    return `<div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>`;
  }

  renderProducts(){
     return this.cartItems.map((item) => {
      const product =  this.renderProduct(item.product, item.count);

      const minusBtn = product.querySelector('.cart-counter__button_minus');
      const plusBtn = product.querySelector('.cart-counter__button_plus');
      
      minusBtn.onclick = (e) => this.handleProductUpdate('minus',  item.product.id);
      plusBtn.onclick = (e) => this.handleProductUpdate('plus',  item.product.id);

      return product;
    });
  }

  renderModal() {
    this.modal = new Modal();
    const orderForm = this.renderOrderForm();
    const items = this.renderProducts();
  
    items.push(orderForm);
    this.modal.setTitle('Your order');
    items.forEach(item => this.modal.setBody(item));
    this.modal.open();

    orderForm.addEventListener('submit', (event) => {
      const isOk = this.onSubmit(event).then((data => data.ok));

      if(isOk){
        this.modal.setTitle('Success!');
        this.cartItems = [];
        document.querySelector('.modal__body').innerHTML = this.renderSuccessMsg();
      }
    });
  }

  isModalOpen(){
    return document.body.classList.contains('is-modal-open');
  }

  onProductUpdate(cartItem) {
    if(this.isModalOpen() && cartItem){
      const { product: { id, price }, count } = cartItem;
      const modalBody = document.querySelector('.modal__body');

      // Элемент, который хранит количество товаров с таким productId в корзине
      const productCount = modalBody.querySelector(`[data-product-id="${id}"] .cart-counter__count`);

      // Элемент с общей стоимостью всех единиц этого товара
      const productPrice = modalBody.querySelector(`[data-product-id="${id}"] .cart-product__price`);

      // Элемент с суммарной стоимостью всех товаров
      const infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = count;

      productPrice.innerHTML = `€${(price * count).toFixed(2)}`;

      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if(!this.isEmpty() && count === 0){
       const product = modalBody.querySelector(`div[data-product-id=${id}]`);
       product.remove();
      } else if(this.isEmpty()){
        this.modal.close();
      }
    }

    this.cartIcon.update(this);
  }

  handleProductUpdate(option, productId){
      this.updateProductCount(productId, option);
  }

  onSubmit(event) {
    event.preventDefault();

    const formElem = event.target;
    const orderBtn = formElem.querySelector('button[type=submit]');

    orderBtn.classList.add('is-loading');

    const response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(formElem)
    });

    return response;
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

