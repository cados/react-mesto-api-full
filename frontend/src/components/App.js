import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginState, setLoginState] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [successToolTip, setSuccessToolTip] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpenClose] = React.useState(
    false
  );
  const [isAddCardPopupOpen, setAddCardPopupOpenClose] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpenClose] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userInfoGet, setUserInfoGet] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userInfo, cardList]) => {
        setCurrentUser(userInfo);
        setCards(cardList);
        setUserInfoGet(true);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpenClose(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setAddCardPopupOpenClose(!isAddCardPopupOpen);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpenClose(!isEditAvatarPopupOpen);
  }

  function handleImagePopupOpen(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function closeAllPopups() {
    setEditProfilePopupOpenClose(false);
    setAddCardPopupOpenClose(false);
    setEditAvatarPopupOpenClose(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setSuccessToolTip(false);
    setIsTooltipOpen(false);
  }

  function handleUpdateUser(data) {
    return api
      .updateUserData(data)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    return api
      .updateAvatar(data)
      .catch((err) => console.log(err))
      .then((result) => {
        setCurrentUser(result);
      });
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteClick(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? "" : newCard
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    return api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err));
  }

  function handleLogin({ email, password }) {
    return auth
      .authorize(email, password)
      .then((res) => {
        if (res && email) {
          setLoggedIn(true);
          history.push("/");
        } else {
          throw new Error("Не удалось войти в аккаунт");
        }
      })
      .catch((err) => {
        console.log(err);
        handleTooltipOpen();
      });
  }

  function handleTooltipOpen() {
    setIsTooltipOpen(true);
  }

  function handleLoginState(state) {
    setLoginState(state);
  }

  function handleRegister({ email, password }) {
    return auth
      .register(email, password)
      .then((res) => {
        if (res) {
          handleSuccessToolTip();
          setTimeout(handleTooltipOpen, 500);
          history.push("/sign-in");
        } else {
          throw new Error("Не удалось завершить регистрацию");
        }
      })
      .catch((err) => {
        console.log(`Ошибка регистрации пользователя: ${err}`);
        handleTooltipOpen();
      });
  }

  function handleSuccessToolTip() {
    setSuccessToolTip(true);
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setUserData({
              id: res.data._id,
              email: res.data.email,
            });
            setLoggedIn(true);
            history.push("/");
          } else {
            localStorage.removeItem("jwt");
          }
        })
        .catch((err) => {
          console.log(err);
          history.push("/sign-in");
        });
    }
  }

  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <>
      <div className="container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            loggedIn={loggedIn}
            loginState={loginState}
            onSignOut={signOut}
            userData={userData}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              loader={userInfoGet}
              onCardClick={handleImagePopupOpen}
              onEditProfile={handleEditProfileClick}
              onAddCard={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardDelete={handleDeleteClick}
              onCardLike={handleLikeClick}
              cards={cards}
            />

            <Route path="/sign-up">
              <Register
                onRegister={handleRegister}
                onLoginState={handleLoginState}
                openToolTip={handleTooltipOpen}
                successToolTip={handleSuccessToolTip}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                onLogin={handleLogin}
                onLoginState={handleLoginState}
                successToolTip={handleSuccessToolTip}
              />
            </Route>

            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          ></EditAvatarPopup>

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isTooltipOpen}
            onClose={closeAllPopups}
            successStyle={successToolTip}
          />
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
