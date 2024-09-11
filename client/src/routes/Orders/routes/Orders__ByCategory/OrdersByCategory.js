import React, { Component } from "react";
import { connect } from "react-redux";

// components
import { Row, Section } from "components";

// components - Orders
import { OrdersItems, OrdersMessage } from "./components";

// containers
import { InfiniteScrolling } from "containers";

// actions
import { fetchOrders } from "store/actions";

// styles
import "./orders-by-category.css";

class OrdersByCategory extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const {
      match: {
        params: { category }
      }
    } = this.props;

    return (
      <Section className="section__orders">
        <Row>
          <InfiniteScrolling dataName="ORDERS">
            <div className="orders__items-box">
              <OrdersItems category={category} />
              <OrdersMessage />
            </div>
          </InfiniteScrolling>
        </Row>
      </Section>
    );
  }
}

const mapDispatchToProps = { fetchOrders };

export default connect(
  null,
  mapDispatchToProps
)(OrdersByCategory);
