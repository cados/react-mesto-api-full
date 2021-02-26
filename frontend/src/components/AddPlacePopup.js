import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [buttonText, setButtonText] = React.useState("Создать");
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleClosePopup() {
    props.onClose();
    setTimeout(() => {
      setName("");
      setLink("");
    }, 200);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Создаем...");
    props
      .onAddPlace({ name, link })
      .then(() => handleClosePopup())
      .finally(() => {
        setButtonText("Создать");
      });
  }

  return (
    <PopupWithForm
      name="image_add"
      title="Новое место"
      submitText={buttonText}
      isOpen={props.isOpen}
      onClose={handleClosePopup}
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
          onChange={handleNameChange}
          value={name}
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
          onChange={handleLinkChange}
          value={link}
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
