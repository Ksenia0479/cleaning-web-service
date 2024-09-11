import React from "react";
import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

// routes
import { NotFound } from "../";

// routes - User
import {
  UserAccount,
  UserCloseAccount,
  UserPhoto,
  UserProfile,
  UserReviews,
  UserServices
} from "./routes";

// components
import { Row, Section } from "components";

// components - User
import { UserSidebar } from "./components";

// utils
import { history } from "utils";

// styles
import "./user.css";

const User = ({ role }) => {
  const isCompanyRole = role === "company";
  return (
    <Router history={history}>
      <Section className="section__user">
        <Row>
          <UserSidebar />
          <div className="user__box">
            <Switch>
              <Route
                exact
                path="/users/me/edit-account"
                component={UserAccount}
              />
              <Route exact path="/users/me/edit-photo" component={UserPhoto} />
              <Route
                exact
                path="/users/me/edit-profile"
                component={UserProfile}
              />

              {isCompanyRole && (
                <Route exact path="/users/me/reviews" component={UserReviews} />
              )}

              {isCompanyRole && (
                <Route
                  exact
                  path="/users/me/edit-services"
                  component={UserServices}
                />
              )}

              <Route
                exact
                path="/users/me/close-account"
                component={UserCloseAccount}
              />

              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Row>
      </Section>
    </Router>
  );
};

const mapStateToProps = state => {
  const {
    auth: { user: { data: { role } = {} } = {} }
  } = state;

  return { role };
};

export default connect(mapStateToProps)(User);
