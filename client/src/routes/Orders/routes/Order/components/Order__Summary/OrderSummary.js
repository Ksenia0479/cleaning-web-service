import React from "react";

// containers
import { OrderSummary } from "components";

// styled
import "./order-summary.css";

export default ({ order }) => {
  return (
    <div className="order__summary">
      <OrderSummary order={order} />
    </div>
  );
};
