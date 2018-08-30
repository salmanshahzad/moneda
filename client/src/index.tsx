import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/General/Layout";
import SignOut from "./components/General/SignOut";
import "semantic-ui-css/semantic.min.css";

const isAuthenticated = (): boolean => localStorage.getItem("token") !== null;

const PrivateRoute = ({ component: Component, ...rest }): JSX.Element => (
    <Route render={props => isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />} {...rest} />
);

render(
    <BrowserRouter basename={process.env.BASE}>
        <Switch>
            <Route path="/" render={props => isAuthenticated() ? <Redirect to="/dashboard" /> : <Home {...props} />} exact />
            <PrivateRoute path="/dashboard" component={Layout} exact />
            <PrivateRoute path="/budget" component={Layout} exact />
            <PrivateRoute path="/transactions" component={Layout} exact />
            <PrivateRoute path="/income/:name" component={Layout} exact />
            <PrivateRoute path="/expense/:name" component={Layout} exact />
            <PrivateRoute path="/settings" component={Layout} exact />
            <Route path="/sign_out" component={SignOut} exact />
            <Route render={() => <Redirect to="/" />} />
        </Switch>
    </BrowserRouter>
    , document.getElementById("app"));
