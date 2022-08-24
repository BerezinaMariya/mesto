(()=>{"use strict";var e=document.querySelector(".profile__edit-button"),t=document.querySelector(".profile__add-button"),n=document.querySelector(".popup_action_edit"),r=n.querySelector(".form_action_edit"),o=n.querySelector(".form__input_data_name"),i=n.querySelector(".form__input_data_about-oneself"),a=document.querySelector(".popup_action_add").querySelector(".form_action_add");function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t.name,this._link=t.link,this._templateSelector=n,this._handleCardClick=r}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".cardElement").cloneNode(!0)}},{key:"_handleCardLike",value:function(e){e.target.classList.toggle("cardElement__like-button_active")}},{key:"_handleCardDelete",value:function(){this._element.remove(),this._element=null}},{key:"_setEventListeners",value:function(){var e=this;this._image.addEventListener("click",(function(){e._handleCardClick(e._name,e._link)})),this._element.querySelector(".cardElement__like-button").addEventListener("click",(function(t){e._handleCardLike(t)})),this._element.querySelector(".cardElement__delete-button").addEventListener("click",(function(){e._handleCardDelete()}))}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._element.querySelector(".cardElement__title").textContent=this._name,this._image=this._element.querySelector(".cardElement__image"),this._image.src=this._link,this._image.alt=this._name,this._setEventListeners(),this._element}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),c={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit-button",inactiveButtonClass:"form__submit-button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"};function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._form=n,this._buttonElement=this._form.querySelector(this._submitButtonSelector),this._inputList=Array.from(this._form.querySelectorAll(this._inputSelector))}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e,t){this._errorElement=this._form.querySelector(".".concat(e.id,"-error")),e.classList.add(this._inputErrorClass),this._errorElement.textContent=t,this._errorElement.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){this._errorElement=this._form.querySelector(".".concat(e.id,"-error")),e.classList.remove(this._inputErrorClass),this._errorElement.classList.remove(this._errorClass),this._errorElement.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_inactivateButtonState",value:function(){this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)}},{key:"_activateButtonState",value:function(){this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.removeAttribute("disabled")}},{key:"toggleButtonState",value:function(){this._hasInvalidInput()?this._inactivateButtonState():this._activateButtonState()}},{key:"resetValidationFields",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"_handleEventInput",value:function(e){this._checkInputValidity(e),this.toggleButtonState()}},{key:"_setEventListeners",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._handleEventInput(t)}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var h=function(){function e(t){var n,r,o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){"Escape"===e.key&&o.handleClosePopup()},(n="_handleEscClose")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"handleOpenPopup",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"handleClosePopup",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){var n=t.target.classList;(n.contains("popup_opened")||n.contains("popup__close-button"))&&e.handleClosePopup()}))}}])&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(){return y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=m(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},y.apply(this,arguments)}function m(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}function b(e,t){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},b(e,t)}function v(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function w(e){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},w(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&b(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=w(r);if(o){var n=w(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return v(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupWithImageTitle=t._popup.querySelector(".popup__image-preview-title"),t._popupWithImageUrl=t._popup.querySelector(".popup__image-preview-url"),t}return t=a,(n=[{key:"handleOpenPopup",value:function(e,t){y(w(a.prototype),"handleOpenPopup",this).call(this),this._popupWithImageTitle.textContent=e,this._popupWithImageUrl.src=t,this._popupWithImageUrl.alt=e}}])&&_(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(h);function E(e){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},E(e)}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=k(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},S.apply(this,arguments)}function k(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=j(e)););return e}function C(e,t){return C=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},C(e,t)}function x(e,t){if(t&&("object"===E(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return P(e)}function P(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function j(e){return j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},j(e)}var L=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&C(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=j(r);if(o){var n=j(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return x(this,e)});function a(e,t){var n,r,o,u;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),u=function(){return n._formValues={},n._inputList.forEach((function(e){n._formValues[e.name]=e.value})),n._formValues},(o="_getInputValues")in(r=P(n=i.call(this,e)))?Object.defineProperty(r,o,{value:u,enumerable:!0,configurable:!0,writable:!0}):r[o]=u,n._handleSubmitForm=t,n._form=n._popup.querySelector(".form"),n._inputList=n._form.querySelectorAll(".form__input"),n}return t=a,(n=[{key:"handleClosePopup",value:function(){S(j(a.prototype),"handleClosePopup",this).call(this),this._form.reset()}},{key:"setEventListeners",value:function(){var e=this;S(j(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleSubmitForm(e._getInputValues())}))}}])&&O(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(h);function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var q=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"appendItem",value:function(e){this._container.append(e)}},{key:"renderItems",value:function(){var e=this;this._renderedItems.forEach((function(t){e._renderer(t)}))}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var D=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=document.querySelector(t.nameSelector),this._userAboutOneself=document.querySelector(t.aboutOneselfSelector)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._userName.textContent,aboutOneself:this._userAboutOneself.textContent}}},{key:"setUserInfo",value:function(e){this._userName.textContent=e.name,this._userAboutOneself.textContent=e.aboutOneself}}])&&I(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),M=new g(".popup_action_image-preview"),V=new L(".popup_action_edit",(function(e){R.setUserInfo(e),V.handleClosePopup()})),H=new L(".popup_action_add",(function(e){W.addItem(G(e)),H.handleClosePopup()})),R=new D({nameSelector:".profile__name",aboutOneselfSelector:".profile__about-oneself"}),T=new f(c,r),A=new f(c,a);function G(e){return new l(e,"#cardElement",U).generateCard()}T.enableValidation(),A.enableValidation();var W=new q({items:[{name:"Большой Барьерный риф",link:"https://images.unsplash.com/photo-1587139223877-04cb899fa3e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"},{name:"Пролив Дрейка",link:"https://images.unsplash.com/photo-1590149562644-da85d8564000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"},{name:"Атлантический океан",link:"https://images.unsplash.com/photo-1559653367-4a45ab1ced27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},{name:"Тихий океан",link:"https://images.unsplash.com/photo-1608155760986-065f98b4f991?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"},{name:"Гибралтарский пролив",link:"https://images.unsplash.com/photo-1562679276-0cb2a1172db0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"},{name:"Средиземное море",link:"https://images.unsplash.com/photo-1596791172797-d42cfccc47c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80"}],renderer:function(e){W.appendItem(G(e))}},".cards");function U(e,t){M.handleOpenPopup(e,t)}W.renderItems(),M.setEventListeners(),V.setEventListeners(),H.setEventListeners(),e.addEventListener("click",(function(){var e;V.handleOpenPopup(),e=R.getUserInfo(),o.value=e.name,i.value=e.aboutOneself,T.resetValidationFields(),T.toggleButtonState()})),t.addEventListener("click",(function(){H.handleOpenPopup(),A.resetValidationFields(),A.toggleButtonState()}))})();