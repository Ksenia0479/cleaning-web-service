import React from "react";

// components
import { Fieldset } from "components";

// components - Rooms
import { RoomsHeader, RoomsOptions } from "./components";

// styles
import "./step-zero-rooms.css";

export default ({ companyRooms }) => {
  return (
    <Fieldset className="fieldset__booking-rooms">
      <RoomsHeader />
      <RoomsOptions companyRooms={companyRooms} />
    </Fieldset>
  );
};
