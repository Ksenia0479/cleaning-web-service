import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

// components - Orders
import { OrdersCategories, OrdersFilterSorterBar } from "./components";

// routes - Orders
import { OrdersByCategory, OrderDeny, Order } from "./routes";

// utils
import { history } from "utils";

const Orders = ({ sorters }) => {
  return (
    <ConnectedRouter history={history}>
      <OrdersCategories />
      <OrdersFilterSorterBar sorters={sorters} />

      <Route exact path="/orders/:category" component={OrdersByCategory} />
      <Route path="/orders/:category" component={Order} />
      <Route path="/orders/:category" component={OrderDeny} />
    </ConnectedRouter>
  );
};

const mapStateToProps = ({ sorters }) => {
  return { sorters };
};

export default connect(mapStateToProps)(Orders);
