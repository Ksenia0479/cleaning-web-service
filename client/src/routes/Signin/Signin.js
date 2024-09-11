import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// components
import { Form, FormBox, Section, Row, NotAMember, Footer } from "components";

// components - Signin
import { SigninSubmitButton, SigninFormHeader } from "./components";

// fields
import { ContactField, PasswordField } from "fields";

// actions
import { signinUser } from "store/actions";

// styles
import "./sign-in.css";

class Signin extends Component {
  render() {
    const { signinUser } = this.props;
    return (
      <Fragment>
        <Section className="section__sign-in">
          <Row>
            <FormBox>
              <SigninFormHeader />
              <Form
                form="SigninPage"
                onFormSubmit={signinUser}
                submitButton={SigninSubmitButton}
              >
                <ContactField />
                <PasswordField />
              </Form>
              <NotAMember />
            </FormBox>
          </Row>
        </Section>
        <Footer />
      </Fragment>
    );
  }
}

const mapDispatchToProps = { signinUser };

export default connect(
  null,
  mapDispatchToProps
)(Signin);
