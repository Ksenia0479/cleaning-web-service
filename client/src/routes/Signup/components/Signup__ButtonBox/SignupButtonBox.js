import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

// components
import { Row } from "components";

// utils
import { history } from "utils";

// styles
import "./sign-up-button-box.css";

export default () => {
  const {
    location: { pathname }
  } = history;

  const isCompanySignup = pathname === "/signup/company";
  const companyButtonStyles = classNames({
    btn: true,
    "btn-full": isCompanySignup,
    "btn-ghost": !isCompanySignup
  });

  const isCustomerSignup = pathname === "/signup/customer";
  const customerButtonStyles = classNames({
    btn: true,
    "btn-full": isCustomerSignup,
    "btn-ghost": !isCustomerSignup
  });

  return (
    <Row>
      <Link to="/signup/company" className={companyButtonStyles}>
        I'm a<span>company</span>
      </Link>
      <Link to="/signup/customer" className={customerButtonStyles}>
        I'm a<span>customer</span>
      </Link>
    </Row>
  );
};
