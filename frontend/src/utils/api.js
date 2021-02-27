class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _responseResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._responseResult(res);
    });
  }
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._responseResult(res);
    });
  }
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._responseResult(res);
    });
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._responseResult(res);
    });
  }

  updateUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseResult(res);
    });
  }

  changeLikeCardStatus(card, isLikes) {
    if (isLikes) {
      return this.addLike(card);
    } else {
      return this.deleteLike(card);
    }
  }

  addLike(data) {
    return fetch(`${this._url}/cards/likes/${data}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._responseResult(res);
    });
  }

  deleteLike(data) {
    return fetch(`${this._url}/cards/likes/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._responseResult(res);
    });
  }

  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseResult(res);
    });
  }
}

const api = new Api({
  url: "https://api.cados.students.nomoredomains.icu",
  headers: {
    "content-type": "application/json",
  },
});

export default api;
