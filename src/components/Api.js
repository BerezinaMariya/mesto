export class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  //Получение массива исходных карточек
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert(`${err} Карточки не загружены`)
    });
  }

  //Получение данных пользователя
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert(`${err} Информация о пользователе не получена`)
    });
  }

  //Отправка отредактированных данных пользователя
  setUserInfo(user) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    });
  }

  //Отправка отредактированного аватара
  setAvatar(user) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: user.avatar,
      })
    });
  }

  //Отправка новой созданной карточки на сервер
  setNewCard(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
  }

  //Удаление карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    });
  }

  //Отправка лайка карточки
  setLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-49/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: 'c8e88be4-173c-499a-97f5-515e9331d7ba',
        'Content-Type': 'application/json'
      }   
    })  
  .then(res => {
    if (res.ok) {
      return res.json();
    }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  //Удаление лайка карточки
  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

}