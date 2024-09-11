import React from "react";
import { Router, Route, Switch } from "react-router-dom";

// routes
import { NotFound } from "routes";

// routes - Service Book
import {
  ServiceBookStepZero,
  ServiceBookStepOne,
  ServiceBookStepTwo,
  ServiceBookStepThree,
  ServiceBookSuccess
} from "./routes";

// components
import { ServiceBookSteps } from "./components";

// utils
import { history } from "utils";

// styles
import "./service-book.css";

export default () => {
  return (
    <Router history={history}>
      <ServiceBookSteps />

      <Switch>
        <Route
          exact
          path="/booking/step-zero"
          component={ServiceBookStepZero}
        />
        <Route exact path="/booking/step-one" component={ServiceBookStepOne} />
        <Route exact path="/booking/step-two" component={ServiceBookStepTwo} />
        <Route
          exact
          path="/booking/step-three"
          component={ServiceBookStepThree}
        />
        <Route
          exact
          path={`/booking/success/:id`}
          component={ServiceBookSuccess}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};
