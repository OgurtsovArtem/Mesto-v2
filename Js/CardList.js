'use strict'
class CardList {
  constructor(container, classCreate,api) {
    this.container = container;
    this.classCreate = classCreate;
    this.api = api
    /*REVIEW2. свойство this.api нигде в классе не используется, его не надо и задавать, так же как и параметр api. */
  }

  addCard(name, link, id) {
    const newCard  = this.classCreate(this.api).create(name,link,id)
    this.container.appendChild(newCard);
  }

  render(cardArr) {
    this.cardArr = cardArr;
    this.cardArr.forEach((Obj) => {
      // if (Obj.owner._id === "3d760a2241859911c0eefefc"){
      this.addCard(Obj.name, Obj.link, Obj._id);
      // const newCard  = this.classCreate(this.api).create(id)
      //else(Obj.owner._id != "3d760a2241859911c0eefefc"){

      //}
      // console.log(Obj.owner.name)

    });
  }

}
// Передать сюда id который был взят при переборе карт, сравнить этот id  с id автора карточки , если верно передать в создания корзины, иначе проверять дальше.

// if (obj.ovner.name = obj.name) {

// }