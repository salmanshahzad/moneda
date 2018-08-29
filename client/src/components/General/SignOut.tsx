import React from "react";
import { Redirect } from "react-router-dom";

export default class SignOut extends React.Component<{}, {}> {
    componentDidMount() {
        localStorage.removeItem("token");
    }

    render(): React.ReactNode {
        return <Redirect to="/" />;
    }
}
