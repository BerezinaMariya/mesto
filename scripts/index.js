import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { formConfig } from './formConfig.js';
import { FormValidator } from './FormValidator.js';

//Запускаем валидацию форм (отдельно для каждой формы)
const addFormValidation = new FormValidator(formConfig, '.form_action_add');
const addFormenableValidation = addFormValidation.enableValidation();

const editFormValidation = new FormValidator(formConfig, '.form_action_edit');
const editFormenableValidation = editFormValidation.enableValidation();

//Объявляем остальные переменные
const cards = document.querySelector('.cards');

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
const formInputImageTitle = popupAdd.querySelector('.form__input_data_image-title');
const formInputImageLink = popupAdd.querySelector('.form__input_data_image-url');

const popupPreview = document.querySelector('.popup_action_image-preview');
const popupImagePreviewTitle = popupPreview.querySelector('.popup__image-preview-title');
const popupImagePreviewUrl = popupPreview.querySelector('.popup__image-preview-url');

//Функция открытия popup
function handleOpenPopup(popupCardElement) {
  popupCardElement.classList.add('popup_opened');
  //Добавляем слушателя закрывания popup по кнопке Esc
  document.addEventListener('keydown', handleClosePopupByEsc);
}

//Функция закрытия popup
function handleClosePopup() {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.classList.remove('popup_opened');
  //Удаляем слушателя события закрывания popup по кнопке Esc
  document.removeEventListener('keydown', handleClosePopupByEsc);
}

//Функция закрытия popup при нажатии на Esc
function handleClosePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    handleClosePopup();
  }
}

//Функция заполнения полей при открытии popupEdit
function fillEditPopupInput() {
  formInputName.value = profileName.textContent;
  formInputAboutOneself.value = profileAboutOneself.textContent;
}

//Функция редактирования данных в popupEdit и закрытия по кнопке Сохранить
function handleSubmitEditPopup() {
  //Проверяем, есть ли класс popup_opened, чтобы не было повторных срабатываний при многократном нажатии (т.к. popup закрывается с задержкой 0.5s)
  if (popupEdit.classList.contains('popup_opened')) {
    handleClosePopup();
    profileName.textContent = formInputName.value;
    profileAboutOneself.textContent = formInputAboutOneself.value;
  }
}

//Обработчик открытия popupPreview картинки карточки
function handleOpenPreviewPopup(imageName, imageLink) {
  handleOpenPopup(popupPreview);
       
  popupImagePreviewTitle.textContent = imageName;
  popupImagePreviewUrl.src = imageLink;
  popupImagePreviewUrl.alt = imageName;
}

//Функция добавления карточки в разметку
function renderCard(data, templateSelector) {
  const card = new Card(data, templateSelector, handleOpenPreviewPopup);
  const cardElement = card.generateCard();

  cards.prepend(cardElement);
}

//Добавление карточек при открытии страницы из массива initialCards (из cards.js)
initialCards.reverse().forEach((item) => {
  renderCard(item, '#cardElement');
});

//Функция редактирования данных в popupAdd и закрытия по кнопке Создать
function handleSubmitAddPopup() {
  //Проверяем, есть ли класс popup_opened, чтобы не было повторных срабатываний при многократном нажатии (т.к. popup закрывается с задержкой 0.5s)
  if (popupAdd.classList.contains('popup_opened')) {
    //Создаем объект из данных полей формы form_action_add
    const initialCard = {
      name: formInputImageTitle.value,
      link: formInputImageLink.value,
    };
    
    renderCard(initialCard, '#cardElement');
    handleClosePopup();
  }
}

//Функция очистки текста ошибки и выделения поля ошибки (подчеркивание) валидации 
//(используем при открытии popup, т.к. при невалидных полях и закрытии НЕ по submit, 
//при следующем открывании сохраняются текст ошибки и подчеркивание красным цветом)
function resetValidationFields(formCardElement) {
  const inputList = Array.from(formCardElement.querySelectorAll('.form__input'));
  const errorList = Array.from(formCardElement.querySelectorAll('.form__input-error'));
  inputList.forEach((inputCardElement) => {
    inputCardElement.classList.remove('form__input_type_error');
  });
  errorList.forEach((errorCardElement) => {
    errorCardElement.textContent = '';
  });
}

//Функция деактивации кнопки submit-button формы
function buttonStateInactive(submitButton) {
  submitButton.classList.add('form__submit-button_inactive');
  submitButton.setAttribute('disabled', true);
}

//Функция активации кнопки submit-button формы
function buttonStateActive(submitButton) {
  submitButton.classList.remove('form__submit-button_inactive');
  submitButton.removeAttribute('disabled');
}

//Функция проверки валидности полей input (чтобы при открытии popup с НЕВАЛИДНЫМИ полями кнопка была неактивна)
function toggleButtonState(popup) {
  const submitButton = popup.querySelector('.form__submit-button');
  const inputList = Array.from(popup.querySelectorAll('.form__input'));

  inputList.forEach((inputcardElement) => {
    if (!inputcardElement.validity.valid) {
     buttonStateInactive(submitButton);
    } else {
     buttonStateActive(submitButton);
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
        handleClosePopup()
      }
      //Закрытие по крестику
      if (evt.target.classList.contains('popup__close-button')) {
        handleClosePopup();
      }
    }
  })
})

//Добавили слушателя submit для popupEdit
formEdit.addEventListener('submit', function(evt) {
  evt.preventDefault();
  handleSubmitEditPopup();
});

//Добавили слушателя submit для popupAdd
formAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();
  handleSubmitAddPopup();
}); 

//Добавили слушателя для открытия popupEdit
profileEditButton.addEventListener('click', function() {
  handleOpenPopup(popupEdit);
  resetValidationFields(formEdit);
  fillEditPopupInput();
  toggleButtonState(popupEdit);
});

//Добавили слушателя для открытия popupAdd
profileAddButton.addEventListener('click', function() {
  handleOpenPopup(popupAdd);
  resetValidationFields(formAdd);
  formAdd.reset();
  toggleButtonState(popupAdd);
});