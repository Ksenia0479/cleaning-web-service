import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// styles
import "./user-nav.css";

const UserNav = ({ role }) => {
  const isCompany = role === "company";
  return (
    <ul className="sidebar__user-nav-list">
      <li>
        <Link to="/users/me/edit-profile">Profile</Link>
      </li>
      <li>
        <Link to="/users/me/edit-photo">Photo</Link>
      </li>

      {isCompany && (
        <Fragment>
          <li>
            <Link to="/users/me/edit-services">Services</Link>
          </li>
          <li>
            <Link to="/users/me/reviews">Reviews</Link>
          </li>
        </Fragment>
      )}

      <li>
        <Link to="/users/me/edit-account">Account</Link>
      </li>
      <li>
        <Link to="/users/me/close-account">Close Account</Link>
      </li>
    </ul>
  );
};

export default UserNav;
