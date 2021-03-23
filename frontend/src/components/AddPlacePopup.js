import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="image_add"
      title="Новое место"
      submitText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          className="popup__input popup__input_type_name-image"
          id="image-name-input"
          name="name"
          placeholder="Название"
          minLength="1"
          maxLength="30"
          onChange={handleChangeName}
          value={name || ""}
          required
        />
        <span className="popup__input-error" id="image-name-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          className="popup__input popup__input_type_prof-link"
          id="image-source-input"
          name="link"
          placeholder="Ссылка на картинку"
          onChange={handleChangeLink}
          value={link || ""}
          required
        />
        <span
          className="popup__input-error"
          id="image-source-input-error"
        ></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
