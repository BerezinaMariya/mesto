//Открытие, закрытие popup, закрытие по нажатию Esc, 
//слушатели закрытия popup по клику по иконке закрытия popup, оверлею

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);    
  }

  //Открытие popup
  handleOpenPopup() {
    this._popup.classList.add('popup_opened');
    //Добавляем слушателя закрывания popup по кнопке Esc
    document.addEventListener('keydown', this._handleEscClose);
  }
  
  //Закрытие popup
  handleClosePopup() {
    this._popup.classList.remove('popup_opened');
    //Удаляем слушателя события закрывания popup по кнопке Esc
    document.removeEventListener('keydown', this._handleEscClose);
  }
  
  //Закрытие popup при нажатии на Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.handleClosePopup();
    }
  }

  //Закрытие popup по клику по иконке закрытия popup, overlay
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      const targetClasses = evt.target.classList;
      if (targetClasses.contains('popup_opened') || targetClasses.contains('popup__close-button')) {
        this.handleClosePopup()
      }
    });
  }
}