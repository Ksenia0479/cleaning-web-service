import React from "react";
import { Field } from "redux-form";

// components
import { Button } from "components";

export default ({ updatePreviewImage }) => {
  return (
    <Field
      name="avatar"
      type="file"
      component={Button}
      id="contained-button-file"
      accept=".jpg, .jpeg, .png"
      placeholder="Upload an avatar"
      updatePreviewImage={updatePreviewImage}
    />
  );
};
