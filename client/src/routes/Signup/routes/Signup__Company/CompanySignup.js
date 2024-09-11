import React from "react";
import { connect } from "react-redux";

// components
import { Form, Section, FormBox, Row } from "components";

// components - Signup
import {
  CompanySignupPasswordFieldBox,
  CompanySignupSubmitButton
} from "./components";

// fields
import {
  AvatarField,
  ContactField,
  CompanyNameField,
  AddressFormSection,
  ServicesFieldArray,
  RoomsFieldArray
} from "fields";

// utils
import { appendFormData, defineUserRole } from "utils";

// validators
import validate from "store/validators/companySignup";

// actions
import { signupUser, updatePreviewImage } from "store/actions";

// styles
import "./company-sign-up.css";

const CompanySignup = ({ signupUser, updatePreviewImage }) => {
  const onFormSubmit = values => {
    values.role = defineUserRole();
    const data = appendFormData(values);
    signupUser(data);
  };

  return (
    <Section className="section__sign-up company">
      <Row>
        <FormBox>
          <Form
            form="CompanySignup"
            validate={validate}
            multipartForm={true}
            onFormSubmit={onFormSubmit}
            submitButton={CompanySignupSubmitButton}
          >
            <AvatarField updatePreviewImage={updatePreviewImage} />
            <CompanyNameField />
            <ContactField />
            <AddressFormSection />
            <ServicesFieldArray />
            <RoomsFieldArray />
            <CompanySignupPasswordFieldBox />
          </Form>
        </FormBox>
      </Row>
    </Section>
  );
};

const mapDispatchToProps = { signupUser, updatePreviewImage };

export default connect(
  null,
  mapDispatchToProps
)(CompanySignup);
