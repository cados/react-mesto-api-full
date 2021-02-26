function ImagePopup(props) {
  return (
    <div
      className={`popup__container popup__container_image ${
        props.card.link && "popup_opened"
      }`}
    >
      <figure className="popup__image">
        <button
          className="popup__close-button popup__close-button_img"
          onClick={props.onClose}
          type="button"
        ></button>
        <img
          className="popup__images"
          src={`${props.card.link}`}
          alt={props.card.name}
        />
        <figcaption className="popup__text">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
