import React from "react";
import { Field, FormSection } from "redux-form";

// components
import { Input, Fieldset, Legend } from "components";

export default ({ contact }) => {
  return (
    <Fieldset className="fieldset__booking-customer-credentials">
      <Legend>How we can contact you? </Legend>
      <FormSection name="creator">
        <FormSection name="name">
          <Field
            name="firstName"
            type="text"
            component={Input}
            autoComplete="off"
            label="First Name *"
            placeholder="First Name *"
          />
          <Field
            name="lastName"
            type="text"
            component={Input}
            label="Last Name *"
            placeholder="Last Name *"
            autoComplete="off"
          />
        </FormSection>
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
            name="contact"
            type="text"
            component={Input}
            label="Email or Phone Number"
            placeholder="Enter email or phone number"
          />
        )}
      </FormSection>
    </Fieldset>
  );
};
