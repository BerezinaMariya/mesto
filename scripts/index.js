const elements = document.querySelector('.elements');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAboutOneself = document.querySelector('.profile__about-oneself');

const popupEdit = document.querySelector('.popup_action_edit');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const formEdit = popupEdit.querySelector('.edit-form');
const popupInputName = popupEdit.querySelector('.popup__input_data_name');
const popupInputAboutOneself = popupEdit.querySelector('.popup__input_data_about-oneself');

const popupAdd = document.querySelector('.popup_action_add');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
const formAdd = popupAdd.querySelector('.add-form');
const popupInputTitle = popupAdd.querySelector('.popup__input_data_title');
const popupInputImage = popupAdd.querySelector('.popup__input_data_image');

const popupPreview = document.querySelector('.popup_action_image-preview');
const popupPreviewCloseButton = popupPreview.querySelector('.popup__close-button');
const popupPreviewTitle = popupPreview.querySelector('.popup__preview-title');
const popupImagePreview = popupPreview.querySelector('.popup__image-preview');

//Функция открытия popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

//Функция закрытия popup
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

//Функция заполнения полей при открытии popupEdit
function inputEditPopup() {
  popupInputName.value = profileName.textContent;
  popupInputAboutOneself.value = profileAboutOneself.textContent;
}

//Функция редактирования данных в popupEdit и закрытия по кнопке Сохранить
function submitEditPopup() {
  profileName.textContent = popupInputName.value;
  profileAboutOneself.textContent = popupInputAboutOneself.value;
  closePopup(popupEdit);
}

//Функция добавления слушателя кнопки like карточки
function addEventListenerCardLikeButton(cardElement) { 
  cardElement.querySelector('.element__like-button').addEventListener('click', function (cardElement) {
    cardElement.target.classList.toggle('element__like-button_active');
  });
}

//Функция добавления слушателя кнопки удаления карточки
function addEventListenerCardDeleteButton(cardElement) {
  cardElement.querySelector('.element__delete-button').addEventListener('click', function (cardElement) {
  cardElement.target.closest('.element').remove();
  });
}

//Функция добавления слушателя открытия popupPreview картинки карточки
function addEventListenerOpenCardPreview(cardElement) {
  const elementImage = cardElement.querySelector('.element__image');
  const elementTitle = cardElement.querySelector('.element__title');
  
  elementImage.addEventListener('click', function() {
    openPopup(popupPreview);
       
    popupPreviewTitle.textContent = elementTitle.textContent;
    popupImagePreview.src = elementImage.src;
    popupImagePreview.alt = elementTitle.textContent;
  });
}

//Функция создания и заполнения карточки, листенеры
function createCard (titleValue, imageSrcValue) {
  const elementTemplate = document.querySelector('#element').content;
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__title').textContent = titleValue;
  cardElement.querySelector('.element__image').src = imageSrcValue;

  addEventListenerCardLikeButton(cardElement);
  addEventListenerCardDeleteButton(cardElement);
  addEventListenerOpenCardPreview(cardElement);
  
  return cardElement;
}

//Функция добавления карточки в разметку
function renderCard (cardElement) {
  elements.prepend(cardElement);
}

//Добавление карточек при открытии страницы из массива elementsInitialCards (из cards.js)
elementsInitialCards.reverse().forEach(function (element) {
  renderCard (createCard(element.name, element.link));
});

//Функция редактирования данных в popupAdd и закрытия по кнопке Создать
function submitAddPopup() {
  renderCard (createCard (popupInputTitle.value, popupInputImage.value));
  formAdd.reset();
  closePopup(popupAdd);
}

// Слушатели событий

//открытие popupEdit
profileEditButton.addEventListener('click', function() {
  openPopup(popupEdit);
  inputEditPopup ();
});

//закрытие popupEdit по крестику без сохранения
popupEditCloseButton.addEventListener('click', function() {
  closePopup(popupEdit);
});

//закрытие popupEdit по кнопке Сохранить
formEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();
  submitEditPopup();
});

//открытие popupAdd
profileAddButton.addEventListener('click', function() {
  openPopup(popupAdd);
});

//закрытие popupAdd по крестику без сохранения
popupAddCloseButton.addEventListener('click', function() {
  closePopup(popupAdd);
});

//закрытие popupAdd по кнопке Создать
formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  submitAddPopup();
});

//закрытие popupPreview по крестику
popupPreviewCloseButton.addEventListener('click', function() {
  closePopup(popupPreview);
});