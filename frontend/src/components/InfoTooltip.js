import React from "react";
import union from "../images/Union.svg";
import icon from "../images/Union-1.svg";

function InfoTooltip({ isOpen, onScreenClickClose, onClose, successStyle }) {
  const errorImg = {
    backgroundImage: "url(" + union + ")",
  };
  const successImg = {
    backgroundImage: "url(" + icon + ")",
  };

  return (
    <div
      onClick={onScreenClickClose}
      className={isOpen ? "popup__container popup_opened" : "popup__container"}
    >
      <form className="popup__form">
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
        />
        <div
          className="popup__image_login"
          style={successStyle ? successImg : errorImg}
        />
        <h2 className="popup__title popup__title_infotooltip">
          {successStyle
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </form>
    </div>
  );
}

export default InfoTooltip;
