import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// components
import { Button, OrderInfo } from "components";

// styles
import "./order-sidebar.css";

const OrderSidebar = ({
  _id,
  role,
  status,
  category,
  completed,
  orderNumber,
  approveOrder
}) => {
  const isCompany = role === "company";
  const isPendingStatus = status === "pending";
  const isApprovedStatus = status === "approved";

  return (
    <div className="order__sidebar">
      <OrderInfo status={status} orderNumber={orderNumber} />

      {isCompany && !completed && isApprovedStatus && (
        <Fragment>
          <Button value="Complete order" />
        </Fragment>
      )}

      {isCompany && isPendingStatus && (
        <Fragment>
          <Button
            value="Approve"
            onClick={() => {
              approveOrder(_id);
            }}
          />
          <Link
            to={`/orders/${category}?id=${_id}&status=${"deny"}`}
            className="btn btn-action"
          >
            Deny
          </Link>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const {
    auth: {
      user: {
        data: { role }
      }
    }
  } = state;
  return { role };
};

export default connect(mapStateToProps)(OrderSidebar);
