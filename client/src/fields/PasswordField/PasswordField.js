import React from "react";
import { Field } from "redux-form";

// components
import { Input } from "components";

// styles
import "./password-field.css";

export default () => {
  return (
    <Field
      className="password"
      name="password"
      type="password"
      component={Input}
      label="Password"
      placeholder="Enter password"
    />
  );
};
