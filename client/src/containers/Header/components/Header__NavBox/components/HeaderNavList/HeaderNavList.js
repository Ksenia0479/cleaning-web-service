import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// components
import { Button, Logo } from "components";

// actions
import { signoutUser } from "store/actions";

// styles
import "./header-nav-list.css";

const HeaderNavList = ({ url, role, isSignedIn, signoutUser }) => {
  const isCompany = role === "company";
  return (
    <ul className="header__nav-list">
      {!isCompany && (
        <Fragment>
          <li>
            <Link to="/booking/step-zero">Book now</Link>
          </li>
          <li>
            <Link to="/how-it-works">How it works</Link>
          </li>
        </Fragment>
      )}

      <li>
        <Link to="/companies">Companies</Link>
      </li>

      {isSignedIn && (
        <li>
          <Link to="/orders/future">My Orders</Link>
        </li>
      )}

      {!isSignedIn && (
        <li>
          <Link to="/signup/customer">Sign up</Link>
        </li>
      )}

      {isSignedIn && (
        <Fragment>
          <li>
            <Logo logo={url} to="/users/me/edit-profile" alt="avatar" />
          </li>
          <li>
            <div
              style={{ borderRight: "1px solid #e6e6e6", height: "50px" }}
            ></div>
          </li>
        </Fragment>
      )}

      {isSignedIn && (
        <li>
          <Button
            type="button"
            className="ghost"
            onClick={signoutUser}
            value="Log Out"
          />
        </li>
      )}

      {!isSignedIn && (
        <li>
          <Link to="/signin">Sign in</Link>
        </li>
      )}
    </ul>
  );
};

const mapStateToProps = state => {
  const {
    auth: {
      user: {
        isSignedIn,
        data: { role }
      }
    },
    images: {
      avatar: { data: url }
    }
  } = state;

  return { isSignedIn, role, url };
};
const mapDispatchToProps = {
  signoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderNavList);
