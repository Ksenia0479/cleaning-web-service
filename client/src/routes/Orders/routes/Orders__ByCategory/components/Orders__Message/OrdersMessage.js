import React, { Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";

const OrdersMessage = ({ data, message }) => {
  return <Fragment>{_.isEmpty(data) && <div>{message}</div>}</Fragment>;
};

const mapStateToProps = state => {
  const {
    orders: {
      paginatedData: { data },
      filteredData: { message }
    }
  } = state;

  return {
    data,
    message
  };
};

export default connect(mapStateToProps)(OrdersMessage);
