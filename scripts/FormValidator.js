//Проверка валидности заполнения полей форм

export class FormValidator {
  constructor(formConfig, formSelector) {
    this._formConfig = formConfig;
    this._formSelector = formSelector;
  }

  _getForm() {
    const formElement = document.querySelector(this._formSelector);

    return formElement;
  }

  //Функция показа текста ошибки при невалидном заполнении поля формы
  _showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  //Функция скрытия текста ошибки при валидном заполнении поля формы
  _hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }
  
  //Показывает ошибку, если заполнение поля невалидно и скрывает её, если валидно
  _checkInputValidity(formElement, inputElement, { ...rest }) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, { ...rest });
    } else {
      this._hideInputError(formElement, inputElement, { ...rest });
    }
  }
  
  //Функция проверки валидности полей формы (возвращает true, если хотя бы одно поле не валидно, и false, если все валидны)
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  //Функция стилизации кнопки submit-button формы (неактивна при невалидном заполнении полей формы и активна при валидном)
  _toggleButtonState(inputList, buttonElement, { inactiveButtonClass, ...rest }) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }
  
  //Функция добавления слушателя события input полям формы
  _setEventListeners(formElement, { inputSelector, submitButtonSelector, ...rest }) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, { ...rest });
        this._toggleButtonState(inputList, buttonElement, { ...rest });
      });
    });
  }
  
  //Добавляет слушателя события submit каждой форме
  enableValidation() {
    this._formElement = this._getForm();
 
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._formElement, this._formConfig);
  }
}