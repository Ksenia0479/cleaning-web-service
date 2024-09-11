import React, { Fragment } from "react";
import _ from "lodash";

// components
import { Spinner } from "components";

// components - Reviews
import {
  ReviewsUserName,
  ReviewsCreatedAt,
  ReviewsDescription
} from "./components";

// styles
import "./reviews.css";

const Reviews = ({ reviews, isLoaded }) => {
  const sortedReviewsByCreatedAt = _.orderBy(reviews, ["createdAt"], ["desc"]);

  return (
    <Fragment>
      {isLoaded ? (
        <div className="modal__reviews-wrapper">
          {_.map(sortedReviewsByCreatedAt, (review, index) => {
            const {
              rating,
              createdAt,
              review: { description },
              creator: { firstName, lastName }
            } = review;

            return (
              <div key={index} className="modal_reviews-item">
                <ReviewsUserName
                  firstName={firstName}
                  lastName={lastName}
                  rating={rating}
                />
                <ReviewsCreatedAt createdAt={createdAt} />
                <ReviewsDescription description={description} />
              </div>
            );
          })}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Reviews;
