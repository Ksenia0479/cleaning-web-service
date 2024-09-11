import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { Field } from "redux-form";

// components
import { Button } from "components";

// actions
import {
  initializeSubscription,
  fetchExistingSubscriptionStatus
} from "store/actions";

// utils
import { isPushNotificationSupported, registerSW } from "utils";

// styles
import "./push-notification.css";

class PushNotifications extends Component {
  componentDidMount() {
    const {
      userConsent,
      isUserSubscribed,
      initializeSubscription,
      fetchExistingSubscriptionStatus
    } = this.props;

    isPushNotificationSupported() && registerSW();
    fetchExistingSubscriptionStatus();

    if (userConsent === "denied" && isUserSubscribed) {
      initializeSubscription();
    }
  }

  render() {
    const { userConsent, initializeSubscription } = this.props;

    const disabled = userConsent === "denied";

    const enableNotificationFieldClasses = classNames({
      "push-notification__wrapper": true,
      disabled
    });

    return (
      <div className={enableNotificationFieldClasses}>
        <Field
          id="notify-checkbox"
          name="enableNotifications"
          type="checkbox"
          component={Button}
          disabled={disabled}
          onClick={initializeSubscription}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    notifications: {
      userConsent,
      data: { isUserSubscribed }
    }
  } = state;

  return { userConsent, isUserSubscribed };
};

const mapDispatchToProps = {
  initializeSubscription,
  fetchExistingSubscriptionStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PushNotifications);
