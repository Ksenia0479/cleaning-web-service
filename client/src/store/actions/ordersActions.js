// api
import { cleaningServiceAPI } from "store/api";

// constants
import {
  DENY_ORDER,
  CREATE_ORDER,
  FETCH_ORDERS,
  APPROVE_ORDER,
  REGISTER_ORDER,
  COMPLETE_ORDER,
  CLEAR_REGISTER_BOOKING_DATA
} from "store/constants";

// actions
import {
  setInitialFilteredData,
  addAlert,
  paginateData,
  removeSelectedCompany
} from "store/actions";

// utils
import { history, getTokens, getJWT } from "utils";

const createOrder = order => {
  return {
    types: [CREATE_ORDER.REQUEST, CREATE_ORDER.SUCCESS, CREATE_ORDER.FAILURE],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.post(
        "/orders",
        { order },
        token !== null && { headers: { Authorization: token } }
      );
    },
    callExtraDispatchersOnSuccess: ({ dispatch, getState }) => {
      const { orders: { fetchedData: { data = [] } = {} } = {} } = getState();
      const { _id } = data;

      dispatch(removeSelectedCompany());
      dispatch({ type: CLEAR_REGISTER_BOOKING_DATA });
      history.push(`/booking/success/${_id}`);
    }
  };
};

const fetchOrders = () => {
  return {
    types: [FETCH_ORDERS.REQUEST, FETCH_ORDERS.SUCCESS, FETCH_ORDERS.FAILURE],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.get("/orders", {
        headers: { Authorization: token }
      });
    },
    callExtraDispatchersOnSuccess: ({ dispatch, getState }) => {
      const { orders: { fetchedData: { data = [] } = {} } = {} } = getState();

      dispatch(setInitialFilteredData("ORDERS", data));
      dispatch(paginateData("ORDERS"));
    }
  };
};

const fetchOrder = _id => {
  return {
    types: [FETCH_ORDERS.REQUEST, FETCH_ORDERS.SUCCESS, FETCH_ORDERS.FAILURE],
    callAPI: async () => {
      return await cleaningServiceAPI.get(`/orders/${_id}`);
    }
  };
};

const denyOrder = ({ _id, values }) => {
  return {
    types: [DENY_ORDER.REQUEST, DENY_ORDER.SUCCESS, DENY_ORDER.FAILURE],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.patch(`/orders/${_id}/deny`, values, {
        headers: { Authorization: token }
      });
    },
    callExtraDispatchersOnSuccess: ({ dispatch }) => {
      const alertMessage = "The order's been successfully updated";
      const alertType = "success";
      dispatch(addAlert(alertMessage, alertType));

      dispatch(fetchOrders());

      history.push("/orders/future");
    }
  };
};

const approveOrder = id => {
  return {
    types: [
      APPROVE_ORDER.REQUEST,
      APPROVE_ORDER.SUCCESS,
      APPROVE_ORDER.FAILURE
    ],
    callAPI: async () => {
      const { token } = getTokens();
      return await cleaningServiceAPI.patch(
        `/orders/${id}/approve`,
        {},
        { headers: { Authorization: token } }
      );
    },
    callExtraDispatchersOnSuccess: ({ dispatch }) => {
      const alertMessage = "The order's been successfully updated";
      const alertType = "success";
      dispatch(addAlert(alertMessage, alertType));
      dispatch(fetchOrders());

      history.push("/orders/future");
    }
  };
};

const completeOrder = id => {
  return {
    types: [
      COMPLETE_ORDER.REQUEST,
      COMPLETE_ORDER.SUCCESS,
      COMPLETE_ORDER.FAILURE
    ],
    callAPI: async () => {
      const token = getJWT();
      return await cleaningServiceAPI.patch(
        `/orders/${id}/complete`,
        {},
        { headers: { Authorization: token } }
      );
    },
    callExtraDispatchersOnSuccess: ({ dispatch }) => {
      const alertMessage = "The order's successfully completed";
      const alertType = "info";
      dispatch(addAlert(alertMessage, alertType));
      dispatch(fetchOrders());
    }
  };
};

const registerOrder = values => {
  return dispatch => {
    dispatch({ type: REGISTER_ORDER, payload: values });

    if (history.location.pathname === "/companies") {
      return history.push("/booking/step-zero");
    }

    if (history.location.pathname === "/booking/step-zero") {
      return history.push("/booking/step-one");
    }

    if (history.location.pathname === "/booking/step-one") {
      return history.push("/booking/step-two");
    }

    if (history.location.pathname === "/booking/step-two") {
      return history.push("/booking/step-three");
    }
  };
};

export {
  createOrder,
  fetchOrders,
  fetchOrder,
  denyOrder,
  approveOrder,
  registerOrder,
  completeOrder
};
