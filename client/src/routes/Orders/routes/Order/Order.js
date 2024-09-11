import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";

// components
import { Modal } from "components";

// components - Order
import { OrderSidebar, OrderSummary } from "./components";

// actions
import { approveOrder } from "store/actions";

// styles
import "./order.css";

class Order extends Component {
  render() {
    const {
      _id,
      category,
      isDenyStatus,
      approveOrder,
      order: { processed: { status } = {}, orderNumber, completed } = {}
    } = this.props;
    const { order = {} } = this.props;

    return (
      <Fragment>
        {_id && !isDenyStatus && (
          <Modal id={_id}>
            <div className="order__box">
              <OrderSummary order={order} />
              <OrderSidebar
                _id={_id}
                status={status}
                category={category}
                completed={completed}
                orderNumber={orderNumber}
                approveOrder={approveOrder}
              />
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    orders: {
      fetchedData: { data }
    }
  } = state;

  const {
    match: {
      params: { category }
    }
  } = props;

  const _id = new URLSearchParams(props.location.search).get("id");
  const isDenyStatus = new URLSearchParams(props.location.search).get("status");
  const order = _.find(data, { _id });

  return { _id, order, category, isDenyStatus };
};
const mapDispatchToProps = { approveOrder };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
