export default class StepSlider {
  elem;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.moveThumb(this.value);
  }

  render(){
    const slider = document.createElement('div');
    slider.classList.add('slider');
    
    slider.innerHTML = `
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
    
      <!--Полоска слайдера-->
      <div class="slider__progress"></div>
    `;

    this.renderSteps(slider);

    const sliderProgress = slider.querySelector('.slider__steps');
    sliderProgress.children[this.value].classList.add('slider__step-active');

    this.handleChange(slider);


    this.elem = slider;
  }

  renderSteps(slider){
    const sliderSteps = document.createElement('div');

    sliderSteps.classList.add('slider__steps');

    for(let i = 0; i < this.steps; i++){
      let sliderStep = document.createElement('span');
      sliderSteps.appendChild(sliderStep);
    }

    slider.appendChild(sliderSteps);
  }

  handleChange(slider){
    slider.addEventListener('click', (event) => {
      let { currentValue, percentValue } =  this.calcSliderPosition(event);

      this.toggleClass(currentValue);
      this.changeValue(currentValue);
      this.moveThumb(percentValue);
      this.generateEvent(currentValue);
    });
  }

  calcSliderPosition(event){
    let leftPosition =  event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = leftPosition / this.elem.offsetWidth;
    let steps = this.steps - 1;
    let currentValue = Math.round(leftRelative * steps);
    let percentValue = currentValue / steps * 100;

    return { 
      currentValue,
      percentValue
    }
  }

  toggleClass(currentValue) {
    const currentStep = this.elem.querySelector('.slider__step-active');
    const sliderSteps = this.elem.querySelector('.slider__steps');

    currentStep.classList.remove('slider__step-active');
    sliderSteps.children[currentValue].classList.add('slider__step-active');
  }

  changeValue(value){
    const sliderValue = this.elem.querySelector('.slider__value');
    this.value = value;
    sliderValue.innerText = value;
  }

  moveThumb(percentValue){
    const sliderThumb = this.elem.querySelector('.slider__thumb');
    const sliderProgress = this.elem.querySelector('.slider__progress');

    sliderThumb.ondragstart = () => false;
    this.dragsThumb(sliderThumb);

    sliderThumb.style.left = `${percentValue}%`
    sliderProgress.style.width = `${percentValue}%`
  }

  dragsThumb(thumb){
    thumb.onpointerdown = (event) => {
      event.preventDefault();

      const slider = this.elem;
      const sliderThumb = this.elem.querySelector('.slider__thumb');
      const sliderProgress = this.elem.querySelector('.slider__progress');

      let sliderVal = 0;

      const calcPosition = (leftRelative) => {
        let steps = this.steps - 1;
        let currentValue = Math.round(leftRelative * steps);

        return currentValue
      };

      document.addEventListener('pointerup', onPointerUp);
      document.addEventListener('pointermove', pointerMove);

      function pointerMove(event) {
        slider.classList.add('slider_dragging');

        let left = event.clientX - slider.getBoundingClientRect().left
        let leftRelative = left / slider.offsetWidth

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }
      

        let leftPercents = leftRelative * 100;
        
        sliderThumb.style.left = `${leftPercents}%`
        sliderProgress.style.width = `${leftPercents}%`

        sliderVal = calcPosition(leftRelative);

      }

      function onPointerUp() {
        document.removeEventListener('pointerup', onPointerUp);
        document.removeEventListener('pointermove', pointerMove);
        slider.classList.remove('slider_dragging');

        // TODO: get slider value on drags and pass to event;
        // slider.addEventListener('.')
        console.log(sliderVal);
        slider.dispatchEvent(new CustomEvent('slider-change', { 
          detail: sliderVal,
          bubbles: true
        }));
      }

      thumb.ondragstart = () => false;
    }
  }

  generateEvent(sliderValue){
    this.elem.dispatchEvent(new CustomEvent('slider-change', { 
      detail: sliderValue,
      bubbles: true
    }));
  }
}
