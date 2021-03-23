import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = `${
    isOwn ? "card__trash card__trash_active" : "card__trash"
  }`;

  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <>
      <li className="card" key={props.card._id}>
        <button
          onClick={handleDeleteClick}
          className={cardDeleteButtonClassName}
          type="button"
        />
        <img
          className="card__images"
          onClick={handleClick}
          src={props.card.link}
          alt={props.card.name}
        />
        <div className="card__item">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__wrap">
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
              type="button"
            ></button>
            <div className="card__count">{props.card.likes.length}</div>
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;
