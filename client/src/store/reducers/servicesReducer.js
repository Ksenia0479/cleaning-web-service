// utils - reducers
import { createReducer } from "./_utils";

const initialState = [
  { label: "Standart", type: "Standart", value: 1 },
  { label: "General", type: "General", value: 2 },
  {
    label: "After repair and construction",
    type: "After repair and construction",
    value: 3
  },
  { label: "Carpet cleaning", type: "Carpet cleaning", value: 4 },
  { label: "Office cleaning", type: "Office cleaning", value: 5 },
  {
    label: "Furniture and equipment",
    type: "Furniture and equipment",
    value: 6
  },
  { label: "Industrial cleaning", type: "Industrial cleaning", value: 7 },
  { label: "Pool cleaning", type: "Pool cleaning", value: 8 }
];

const servicesHandlers = {};

export default createReducer(initialState, servicesHandlers);
