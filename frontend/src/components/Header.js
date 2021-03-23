import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header({ loggedIn, onSignOut, userData, loginState }) {
  const email = userData ? userData.email : "";
  return (
    <header className="header">
      <img src={logo} alt="лого" className="header__logo" />
      {loggedIn ? (
        <>
          <nav className="header__nav">
            <ul className="header__list header__list-main">
              <li className="header__list-item">{email}</li>
              <li onClick={onSignOut} className="header__list-link">
                Выйти
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <Link
          to={loginState ? "/sign-in" : "/sign-up"}
          className="header__list-link"
        >
          {loginState ? "Войти" : "Регистрация"}
        </Link>
      )}
    </header>
  );
}

export default Header;
