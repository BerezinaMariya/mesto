export default class UserInfo {
  constructor(userInfoInputsSelector) {
    this._userName = document.querySelector(userInfoInputsSelector.nameSelector);
    this._userAbout = document.querySelector(userInfoInputsSelector.aboutSelector);
    this._userAvatar = document.querySelector(userInfoInputsSelector.avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src,
    }
  }

  setUserInfo(user) {
    this._userName.textContent = user.name;
    this._userAbout.textContent = user.about;
  }

  setAvatar(user) {
    this._userAvatar.src = user.avatar;
  }

  setId(user) {
    this._userId = user._id;
  }

}