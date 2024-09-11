import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

// components
import { Row } from "components";

// components - Companies
import { CompanyList, CompanySidebar, CompanySearchResult } from "./components";

// actions
import {
  addAlert,
  filterData,
  registerOrder,
  updateSelectedCompany
} from "store/actions";

// utils
import { history } from "utils";

// styles
import "./companies.css";

class Companies extends Component {
  onProceedToBookingClick = () => {
    let {
      addAlert,
      filteredData,
      registerOrder,
      selectedCompany: { _id, price } = {}
    } = this.props;

    if (_.isEmpty(this.props.selectedCompany)) {
      const alertType = "warning";
      const alertMessage = "Please, select company to proceed with the booking";
      return addAlert(alertMessage, alertType);
    }

    if (history.location.pathname === "/booking/step-one" && !price) {
      const { price } = _.find(filteredData, { _id });
      return registerOrder({ assignee: _id, price });
    }

    return registerOrder({ assignee: _id, price });
  };

  render() {
    const {
      data,
      message,
      isLoaded,
      filterData,
      sortOptions,
      totalNumberOfCompanies,
      selectedCompany: { companyName, avatar, _id }
    } = this.props;

    return (
      <section className="section__companies">
        <Row>
          <CompanySidebar
            handleSubmit={filterData}
            availableCompanies={totalNumberOfCompanies}
          />
          <CompanyList
            data={data}
            message={message}
            isLoaded={isLoaded}
            sortOptions={sortOptions}
            selectedCompany={this.props.selectedCompany}
          />
          <CompanySearchResult
            _id={_id}
            avatar={avatar}
            companyName={companyName}
            onProceedToBookingClick={this.onProceedToBookingClick}
          />
        </Row>
      </section>
    );
  }
}

const mapDispatchToProps = {
  addAlert,
  filterData,
  registerOrder,
  updateSelectedCompany
};

export default connect(
  null,
  mapDispatchToProps
)(Companies);
