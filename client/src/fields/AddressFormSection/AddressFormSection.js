import React from "react";
import { Field, FormSection } from "redux-form";

// components
import { Input } from "components";

// styles
import "./address.css";

export default () => {
  return (
    <FormSection name="address" className="form_address">
      <div>
        <Field
          name="street"
          type="text"
          component={Input}
          label="Street"
          placeholder="Street *"
          autoComplete="off"
        />
        <Field
          name="apartmentNumber"
          type="text"
          component={Input}
          label="Apt/Suite Number *"
          placeholder="Apt/Suite Number *"
          autoComplete="off"
        />
      </div>
      <div>
        <Field
          name="city"
          type="text"
          component={Input}
          label="City *"
          placeholder="City *"
          autoComplete="off"
        />
        <Field
          name="zipCode"
          type="number"
          component={Input}
          label="Zip Code *"
          placeholder="Zip Code *"
          autoComplete="off"
        />
      </div>
    </FormSection>
  );
};
