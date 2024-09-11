import React from "react";
import { Field } from "redux-form";

// components
import { SelectMenu } from "components";

const priceOptions = [
  { label: "High price", value: "desc" },
  { label: "Low price", value: "asc" }
];

export default () => {
  return (
    <Field
      name="price"
      component={SelectMenu}
      type="sorter"
      options={priceOptions}
      className="order-filters__order-price"
    />
  );
};
