import React, { Fragment } from "react";
import { Field, FormSection } from "redux-form";

// components
import { Input } from "components";

// styles
import "./contact-field.css";

export default ({ contact }) => {
  return (
    <Fragment>
      {contact && (
        <FormSection name="contact">
          {contact.email_address && (
            <Field
              name="email_address"
              type="text"
              component={Input}
              label="Email or Phone Number"
              placeholder="Enter email or phone number"
            />
          )}

          {contact.phone_number && (
            <Field
              name="phone_number"
              type="text"
              component={Input}
              label="Email or Phone Number"
              placeholder="Enter email or phone number"
            />
          )}
        </FormSection>
      )}

      {!contact && (
        <Field
          className="contact"
          name="contact"
          type="text"
          component={Input}
          label="Email or Phone Number"
          placeholder="Enter email or phone number"
        />
      )}
    </Fragment>
  );
};
