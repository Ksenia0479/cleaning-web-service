import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// components
import { Modal, Form, Fieldset, Legend, Button } from "components";

// fields
import { TextareaField } from "fields";

// validators
import validate from "store/validators/orderDeny";

// actions
import { denyOrder } from "store/actions";

// styles
import "./order-deny.css";

class OrderDeny extends Component {
  onFormSubmit = values => {
    const { _id, denyOrder } = this.props;
    denyOrder({ _id, values });
  };

  renderConfirmButton = () => {
    return <Button value="Submit" type="submit" className="btn-action" />;
  };

  render() {
    const { _id, status } = this.props;
    const isDenyStatus = status === "deny";
    return (
      <Fragment>
        {_id && isDenyStatus && (
          <Modal id={_id} status={status}>
            <Form
              form="OrderDeny"
              validate={validate}
              onFormSubmit={this.onFormSubmit}
              submitButton={this.renderConfirmButton}
              cancelButton={true}
              className="form__box"
            >
              <Fieldset>
                <Legend>Provide a reason of denying an order</Legend>
                <TextareaField />
              </Fieldset>
            </Form>
          </Modal>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const status = new URLSearchParams(props.location.search).get("status");
  const _id = new URLSearchParams(props.location.search).get("id");

  return { _id, status };
};
const mapDispatchToProps = { denyOrder };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDeny);
