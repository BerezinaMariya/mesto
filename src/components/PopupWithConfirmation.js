import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitPopup) {
    super(popupSelector);
    this._handleSubmitPopup = handleSubmitPopup;
    this._form = this._popup.querySelector('.form');
    this._formSubmitButton = this._form.querySelector('.form__submit-button');
  }

  handleOpenPopup(cardElement, id) {
    super.handleOpenPopup();

    this._cardElement = cardElement;
    this._id = id;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formSubmitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmitPopup(this._cardElement, this._id);
    });
  }

}