export default class UserInfo {
  constructor(userInfoInputsSelector) {
    this._userName = document.querySelector(userInfoInputsSelector.nameSelector);
    this._userAboutOneself = document.querySelector(userInfoInputsSelector.aboutOneselfSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      aboutOneself: this._userAboutOneself.textContent
    };
  }

  setUserInfo(user) {
    this._userName.textContent = user.name;
    this._userAboutOneself.textContent = user.aboutOneself;
  }
}