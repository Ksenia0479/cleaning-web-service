import React, { Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";

// components - OrderItems
import {
  OrdersItemDetails,
  OrdersItemPrice,
  OrdersItemDate,
  OrdersItemStatus,
  OrdersItemServices,
  OrdersItemButtonBox
} from "./components";

// action
import { approveOrder, completeOrder } from "store/actions";

// styles
import "./orders-items.css";

const OrdersItems = ({ category, role, data, approveOrder, completeOrder }) => {
  return (
    <Fragment>
      {_.map(data, (order, index) => {
        const {
          _id,
          date,
          time,
          price,
          completed,
          createdAt,
          orderNumber,
          services: { type } = {},
          processed: { status } = {}
        } = order;

        return (
          <div key={index} className="orders__item">
            <OrdersItemDetails
              id={_id}
              createdAt={createdAt}
              category={category}
              orderNumber={orderNumber}
            />
            <OrdersItemPrice price={price} />
            <OrdersItemDate date={date} time={time} />
            <OrdersItemStatus status={status} />
            <OrdersItemServices type={type} />
            <OrdersItemButtonBox
              id={_id}
              role={role}
              status={status}
              category={category}
              completed={completed}
              approveOrder={approveOrder}
              completeOrder={completeOrder}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

const mapStateToProps = (state, props) => {
  let {
    auth: {
      user: {
        data: { role }
      }
    },
    orders: {
      paginatedData: { data }
    }
  } = state;

  const { category } = props;

  const filteredOrdersByCategory = _.filter(data, ({ completed }) => {
    switch (category) {
      case "future":
        return !completed;
      case "past":
        return completed;
      default:
        return false;
    }
  });

  return { role, data: filteredOrdersByCategory };
};

const mapDipatchToProps = {
  approveOrder,
  completeOrder
};

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(OrdersItems);
