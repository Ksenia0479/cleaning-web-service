import React, { Component, Fragment } from "react";
import { reduxForm } from "redux-form";

// components
import { Button } from "components";

// utils
import { history } from "utils";

export default props => {
  const {
    form,
    children,
    validate,
    className,
    submitButton,
    cancelButton,
    onFormSubmit,
    clearButton,
    multipartForm = false,
    enableReinitialize = false,
    destroyOnUnmount = true,
    forceUnregisterOnUnmount = false
  } = props;

  class Form extends Component {
    renderButtons = () => {
      const renderClearButton = () => {
        const { pristine, submitting, reset } = this.props;

        return (
          <Button
            type="button"
            name="Clear"
            disabled={pristine || submitting}
            onClick={reset}
          />
        );
      };

      const renderCancelButton = () => {
        return (
          <Button
            value="Cancel"
            onClick={() => {
              history.goBack();
            }}
          />
        );
      };

      return (
        <Fragment>
          {submitButton && submitButton()}
          {cancelButton && renderCancelButton()}
          {clearButton && renderClearButton()}
        </Fragment>
      );
    };

    render() {
      const { handleSubmit } = this.props;

      const onFormChange = () => {
        form === "CompanyFilter" &&
          setTimeout(handleSubmit(values => onFormSubmit(values)), 1000);

        (form === "CompanySorter" ||
          form === "OrdersFilter" ||
          form === "CompaniesFilter" ||
          form === "OrdersSorter") &&
          setTimeout(handleSubmit(values => onFormSubmit(values)), 0);
      };

      return (
        <form
          onChange={onFormChange}
          onSubmit={handleSubmit(onFormSubmit)}
          className={className}
        >
          {children}
          {this.renderButtons()}
        </form>
      );
    }
  }

  const WrappedForm = reduxForm({
    form,
    validate,
    multipartForm,
    destroyOnUnmount,
    enableReinitialize,
    forceUnregisterOnUnmount
  })(Form);

  return <WrappedForm {...props} />;
};
