import '../pages/index.css';

import { 
  initialCards,
  profileEditButton,
  profileAddButton,
  formEdit,
  formInputName,
  formInputAboutOneself,
  formAdd,
  formInputImageTitle,
  formInputImageLink,
  popupEditSelector,
  popupAddSelector,
  popupPreviewSelector,
  cardsContainer,
  cardElementTemplate,
  userInfoInputsSelector,
} from '../utils/constants';

import { Card } from '../components/Card';
import { formConfig } from '../utils/formConfig';
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

//Создание экземпляра класса Section для исходного массива карточек initialCards
const initialCardsList = new Section({ 
  items: initialCards.reverse(),
  renderer: (item) => {
    const card = new Card(item, cardElementTemplate, handleCardClick);
    const cardElement = card.generateCard();
    initialCardsList.addItem(cardElement);
  }
}, cardsContainer);

//Создание и отрисовка всех карточек из исходного массива initialCards
initialCardsList.renderItems();
 
//Редактирование данных в popupAdd и закрытие по кнопке Создать
function handleSubmitAddPopup() {
  //Создание объекта из данных полей формы form_action_add
  const сard = {
    name: formInputImageTitle.value,
    link: formInputImageLink.value,
  };

  const сardList = new Section({}, cardsContainer);

  const card = new Card(сard, cardElementTemplate, handleCardClick);
  const cardElement = card.generateCard();
  сardList.addItem(cardElement);

  popupAdd.handleClosePopup();
}

//Заполнение полей формы при открытии popupEdit
function fillEditPopupInput() {
  formInputName.value = userInfo.getUserInfo().name;
  formInputAboutOneself.value = userInfo.getUserInfo().aboutOneself;
}

//Редактирование данных в popupEdit и закрытие по кнопке Сохранить
function handleSubmitEditPopup() {
  userInfo.setUserInfo();
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
  formAdd.reset();
  formAddValidation.resetValidationFields();
  //Добавляем, чтобы при открытии формы кнопка submit была неактивной
  formAddValidation.toggleButtonState();
});