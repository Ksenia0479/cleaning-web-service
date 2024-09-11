import React, { Component } from "react";
import { connect } from "react-redux";

// components
import { Row, Form, FormBox, Section } from "components";

// components - Signup__SendConfirmationAgain
import {
  SendConfirmationAgainHeader,
  SendConfirmationAgainSubmitButton
} from "./components";

// fields
import { ContactField } from "fields";

// action
import { sendSignUpConfirmationEmail } from "store/actions";

// styles
import "./signup-send-confirmation-again.css";

class SignupSendConfirmationAgain extends Component {
  render() {
    const { sendSignUpConfirmationEmail } = this.props;
    return (
      <Section className="section__signup-send-confirmation-again">
        <Row>
          <FormBox>
            <SendConfirmationAgainHeader />
            <Form
              form="SignupConfirmationPage"
              onFormSubmit={sendSignUpConfirmationEmail}
              submitButton={SendConfirmationAgainSubmitButton}
            >
              <ContactField />
            </Form>
          </FormBox>
        </Row>
      </Section>
    );
  }
}

const mapDispatchToProps = {
  sendSignUpConfirmationEmail
};

export default connect(
  null,
  mapDispatchToProps
)(SignupSendConfirmationAgain);
