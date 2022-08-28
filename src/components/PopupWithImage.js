import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, popupPreviewTitleSelector, popupPreviewUrlSelector) {
    super(popupSelector);
    this._popupWithImageTitle = this._popup.querySelector(popupPreviewTitleSelector);
    this._popupWithImageUrl = this._popup.querySelector(popupPreviewUrlSelector);
  }

  handleOpenPopup(imageName, imageLink) {
    super.handleOpenPopup();

    this._popupWithImageTitle.textContent = imageName;
    this._popupWithImageUrl.src = imageLink;
    this._popupWithImageUrl.alt = imageName;
  }
}