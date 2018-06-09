import React from "react";
import axios from "axios";
import { Form, Message, Button } from "semantic-ui-react";

interface SignInDialogState {
    username: string;
    password: string;
    errors: string[];
}

export default class SignInDialog extends React.Component<{}, SignInDialogState> {
    state: SignInDialogState = {
        username: "",
        password: "",
        errors: []
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
            this.setState({errors: []});
        }).catch(e => {
            this.setState({errors: e.response.data});
        })
    };

    render(): React.ReactNode {
        return (
            <Form onSubmit={this.submit} error={this.state.errors.length > 0} style={{padding: "1rem"}}>
                <Message error>
                    <Message.Header>Error</Message.Header>
                    <Message.List>
                        {
                            this.state.errors.map((error, i) => (
                                <Message.Item key={i}>{error}</Message.Item>
                            ))
                        }
                    </Message.List>
                </Message>
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
