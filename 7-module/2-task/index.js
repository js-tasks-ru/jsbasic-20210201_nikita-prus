import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  title;
  body;

  constructor() {
  }

  setTitle(title){
   this.title = title;
  }

  setBody(node){
    this.body = node;
  }

  open(){
    const html = `
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
    
            <h3 class="modal__title">
              ${this.title}
            </h3>
          </div>
    
          <div class="modal__body">
          </div>
        </div>
      </div>`

    const modal = createElement(html);
    const modalBody = modal.querySelector('.modal__body');

    modalBody.appendChild(this.body);
    document.body.classList.add('is-modal-open');
    document.body.appendChild(modal);
    this.close(modal);
  }

  close(modal){
    const closeBtn = modal.querySelector('.modal__close');
    const removeModal = () => {
      modal.remove();
      document.body.removeAttribute('class');
    }

    closeBtn.addEventListener('click', () => {
      removeModal();
    });

    document.addEventListener('keydown', (event) => {
      if(event.code === 'Escape'){
        removeModal();
      }
    });
  }
}
