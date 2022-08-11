//Массив из 6 карточек при загрузке
export const initialCards = [
  {
    name: 'Большой Барьерный риф',
    link: 'https://images.unsplash.com/photo-1587139223877-04cb899fa3e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'
  },
  {
    name: 'Пролив Дрейка',
    link: 'https://images.unsplash.com/photo-1590149562644-da85d8564000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'Атлантический океан',
    link: 'https://images.unsplash.com/photo-1559653367-4a45ab1ced27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Тихий океан',
    link: 'https://images.unsplash.com/photo-1608155760986-065f98b4f991?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80'
  },
  {
    name: 'Гибралтарский пролив',
    link: 'https://images.unsplash.com/photo-1562679276-0cb2a1172db0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
  },
  {
    name: 'Средиземное море',
    link: 'https://images.unsplash.com/photo-1596791172797-d42cfccc47c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80'
  }
];  

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
  
export const popupActionEdit = document.querySelector('.popup_action_edit');
export const formEdit = popupActionEdit.querySelector('.form_action_edit');
export const formInputName = popupActionEdit.querySelector('.form__input_data_name');
export const formInputAboutOneself = popupActionEdit.querySelector('.form__input_data_about-oneself');
  
export const popupActionAdd = document.querySelector('.popup_action_add');
export const formAdd = popupActionAdd.querySelector('.form_action_add');
export const formInputImageTitle = popupActionAdd.querySelector('.form__input_data_image-title');
export const formInputImageLink = popupActionAdd.querySelector('.form__input_data_image-url');
  
export const popupEditSelector = '.popup_action_edit';
export const popupAddSelector = '.popup_action_add';
export const popupPreviewSelector = '.popup_action_image-preview';

export const popupPreviewTitleSelector = '.popup__image-preview-title';
export const popupPreviewUrlSelector = '.popup__image-preview-url';
  
export const cardsContainer = '.cards';
export const cardElementTemplate = '#cardElement';
  
export const userInfoInputsSelector = {
  nameSelector: '.profile__name', 
  aboutOneselfSelector: '.profile__about-oneself'
}