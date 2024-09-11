import React from "react";
import { FieldArray } from "redux-form";

// containers
import { Services } from "containers";

export default () => {
  return (
    <FieldArray
      name="rooms"
      component={Services}
      addServiceButtonName="Add Room"
    />
  );
};
