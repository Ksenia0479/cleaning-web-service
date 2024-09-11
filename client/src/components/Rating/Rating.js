import React from "react";
import Rating from "@material-ui/lab/Rating";

// styles
import "./rating.css";

export default ({ input, ...custom }) => {
  return (
    <div className="rating__box">
      <Rating
        {...input}
        {...custom}
        onChange={value => {
          input.onChange((input.value = value));
        }}
      />
    </div>
  );
};
