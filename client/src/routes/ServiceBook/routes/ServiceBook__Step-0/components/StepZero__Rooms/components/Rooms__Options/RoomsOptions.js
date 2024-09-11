import React from "react";
import { connect } from "react-redux";
import { FormSection } from "redux-form";
import _ from "lodash";

// components
import { Row } from "components";

// fields
import { StepZeroRoomsField } from "../../../../fields";

const roomOptions = ({ roomOptions: { data = {} }, companyRooms }) => {
  let test = [];

  _.mapKeys(data, (value, key) => {
    return test.push(<StepZeroRoomsField name={`${key}`} options={value} />);
  });

  return (
    <Row>
      <FormSection name="rooms" className="booking-rooms__box">
        {!_.isEmpty(companyRooms) &&
          _.map(companyRooms, ({ type }) => {
            return <StepZeroRoomsField name={`${type}`} options={data[type]} />;
          })}

        {_.isEmpty(companyRooms) && test}
      </FormSection>
    </Row>
  );
};

const mapStateToProps = state => {
  const {
    booking: { roomOptions }
  } = state;

  return { roomOptions };
};

export default connect(mapStateToProps)(roomOptions);
