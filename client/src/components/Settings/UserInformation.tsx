import React from "react";
import { User } from "../../../../user";
import { Form, Message, Button } from "semantic-ui-react";

interface UserInformationProps {
    user: User;
    onUpdateUserInformation: (username: string, password: string, confirmPassword: string, currentPassword: string) => Promise<{}>;
}

interface UserInformationState {
    username: string;
    password: string;
    confirmPassword: string;
    currentPassword: string;
    errors: string[];
}

export default class UserInformation extends React.Component<UserInformationProps, UserInformationState> {
    state: UserInformationState = {
        username: this.props.user.username,
        password: "",
        confirmPassword: "",
        currentPassword: "",
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

    changeCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({currentPassword: e.target.value});
    };

    updateUserInformation = async () => {
        try {
            await this.props.onUpdateUserInformation(this.state.username, this.state.password, this.state.confirmPassword, this.state.currentPassword);
            this.setState({
                password: "",
                confirmPassword: "",
                currentPassword: "",
                errors: []
            });
        } catch (errors) {
            this.setState({errors});
        }
    };

    render(): React.ReactNode {
        return (
            <Form onSubmit={this.updateUserInformation} error={this.state.errors.length > 0}>
                <Message error>
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
                    <input type="text" value={this.state.username} onChange={this.changeUsername} />
                </Form.Field>
                <Form.Field>
                    <label>Password (minimum 8 characters)</label>
                    <input type="password" value={this.state.password} onChange={this.changePassword} />
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <input type="password" value={this.state.confirmPassword} onChange={this.changeConfirmPassword} />
                </Form.Field>
                <Form.Field>
                    <label>Current Password</label>
                    <input type="password" value={this.state.currentPassword} onChange={this.changeCurrentPassword} />
                </Form.Field>
                <Button primary type="submit">Submit</Button>
            </Form>
        );
    }
}