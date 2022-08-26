//Создание и заполнение одной карточки, обработчики и слушатели like, удаления и открытия imagePreview этой карточки

export class Card {
  constructor(userId, data, templateSelector, handleCardClick, handleDeleteClick, handleSetLike, handleDeleteLike) {
    this._data = data; 
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;
  }

  _getTemplate() {
    return document
    .querySelector(this._templateSelector).content
    .querySelector('.cardElement')
    .cloneNode(true);
  }

  //Скрываем кнопку удаления для чужих карточек
  _hideDeleteButton () {
    if (this._owner._id !== this._userId) {
      this._buttonDelete.classList.add('cardElement__delete-button_hidden');
    }
  }

   //Обработчик like карточки
  _handleToggleLike(evt) { 
    if (evt.target.classList.contains('cardElement__like-button_active')) {
      evt.target.classList.remove('cardElement__like-button_active');
      this._handleDeleteLike(this._element, this._data._id);
    } else {
      evt.target.classList.add('cardElement__like-button_active');
      this._handleSetLike(this._element, this._data._id);
    }
  }

  //Делаем лайк активным, если лайкала карточку
  setLike() {
    this._likes.forEach(item => {
      if (item._id === this._userId) {
        this._buttonLike.classList.add('cardElement__like-button_active');
      }
    })
  }

  //Записываем количество лайков
  countLike(cardElement, likes) {
    cardElement.querySelector('.cardElement__likes').textContent = likes.length;
  }

  //Обработчик удаления карточки
  handleCardDelete(cardElement) {
    cardElement.remove();
    cardElement = null;
  }

  _setEventListeners = () => {
    //Слушатель открытия popupPreview картинки карточки
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    //Слушатель кнопки like карточки
    this._buttonLike.addEventListener('click', (evt) => {
      this._handleToggleLike(evt);
    });
    
    //Слушатель кнопки удаления карточки
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._element, this._data._id);
    });
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._buttonDelete = this._element.querySelector('.cardElement__delete-button');
    this._buttonLike = this._element.querySelector('.cardElement__like-button');
    
    this._element.querySelector('.cardElement__title').textContent = this._name;
    this._image = this._element.querySelector('.cardElement__image');
    this._image.src = this._link;
    this._image.alt = this._name;

    if (this._likes) {
      this.countLike(this._element, this._likes);
    }
 
    if (this._owner) { 
      this._hideDeleteButton();
      this.setLike();
    }

    this._setEventListeners();

    return this._element;
  }

}