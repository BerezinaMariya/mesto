//Проверка валидности заполнения полей формы

export class FormValidator {
  constructor(formConfig, form) {
    this._inputSelector = formConfig.inputSelector;
    this._submitButtonSelector = formConfig.submitButtonSelector;
    this._inactiveButtonClass = formConfig.inactiveButtonClass;
    this._inputErrorClass = formConfig.inputErrorClass;
    this._errorClass = formConfig.errorClass;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    
  }

  //Функция показа текста ошибки при невалидном заполнении поля формы
  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  //Функция скрытия текста ошибки при валидном заполнении поля формы
  _hideInputError(inputElement) {
    // Находим элемент ошибки
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }
  
  //Показывает ошибку, если заполнение поля невалидно и скрывает её, если валидно
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
  //Функция проверки валидности полей формы (возвращает true, если хотя бы одно поле не валидно, и false, если все валидны)
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Функция деактивации кнопки submit-button формы
  _inactivateButtonState() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }
    
  //Функция активации кнопки submit-button формы
  _activateButtonState() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }
  
  //Функция переключения кнопки submit-button формы (неактивна при невалидном заполнении полей формы и активна при валидном).
  //Используем в том числе при открытии popup, чтобы активировать/деактивировать кнопку до первого события input
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._inactivateButtonState();
    } else {
      this._activateButtonState();
    }
  }

  //Функция обнуления ошибок, то есть текста ошибки и выделения поля ошибки (подчеркивания)
  //при открытии popup (и соответственно формы), т.к. при невалидных полях и закрытии НЕ по submit, 
  //при следующем открытии сохраняются текст ошибки и подчеркивание красным цветом невалидных полей с предыдущего раза
  resetValidationFields() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }
  
  //Обработчик события Input
  _handleEventInput(inputElement) {
    this._checkInputValidity(inputElement);
    this.toggleButtonState();
  }
    
  //Функция добавления слушателя события input полям формы
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleEventInput(inputElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}