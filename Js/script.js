'use strict'
// Создаем уникальный номер для каждой карточки.
const idCreator = () => {
  const id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
  return id;
}
const classCreate = (api) => {
  return new Card(api)
}
const words = {
  validationLenght: 'Должно быть от 2 до 30 символов',
  validationLink: 'Здесь должна быть ссылка',
  validationNull: 'Это обязательное поле'
}
// ==========================================ПЕРЕМЕННЫЕ.==========================================//
const container = document.querySelector('.places-list');// место куда записывать карточки
// ..........................................Окна Popup..............................................//
const popupCard = document.querySelector('.popup');
const popupUser = document.querySelector('.popup-user');
const popupImage = document.querySelector('.popup-image'); // используем для закрытие формы Image.

const popupImageOpen = document.querySelector('.places-list');
const buttonCard = document.querySelector('.user-info__button');
const buttonUser = document.querySelector('.user-info__button-edit');
// ..........................................Форма Card..............................................//
const formCard = document.forms.addCard;
// ..........................................Форма Edit..............................................//
const formEdit = document.forms.edit;
// ..........................................Импуты валидатора..............................................//
const popupEditInput = document.querySelector('.popup-user').querySelectorAll('.popup__input');
const popupCardInput = document.querySelector('.popup').querySelectorAll('.popup__input');
// ..........................................Кнопки валидатора..............................................//
const popupEditButton = document.querySelector('.popup__button_edit');
const popupButton = document.querySelector('.popup__button');
//==========================================КЛАССЫ==========================================//
const cardList = new CardList(container, classCreate,api);
const validationCard = new FormValidator(words, popupCardInput, popupButton);
const validationEdit = new FormValidator(words, popupEditInput, popupEditButton);
const userInfo = new UserInfo(formEdit);
const popupRender = new PopupRender(formCard, userInfo, validationCard, validationEdit);
const popupClassCard = new Popup(popupCard, buttonCard);
const popupClassUser = new Popup(popupUser, buttonUser);
const popupSubmith = new PopupSubmith(formCard, userInfo, formEdit, cardList, idCreator, api, popupClassUser)

popupClassCard.listener();
popupClassUser.listener();
popupRender.listener(buttonCard, buttonUser);

const togglePopupImage = (event) => {
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
