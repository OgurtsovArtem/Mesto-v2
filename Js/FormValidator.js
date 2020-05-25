'use strict'
class FormValidator {
  constructor(words, formElement, popupButton) {
    this.words = words;
    this.formElement = formElement;
    this.popupButton = popupButton;
  }

  setEventListeners = () => {
    let flag = true;
    this.formElement.forEach((input) => {
      if (!this.checkInputValidity(input)) flag = false;
      return flag;
    });
    this.setSubmitButtonState(flag, this.popupButton)
  }

  checkInputValidity(input) {
    let inputId = input.id;
    const errorId = input.nextElementSibling.id;

    if (input.validity.tooShort === true) {
      inputId += '-error';
      if (inputId === errorId) {
        input.nextElementSibling.textContent = words.validationLenght;
      }
      return false;
    }
    if (input.validity.valueMissing === true) {

      inputId += '-error';
      if (inputId === errorId) {
        input.nextElementSibling.textContent = words.validationNull;
      }
      return false;
    };
    if (input.validity.typeMismatch === true) {
      inputId += '-error';
      if (inputId === errorId) {
        input.nextElementSibling.textContent = words.validationLink;
      }
      return false;
    }
    input.nextElementSibling.textContent = '';
    return true;
  }

  setSubmitButtonState(Flag, button) {
    if (Flag === true) {
      button.removeAttribute('disabled');
      button.classList.add('popup__button_enable');
    } else {
      button.setAttribute('disabled', true);
      button.classList.remove('popup__button_enable');
    }
  }
}
