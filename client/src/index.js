import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";

import App from "./App";

// reducers
import reducers from "store/reducers";

// styles
import "normalize.css";
import "./styles.css";

// utils
import { loadState, saveState, customMiddleware, history } from "utils";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(routerMiddleware(history), customMiddleware))
);

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    registeredOrder: store.getState().registeredOrder,
    selectedCompany: store.getState().selectedCompany
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
