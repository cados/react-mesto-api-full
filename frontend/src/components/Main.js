import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddCard,
  cards,
  clickImages,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <>
      <section className="profile">
        <div className="profile__item">
          <div className="profile__item-container">
            <img
              onClick={onEditAvatar}
              src={currentUser.avatar}
              alt="Фото профиля"
              className="profile__avatar"
            />
          </div>
          <div className="profile_text">
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                onClick={onEditProfile}
                type="button"
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddCard}
          type="button"
        ></button>
      </section>

      <section className="elements">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={clickImages}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
