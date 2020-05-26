export class PopupRender {
  constructor(formCard, userInfo, validationCard, validationEdit) {
    this.formCard = formCard;
    this.userInfo = userInfo;
    this.validationCard = validationCard;
    this.validationEdit = validationEdit;
    this.render = this.render.bind(this)
  }

  render() {
    this.formCard.reset();
    this.userInfo.userRender();
    this.validationCard.setEventListeners();
    this.validationEdit.setEventListeners();

  }

  listener(buttonCard, buttonUser) {
    this.buttonCard = buttonCard;
    this.buttonUser = buttonUser;
    this.buttonCard.addEventListener('click', this.render);
    this.buttonUser.addEventListener('click', this.render);
  }
}
