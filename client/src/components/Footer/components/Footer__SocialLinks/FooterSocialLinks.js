import React from "react";
import { Link } from "react-router-dom";

// styles
import "./footer-social-links.css";

export default () => {
  return (
    <ul className="footer__social-links">
      <li>
        <Link to="#">
          <i className="ion-logo-facebook"></i>
        </Link>
      </li>
      <li>
        <Link to="#">
          <i className="ion-logo-twitter"></i>
        </Link>
      </li>
      <li>
        <Link to="#">
          <i className="ion-logo-googleplus"></i>
        </Link>
      </li>
      <li>
        <Link to="#">
          <i className="ion-logo-instagram"></i>
        </Link>
      </li>
    </ul>
  );
};
