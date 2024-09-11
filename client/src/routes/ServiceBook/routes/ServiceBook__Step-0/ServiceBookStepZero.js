import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import _ from "lodash";

// components
import { Form } from "components";

// components - ServiceBook
import { ServiceBookFormSubmitButton } from "../../components";

// components - StepZero
import {
  StepZeroBookingDate,
  StepZeroBookingFrequency,
  StepZeroBookingRooms,
  StepZeroBookingServices,
  StepZeroBookingTime
} from "./components";

// actions
import {
  fetchOrders,
  getServices,
  registerOrder,
  getRoomOptions,
  getFrequencyOptions
} from "store/actions";

// validators
import validate from "store/validators/serviceBook";

class ServiceBookStepZero extends Component {
  componentDidMount() {
    const {
      isSignedIn,
      getServices,
      getRoomOptions,
      getFrequencyOptions,
      fetchOrders
    } = this.props;

    getServices();
    getRoomOptions();
    getFrequencyOptions();

    isSignedIn && fetchOrders();
  }

  onFormSubmit = values => {
    values.time = moment(values.time);
    values.time.set({ second: 0, millisecond: 0 });
    values.time.toISOString();
    values.time.format();

    this.props.registerOrder(values);
  };

  render() {
    const {
      services,
      booking: { frequency },
      registeredOrder,
      selectedCompany: {
        services: companyServices = [],
        rooms: companyRooms = []
      },
      orders: {
        fetchedData: { data }
      }
    } = this.props;

    const lastCreatedOrder = _.isEmpty(data)
      ? {}
      : _.pick(_.head(data), [
          "services",
          "frequency",
          "date",
          "time",
          "rooms",
          "creator",
          "address"
        ]);

    return (
      <Form
        form="ServiceBook"
        validate={validate}
        onFormSubmit={this.onFormSubmit}
        submitButton={ServiceBookFormSubmitButton}
        destroyOnUnmount={false}
        forceUnregisterOnUnmount={false}
        enableReinitialize={true}
        initialValues={{
          ...lastCreatedOrder,
          ...registeredOrder
        }}
      >
        <StepZeroBookingFrequency options={frequency} />
        <StepZeroBookingDate />
        <StepZeroBookingTime />
        <StepZeroBookingServices
          options={_.isEmpty(companyServices) ? services : companyServices}
        />
        <StepZeroBookingRooms companyRooms={companyRooms} />
      </Form>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    orders,
    booking,
    services,
    registeredOrder,
    selectedCompany,
    auth: {
      user: { isSignedIn }
    }
  } = state;

  const {
    match: {
      params: { id }
    }
  } = props;

  return {
    id,
    orders,
    booking,
    services,
    isSignedIn,
    registeredOrder,
    selectedCompany
  };
};
const mapDispatchToProps = {
  getServices,
  getRoomOptions,
  registerOrder,
  getFrequencyOptions,
  fetchOrders
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceBookStepZero);
