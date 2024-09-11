// constants
import { GET_FREQUENCY_OPTIONS } from "store/constants";

// fetched data
const frequencyOptions = [
  { label: "One time", value: false },
  { label: "Weekly", value: false },
  { label: "Biweekly", value: false },
  { label: "Monthly", value: false }
];

export const getFrequencyOptions = () => {
  return { type: GET_FREQUENCY_OPTIONS, payload: { data: frequencyOptions } };
};
