import React from "react";
import { Link } from "react-router-dom";

// components
import { Logo } from "components";

// utils
import { history } from "utils";

// styles
import "./company-list-items-header.css";

export default ({ avatar, id, companyName, price }) => {
  const {
    location: { pathname }
  } = history;

  return (
    <div className="company-item__header">
      <div>
        <Logo
          logo={avatar}
          to={`${pathname}?id=${id}`}
          className="small"
          alt="avatar"
        />
        <Link to={`${pathname}?id=${id}`}>{companyName}</Link>
      </div>
      {price && <div>${price}</div>}
    </div>
  );
};
