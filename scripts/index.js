import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { formConfig } from './formConfig.js';
import { FormValidator } from './FormValidator.js';

//Объявляем переменные
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

//Из FormValidator для валидации форм (отдельно для каждой формы)
const formEditValidation = new FormValidator(formConfig, formEdit);
const formAddValidation = new FormValidator(formConfig, formAdd);

//Запускаем валидацию форм
formEditValidation.enableValidation();
formAddValidation.enableValidation();

//Функции

//Функция открытия popup
function handleOpenPopup(popup) {
  popup.classList.add('popup_opened');
  //Добавляем слушателя закрывания popup по кнопке Esc
  document.addEventListener('keydown', handleClosePopupByEsc);
}

//Функция закрытия popup
function handleClosePopup(popupOpened) {
  popupOpened.classList.remove('popup_opened');
  //Удаляем слушателя события закрывания popup по кнопке Esc
  document.removeEventListener('keydown', handleClosePopupByEsc);
}

//Функция закрытия popup при нажатии на Esc
function handleClosePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    handleClosePopup(popupOpened);
  }
}

//Функция заполнения полей при открытии popupEdit
function fillEditPopupInput() {
  formInputName.value = profileName.textContent;
  formInputAboutOneself.value = profileAboutOneself.textContent;
}

//Функция редактирования данных в popupEdit и закрытия по кнопке Сохранить
function handleSubmitEditPopup(popupOpened) {
  //Проверяем, есть ли класс popup_opened, чтобы не было повторных срабатываний при многократном нажатии (т.к. popup закрывается с задержкой 0.5s)
  if (popupEdit.classList.contains('popup_opened')) {
    handleClosePopup(popupOpened);
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


//Функция создания карточки
function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector, handleOpenPreviewPopup);
  const cardElement = card.generateCard();

  return cardElement;
}

//Функция добавления карточки в разметку
function renderCard(data, templateSelector) {
  cards.prepend(createCard(data, templateSelector));
}

//Добавление карточек при открытии страницы из массива initialCards (из cards.js)
initialCards.reverse().forEach((item) => {
  renderCard(item, '#cardElement');
});

//Функция редактирования данных в popupAdd и закрытия по кнопке Создать
function handleSubmitAddPopup(popupOpened) {
  //Проверяем, есть ли класс popup_opened, чтобы не было повторных срабатываний при многократном нажатии (т.к. popup закрывается с задержкой 0.5s)
  if (popupAdd.classList.contains('popup_opened')) {
    //Создаем объект из данных полей формы form_action_add
    const initialCard = {
      name: formInputImageTitle.value,
      link: formInputImageLink.value,
    };
    
    renderCard(initialCard, '#cardElement');
    handleClosePopup(popupOpened);
  }
}

// Слушатели событий

//Добавили каждому popup в документе слушателя закрывания popup по нажатию на крестик или оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    //Проверяем, есть ли класс popup_opened, чтобы не было повторных срабатываний при многократном нажатии (т.к. popup закрывается с задержкой 0.5s)
    if (popup.classList.contains('popup_opened')) {
      //Закрытие по overlay
      if (evt.target.classList.contains('popup_opened')) {
        handleClosePopup(popup)
      }
      //Закрытие по крестику
      if (evt.target.classList.contains('popup__close-button')) {
        handleClosePopup(popup);
      }
    }
  })
})

//Добавили слушателя submit для popupEdit
formEdit.addEventListener('submit', function(evt) {
  evt.preventDefault();
  handleSubmitEditPopup(popupEdit);
});

//Добавили слушателя submit для popupAdd
formAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();
  handleSubmitAddPopup(popupAdd);
}); 

//Добавили слушателя для открытия popupEdit
profileEditButton.addEventListener('click', function() {
  handleOpenPopup(popupEdit);
  fillEditPopupInput();
  formEditValidation.resetValidationFields();
  //Добавляем, чтобы после невалидного заполнения полей и закрытию НЕ по submit
  //при следующем открытии формы кнопка стала активной снова
  formEditValidation.toggleButtonState();
});

//Добавили слушателя для открытия popupAdd
profileAddButton.addEventListener('click', function() {
  handleOpenPopup(popupAdd);
  formAdd.reset();
  formAddValidation.resetValidationFields();
  //Добавляем, чтобы при открытии формы кнопка submit была неактивной
  formAddValidation.toggleButtonState();
});