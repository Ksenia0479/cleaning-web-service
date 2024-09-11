import React, { Component } from "react";
import { connect } from "react-redux";

// components
import { Row, Form, Section, OrderSummary } from "components";

// components - ServiceBook
import { ServiceBookFormSubmitButton } from "../../components";

// components - StepTwo
import {
  StepTwoFormBox,
  StepTwoAddress,
  StepTwoCustomerCredentials
} from "./components";

// actions
import { registerOrder, fetchUserProfileData } from "store/actions";

// validators
import validate from "store/validators/serviceBook";

// styles
import "./service-book-step-two.css";

class ServiceBookStepTwo extends Component {
  componentDidMount() {
    const { isSignedIn, fetchUserProfileData } = this.props;
    isSignedIn && fetchUserProfileData();
  }

  onFormSubmit = values => {
    this.props.registerOrder(values);
  };

  render() {
    const {
      firstName,
      lastName,
      address,
      contact,
      registeredOrder
    } = this.props;

    return (
      <Section className="section__booking-step-two">
        <Row>
          <StepTwoFormBox>
            <Form
              form="ServiceBook"
              validate={validate}
              onFormSubmit={this.onFormSubmit}
              submitButton={ServiceBookFormSubmitButton}
              destroyOnUnmount={false}
              forceUnregisterOnUnmount={true}
              enableReinitialize={true}
              initialValues={{
                creator: {
                  name: { firstName, lastName },
                  contact
                },
                address,
                ...registeredOrder
              }}
              className="form__customer-details"
            >
              <StepTwoAddress />
              <StepTwoCustomerCredentials contact={contact} />
            </Form>
          </StepTwoFormBox>
          <OrderSummary order={registeredOrder} />
        </Row>
      </Section>
    );
  }
}

const mapStateToProps = state => {
  const {
    auth: {
      user: { isSignedIn }
    },
    registeredOrder,
    user: {
      profile: {
        data: { firstName, lastName, address, contact }
      }
    }
  } = state;

  return { registeredOrder, firstName, lastName, address, contact, isSignedIn };
};
const mapDispatchToProps = { registerOrder, fetchUserProfileData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceBookStepTwo);
