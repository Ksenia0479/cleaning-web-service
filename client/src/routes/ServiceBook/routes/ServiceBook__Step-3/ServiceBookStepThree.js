import React, { Component } from "react";
import { connect } from "react-redux";

// components
import { Row, Section, OrderSummary } from "components";

// components - StepThree
import { StepThreeButton, StepThreeHeader } from "./components";

// actions
import { createOrder } from "store/actions";

// styles
import "./service-book-step-three.css";

class ServiceBookStepThree extends Component {
  onFinishBookingClick = () => {
    const { createOrder, registeredOrder } = this.props;
    createOrder(registeredOrder);
  };

  render() {
    const { registeredOrder } = this.props;

    return (
      <Section className="section__booking-step-three">
        <StepThreeHeader />
        <Row>
          <OrderSummary order={registeredOrder} />
        </Row>
        <StepThreeButton onClick={this.onFinishBookingClick} />
      </Section>
    );
  }
}

const mapStateToProps = ({ registeredOrder }) => {
  return { registeredOrder };
};
const mapDispatchToProps = { createOrder };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceBookStepThree);
