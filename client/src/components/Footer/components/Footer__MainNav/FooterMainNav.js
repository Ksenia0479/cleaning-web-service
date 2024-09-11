import React from "react";
import { Link } from "react-router-dom";

// styles
import "./footer-main-nav.css";

export default () => {
  return (
    <ul className="footer__main-nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/how-it-works">How it works</Link>
      </li>
      <li>
        <Link to="/booking/step-zero">Book</Link>
      </li>
      <li>
        <Link to="/#">About us</Link>
      </li>
    </ul>
  );
};
