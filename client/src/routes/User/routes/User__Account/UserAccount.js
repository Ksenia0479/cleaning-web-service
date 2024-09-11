import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// components
import { Form, Button, Fieldset, Legend } from "components";

// components - User
import { UserContact } from "./components";

// fields
import {
  ContactField,
  PasswordField,
  ConfirmPasswordField,
  CurrentPasswordField
} from "fields";

// validators
import validate from "store/validators/userAccountEdit";

// actions
import { fetchUserAccountData, updateUserAccountData } from "store/actions";

class UserAccount extends Component {
  componentDidMount() {
    this.props.fetchUserAccountData();
  }

  renderSubmitButton = () => {
    return <Button type="submit" value="Save" className="btn-action" />;
  };

  render() {
    const { data: { contact = {} } = [], updateUserAccountData } = this.props;

    return (
      <Fragment>
        <Form
          form="UserAccountEdit"
          validate={validate}
          onFormSubmit={updateUserAccountData}
          submitButton={this.renderSubmitButton}
          className="user__form"
        >
          <Fieldset>
            <Legend>Edit your account data</Legend>
            {contact.email_address ? (
              <UserContact contact={contact} />
            ) : (
              <ContactField />
            )}
            <CurrentPasswordField />
            <PasswordField />
            <ConfirmPasswordField />
          </Fieldset>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {
    user: {
      account: { data }
    }
  } = state;

  return { data };
};
const mapDispatchToProps = { fetchUserAccountData, updateUserAccountData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAccount);
