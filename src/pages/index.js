import '../pages/index.css';

import {
  profileEditButton,
  profileAddButton,
  profileEditAvatarButton,
  formEdit,
  formInputName,
  formInputAbout,
  formAdd,
  formEditAvatar,
  popupEditSelector,
  popupAddSelector,
  popupPreviewSelector,
  popupPreviewTitleSelector,
  popupPreviewUrlSelector,
  popupDeleteSelector,
  popupEditAvatarSelector,
  cardsContainer,
  cardElementTemplate,
  userInfoInputsSelector,
} from '../utils/constants.js';

import { Api } from '../components/Api.js'
import { Card } from '../components/Card.js';
import { formConfig } from '../utils/formConfig.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

//Объявляем переменные
const popupPreview = new PopupWithImage(popupPreviewSelector, popupPreviewTitleSelector, popupPreviewUrlSelector);
const popupEdit = new PopupWithForm(popupEditSelector, handleSubmitEditPopup);
const popupAdd = new PopupWithForm(popupAddSelector, handleSubmitAddPopup);
const popupDelete = new PopupWithConfirmation(popupDeleteSelector, handleSubmitDeletePopup);
const popupAvatarEdit = new PopupWithForm(popupEditAvatarSelector, handleSubmitAvatarEditPopup);

const userInfo = new UserInfo(userInfoInputsSelector);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: 'c8e88be4-173c-499a-97f5-515e9331d7ba',
    'Content-Type': 'application/json'
  }
}); 

//Из FormValidator для валидации форм (отдельно для каждой формы)
const formEditValidation = new FormValidator(formConfig, formEdit);
const formAddValidation = new FormValidator(formConfig, formAdd);
const formAvatareditValidation = new FormValidator(formConfig, formEditAvatar);

//Запускаем валидацию форм
formEditValidation.enableValidation();
formAddValidation.enableValidation();
formAvatareditValidation.enableValidation();

//Функции

//Экземпляр класса Card
function card(cardItem) {
  const card = new Card(cardItem, userInfo._userId, cardElementTemplate, handleCardClick, handleDeleteClick, handleSetLike, handleDeleteLike);
  return card;
}

//Создание карточки
function createCard(cardItem) {
  return card(cardItem).generateCard();
}

//Создание экземпляра класса Section
const cardsList = new Section({
  renderer: (item) => {
    cardsList.appendItem(createCard(item));
  }
}, cardsContainer);

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(values => {
  userInfo.setUserInfo(values[0]);
  userInfo.setAvatar(values[0]);
  userInfo.setId(values[0]);
  cardsList.renderItems(values[1]);
})
.catch((err) => {
  alert(`${err} Данные пользователя или карточки не загружены`)
});

//Редактирование данных в popupAdd и закрытие по кнопке Создать
function handleSubmitAddPopup(cardItem) {
  popupAdd.renderLoading(true, 'Создать');

  api.setNewCard(cardItem)
  .then(() => {
    cardsList.addItem(createCard(cardItem));
    popupAdd.handleClosePopup();
  })
  .catch((err) => {
    alert(`${err} Карточка не создана`)
  })
  .finally(() => {
    popupAdd.renderLoading(false, 'Создать');
  })
}

//Заполнение полей формы при открытии popupEdit
function fillEditPopupInput() {
  const getUserInfo = userInfo.getUserInfo();
  formInputName.value = getUserInfo.name;
  formInputAbout.value = getUserInfo.about;
}

//Редактирование данных в popupEdit и закрытие по кнопке Сохранить
function handleSubmitEditPopup(user) {
  popupEdit.renderLoading(true, 'Сохранить');

  api.setUserInfo(user)
  .then(() => {
    userInfo.setUserInfo(user);
    popupEdit.handleClosePopup();
  })
  .catch((err) => {
    alert(`${err} Данные не отредактировались`)
  })
  .finally(() => {
    popupEdit.renderLoading(false, 'Сохранить');
  }); 
}

//Редактирование аватара и закрытие по кнопке Сохранить
function handleSubmitAvatarEditPopup(user) {
  popupAvatarEdit.renderLoading(true, 'Сохранить');

  api.setAvatar(user)
  .then(() => {
    userInfo.setAvatar(user);
    popupAvatarEdit.handleClosePopup();
  })
  .catch((err) => {
    alert(`${err} Аватар не сменился`)
  })
  .finally(() => {
    popupAvatarEdit.renderLoading(false, 'Сохранить');
  }); 
}

//Обработчик нажатия на корзину карточки
function handleDeleteClick(cardElement, id) {
  popupDelete.handleOpenPopup(cardElement, id);
}

//Обработчик удаления карточки (при нажатии "Да" в popupDelete)
function handleSubmitDeletePopup(cardElement, id) {
  api.deleteCard(id)
  .then(() => {
    card(cardElement).handleCardDelete(cardElement);
    popupDelete.handleClosePopup();
  })
  .catch((err) => {
    alert(`${err} Карточка не удалилась`)
  }); 
}

//Обработчик открытия popupPreview картинки карточки
function handleCardClick(imageName, imageLink) {
  popupPreview.handleOpenPopup(imageName, imageLink);
}

//Лайк карточки
function handleSetLike(evt, cardElement, cardId) {
  api.setLike(cardId)
  .then((res) => {
    card(cardElement).setLike(evt);
    card(res).generateCard();
  })
  .catch((err) => {
    alert(`${err} Карточка не лайкнулась`)
  });
}

//Удаление лайка карточки
function handleDeleteLike(evt, cardElement, cardId) {
  api.deleteLike(cardId)
  .then((res) => {
    card(cardElement).deleteLike(evt);
    card(res).generateCard();
  })
  .catch((err) => {
    alert(`${err} Лайк не удалился`)
  });
}

// Слушатели событий

popupPreview.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDelete.setEventListeners();
popupAvatarEdit.setEventListeners();

//Слушатель открытия popupAvatarEdit
profileEditAvatarButton.addEventListener('click', function () {
  popupAvatarEdit.handleOpenPopup();
  formAvatareditValidation.toggleButtonState();
});

//Слушатель открытия popupEdit
profileEditButton.addEventListener('click', function () {
  popupEdit.handleOpenPopup();
  fillEditPopupInput();
  formEditValidation.resetValidationFields();
  //Добавляем, чтобы после невалидного заполнения полей и закрытию НЕ по submit
  //при следующем открытии формы кнопка стала активной снова
  formEditValidation.toggleButtonState();
});

//Слушатель открытия popupAdd
profileAddButton.addEventListener('click', function () {
  popupAdd.handleOpenPopup();
  formAddValidation.resetValidationFields();
  //Добавляем, чтобы при открытии формы кнопка submit была неактивной
  formAddValidation.toggleButtonState();
});