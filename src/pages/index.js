import '../pages/index.css';

import { 
  initialCards,
  profileEditButton,
  profileAddButton,
  formEdit,
  formInputName,
  formInputAboutOneself,
  formAdd,
  popupEditSelector,
  popupAddSelector,
  popupPreviewSelector,
  cardsContainer,
  cardElementTemplate,
  userInfoInputsSelector,
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { formConfig } from '../utils/formConfig.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

//Объявляем переменные
const popupPreview = new PopupWithImage(popupPreviewSelector);
const popupEdit = new PopupWithForm(popupEditSelector, handleSubmitEditPopup);
const popupAdd = new PopupWithForm(popupAddSelector, handleSubmitAddPopup);

const userInfo = new UserInfo(userInfoInputsSelector);

//Из FormValidator для валидации форм (отдельно для каждой формы)
const formEditValidation = new FormValidator(formConfig, formEdit);
const formAddValidation = new FormValidator(formConfig, formAdd);

//Запускаем валидацию форм
formEditValidation.enableValidation();
formAddValidation.enableValidation();

//Функции

function createCard(cardItem) {
  const card = new Card(cardItem, cardElementTemplate, handleCardClick);
  return card.generateCard();
}

//Создание экземпляра класса Section
const cardsList = new Section({ 
  items: initialCards,
  renderer: (item) => {
    cardsList.appendItem(createCard(item));
  }
}, cardsContainer);

//Отрисовка всех карточек из исходного массива initialCards
cardsList.renderItems();
 
//Редактирование данных в popupAdd и закрытие по кнопке Создать
function handleSubmitAddPopup(cardItem) {
  cardsList.addItem(createCard(cardItem));

  popupAdd.handleClosePopup();
}

//Заполнение полей формы при открытии popupEdit
function fillEditPopupInput() {
  const getUserInfo = userInfo.getUserInfo();
  formInputName.value = getUserInfo.name;
  formInputAboutOneself.value = getUserInfo.aboutOneself;
}

//Редактирование данных в popupEdit и закрытие по кнопке Сохранить
function handleSubmitEditPopup(user) {
  userInfo.setUserInfo(user);
  popupEdit.handleClosePopup();
}

//Обработчик открытия popupPreview картинки карточки
function handleCardClick(imageName, imageLink) {
  popupPreview.handleOpenPopup(imageName, imageLink);
}

// Слушатели событий

popupPreview.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();

//Слушатель открытия popupEdit
profileEditButton.addEventListener('click', function() {
  popupEdit.handleOpenPopup();
  fillEditPopupInput();
  formEditValidation.resetValidationFields();
  //Добавляем, чтобы после невалидного заполнения полей и закрытию НЕ по submit
  //при следующем открытии формы кнопка стала активной снова
  formEditValidation.toggleButtonState();
});

//Слушатель открытия popupAdd
profileAddButton.addEventListener('click', function() {
  popupAdd.handleOpenPopup();
  formAddValidation.resetValidationFields();
  //Добавляем, чтобы при открытии формы кнопка submit была неактивной
  formAddValidation.toggleButtonState();
});