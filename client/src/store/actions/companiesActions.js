import _ from "lodash";

// api
import { cleaningServiceAPI } from "store/api";

// constants
import { FETCH_COMPANIES } from "store/constants";

// actions
import { setInitialFilteredData, paginateData } from "store/actions";

const fetchCompanies = (services, rooms) => {
  return {
    types: [
      FETCH_COMPANIES.REQUEST,
      FETCH_COMPANIES.SUCCESS,
      FETCH_COMPANIES.FAILURE
    ],
    shouldCallAPI: state => _.isEmpty(state.companies.data),
    callAPI: async () => {
      return await cleaningServiceAPI.post("/companies", { services, rooms });
    },
    callExtraDispatchersOnSuccess: ({ dispatch, getState }) => {
      const {
        fetchedData: { data }
      } = getState().companies;

      dispatch(setInitialFilteredData("COMPANIES", data));
      dispatch(paginateData("COMPANIES"));
    }
  };
};

const fetchCompany = id => {
  return {
    types: [
      FETCH_COMPANIES.REQUEST,
      FETCH_COMPANIES.SUCCESS,
      FETCH_COMPANIES.FAILURE
    ],
    shouldCallAPI: state => _.isEmpty(state.companies.data),
    callAPI: async () => {
      return await cleaningServiceAPI.get(`/companies/${id}`);
    }
  };
};

export { fetchCompanies, fetchCompany };
