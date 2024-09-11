import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// components
import { Form, Button, Fieldset, Legend } from "components";

// containers
import { PushNotification } from "containers";

// fields
import {
  CompanyNameField,
  CompanyDescriptionField,
  FirstNameField,
  LastNameField,
  AddressFormSection
} from "fields";

// validators
import validate from "store/validators/userProfileEdit";

// actions
import { fetchUserProfileData, updateUserProfileData } from "store/actions";

class UserProfile extends Component {
  componentDidMount() {
    this.props.fetchUserProfileData();
  }

  renderSubmitButton = () => {
    return <Button value="Save" className="btn-action" type="submit" />;
  };

  render() {
    const { data, role, updateUserProfileData } = this.props;

    const isCompany = role === "company";
    const isCustomer = role === "customer";

    return (
      <Fragment>
        <Form
          form="UserProfileEdit"
          validate={validate}
          destroyOnUnmount={false}
          enableReinitialize={true}
          onFormSubmit={updateUserProfileData}
          submitButton={this.renderSubmitButton}
          initialValues={{ ...data }}
          className="user__form"
        >
          <Fieldset>
            <Legend>Add information about yourself</Legend>

            {isCompany && (
              <Fragment>
                <CompanyNameField />
                <CompanyDescriptionField />
              </Fragment>
            )}

            {isCustomer && (
              <Fragment>
                <FirstNameField />
                <LastNameField />
                <PushNotification />
              </Fragment>
            )}

            <AddressFormSection />
          </Fieldset>
        </Form>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  fetchUserProfileData,
  updateUserProfileData
};

const mapStateToProps = state => {
  const {
    auth: {
      user: {
        data: { role }
      }
    },
    user: {
      profile: { data }
    }
  } = state;

  return {
    role,
    data
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
