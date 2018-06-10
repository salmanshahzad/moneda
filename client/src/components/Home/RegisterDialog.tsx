import React from "react";
import { Form, Message, Button } from "semantic-ui-react";

interface RegisterDialogProps {
    onRegister: (username: string, password: string, confirmPassword: string) => Promise<{}>;
}

interface RegisterDialogState {
    username: string;
    password: string;
    confirmPassword: string;
    errors: string[];
}

export default class RegisterDialog extends React.Component<RegisterDialogProps, RegisterDialogState> {
    state: RegisterDialogState = {
        username: "",
        password: "",
        confirmPassword: "",
        errors: []
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
        this.props.onRegister(this.state.username, this.state.password, this.state.confirmPassword).catch(errors => this.setState({errors}));
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