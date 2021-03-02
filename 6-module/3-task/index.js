import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem;

  constructor(slides) {
    this.slides = slides;
    this.render();
    this.switchSlides();
    this.handleAddBtn();
  }

  render(){
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
        </div>
      </div>`);

    const carouselInner = carousel.querySelector('.carousel__inner');

    this.slides.map(slide => {
      carouselInner.appendChild(this.renderSlide(slide));
    });

    this.elem = carousel;
  }

  renderSlide({image, price, name, id}){
    const slide = createElement(`
      <div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`);

    return slide;
  }

  switchSlides(){
    const nextBtn = this.elem.querySelector('.carousel__arrow_right');
    const prevBtn = this.elem.querySelector('.carousel__arrow_left');
    const slide = this.elem.querySelector('.carousel__slide');
    const carousel = this.elem.querySelector('.carousel__inner');
    let translateX = 0;

    const hideButtons = (slidePosition, lastSlidePosition) => {
      if(slidePosition === 0){
        prevBtn.style.display = 'none';
      } else if(Math.abs(slidePosition) === lastSlidePosition) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.style.display = '';
        prevBtn.style.display = '';
      }
    }

    if(translateX === 0){
      prevBtn.style.display = 'none';
    } else {
      prevBtn.style.display = '';
    }

    nextBtn.addEventListener('click', (event) => {
      let lastSlideOffset = slide.offsetWidth * (this.slides.length - 1);
      translateX -= slide.offsetWidth;
      carousel.style.transform = `translateX(${translateX}px)`;
      hideButtons(translateX, lastSlideOffset);
    });

    prevBtn.addEventListener('click', (event) => {
      let lastSlideOffset = slide.offsetWidth * (this.slides.length - 1);
      translateX += slide.offsetWidth;
      carousel.style.transform = `translateX(${translateX}px)`;
      hideButtons(translateX, lastSlideOffset);
    });
  }

  handleAddBtn(){
    this.elem.addEventListener('click', (event) => {
      console.log()
      if(event.target.className === 'carousel__button' 
      || event.target.parentElement.className === 'carousel__button'){
        let currentSlide = event.path.find(node => node.className === 'carousel__slide');
        let { id } = currentSlide.dataset;
        this.elem.dispatchEvent(new CustomEvent('product-add', {
          detail: id,
          bubbles: true
        }));
      }
   });
  }
}
