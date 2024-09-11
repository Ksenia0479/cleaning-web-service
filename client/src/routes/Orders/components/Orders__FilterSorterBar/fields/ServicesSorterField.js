import React from "react";
import { Field } from "redux-form";

// components
import { SelectMenu } from "components";

const servicesOptions = [
  { label: "Standart", value: "Standart" },
  { label: "General", value: "General" },
  {
    label: "After repair and construction",
    value: "After repair and construction"
  },
  { label: "Carpet cleaning", value: "Carpet cleaning" },
  { label: "Office cleaning", value: "Office cleaning" },
  {
    label: "Furniture and equipment",
    value: "Furniture and equipment"
  },
  { label: "Industrial cleaning", value: "Industrial cleaning" },
  { label: "Pool cleaning", value: "Pool cleaning" }
];

export default () => {
  return (
    <Field
      name="services.type"
      component={SelectMenu}
      type="filter"
      options={servicesOptions}
      className="order-filters__order-services"
    />
  );
};
