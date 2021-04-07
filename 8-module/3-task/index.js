export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    const duplicatedProduct = this.cartItems.find(cartItem => cartItem.product.id === product.id);
    if(duplicatedProduct){
      this.updateProductCount(product.id, duplicatedProduct.count);
    } else {
      this.cartItems.push({product, count: 1});
    }
    this.onProductUpdate(duplicatedProduct);
  }

  updateProductCount(productId, amount) {
   for(let item of this.cartItems){
     if(item.product.id === productId && amount > 0){
        item.count++;
     } else {
       item.count--;
     }
     if(item.count <= 0){
       let index = this.cartItems.indexOf(item);
       this.cartItems.splice(index, 1);
     }
   }
   const updatedProduct = this.cartItems.find(cartItem => cartItem.product.id === productId);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

