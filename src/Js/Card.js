export class Card {
  constructor(api) {
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this.popupImg = document.querySelector('.popup__img');
    this.api = api;
  }

  like() {
    this.cardButtonLike.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    if(window.confirm('Вы действительно хотите удалить эту карточку')){
      const {id} = event.target.dataset;
      this.api.removeCard(id)
      this.cardButtonLike.removeEventListener('click', this.like);
      this.cardButtonDelete.removeEventListener('click', this.remove);
      this.placeCard.remove();
    }
  }
  create(name, link, id) {
    const placeCard = document.createElement('div');
    const imageCard = document.createElement('div');
    const cardButtonDelete = document.createElement('button');
    const descriptionCard = document.createElement('div');
    const nameCard = document.createElement('h3');
    const cardButtonLike = document.createElement('button');

    placeCard.classList.add('place-card');
    imageCard.classList.add('place-card__image');
    cardButtonDelete.classList.add('place-card__delete-icon');
    descriptionCard.classList.add('place-card__description');
    nameCard.classList.add('place-card__name');
    cardButtonLike.classList.add('place-card__like-icon');

    // Добавляем (1)уникальный номер, (2)имя и (3)ссылку на изображиение.
    cardButtonDelete.setAttribute('data-id', id);

    nameCard.textContent = name;
    imageCard.setAttribute('style', `background-image: url(${link})`);

    placeCard.appendChild(imageCard);
    placeCard.appendChild(descriptionCard);
    imageCard.appendChild(cardButtonDelete);
    descriptionCard.appendChild(nameCard);
    descriptionCard.appendChild(cardButtonLike);
    this.cardButtonLike = cardButtonLike;
    this.cardButtonDelete = cardButtonDelete;
    this.imageCard = imageCard;
    this.placeCard = placeCard;

    this.listener()
    return placeCard;
  }
  // addDeleteIcon(id) {
  //   const cardButtonDelete = document.createElement('button');
  //   cardButtonDelete.classList.add('place-card__delete-icon');
  //   cardButtonDelete.setAttribute('data-id', id);
  //   this.imageCard.appendChild(cardButtonDelete);
  //   return 
  // }

  listener() {
    this.cardButtonLike.addEventListener('click', this.like);
    this.cardButtonDelete.addEventListener('click', this.remove);
    this.imageCard.addEventListener('click', this.image)
  }
}

/*  Можно лучше: В качестве параметров передавайте не переменные, а объект
*  если в ходе развития проекта, добавятся переменные, то вам придётся менять код во многих местах
*  https: //refactoring.guru/ru/smells/long-parameter-list
* Как пример:
 const myObject = {name:"test", url : "http//:ya.ru"}
 function myFunction(param)
 {
   param.name;
   param.url;
 }
 myFunction(myObject)
*/
