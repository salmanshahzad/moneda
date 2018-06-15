import React from "react";
import auth from "../../auth";
import { Redirect } from "react-router-dom";

interface SignOutState {
    done: boolean;
}

export default class SignOut extends React.Component<{}, SignOutState> {
    state: SignOutState = {
        done: false
    };

    async componentDidMount() {
        await auth.signOut();
        this.setState({done: true});
    }

    render(): React.ReactNode {
        return this.state.done ? <Redirect to="/" /> : <br />
    }
}
