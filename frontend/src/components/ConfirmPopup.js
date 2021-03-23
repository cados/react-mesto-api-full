import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup({ isOpen, onClose, card, onDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDelete(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      submitText="Да"
      name="confirm"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}
