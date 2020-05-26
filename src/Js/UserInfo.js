export class UserInfo {
  constructor(formEdit) {
    this.formEdit = formEdit;
    this.name = this.formEdit.elements.name;
    this.about = this.formEdit.elements.about;
    this.userAbout = document.querySelector('.user-info__job');
    this.userName = document.querySelector('.user-info__name');
  }

  setUserInfo(name, about) {
    this.name.value = name;
    this.about.value = about;

    this.userName.textContent = this.name.value;
    this.userAbout.textContent = this.about.value;
  }
  userRender(){
    this.name.value = this.userName.textContent;
    this.about.value = this.userAbout.textContent;
  } 
}
