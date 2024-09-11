import React from "react";
import { connect } from "react-redux";

// components
import { Form, Row, Section } from "components";

// fields - Orders
import {
  CreatedAtFilterField,
  DateFilterField,
  PriceFilterField,
  ServicesSorterField,
  StatusSorterField
} from "./fields";

// actions
import { filterData, paginateData, sortData } from "store/actions";

// styles
import "./orders-filter-sorter-bar.css";

const OrdersFilterSorterBar = ({ filterData, sortData }) => {
  return (
    <Section className="section__order-filters">
      <Row>
        <div className="order-filters__box">
          <Form
            form="OrdersSorter"
            onFormSubmit={values => {
              const ORDERS = "ORDERS";
              sortData(values, ORDERS);
            }}
            className="form__orders-filter"
            destroyOnUnmount={false}
            forceUnregisterOnUnmount={false}
          >
            <CreatedAtFilterField />
            <PriceFilterField />
            <DateFilterField />
          </Form>
          <Form
            form="OrdersFilter"
            onFormSubmit={values => {
              filterData(values, "ORDERS");
            }}
            className="form__orders-filter"
            destroyOnUnmount={false}
            forceUnregisterOnUnmount={true}
          >
            <StatusSorterField />
            <ServicesSorterField />
          </Form>
        </div>
      </Row>
    </Section>
  );
};

const mapDispatchToProps = {
  filterData,
  sortData,
  paginateData
};

export default connect(
  null,
  mapDispatchToProps
)(OrdersFilterSorterBar);
