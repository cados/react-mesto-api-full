export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status !== 409 && res.status !== 400) {
        return res.json();
      } else {
        throw new Error("Некорректно заполнено одно из полей");
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      if (res.status === 400) {
        throw new Error("Не передано одно из полей");
      }
      if (res.status === 401) {
        throw new Error("Пользователь с email не найден");
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
      return;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      if (res.status === 400) {
        throw new Error("Токен не передан или передан не в том формате");
      }
      if (res.status === 401) {
        throw new Error("Переданный токен некорректен");
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
