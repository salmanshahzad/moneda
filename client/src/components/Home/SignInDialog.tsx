import React from "react";
import axios from "axios";
import { Form, Button } from "semantic-ui-react";

interface SignInDialogState {
    username: string;
    password: string;
}

export default class SignInDialog extends React.Component<{}, SignInDialogState> {
    state: SignInDialogState = {
        username: "",
        password: ""
    };

    changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({username: e.target.value});
    };

    changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: e.target.value});
    };

    submit = () => {
        axios.post("/api/sign_in", {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e.response);
        })
    };

    render(): React.ReactNode {
        return (
            <Form onSubmit={this.submit} style={{padding: "1rem"}}>
                <Form.Field>
                    <label>Username</label>
                    <input type="text" value={this.state.username} onChange={this.changeUsername} autoFocus />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={this.changePassword} />
                </Form.Field>
                <Button primary type="submit">Sign In</Button>
            </Form>
        );
    }
}
