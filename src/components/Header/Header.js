import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import NavigationAuth from "../NavigationAuth/NavigationAuth";
import logo from "../../images/logo.svg";
import profileIcon from "../../images/profileIcon.svg";

function Header({ loggedIn }) {
  return (
    <header className={`header ${!loggedIn ? "header_type_auth" : ""}`}>
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип"></img>
      </Link>
      {!loggedIn ? (
        <NavigationAuth />
      ) : (
        <>
          <Navigation />
          <Link className="header__link header__link_profile" to="/profile">
            Аккаунт
            <img
              className="header__profile-icon"
              src={profileIcon}
              alt="Профайл"
            />
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
