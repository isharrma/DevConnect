import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./App.css";
import Header from "./Components/Layout/Header";
import Landing from "./Pages/Landing";
import PageNotFound from "./Pages/PageNotFound";
import SignIn from "./Pages/auth/SignIn";
import SignUp from "./Pages/auth/SignUp";
import Alert from "./Components/Layout/Alert";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <Header />
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
