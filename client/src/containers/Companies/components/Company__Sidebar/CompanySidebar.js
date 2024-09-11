import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

// components
import { Form } from "components";

// fields
import {
  FilterByPriceField,
  FilterByCleansField,
  FilterByRating
} from "fields";

// actions
import { updateData, filterData } from "store/actions";

// styles
import "./company-sidebar.css";

class CompanyFilter extends Component {
  onFormSubmit = values => {
    const { updateData, filterData } = this.props;
    updateData(values, "FILTERS");
    filterData(values, "COMPANIES");
  };

  render() {
    const { data, availableCompanies, path } = this.props;

    const sidebarBox = classNames({
      sidebar__box: true
    });

    return (
      <div className={sidebarBox} ref={ref => (this.sideBar = ref)}>
        <Form
          form="CompanyFilter"
          onFormSubmit={this.onFormSubmit}
          destroyOnUnmount={false}
          forceUnregisterOnUnmount={false}
          enableReinitialize={true}
          initialValues={{ ...data }}
        >
          <div className="box__item header">
            <p>
              <span>{availableCompanies}</span> available companies
            </p>
          </div>
          {path === "/booking/step-one" && (
            <div className="box__item">
              <p>Maximum price, $</p>
              <div className="range-box">
                <FilterByPriceField />
              </div>
            </div>
          )}
          <div className="box__item">
            <p>Mininum rating</p>
            <FilterByRating />
          </div>
          <div className="box__item">
            <p>Minimum cleans</p>
            <div className="range-box">
              <FilterByCleansField />
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    filters: { data }
  } = state;
  return { data };
};

const mapDispatchToProps = {
  updateData,
  filterData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(CompanyFilter);
