import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem;

  constructor(categories) {
    this.categories = categories;
    this.render();
    this.scroll();
    this.handleClick();
  }

  render(){
    const html = `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${this.renderCategories()}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>`;

    this.elem = createElement(html);
  }

  renderCategories() {
    const categories = this.categories.map(category => (
      `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`
    ));

    return categories;
  }

  scroll() {
    const navMenu = this.elem.querySelector('.ribbon__inner');
    const rightBtn = this.elem.querySelector('.ribbon__arrow_right');
    const leftBtn = this.elem.querySelector('.ribbon__arrow_left');

    rightBtn.addEventListener('click', () => {
      navMenu.scrollBy(350, 0);
    });

    leftBtn.addEventListener('click', () => {
      navMenu.scrollBy(-350, 0);
    });

    this.hideButtons(navMenu, rightBtn, leftBtn);
  }

  hideButtons(navMenu, rightBtn, leftBtn) {
    navMenu.addEventListener('scroll', () => {
      let rightScrollWidth =  navMenu.scrollWidth - navMenu.clientWidth - navMenu.scrollLeft;

      if(navMenu.scrollLeft < 1){
        leftBtn.classList.remove('ribbon__arrow_visible');
      } else if(rightScrollWidth == 0) {
        rightBtn.classList.remove('ribbon__arrow_visible')
      } else {
        leftBtn.classList.add('ribbon__arrow_visible');
        rightBtn.classList.add('ribbon__arrow_visible');
      }
    })
  }

  handleClick() {
    this.elem.querySelector('.ribbon__inner')
    .addEventListener('click', (event) => {
      event.preventDefault();
      let activeBtn = this.elem.querySelector('.ribbon__item_active');

      if(activeBtn){
        activeBtn.classList.remove('ribbon__item_active');
      }

      event.target.classList.add('ribbon__item_active');

      event.target.dispatchEvent(new CustomEvent('ribbon-select', { 
        detail: event.target.dataset.id,
        bubbles: true
      }));
    });
  }

}
