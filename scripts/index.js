let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileAboutOneself = document.querySelector('.profile__about-oneself');
let popupInputName = document.querySelector('.popup__input_data_name');
let popupInputAboutOneself = document.querySelector('.popup__input_data_about-oneself');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupSubmitButton = document.querySelector('.popup__submit-button');
let popupContainer = document.querySelector('.popup__container');

//Функция открытия окна popup
function openPopup() {
    popup.classList.add('popup_opened');
    popupInputName.value = profileName.textContent;
    popupInputAboutOneself.value = profileAboutOneself.textContent;
}

//Функция закрытиея окна popup
function closePopup() {
    popup.classList.remove('popup_opened');
}

//Функция редактирования данных и закрытия popup по кнопке Сохранить
function submitPopup(evt) {
    evt.preventDefault();
 
    if (popupInputName.value.length !== 0) {
    profileName.textContent = popupInputName.value;
    }

    if (popupInputAboutOneself.value.length !== 0) {
    profileAboutOneself.textContent = popupInputAboutOneself.value;
    }

    closePopup ();
}

// Слушатели событий
profileEditButton.addEventListener('click', openPopup); //открытие popup
popupCloseButton.addEventListener('click', closePopup); //закрытие popup по крестику без сохранения
popupContainer.addEventListener('submit', submitPopup); //закрытие popup по кнопке Сохранить