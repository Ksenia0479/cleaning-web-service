import React from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

// utils
import { history } from "utils";

// styles
import "./modal.css";

export default ({ children, id, status }) => {
  const modalBoxClasses = classNames({
    modal__box: true,
    "modal__order-deny-box":
      history.location.pathname === "/orders/future" && id && status,
    "modal__order-details-box":
      history.location.pathname === "/orders/future" && id && !status
  });

  const onHistoryGoBackClick = () => {
    history.goBack();
  };

  return createPortal(
    <div className="modal__container" onClick={onHistoryGoBackClick}>
      <div className={modalBoxClasses}>
        <div className="modal__btn-close">
          <i className="ion-ios-close"></i>
        </div>
        <div
          className="modal__info"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>,

    document.getElementById("modal")
  );
};
