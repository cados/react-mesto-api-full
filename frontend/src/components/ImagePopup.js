function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup__container popup__container_image ${
        card.link && "popup_opened"
      }`}
    >
      <figure className="popup__image">
        <button
          className="popup__close-button popup__close-button_img"
          onClick={onClose}
          type="button"
        ></button>
        <img className="popup__images" src={`${card.link}`} alt={card.name} />
        <figcaption className="popup__text">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
