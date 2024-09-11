import React from "react";
import classNames from "classnames";

// components
import { Row, Section } from "components";

// components - Steps
import { StepsOne, StepsTwo, StepsThree } from "./components";

// utils
import { history } from "utils";

// styles
import "./service-book-steps.css";

export default () => {
  const isZeroStep = history.location.pathname === "/booking/step-zero";
  const isOneStep = history.location.pathname === "/booking/step-one";
  const isTwoStep = history.location.pathname === "/booking/step-two";
  const isThreeStep = history.location.pathname === "/booking/step-three";

  const stepOneClasses = classNames({
    "box-step__box-active": isZeroStep,
    "box-step__box-completed": !isZeroStep
  });
  const stepTwoClasses = classNames({
    "box-step__box-active": isTwoStep,
    "box-step__box-completed": !isZeroStep && !isOneStep && !isTwoStep
  });
  const stepThreeClasses = classNames({
    "box-step__box-active": isThreeStep,
    "box-step__box-completed":
      !isZeroStep && !isOneStep && !isTwoStep && !isThreeStep
  });

  return (
    <Section className="section__steps">
      <Row>
        <div className="steps__box">
          <StepsOne stepOneClasses={stepOneClasses} />
          <div className="step__box-dots"></div>
          <StepsTwo stepTwoClasses={stepTwoClasses} />
          <div className="step__box-dots"></div>
          <StepsThree stepThreeClasses={stepThreeClasses} />
        </div>
      </Row>
    </Section>
  );
};
