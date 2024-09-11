import React from "react";
import { connect } from "react-redux";

// components
import { Form, Button, Fieldset, Legend, Spinner } from "components";

// fields
import { ServicesFieldArray, RoomsFieldArray } from "fields";

// actions
import { fetchServices, updateServices } from "store/actions";

// styles
import "./user-services.css";

class UserServices extends React.Component {
  componentDidMount() {
    this.props.fetchServices();
  }

  renderSubmitButton = () => {
    return <Button type="submit" value="Save" className="btn-action" />;
  };

  render() {
    const { data, isLoaded, updateServices } = this.props;
    return (
      <Form
        form="UserServicesEdit"
        enableReinitialize={true}
        destroyOnUnmount={false}
        onFormSubmit={updateServices}
        submitButton={this.renderSubmitButton}
        initialValues={{ ...data }}
        className="user__form"
      >
        <Fieldset>
          <Legend>Service types</Legend>
          {isLoaded ? <ServicesFieldArray /> : <Spinner />}
        </Fieldset>

        <Fieldset>
          <Legend>Room types</Legend>
          {isLoaded ? <RoomsFieldArray /> : <Spinner />}
        </Fieldset>
      </Form>
    );
  }
}

const mapStateToProps = ({
  user: {
    services: { data, isLoaded }
  }
}) => {
  return {
    data,
    isLoaded
  };
};

const mapDispathToProps = {
  fetchServices,
  updateServices
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(UserServices);
