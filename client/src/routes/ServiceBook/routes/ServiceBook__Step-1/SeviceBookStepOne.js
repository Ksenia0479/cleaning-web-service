import React, { Component } from "react";
import { connect } from "react-redux";

// components
import { Companies } from "containers";

// actions
import { fetchCompanies } from "store/actions";

// styles
import "./service-book-step-one.css";

const sortOptions = [
  { label: "None", value: "" },
  { label: "Highest rating", value: "rating" },
  { label: "Highest price", value: "price" },
  { label: "Highest number of cleans", value: "cleans" }
];

class ServiceBookStepOne extends Component {
  componentDidMount() {
    let {
      fetchCompanies,
      registeredOrder: { services, rooms }
    } = this.props;

    fetchCompanies(services, rooms);
  }

  render() {
    const {
      isLoaded,
      filteredData,
      paginatedData: { data },
      selectedCompany,
      totalNumberOfCompanies
    } = this.props;

    return (
      <Companies
        data={data}
        isLoaded={isLoaded}
        sortOptions={sortOptions}
        filteredData={filteredData}
        selectedCompany={selectedCompany}
        totalNumberOfCompanies={totalNumberOfCompanies}
      />
    );
  }
}

const mapStateToProps = state => {
  let {
    selectedCompany = {},
    registeredOrder,
    companies: {
      paginatedData,
      filteredData: { data = [] } = {},
      fetchedData: { isLoaded }
    }
  } = state;

  const totalNumberOfCompanies = data.length;

  return {
    isLoaded,
    filteredData: data,
    paginatedData,
    selectedCompany,
    registeredOrder,
    totalNumberOfCompanies
  };
};
const mapDispatchToProps = { fetchCompanies };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceBookStepOne);
