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
  const [dataImage, setDataImage] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const history = useHistory();

  const setImage = (card) => {
    setDataImage(card);
    handleCardClick();
  };

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

  function handleScreenClickClose({ target }) {
    if (target.classList.contains("popup__container")) {
      closeAllPopups();
    }
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

  async function handleUpdateUser(user) {
    try {
      const result = await api.updateUserData(
        user.name,
        user.about,
        localStorage.getItem("jwt")
      );
      setCurrentUser(result);
      closeAllPopups();
    } catch (error) {
      throw new Error("Что-то пошло не так");
    }
  }

  async function handleUpdateAvatar(user) {
    try {
      const result = await api.updateAvatar(
        user.avatar,
        localStorage.getItem("jwt")
      );
      setCurrentUser(result);
      closeAllPopups();
    } catch (error) {
      throw new Error("Что-то пошло не так");
    }
  }

  async function handleCardLike(card) {
    try {
      const isLiked = card.likes.some((i) => i === currentUser._id);
      const newCard = await api.changeLikeCard(
        card._id,
        !isLiked,
        localStorage.getItem("jwt")
      );
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    } catch (err) {
      throw new Error("Что-то пошло не так");
    }
  }

  function handleCardDelete(card) {
    setCardDelete(card);
    handleConfirmDeleteClick();
  }

  async function handleConfirmDelete(card) {
    try {
      await api.deleteCard(card._id, localStorage.getItem("jwt"));
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
      closeAllPopups();
    } catch (err) {
      throw new Error("Что-то пошло не так");
    }
  }

  async function handleAddPlaceSubmit(card) {
    try {
      const newCard = await api.addNewCard(
        card.name,
        card.link,
        localStorage.getItem("jwt")
      );
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (err) {
      closeAllPopups();
      handleTooltipOpen();
    }
  }

  async function handleLogin({ email, password }) {
    try {
      const res = await auth.authorize(email, password);
      if (res && res.token) {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        history.push("/");
      } else {
        throw new Error("Не удалось войти в аккаунт");
      }
    } catch (err) {
      handleTooltipOpen();
    }
  }

  async function handleRegister({ email, password }) {
    try {
      const res = await auth.register(email, password);
      if (res) {
        handleSuccessToolTip();
        setTimeout(handleTooltipOpen, 500);
        history.push("/sign-in");
      } else {
        throw new Error("Не удалось завершить регистрацию");
      }
    } catch (err) {
      handleTooltipOpen();
    }
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  React.useEffect(() => {
    const fetchData = async () => {
      if (loggedIn) {
        try {
          setIsLoading(true);
          const jwt = localStorage.getItem("jwt");
          const [user, cards] = await Promise.all([
            api.getUserData(jwt),
            api.getInitialCards(jwt),
          ]);
          setCurrentUser(user);
          setCards(cards.reverse());
          setIsLoading(false);
        } catch (error) {
          throw new Error("Что-то пошло не так");
        }
      }
    };
    fetchData();
  }, [loggedIn]);

  React.useEffect(() => {
    const tokenCheck = async () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        try {
          const res = await auth.getContent(jwt);
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
        } catch (err) {
          history.push("/sign-in");
        }
      }
    };
    tokenCheck();
  }, [history]);

  React.useEffect(() => {
    const handleEscClickClose = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", handleEscClickClose);
    return () => {
      document.removeEventListener("keydown", handleEscClickClose);
    };
  }, []);

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
            isLoading={isLoading}
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
          onScreenClickClose={handleScreenClickClose}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onScreenClickClose={handleScreenClickClose}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onScreenClickClose={handleScreenClickClose}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onScreenClickClose={handleScreenClickClose}
          onDelete={handleConfirmDelete}
          card={cardDelete}
        />

        <ImagePopup
          card={dataImage}
          isOpen={isCardSelected}
          onClose={closeAllPopups}
          onScreenClickClose={handleScreenClickClose}
        />
        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          onScreenClickClose={handleScreenClickClose}
          successStyle={successToolTip}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
