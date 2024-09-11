import React from "react";
import _ from "lodash";

// components
import { Row, MainHeader } from "components";

// styles
import "./how-it-works.css";

const steps = [
  {
    title: "Choose your plan",
    description:
      "Choose the cleaning plan suitable for you and provide any other information"
  },
  {
    title: "Pay securely",
    description:
      "Pay online post job and manage your bookings from your account"
  },
  {
    title: "Enjoy your clean home!",
    description:
      "Sit back, relax in your sparkling home and rate your new cleaner for your peers"
  }
];

export default () => {
  return (
    <section className="section__how-it-works">
      <MainHeader>How it works</MainHeader>
      <Row>
        <div className="how-it-works__box">
          {_.map(steps, ({ title, description }, index) => {
            return (
              <div key={index} className="col how-it-works__step box">
                <i className="ion-ios-basket icon-big"></i>
                <h3>{`${++index}. ${title}`} </h3>
                <p>{description}</p>
              </div>
            );
          })}
        </div>
      </Row>
    </section>
  );
};
