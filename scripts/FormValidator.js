//Проверка валидности заполнения полей формы

export class FormValidator {
  constructor(formConfig, form) {
    this._inputSelector = formConfig.inputSelector;
    this._submitButtonSelector = formConfig.submitButtonSelector;
    this._inactiveButtonClass = formConfig.inactiveButtonClass;
    this._inputErrorClass = formConfig.inputErrorClass;
    this._errorClass = formConfig.errorClass;
    this._form = form;
  }

  _getForm() {
    const form = document.querySelector(this._form);

    return form;
  }

  //Функция показа текста ошибки при невалидном заполнении поля формы
  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  //Функция скрытия текста ошибки при валидном заполнении поля формы
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }
  
  //Показывает ошибку, если заполнение поля невалидно и скрывает её, если валидно
  _checkInputValidity(inputElement) {
    // Находим элемент ошибки
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

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
  
  //Функция переключения кнопки submit-button формы (неактивна при невалидном заполнении полей формы и активна при валидном)
  _toggleButtonState() {
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    if (this._hasInvalidInput()) {
      this._inactivateButtonState();
    } else {
      this._activateButtonState();
    }
  }

  //Функция обнуления ошибок, то есть текста ошибки и выделения поля ошибки (подчеркивания)
  //при открытии popup (и соответственно формы), т.к. при невалидных полях и закрытии НЕ по submit, 
  //при следующем открытии сохраняются текст ошибки и подчеркивание красным цветом невалидных полей с предыдущего раза
  _resetValidationFields() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._errorList = Array.from(this._formElement.querySelectorAll('.form__input-error'));
    
    if (this._hasInvalidInput()) {
      this._inputList.forEach((inputElement) => {
        if (inputElement.classList.contains('form__input_type_error')) {
          inputElement.classList.remove('form__input_type_error');
        }
      });

      this._errorList.forEach((errorElement) => {
        errorElement.textContent = '';
      });
    }
  }
  
  //Обработчик события Input
  _handleEventInput(inputElement) {
    this._checkInputValidity(inputElement);
    this._toggleButtonState();
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
    this._formElement = this._getForm();

    this._resetValidationFields();
    //Переключаем кнопку в правильное состояние (проверка валидности полей до события input)
    this._toggleButtonState();
    this._setEventListeners();
  }
}