import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({
  onUpdateUser,
  isOpen,
  onClose,
  onScreenClickClose,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    } // eslint-disable-next-line
  }, [isOpen]);

  return (
    <PopupWithForm
      name="form"
      title="Редактировать профиль"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onScreenClickClose={onScreenClickClose}
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
          onChange={handleChangeName}
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
          onChange={handleChangeDescription}
          required
        />
        <span className="popup__input-error" id="profile-prof-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
