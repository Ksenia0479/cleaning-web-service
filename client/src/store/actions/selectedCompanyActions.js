// constants
import {
  UPDATE_SELECTED_COMPANY,
  REMOVE_SELECTED_COMPANY
} from "store/constants";

const updateSelectedCompany = company => {
  return { type: UPDATE_SELECTED_COMPANY, payload: company };
};

const removeSelectedCompany = () => {
  return { type: REMOVE_SELECTED_COMPANY };
};

export { updateSelectedCompany, removeSelectedCompany };
