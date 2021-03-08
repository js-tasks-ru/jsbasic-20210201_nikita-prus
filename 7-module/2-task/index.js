import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  modal;

  constructor() {
    this.createModal();
  }

  setTitle(title){
    const modalTitle = this.modal.querySelector('.modal__title');
    if(modalTitle){
      modalTitle.innerText = title;
    }
  }

  setBody(node){
    const modalBody = this.modal.querySelector('.modal__body');
    if(modalBody){
      modalBody.appendChild(node);
    }
  }

  createModal(){
    const html = `
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title"></h3>
        </div>
  
        <div class="modal__body"></div>
      </div>
    </div>`

   this.modal = createElement(html);
  }

  open(){
    document.body.classList.add('is-modal-open');
    document.body.appendChild(this.modal);
    this.close(this.modal);
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
