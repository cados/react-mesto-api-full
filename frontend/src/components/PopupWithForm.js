import React from "react";

function PopupWithForm({
  isOpen,
  name,
  onSubmit,
  onClose,
  title,
  children,
  submitText,
  onScreenClickClose,
}) {
  return (
    <div
      onClick={onScreenClickClose}
      className={`popup__container ${isOpen && "popup_opened"}`}
      id={name}
    >
      <form onSubmit={onSubmit} className="popup__form" name={name} noValidate>
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"
        ></button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button className="popup__button" type="submit">
          {submitText}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
