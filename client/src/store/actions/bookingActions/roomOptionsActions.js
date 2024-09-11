// constants
import { GET_ROOM_OPTIONS } from "store/constants";

// fetched data
const roomOptions = {
  small: [
    { label: "None", value: 0 },
    { label: "One small Bedroom", value: 1 },
    { label: "Two small Bedrooms", value: 2 },
    { label: "Three small Bedrooms", value: 3 }
  ],
  large: [
    { label: "None", value: 0 },
    { label: "One large Bedroom", value: 1 },
    { label: "Two large Bedrooms", value: 2 },
    { label: "Three large Bedrooms", value: 3 }
  ],
  bath: [
    { label: "None", value: 0 },
    { label: "One Bathroom", value: 1 },
    { label: "Two Bathrooms", value: 2 },
    { label: "Three Bathrooms", value: 3 }
  ]
};

export const getRoomOptions = () => {
  return { type: GET_ROOM_OPTIONS, payload: { data: roomOptions } };
};
