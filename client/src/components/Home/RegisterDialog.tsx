import React from "react";
import axios from "axios";
import { Form, Button } from "semantic-ui-react";

interface RegisterDialogState {
    username: string;
    password: string;
    confirmPassword: string;
}

export default class RegisterDialog extends React.Component<{}, RegisterDialogState> {
    state: RegisterDialogState = {
        username: "",
        password: "",
        confirmPassword: ""
    };

    changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({username: e.target.value});
    };

    changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: e.target.value});
    };

    changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({confirmPassword: e.target.value});
    };

    submit = () => {
        axios.post("/api/register", {
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
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
                    <label>Username (minimum 5 characters)</label>
                    <input type="text" value={this.state.username} onChange={this.changeUsername} autoFocus />
                </Form.Field>
                <Form.Field>
                    <label>Password (minimum 8 characters)</label>
                    <input type="password" value={this.state.password} onChange={this.changePassword} />
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <input type="password" value={this.state.confirmPassword} onChange={this.changeConfirmPassword} />
                </Form.Field>
                <Button primary type="submit">Register</Button>
            </Form>
        );
    }
}