import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import Rating from "@material-ui/lab/Rating";

// components
import { Logo, Reviews, Button } from "components";

// utils
import { history } from "utils";

// styles
import "./company-info.css";

export default ({
  path,
  company: {
    rooms,
    rating,
    avatar,
    reviews,
    services,
    companyName,
    completedCleans
  } = {},
  onProceedToBookingClick
}) => {
  const isCompaniesPage = history.location.pathname === "/companies";

  return (
    <Fragment>
      <div className="modal__profile">
        <div className="modal__profile-item">
          <div className="profile-item__avatar">
            <Logo logo={avatar} alt="avatar" className="customized" />
          </div>
          <div className="profile-item__company-name">{companyName}</div>
          <div className="profile-item__company-rating">
            <Rating value={rating} readOnly />
          </div>
          <div className="profile-item__cleanings">
            <span>{completedCleans}</span>Cleanings
          </div>
        </div>
        <div className="modal__profile-item">
          {_.map(services, ({ type }, index) => {
            return (
              <div key={index} className="profile-item__service">
                <i className="ion-ios-checkmark"></i>
                <div>{type}</div>
              </div>
            );
          })}
        </div>
        <div className="modal__profile-item">
          {_.map(rooms, ({ label, value }, index) => {
            return (
              <div key={index} className="profile-item__room">
                <i className="ion-ios-checkmark"></i>
                <div>
                  <div>{label}</div>
                  <div className="profile-item__room-price">{`$${value}`}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="modal__profile-btn">
          <Link className="btn btn-ghost" to={path}>
            Write a review
          </Link>
          {isCompaniesPage && (
            <Button
              className="action"
              value="Proceed to booking"
              onClick={onProceedToBookingClick}
            />
          )}
        </div>
      </div>
      <div className="modal__reviews">
        <Reviews reviews={reviews} />
      </div>
    </Fragment>
  );
};
