import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

// components
import { Button } from "components";

// utils
import { history } from "utils";

// styles
import "./company-list-items-buttons.css";

export default ({ id, onButtonClick, isCompanySelected }) => {
  const selectButtonClasses = classNames({
    btn: true,
    "btn-full": true,
    selected: isCompanySelected
  });

  const {
    location: { pathname }
  } = history;

  return (
    <div className="company-item__btn">
      <div className="btn__reviews">
        <Link className="btn btn-ghost" to={`${pathname}?id=${id}`}>
          Reviews
        </Link>
      </div>
      <div className="btn__select">
        <Button
          className={selectButtonClasses}
          to={`/services/${id}/book-confirm`}
          value={isCompanySelected ? "Selected" : "Select"}
          onClick={() => {
            onButtonClick(id);
          }}
        />
      </div>
    </div>
  );
};
