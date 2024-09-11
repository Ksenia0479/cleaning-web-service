import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// images
import logoGreen from "img/logo.png";
import logoWhite from "img/logo-white.png";

// styles
import "./header-logo.css";

const HeaderLogo = ({ isSignedIn, isHomePage }) => {
  return (
    <Link to="/">
      <img
        src={isSignedIn && !isHomePage ? logoWhite : logoGreen}
        alt="Clearning service logo"
        className="logo header__logo"
      />
    </Link>
  );
};

const mapStateToProps = state => {
  const {
    auth: {
      user: { isSignedIn }
    },
    router: {
      location: { pathname }
    }
  } = state;

  const isHomePage = pathname === "/";

  return {
    isSignedIn,
    isHomePage
  };
};

export default connect(mapStateToProps)(HeaderLogo);
