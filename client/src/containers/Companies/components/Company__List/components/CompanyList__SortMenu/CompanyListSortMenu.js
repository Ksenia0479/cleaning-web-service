import React from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";

// components
import { Form, SelectMenu } from "components";

// actions
import { sortData } from "store/actions";

// styles
import "./company-list-sort-menu.css";

const CompanyListSortMenu = ({ sortData, sortOptions }) => {
  const onFormSubmit = values => {
    const COMPANIES = "COMPANIES";
    sortData(values, COMPANIES);
  };

  return (
    <div className="company__sort-menu">
      <Form
        form="CompanySorter"
        onFormSubmit={onFormSubmit}
        destroyOnUnmount={false}
        forceUnregisterOnUnmount={false}
      >
        <Field
          name="companySorter"
          type="sorter"
          component={SelectMenu}
          options={sortOptions}
        />
      </Form>
    </div>
  );
};

const mapDispatchToProps = { sortData };

export default connect(
  null,
  mapDispatchToProps
)(CompanyListSortMenu);
