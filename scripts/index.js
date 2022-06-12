//Заливка лайков при нажатии
let elementGroup = document.querySelectorAll('.element__group');

for (let i = 0; i < elementGroup.length; i = i + 1) {
    elementGroup[i].addEventListener('click', function () {
        if (elementGroup[i].className === 'element__group') {
        elementGroup[i].classList.add('element__group_background_fill');
        } else {
        elementGroup[i].classList.remove('element__group_background_fill');
        }
    });
}

//Открытие окна popup
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileAboutOneself = document.querySelector('.profile__about-oneself');
let popupInput = document.querySelectorAll('.popup__input');
let popupInputName = popupInput[0];
let popupInputAboutOneself = popupInput[1];

function openPopup() {
    if (popup.className === 'popup popup_opened') {
        popup.classList.remove('popup_opened');
        popupInputName.setAttribute('placeholder', profileName.textContent);
        popupInputAboutOneself.setAttribute('placeholder', profileAboutOneself.textContent);
        popupInputName.value = '';
        popupInputAboutOneself.value = '';
    } 
}

profileEditButton.addEventListener('click', openPopup);

//Закрытие окна popup
let popupCloseButton = document.querySelector('.popup__close-button');

function closePopup(evt) {
    if (popup.className === 'popup') {
        popup.classList.add('popup_opened');
    } 
}

popupCloseButton.addEventListener('click', closePopup);

//Редактирование данных и закрытие popup по кнопке сохранить
let popupSubmitButton = document.querySelector('.popup__submit-button');
let popupContainer = document.querySelector('.popup__container');

function submitPopup(evt) {
    evt.preventDefault();
 
    if (popupInputName.value.length !== 0) {
    profileName.textContent = popupInputName.value;
    popupInputName.setAttribute('placeholder', profileName.textContent);
    }

    if (popupInputAboutOneself.value.length !== 0) {
    profileAboutOneself.textContent = popupInputAboutOneself.value;
    popupInputAboutOneself.setAttribute('placeholder', profileAboutOneself.textContent);
    }

    closePopup (evt);
}

popupContainer.addEventListener('submit', submitPopup)