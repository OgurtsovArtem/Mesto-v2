'use strict'
class Popup {
  constructor(element, buttonOpen) {
    this.element = element;
    this.buttonOpen = buttonOpen;
    this.buttonCloseEsc = this.element.querySelector('.popup__close');
    this.buttonCloseSubmithCard = document.querySelector('.popup').querySelector('.popup__button');
  }

  open() {
    this.element.classList.add('popup_is-opened');
  }

  close() {
    this.element.classList.remove('popup_is-opened');
  }

  listener() {
    this.buttonOpen.addEventListener('click', this.open.bind(this))
    this.buttonCloseEsc.addEventListener('click', this.close.bind(this))
    this.buttonCloseSubmithCard.addEventListener('click', this.close.bind(this));
  }
}
