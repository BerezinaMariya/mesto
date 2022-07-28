//Создание и заполнение одной карточки, обработчики и слушатели like, удаления и открытия imagePreview этой карточки

export class Card {
  constructor(data, templateSelector, handleOpenPreviewPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPreviewPopup = handleOpenPreviewPopup;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.cardElement').cloneNode(true);

    return cardElement;
  }

   //Обработчик like карточки
  _handleCardLike(evt) { 
    evt.target.classList.toggle('cardElement__like-button_active');
  }

  //Обработчик удаления карточки
  _handleCardDelete() {
    this._element.remove();
    this._element = null;
  }
  
  _setEventListeners() {
    //Слушатель открытия popupPreview картинки карточки
    this._image.addEventListener('click', () => {
      this._handleOpenPreviewPopup(this._name, this._link);
    });

    //Слушатель кнопки like карточки
    this._element.querySelector('.cardElement__like-button').addEventListener('click', (evt) => {
      this._handleCardLike(evt);
    });
    
    //Слушатель кнопки удаления карточки
    this._element.querySelector('.cardElement__delete-button').addEventListener('click', () => {
      this._handleCardDelete();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._element.querySelector('.cardElement__title').textContent = this._name;
    this._image = this._element.querySelector('.cardElement__image');
    this._image.src = this._link;
    this._image.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}