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

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._responseResult);
  }

  getUserData(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._responseResult);
  }

  addNewCard(name, link, token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._responseResult(res);
    });
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._responseResult(res);
    });
  }

  updateUserData(name, about, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._responseResult);
  }

  changeLikeCard(cardId, status, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${status ? "PUT" : "DELETE"}`,
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._responseResult);
  }

  updateAvatar(link, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._responseResult);
  }
}

const api = new Api({
  url:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_API_URL
      : process.env.REACT_APP_DEV_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
