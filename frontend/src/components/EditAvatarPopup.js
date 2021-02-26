import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function EditAvatarPopup(props) {
  const [buttonText, setButtonText] = React.useState("Сохранить");
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Загрузка...");
    props
      .onUpdateAvatar({ avatar: avatarRef.current.value })
      .then(() => {
        handleClosePopup();
      })
      .finally(() => {
        setButtonText("Сохранить");
      });
  }

  function handleClosePopup() {
    props.onClose();
    setTimeout(() => (avatarRef.current.value = ""), 200);
  }

  return (
    <PopupWithForm
      name="avatar_add"
      title="Обновить аватар"
      submitText={buttonText}
      isOpen={props.isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          ref={avatarRef}
          type="url"
          className="popup__input popup__input_type_avatar-link"
          id="avatar-source-input"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span
          className="popup__input-error"
          id="avatar-source-input-error"
        ></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
