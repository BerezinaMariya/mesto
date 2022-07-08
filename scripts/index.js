const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content.firstElementChild;

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAboutOneself = document.querySelector('.profile__about-oneself');

const popupEdit = document.querySelector('.popup_action_edit');
const formEdit = popupEdit.querySelector('.form_action_edit');
const formInputName = popupEdit.querySelector('.form__input_data_name');
const formInputAboutOneself = popupEdit.querySelector('.form__input_data_about-oneself');

const popupAdd = document.querySelector('.popup_action_add');
const formAdd = popupAdd.querySelector('.form_action_add');
const formInputTitle = popupAdd.querySelector('.form__input_data_image-title');
const formInputImage = popupAdd.querySelector('.form__input_data_image-url');

const popupPreview = document.querySelector('.popup_action_image-preview');
const popupImagePreviewTitle = popupPreview.querySelector('.popup__image-preview-title');
const popupImagePreviewUrl = popupPreview.querySelector('.popup__image-preview-url');

//Функция открытия popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  //Добавляем слушателя нажатия кнопки Esc
  addEscapeKeydownListener ();
  //Добавляем слушателя нажатия оверлея
  addPopupOverlayClickListener ();
  //Добавляем слушателя нажатия кнопки closeButton (крестика)
  addPopupCloseButtonClickListener ();
}

//Функция закрытия popup
function closePopup() {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.classList.remove('popup_opened');
}

//Функция добавления слушателя нажатия кнопки popupCloseButton для закрытия popup
function addPopupCloseButtonClickListener () {
  const popupOpened = document.querySelector('.popup_opened');
  const popupCloseButton = popupOpened.querySelector('.popup__close-button');

  popupCloseButton.addEventListener('click', closePopup);
}

//Функция закрытия popup при нажатии на Esc
function keyEscHandler (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

//Функция добавления слушателя Esc для закрытия popup
function addEscapeKeydownListener () {
  document.addEventListener('keydown', keyEscHandler)
}

//Функция закрытия popup по клику на оверлей
function clickOverlayHandler (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}

//Функция добавления слушателя клика на оверлей для закрытия popup
function addPopupOverlayClickListener () {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.addEventListener('click', clickOverlayHandler)
}

//Функция заполнения полей при открытии popupEdit
function fillEditPopupInput() {
  formInputName.value = profileName.textContent;
  formInputAboutOneself.value = profileAboutOneself.textContent;
}

//Функция редактирования данных в popupEdit и закрытия по кнопке Сохранить
function submitEditPopup() {
  profileName.textContent = formInputName.value;
  profileAboutOneself.textContent = formInputAboutOneself.value;
  closePopup();
}

//Функция добавления слушателя кнопки like карточки
function addCardLikeButtonClickListener(cardElement) { 
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
}

//Функция добавления слушателя кнопки удаления карточки
function addCardDeleteButtonClickListener(cardElement) {
  cardElement.querySelector('.element__delete-button').addEventListener('click', function () {
    cardElement.remove();
  });
}

//Функция добавления слушателя открытия popupPreview картинки карточки
function addOpenCardPreviewClickListener(cardElement) {
  const elementImage = cardElement.querySelector('.element__image');
  const elementTitle = cardElement.querySelector('.element__title');
  
  elementImage.addEventListener('click', function() {
    openPopup(popupPreview);
       
    popupImagePreviewTitle.textContent = elementTitle.textContent;
    popupImagePreviewUrl.src = elementImage.src;
    popupImagePreviewUrl.alt = elementTitle.textContent;
  });
}

//Функция создания и заполнения карточки, листенеры
function createCard (titleValue, imageSrcValue) {
  const cardElement = elementTemplate.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = titleValue;
  const cardElementImage = cardElement.querySelector('.element__image');
  cardElementImage.src = imageSrcValue;
  cardElementImage.alt = titleValue;

  addCardLikeButtonClickListener(cardElement);
  addCardDeleteButtonClickListener(cardElement);
  addOpenCardPreviewClickListener(cardElement);
  
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
  renderCard (createCard (formInputTitle.value, formInputImage.value));
  closePopup();
}

//Функция очистки текста ошибки и выделения поля ошибки (подчеркивание) валидации (используем при открытии popup, т.к. при невалидных полях и закрытии НЕ по submit, при следующем открывании сохраняются текст ошибки и подчеркивание красным цветом)
function resetValidationFields (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const errorList = Array.from(formElement.querySelectorAll('.form__input-error'));
  inputList.forEach((inputElement) => {
    inputElement.classList.remove('form__input_type_error');
  });
  errorList.forEach((errorElement) => {
    errorElement.textContent = '';
  });
}

// Слушатели событий

//открытие popupEdit
profileEditButton.addEventListener('click', function() {
  openPopup(popupEdit);
  resetValidationFields(formEdit);
  fillEditPopupInput();
  enableValidation(config);
});

//закрытие popupEdit по кнопке Сохранить
formEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();
  submitEditPopup();
});

//открытие popupAdd
profileAddButton.addEventListener('click', function() {
  openPopup(popupAdd);
  resetValidationFields(formAdd);
  formAdd.reset();
  enableValidation(config);
});

//закрытие popupAdd по кнопке Создать
formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  submitAddPopup();
});