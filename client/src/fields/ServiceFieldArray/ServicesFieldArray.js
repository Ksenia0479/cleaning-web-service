import React from "react";
import { FieldArray } from "redux-form";

// containers
import { Services } from "containers";

export default () => {
  return (
    <FieldArray
      name="services"
      component={Services}
      addServiceButtonName="Add Service"
    />
  );
};
