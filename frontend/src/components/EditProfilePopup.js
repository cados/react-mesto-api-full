import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [buttonText, setButtonText] = React.useState("Сохранить");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleAboutChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Загрузка...");
    props
      .onUpdateUser({ name: name, about: description })
      .then(() => props.onClose())
      .finally(() => {
        setButtonText("Сохранить");
      });
  }

  React.useEffect(() => {
    if (props.isOpen === true) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    } // eslint-disable-next-line
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="form"
      title="Редактировать профиль"
      submitText={buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_name"
          type="text"
          name="name"
          id="profile-name"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span className="popup__input-error" id="profile-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_prof"
          type="text"
          name="description"
          id="profile-prof"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleAboutChange}
          required
        />
        <span className="popup__input-error" id="profile-prof-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
