import React, { Component } from "react";
import { connect } from "react-redux";

// components
import { Form, Section, FormBox, Row } from "components";

// components - Signup
import { CustomerSignupSubmitButton } from "./components";

// fields
import {
  FirstNameField,
  LastNameField,
  ContactField,
  PasswordField,
  ConfirmPasswordField
} from "fields";

// utils
import { defineUserRole } from "utils";

// validators
import validate from "store/validators/customerSignup";

// actions
import { signupUser } from "store/actions";

// styles
import "./customer-sign-up.css";

class CustomerSignup extends Component {
  onFormSubmit = values => {
    values.role = defineUserRole();
    this.props.signupUser(values);
  };

  render() {
    return (
      <Section className="section__sign-up customer">
        <Row>
          <FormBox>
            <Form
              form="CustomerSignup"
              validate={validate}
              onFormSubmit={this.onFormSubmit}
              submitButton={CustomerSignupSubmitButton}
            >
              <FirstNameField />
              <LastNameField />
              <ContactField />
              <PasswordField />
              <ConfirmPasswordField />
            </Form>
          </FormBox>
        </Row>
      </Section>
    );
  }
}

const mapDispatchToProps = { signupUser };

export default connect(
  null,
  mapDispatchToProps
)(CustomerSignup);
