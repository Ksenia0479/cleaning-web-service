import React from "react";
import { Link } from "react-router-dom";

// styles
import "./header-button-box.css";

export default () => {
  return (
    <div className="header__button-box">
      <Link className="btn btn-full" to="/booking/step-zero">
        Book now
      </Link>
      <Link className="btn btn-ghost" to="/how-it-works">
        Show me more
      </Link>
    </div>
  );
};
