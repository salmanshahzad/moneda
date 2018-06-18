import React from "react";
import auth from "./auth";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/General/Layout";
import SignOut from "./components/General/SignOut";
import "semantic-ui-css/semantic.min.css";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route render={props => auth.isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />} {...rest} />
);

render(
    <BrowserRouter basename={process.env.BASE}>
        <Switch>
            <Route path="/" render={props => auth.isAuthenticated() ? <Redirect to="/dashboard" /> : <Home {...props} />} exact />
            <PrivateRoute path="/dashboard" component={Layout} exact />
            <PrivateRoute path="/budget" component={Layout} exact />
            <PrivateRoute path="/income/:account" component={Layout} exact />
            <PrivateRoute path="/expense/:account" component={Layout} exact />
            <Route path="/sign_out" component={SignOut} exact />
        </Switch>
    </BrowserRouter>
, document.getElementById("app"));
