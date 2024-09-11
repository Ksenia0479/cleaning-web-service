import React from "react";
import { Field } from "redux-form";

// component
import { Input } from "components";

export default () => {
  return (
    <Field
      name="currentPassword"
      type="password"
      component={Input}
      placeholder="Enter Current Password"
    />
  );
};
