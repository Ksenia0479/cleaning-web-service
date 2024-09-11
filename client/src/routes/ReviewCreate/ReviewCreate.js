import React, { Component } from "react";
import { connect } from "react-redux";

// components
import { Row, Form, Section, Fieldset, Legend, Button } from "components";

// fields
import { RatingField } from "fields";

// fields - ReviewCreate
import { ReviewField } from "./fields";

// validators
import validate from "store/validators/reviewCreateForm";

// actions
import { createReview } from "store/actions";

// styles
import "./review-create.css";

class ReviewCreate extends Component {
  onFormSubmit = values => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.props.createReview(values, id);
  };

  renderSubmitButton = () => {
    return <Button type="submit" value="Send review" className="btn-action" />;
  };

  render() {
    return (
      <Section className="section__create-review">
        <Row>
          <div className="create-review__box">
            <Form
              form="ReviewCreate"
              validate={validate}
              onFormSubmit={this.onFormSubmit}
              submitButton={this.renderSubmitButton}
            >
              <Fieldset>
                <Legend>Rate company</Legend>
                <div className="create-review__rating-widget">
                  <RatingField />
                </div>
                <ReviewField />
              </Fieldset>
            </Form>
          </div>
        </Row>
      </Section>
    );
  }
}

const mapDispatchToProps = { createReview };

export default connect(
  null,
  mapDispatchToProps
)(ReviewCreate);
