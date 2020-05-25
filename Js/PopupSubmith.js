// Наверное лучше сделать класс submith для каждой формы , а то что то не красивый он какой-то, ведро какое-то переменных.
export class PopupSubmith {
  constructor(formCard, userInfo, formEdit, cardList, idCreator, api, popupUser) {
    this.formCard = formCard;
    this.userInfo = userInfo;
    this.formEdit = formEdit;
    this.cardList = cardList;
    this.idCreator = idCreator;
    this.popupUser = popupUser;
    this.api = api;
    this.submitCard = this.submitCard.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.name = this.formEdit.elements.name;
    this.about = this.formEdit.elements.about;
  }

  submitCard(event) {
    event.preventDefault();
    const name = this.formCard.elements.name.value;
    const link = this.formCard.elements.link.value;
    // const id = this.idCreator();
    this.api.addCard(name,link)
    .then((result) => {
      console.log(result);
      console.log(result._id)
      this.cardList.addCard(result.name, result.link, result._id)
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })

    // this.cardList.addCard(name, link, id);
    this.formCard.reset();
  }

  submitUser(event) {
    event.preventDefault();
    this.api.patchUser(this.name.value, this.about.value)
    .then((result) => {
            this.userInfo.setUserInfo(result.name, result.about)
            this.buttonCloseSubmithUser = document.querySelector('.popup-user').querySelector('.popup__button');
            this.buttonCloseSubmithUser.addEventListener('click', this.popupUser.close());
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
  }
}
