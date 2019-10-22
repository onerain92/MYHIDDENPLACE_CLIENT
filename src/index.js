import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Router, Route } from "react-router";
import { createBrowserHistory } from "history";
import App from "./containers/App";
import myHiddenPlace from "./reducers";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

const history = createBrowserHistory();
const store = createStore(myHiddenPlace);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
