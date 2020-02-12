import React from "react";
import App from "../App";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "../views/Login";
import Signup from "../views/Signup";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default Router;
