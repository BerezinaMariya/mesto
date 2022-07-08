//Проверка валидности заполнения полей форм (начало)

//объект настроек (все нужные функциям классы и селекторы элементов)
const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  //делает неактивной кнопку при невалидной форме
  inactiveButtonClass: 'form__submit-button_inactive',
  //подчеркивает невалидное поле красной линией
  inputErrorClass: 'form__input_type_error',
  //появляется сообщение об ошибке
  errorClass: 'form__input-error_active'
}

//Функция показа текста ошибки при невалидном заполнении поля формы
const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

//Функция скрытия текста ошибки при валидном заполнении поля формы
const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}
  
//Показывает ошибку, если заполнение поля невалидно и скрывает её, если валидно
const checkInputValidity = (formElement, inputElement, { ...rest }) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, { ...rest });
  } else {
    hideInputError(formElement, inputElement, { ...rest });
  }
}
  
//Функция проверки валидности полей формы (возвращает true, если хотя бы одно поле не валидно, и false, если все валидны)
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
  
//Функция стилизации кнопки submit-button формы (неактивна при невалидном заполнении полей формы и активна при валидном)
const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass, ...rest }) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}
  
//Функция добавления слушателя события input полям формы
const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, { ...rest });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, { ...rest });
      toggleButtonState(inputList, buttonElement, { ...rest });
    });
  });
}
  
//Добавляет слушателя события submit каждой форме
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, { ...rest });
  });
}