import React from "react";
import { Field } from "redux-form";

// components
import { Textarea } from "components";

export default () => {
  return (
    <Field name="message" component={Textarea} placeholder="Type a reason..." />
  );
};
