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
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
  
  //Закрытие popup
  handleClosePopup() {
    //Проверяем, есть ли класс popup_opened, чтобы не было повторных срабатываний при многократном нажатии
    //(т.к. popup закрывается с задержкой 0.5s)
    if (this._popup.classList.contains('popup_opened')) {
      this._popup.classList.remove('popup_opened');
      //Удаляем слушателя события закрывания popup по кнопке Esc
      document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }
  }
  
  //Закрытие popup при нажатии на Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.handleClosePopup();
    }
  }

  //Закрытие popup по клику по иконке закрытия popup, overlay
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      //Проверяем, есть ли класс popup_opened, чтобы не было повторных срабатываний при многократном нажатии 
      //(т.к. popup закрывается с задержкой 0.5s)
      if (this._popup.classList.contains('popup_opened')) {
        //Закрытие по overlay
        if (evt.target.classList.contains('popup_opened')) {
          this.handleClosePopup()
        }
        //Закрытие по крестику
        if (evt.target.classList.contains('popup__close-button')) {
          this.handleClosePopup();
        }
      }
    });
  }
}