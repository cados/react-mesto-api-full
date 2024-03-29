import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup({
  isOpen,
  onScreenClickClose,
  onClose,
  card,
  onDelete,
}) {
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
      onScreenClickClose={onScreenClickClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}
