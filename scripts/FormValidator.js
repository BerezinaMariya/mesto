//Проверка валидности заполнения полей формы

export class FormValidator {
  constructor(formConfig, formElementSelector) {
    this._inputSelector = formConfig.inputSelector;
    this._submitButtonSelector = formConfig.submitButtonSelector;
    this._inactiveButtonClass = formConfig.inactiveButtonClass;
    this._inputErrorClass = formConfig.inputErrorClass;
    this._errorClass = formConfig.errorClass;
    this._formElementSelector = formElementSelector;
  }

  _getForm() {
    const formElement = document.querySelector(this._formElementSelector);

    return formElement;
  }

  //Функция показа текста ошибки при невалидном заполнении поля формы
  _showInputError(formElement, inputElement, errorMessage) {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //Функция скрытия текста ошибки при валидном заполнении поля формы
  _hideInputError(formElement, inputElement) {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  
  //Показывает ошибку, если заполнение поля невалидно и скрывает её, если валидно
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }
  
  //Функция проверки валидности полей формы (возвращает true, если хотя бы одно поле не валидно, и false, если все валидны)
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  //Функция стилизации кнопки submit-button формы (неактивна при невалидном заполнении полей формы и активна при валидном)
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }
  
  //Функция добавления слушателя события input полям формы
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
  //Добавляет слушателя события submit каждой форме
  enableValidation() {
    this._formElement = this._getForm();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._formElement);
  }
}