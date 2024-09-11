import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

// components
import { Row, Section } from "components";

// utils
import { history } from "utils";

// styles
import "./orders-categories.css";

export default () => {
  const isPastOrders = history.location.pathname === "/orders/past";
  const isFutureOrders = history.location.pathname === "/orders/future";

  const futureOrdersClasses = classNames({
    categories__item: true,
    "category-active": isFutureOrders
  });
  const pastOrdersClasses = classNames({
    categories__item: true,
    "category-active": isPastOrders
  });
  return (
    <Section className="section__order-categories">
      <Row>
        <div className="orders__categories-box">
          <Link to="/orders/future">
            <div className={futureOrdersClasses}>Future Orders</div>
          </Link>
          <Link to="/orders/past">
            <div className={pastOrdersClasses}>Past Orders</div>
          </Link>
        </div>
      </Row>
    </Section>
  );
};
