import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitPopup) {
    super(popupSelector);
    this._handleSubmitPopup = handleSubmitPopup;
    this._submitButton = this._popup.querySelector('.form__submit-button');
  }

  handleOpenPopup(cardElement, id) {
    super.handleOpenPopup();

    this._cardElement = cardElement;
    this._id = id;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener('click', () => {
    this._handleSubmitPopup(this._cardElement, this._id);
    });
  }

}