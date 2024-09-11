import React from "react";
import { connect } from "react-redux";

// components
import { Button, MainHeader } from "components";

// components - User
import { UserTextBox } from "./components";

// actions
import { closeAccount } from "store/actions";

// styles
import "./user-close-account.css";

const UserCloseAccount = ({ closeAccount }) => {
  return (
    <div className="user__close-account">
      <MainHeader>Close Account</MainHeader>
      <UserTextBox />
      <Button
        value="Close Account"
        className="btn-action"
        onClick={closeAccount}
      />
    </div>
  );
};

const mapDisptachToProps = { closeAccount };

export default connect(
  null,
  mapDisptachToProps
)(UserCloseAccount);
