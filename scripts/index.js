const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
let profileName = document.querySelector('.profile__name');
let profileAboutOneself = document.querySelector('.profile__about-oneself');

const popupEdit = document.querySelector('.popup_action_edit');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const editForm = popupEdit.querySelector('.edit-form');
let popupInputName = popupEdit.querySelector('.popup__input_data_name');
let popupInputAboutOneself = popupEdit.querySelector('.popup__input_data_about-oneself');

const popupAdd = document.querySelector('.popup_action_add');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
const AddForm = popupAdd.querySelector('.add-form');

//Массив из 6 карточек при загрузке
const elementsInitialCards = [
  {
    name: 'Большой Барьерный риф',
    link: 'https://2.downloader.disk.yandex.ru/preview/7edb9fc547df0e0fc9df2336cec437d055fe3cd4dcfbbc50e14781a68dec27e9/inf/LQMg3y5x2f0v-xyI1y0kkrOcUoF2_aQX8jTpHLMGLU0nqHCuwDfnMc1tgq_zGu3pRFoY9yrdfWBoEnXJ2RzDhQ%3D%3D?uid=1581965923&filename=element-great-barrier-reef.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1581965923&tknv=v2&size=1583x789'
  },
  {
    name: 'Пролив Дрейка',
    link: 'https://4.downloader.disk.yandex.ru/preview/b8e1686e8f9d17c1053913928309004cb1408ca49d5c1d329f972d06554ad82b/inf/MbFr9z1XebuxJqFm6iD4kydleWVDNZh4GfaXw972s0EtRQtbuXMIU8C_45Gpbf9RSlk_adH34QyYH9WOxLwi0A%3D%3D?uid=1581965923&filename=element-drake-passage.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1581965923&tknv=v2&size=1583x789'
  },
  {
    name: 'Атлантический океан',
    link: 'https://downloader.disk.yandex.ru/preview/5321208fc5f5bd57c322fd94f3b1a9a40335c3d9c359734450c8985dc0327aea/62b5f257/JF1mkYNaZXjp3KFhYSny1idleWVDNZh4GfaXw972s0FO2m1bBzJ0AapYlQqWSdMto4vCAQHx6g6qbGX3ku-nVA%3D%3D?uid=0&filename=element-atlantic-ocean.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
  },
  {
    name: 'Тихий океан',
    link: 'https://2.downloader.disk.yandex.ru/preview/1fbc2c79c587a88a7090430ae62d6d587c46d84bda7e8d90abc9e5f2486de647/inf/X_E98VIg3ZhpnaNw2IK-p7OcUoF2_aQX8jTpHLMGLU3mpA2wAOKlvF116hAn7OVTLI2yPEagKH_K-9Rdcamcpw%3D%3D?uid=1581965923&filename=element-pacific-ocean.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1581965923&tknv=v2&size=1583x789'
  },
  {
    name: 'Гибралтарский пролив',
    link: 'https://1.downloader.disk.yandex.ru/preview/352a25035b3a075fab5fd22ec060a80c3990e1cf9d3790ff5fb85ba24d7d3cc4/inf/XwMHAjaE8JzWyieJ6D9PCSdleWVDNZh4GfaXw972s0HkcuQ22tWaV4gJks39YYMxkBhNbxR8RH7Nv9xXzIBaLg%3D%3D?uid=1581965923&filename=element-gibraltar-strait.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1581965923&tknv=v2&size=1583x789'
  },
  {
    name: 'Средиземное море',
    link: 'https://4.downloader.disk.yandex.ru/preview/d788ed4e2b391c3b347cac9783d90a1e51b5f3bf0c3b2d6e5185e32f3a7a7314/inf/x-6o8ElOFmL0_qgUaYBIhydleWVDNZh4GfaXw972s0HhA1KC7HfA1oYrSLmfwLSUGPYMpcn3pcNM9RswaKPvnw%3D%3D?uid=1581965923&filename=element-mediterranean-sea.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1581965923&tknv=v2&size=1583x789'
  }
];

//Добавление карточек при открытии страницы
elementsInitialCards.forEach(function (element) {
  const cardElement = elementTemplate.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__mask-group').src = element.link;

  elements.append(cardElement)
});


//Функция открытия popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

//Функция закрытия popup
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

//Функция заполнения полей при открытии popupEdit
function openPopupEdit () {
  popupInputName.value = profileName.textContent;
  popupInputAboutOneself.value = profileAboutOneself.textContent;
}

//Функция редактирования данных в popupEdit для закрытия по кнопке Сохранить
function submitEditPopup() {
    if (popupInputName.value.length !== 0) {
    profileName.textContent = popupInputName.value;
    }

    if (popupInputAboutOneself.value.length !== 0) {
    profileAboutOneself.textContent = popupInputAboutOneself.value;
    }
}

// Слушатели событий

//открытие popupEdit
profileEditButton.addEventListener('click', function () {
  openPopup(popupEdit);
  openPopupEdit ();
});

//закрытие popupEdit по крестику без сохранения
popupEditCloseButton.addEventListener('click', function () {
  closePopup(popupEdit);
});

//закрытие popupEdit по кнопке Сохранить
editForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  submitPopup ();
  closePopup(popupEdit);
});

//открытие popupAdd
profileAddButton.addEventListener('click', function () {
  openPopup(popupAdd);
});

//закрытие popupAdd по крестику без сохранения
popupAddCloseButton.addEventListener('click', function () {
  closePopup(popupAdd);
});