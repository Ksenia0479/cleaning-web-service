import React from "react";

// fields
import { PasswordField, ConfirmPasswordField } from "../../../../../../fields";

// styles
import "./company-sign-up-password-field.css";

export default () => {
  return (
    <div className="form__fields-password">
      <PasswordField />
      <ConfirmPasswordField />
    </div>
  );
};
