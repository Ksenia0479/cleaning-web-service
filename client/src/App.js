import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

// routes
import {
  Companies,
  Company,
  HomePage,
  HowItWorks,
  Orders,
  ReviewCreate,
  ServiceBook,
  Signin,
  Signup,
  User,
  NotFound
} from "routes";

// containers
import { Header, Toastr } from "containers";

//utils
import { history } from "utils";

export default () => {
  return (
    <ConnectedRouter history={history}>
      <Header />
      <Toastr />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route path="/users/me" component={User} />
        <Route path="/orders" component={Orders} />
        <Route path="/booking" component={ServiceBook} />
        <Route exact path="/companies" component={Companies} />
        <Route
          exact
          path="/reviews/create-review/:id"
          component={ReviewCreate}
        />
        <Route exact path="/how-it-works" component={HowItWorks} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Route path="/booking/step-one" component={Company} />
      <Route path="/companies" component={Company} />
    </ConnectedRouter>
  );
};
