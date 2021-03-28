import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmPopup from "./ConfirmPopup";
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
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState({});
  const [isCardSelected, setIsCardSelected] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const history = useHistory();
  const [dataImage, setDataImage] = React.useState({});
  const setImage = (card) => {
    setDataImage(card);
    handleCardClick();
  };

  React.useEffect(() => {
    if (loggedIn === true) {
      const jwt = localStorage.getItem("jwt");
      Promise.all([api.getUserData(jwt), api.getInitialCards(jwt)])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleCardClick() {
    setIsCardSelected(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddCardPopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleTooltipOpen() {
    setIsTooltipOpen(true);
  }

  function handleConfirmDeleteClick() {
    setIsConfirmPopupOpen(true);
  }

  function handleSuccessToolTip() {
    setSuccessToolTip(true);
  }

  function handleLoginState(state) {
    setLoginState(state);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setDataImage({});
    setSuccessToolTip(false);
    setIsTooltipOpen(false);
    setIsCardSelected(false);
  }

  function handleUpdateUser(user) {
    api
      .updateUserData(user.name, user.about, localStorage.getItem("jwt"))
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(user) {
    api
      .updateAvatar(user.avatar, localStorage.getItem("jwt"))
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCard(card._id, !isLiked, localStorage.getItem("jwt"))
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setCardDelete(card);
    handleConfirmDeleteClick();
  }

  function handleConfirmDelete(card) {
    api
      .deleteCard(card._id, localStorage.getItem("jwt"))
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card.name, card.link, localStorage.getItem("jwt"))
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin({ email, password }) {
    return auth
      .authorize(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
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
        handleTooltipOpen();
      });
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
              id: res._id,
              email: res.email,
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
            cards={cards}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddCard={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            clickImages={setImage}
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

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onDelete={handleConfirmDelete}
          card={cardDelete}
        />

        <ImagePopup
          card={dataImage}
          isOpen={isCardSelected}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          successStyle={successToolTip}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
