//Создание и заполнение одной карточки, обработчики и слушатели like, удаления и открытия imagePreview этой карточки

export class Card {
  constructor(data, templateSelector, handleOpenPreviewPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPreviewPopup = handleOpenPreviewPopup;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(true);

    return cardElement;
  }

   //Обработчик like карточки
  _handleCardLike(evt) { 
    evt.target.classList.toggle('cardElement__like-button_active');
  }

  //Обработчик удаления карточки
  _handleCardDelete(cardElement) {
    cardElement.remove();
  }
  
  _setEventListeners(cardElement) {
    //Слушатель открытия popupPreview картинки карточки
    cardElement.querySelector('.cardElement__image').addEventListener('click', () => {
      this._handleOpenPreviewPopup(this._name, this._link);
    });

    //Слушатель кнопки like карточки
    cardElement.querySelector('.cardElement__like-button').addEventListener('click', (evt) => {
      this._handleCardLike(evt);
    });
    
    //Слушатель кнопки удаления карточки
    cardElement.querySelector('.cardElement__delete-button').addEventListener('click', () => {
      this._handleCardDelete(cardElement);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._element.querySelector('.cardElement__title').textContent = this._name;
    const cardElementImage = this._element.querySelector('.cardElement__image');
    cardElementImage.src = this._link;
    cardElementImage.alt = this._name;

    this._setEventListeners(this._element);

    return this._element;
  }
}