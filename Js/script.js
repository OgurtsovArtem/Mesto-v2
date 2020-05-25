import {Api, api} from './Api.js';
import {Card} from './Card.js';
import {CardList} from './CardList.js';
import {FormValidator} from './FormValidator.js';
import {Popup} from './Popup.js';
import {PopupRender} from './PopupRender.js';
import {UserInfo} from './UserInfo.js';
import {PopupSubmith} from './PopupSubmith.js';

export const idCreator = () => {
  const id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
  return id;
}
export const classCreate = (api) => {
  return new Card(api)
}
export const words = {
  validationLenght: 'Должно быть от 2 до 30 символов',
  validationLink: 'Здесь должна быть ссылка',
  validationNull: 'Это обязательное поле'
}
// ==========================================ПЕРЕМЕННЫЕ.==========================================//
export const container = document.querySelector('.places-list');// место куда записывать карточки
// ..........................................Окна Popup..............................................//
export const popupCard = document.querySelector('.popup');
export const popupUser = document.querySelector('.popup-user');
export const popupImage = document.querySelector('.popup-image'); // используем для закрытие формы Image.

export const popupImageOpen = document.querySelector('.places-list');
export const buttonCard = document.querySelector('.user-info__button');
export const buttonUser = document.querySelector('.user-info__button-edit');
// ..........................................Форма Card..............................................//
export const formCard = document.forms.addCard;
// ..........................................Форма Edit..............................................//
export const formEdit = document.forms.edit;
// ..........................................Импуты валидатора..............................................//
export const popupEditInput = document.querySelector('.popup-user').querySelectorAll('.popup__input');
export const popupCardInput = document.querySelector('.popup').querySelectorAll('.popup__input');
// ..........................................Кнопки валидатора..............................................//
export const popupEditButton = document.querySelector('.popup__button_edit');
export const popupButton = document.querySelector('.popup__button');
//==========================================КЛАССЫ==========================================//
export const cardList = new CardList(container, classCreate,api);
export const validationCard = new FormValidator(words, popupCardInput, popupButton);
export const validationEdit = new FormValidator(words, popupEditInput, popupEditButton);
export const userInfo = new UserInfo(formEdit);
export const popupRender = new PopupRender(formCard, userInfo, validationCard, validationEdit);
export const popupClassCard = new Popup(popupCard, buttonCard);
export const popupClassUser = new Popup(popupUser, buttonUser);
export const popupSubmith = new PopupSubmith(formCard, userInfo, formEdit, cardList, idCreator, api, popupClassUser)

popupClassCard.listener();
popupClassUser.listener();
popupRender.listener(buttonCard, buttonUser);

export const togglePopupImage = (event) => {
  if (event.target.classList.contains('place-card__image')) {
    const popupImg = document.querySelector('.popup__img');
    popupImg.src = event.target.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    popupImage.classList.add('popup_is-opened');
    return;
  }
  if (event.target.classList.contains('popup__close')) {
    popupImage.classList.remove('popup_is-opened');
  }
};

//= =========================================API==========================================//
api.getInitialUser()
.then((result) => {
  userInfo.setUserInfo(result.name, result.about)
  const userImage = document.querySelector('.user-info__photo');
  userImage.setAttribute('style', `background-image: url(${result.avatar})`)
// обрабатываем результат
})
.catch((err) => {
console.log(err); // выведем ошибку в консоль
})

api.getInitialCards()
.then((result) => {
  console.log(result)
  cardList.render(result)
// обрабатываем результат
})
.catch((err) => {
console.log(err); // выведем ошибку в консоль
})

// ..........................................FormValidator..............................................//
formCard.addEventListener('input', validationCard.setEventListeners)
formEdit.addEventListener('input', validationEdit.setEventListeners)
// ..........................................Popup..............................................//
popupImageOpen.addEventListener('click', togglePopupImage);                   // Открываем картинку.
popupImage.addEventListener('click', togglePopupImage);
// ..........................................Submit..............................................//
formCard.addEventListener('submit', popupSubmith.submitCard);                   // Отправляем форму Card.
formEdit.addEventListener('submit', popupSubmith.submitUser);                   // Отправляем форму Edit.
