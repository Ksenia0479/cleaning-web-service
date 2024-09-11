import React from "react";
import { Router, Route, Switch } from "react-router-dom";

// routes
import { NotFound } from "routes";

// components
import { Section, MainHeader } from "components";

// components - Signup
import { SignupButtonBox } from "./components";

// routes - Signup
import {
  CompanySignup,
  CustomerSignup,
  SignupConfirmation,
  SignupSendConfirmationAgain
} from "./routes";

// utils
import { history } from "utils";

// styles
import "./sign-up.css";

export default () => {
  const isSignupConfirmationPage =
    history.location.pathname === "/signup/confirmation";
  const isSignupSendConfirmationAgain =
    history.location.pathname === "/signup/identify";

  return (
    <Router history={history}>
      {!(isSignupConfirmationPage || isSignupSendConfirmationAgain) && (
        <Section className="section__sign-up">
          <MainHeader>Signup now, it's free!</MainHeader>
          <SignupButtonBox />
        </Section>
      )}

      <Switch>
        <Route exact path="/signup/company" component={CompanySignup} />
        <Route exact path="/signup/customer" component={CustomerSignup} />
        <Route
          exact
          path="/signup/confirmation"
          component={SignupConfirmation}
        />
        <Route
          exact
          path="/signup/identify"
          component={SignupSendConfirmationAgain}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};
