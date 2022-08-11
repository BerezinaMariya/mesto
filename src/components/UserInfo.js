import { formInputName, formInputAboutOneself } from '../utils/constants.js'

export default class UserInfo {
  constructor(data) {
    this._userName = document.querySelector(data.nameSelector);
    this._userAboutOneself = document.querySelector(data.aboutOneselfSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      aboutOneself: this._userAboutOneself.textContent
    };

    return this._userInfo;
  }

  setUserInfo() {
    this._userName.textContent = formInputName.value;
    this._userAboutOneself.textContent = formInputAboutOneself.value;
  }
}