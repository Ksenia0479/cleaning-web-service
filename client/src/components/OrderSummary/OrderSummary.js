import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

// utils
import { formatDate, formatTime } from "utils";

// styles
import "./order-summary.css";

class ServiceBookSummary extends Component {
  render() {
    const {
      order: {
        date,
        time,
        price,
        address,
        services: { type } = {},
        frequency: { label } = {},
        creator: { name, contact } = {},
        rooms: { bath, large, small } = {}
      }
    } = this.props;

    return (
      <div className="sidebar__box booking-summary">
        <header className="booking-summary__header">
          <h3>Booking summary</h3>
        </header>
        <div className="booking-summary__content">
          <div className="content__section">
            <div className="content__title">Frequency</div>
            <div className="content__value">{label}</div>
          </div>
          <div className="content__section">
            <div className="content__title">Date</div>
            <div className="content__value">{formatDate(date)}</div>
          </div>
          <div className="content__section">
            <div className="content__title">Time</div>
            <div className="content__value">{formatTime(time)}</div>
          </div>
          <div className="content__section">
            <div className="content__title">Service type</div>
            <div className="content__value">
              <div>
                <i className="ion-ios-checkmark"></i>
                {type}
              </div>
            </div>
          </div>
          <div className="content__section">
            <div className="content__title">Rooms</div>
            <div className="content__value">
              {bath && bath.value !== 0 && (
                <div className="value__bath">
                  <i className="ion-ios-checkmark"></i>
                  {bath.label}
                </div>
              )}
              {large && large.value !== 0 && (
                <div className="value__large">
                  <i className="ion-ios-checkmark"></i>
                  {large.label}
                </div>
              )}
              {small && small.value !== 0 && (
                <div className="value__small">
                  <i className="ion-ios-checkmark"></i>
                  {small.label}
                </div>
              )}
            </div>
          </div>
          {name && (
            <div className="content__section">
              <div className="content__title">Contact name</div>
              <div className="content__value">{`${name.firstName} ${name.lastName}`}</div>
            </div>
          )}
          {contact && (
            <div className="content__section">
              <div className="content__title">Contact</div>
              <div className="content__value">
                {_.map(contact, item => {
                  return item;
                })}
              </div>
            </div>
          )}
          {address && (
            <div className="content__section">
              <div className="content__title">Address</div>
              <div className="content__value">
                <p>{`${address.street} ${address.apartmentNumber}`}</p>
                <p>{`${address.city}, ${address.zipCode}`}</p>
              </div>
            </div>
          )}
        </div>
        {price && (
          <footer className="booking-summary__footer">
            <div className="content__section">
              <div className="content__title">Total cost</div>
              <div className="content__value">{`$${price}`}</div>
            </div>
          </footer>
        )}
        <footer className="booking-summary__footer">
          <div className="footer__box">
            <div className="footer__icon">
              <i className="ion-ios-information-circle-outline"></i>
            </div>
            <div className="footer__info">
              The price of the first cleaner that accepts your booking is what
              you will be charged.
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default connect()(ServiceBookSummary);
