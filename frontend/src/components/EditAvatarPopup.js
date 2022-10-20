import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function EditAvatarPopup({
  onScreenClickClose,
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
  const [avatar, setAvatar] = React.useState("");

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar,
    });
  }

  React.useEffect(() => {
    setAvatar("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar_add"
      title="Обновить аватар"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onScreenClickClose={onScreenClickClose}
    >
      <label className="popup__field">
        <input
          type="url"
          className="popup__input popup__input_type_avatar-link"
          id="avatar-source-input"
          name="avatar"
          placeholder="Ссылка на картинку"
          value={avatar || ""}
          onChange={handleChangeAvatar}
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
