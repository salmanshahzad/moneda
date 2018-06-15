import React from "react";
import { Form, Message, Button } from "semantic-ui-react";

interface SignInDialogProps {
    onSignIn: (username: string, password: string) => Promise<{}>;
}

interface SignInDialogState {
    username: string;
    password: string;
    errors: string[];
}

export default class SignInDialog extends React.Component<SignInDialogProps, SignInDialogState> {
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

    submit = async () => {
        try {
            await this.props.onSignIn(this.state.username, this.state.password);
        } catch (errors) {
            this.setState({errors});
        }
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
