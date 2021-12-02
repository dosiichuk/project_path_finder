import { templates, select, classNames } from '../settings.js';

class Modal{
  constructor(wrapperElement, fullRoute, longestDistance, shortestDistance){
    const thisModal = this;
    thisModal.data = {fullRoute, longestDistance, shortestDistance};
    thisModal.render(wrapperElement);
  }
  render(wrapperElement){
    const thisModal = this;
    const generatedHtml = templates.modal(thisModal.data);
    thisModal.dom = {};
    thisModal.dom.wrapper = wrapperElement;
    thisModal.dom.wrapper.innerHTML = generatedHtml;
    thisModal.initActions();
  }
  initActions(){
    const modalClose = document.querySelector(select.modalClose);
    const modalContainer = document.querySelector(select.modalContainer);
    modalClose.addEventListener('click', () => {
      modalContainer.classList.add(classNames.hidden);      
    });
  }
}
export default Modal;
