import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [liked, setLiked] = React.useState(
    props.card.likes.some((i) => i._id === currentUser._id)
  );
  const isOwn = props.card.owner._id === currentUser._id;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function likeClick() {
    setLiked(!liked);
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <>
      <li className="card">
        <button
          onClick={handleDeleteClick}
          className={`card__trash ${isOwn ? "card__trash_active" : ""}`}
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
              className={`card__like ${liked && "card__like_active"}`}
              onClick={likeClick}
              type="button"
            ></button>
            <div className="card__count">{props.likeCounter}</div>
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;
