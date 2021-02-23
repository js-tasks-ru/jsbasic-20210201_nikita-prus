function initCarousel() {
  const nextBtn = document.querySelector('.carousel__arrow_right');
  const prevBtn = document.querySelector('.carousel__arrow_left');
  const slider = document.querySelector('.carousel__inner');
  const slides = slider.children;
  const slideWidth = slider.children[0].offsetWidth;
  let transformX = 0;


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

  const getLastSlideOffset = () => {
    let totalSlidesWidth = 0;

    for(let slide of slides){
      totalSlidesWidth += slide.offsetWidth;
    }

    return totalSlidesWidth -= slideWidth;
  }

  const lastSlideOffset = getLastSlideOffset();


  nextBtn.addEventListener('click', () => {
    transformX -= slideWidth;
    slider.style.transform = `translateX(${transformX}px)`;
    hideButtons(transformX, lastSlideOffset);
  });

  prevBtn.addEventListener('click', () => {
    transformX += slideWidth;
    slider.style.transform = `translateX(${transformX}px)`;
    hideButtons(transformX, lastSlideOffset);
  });


  hideButtons(transformX, lastSlideOffset)
}
