const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content.firstElementChild;

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAboutOneself = document.querySelector('.profile__about-oneself');

const popups = document.querySelectorAll('.popup');

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
  //Добавляем слушателя закрывания popup по кнопке Esc
  document.addEventListener('keydown', closePopupByEsc);
}

//Функция закрытия popup
function closePopup() {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.classList.remove('popup_opened');
  //Удаляем слушателя события закрывания popup по кнопке Esc
  document.removeEventListener('keydown', closePopupByEsc);
}

//Функция закрытия popup при нажатии на Esc
function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

//Функция заполнения полей при открытии popupEdit
function fillEditPopupInput() {
  formInputName.value = profileName.textContent;
  formInputAboutOneself.value = profileAboutOneself.textContent;
}

//Функция редактирования данных в popupEdit и закрытия по кнопке Сохранить
function submitEditPopup() {
  //Проверяем, есть ли класс popup_opened, чтобы не было повторных срабатываний при многократном нажатии (т.к. popup закрывается с задержкой 0.5s)
  if (popupEdit.classList.contains('popup_opened')) {
    closePopup();
    profileName.textContent = formInputName.value;
    profileAboutOneself.textContent = formInputAboutOneself.value;
  }
}

//Функция редактирования данных в popupAdd и закрытия по кнопке Создать
function submitAddPopup() {
  //Проверяем, есть ли класс popup_opened, чтобы не было повторных срабатываний при многократном нажатии (т.к. popup закрывается с задержкой 0.5s)
  if (popupAdd.classList.contains('popup_opened')) {
    renderCard (createCard (formInputTitle.value, formInputImage.value));
    closePopup();
  }
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

//Функция деактивации кнопки submit-button формы
function toggleButtonStatInactive (submitButton) {
  submitButton.classList.add('form__submit-button_inactive');
  submitButton.setAttribute('disabled', true);
}

//Функция активации кнопки submit-button формы
function toggleButtonStatActive (submitButton) {
  submitButton.classList.remove('form__submit-button_inactive');
  submitButton.removeAttribute('disabled');
}

//Функция проверки валидности полей input (чтобы при открытии popup с НЕВАЛИДНЫМИ полями кнопка была неактивна)
function toggleButtonStateWhenOpenPopup (popup) {
  const submitButton = popup.querySelector('.form__submit-button');
  const inputList = Array.from(popup.querySelectorAll('.form__input'));

  inputList.forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      toggleButtonStatInactive (submitButton);
    } else {
      toggleButtonStatActive (submitButton);
    }
  });
}

// Слушатели событий

//Добавили каждому popup в документе слушателя закрывания popup по нажатию на крестик или оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    //Проверяем, есть ли класс popup_opened, чтобы не было повторных срабатываний при многократном нажатии (т.к. popup закрывается с задержкой 0.5s)
    if (popup.classList.contains('popup_opened')) {
      //Закрытие по overlay
      if (evt.target.classList.contains('popup_opened')) {
        closePopup()
      }
      //Закрытие по крестику
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup();
      }
    }
  })
})

//Добавили слушателя submit для popupEdit
formEdit.addEventListener('submit', function(evt) {
  evt.preventDefault();
  submitEditPopup();
});

//Добавили слушателя submit для popupAdd
formAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();
  submitAddPopup();
}); 

//Добавили слушателя для открытия popupEdit
profileEditButton.addEventListener('click', function() {
  openPopup(popupEdit);
  resetValidationFields(formEdit);
  fillEditPopupInput();
  toggleButtonStateWhenOpenPopup(popupEdit);
});

//Добавили слушателя для открытия popupAdd
profileAddButton.addEventListener('click', function() {
  openPopup(popupAdd);
  resetValidationFields(formAdd);
  formAdd.reset();
  toggleButtonStateWhenOpenPopup(popupAdd);
});