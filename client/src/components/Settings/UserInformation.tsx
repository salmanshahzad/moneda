import React from "react";
import { User } from "../../user";
import { Form, Message, Button } from "semantic-ui-react";

interface UserInformationProps {
    user: User;
    onUpdateUserInformation: (username: string, newPassword: string, confirmNewPassword: string, currentPassword: string) => Promise<{}>;
}

interface UserInformationState {
    username: string;
    newPassword: string;
    confirmNewPassword: string;
    currentPassword: string;
    errors: string[];
    successMessage: string;
}

export default class UserInformation extends React.Component<UserInformationProps, UserInformationState> {
    state: UserInformationState = {
        username: this.props.user.username,
        newPassword: "",
        confirmNewPassword: "",
        currentPassword: "",
        errors: [],
        successMessage: ""
    };

    changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ username: e.target.value });
    };

    changeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newPassword: e.target.value });
    };

    changeConfirmNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ confirmNewPassword: e.target.value });
    };

    changeCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ currentPassword: e.target.value });
    };

    updateUserInformation = async () => {
        try {
            await this.props.onUpdateUserInformation(this.state.username, this.state.newPassword, this.state.confirmNewPassword, this.state.currentPassword);
            this.setState({
                newPassword: "",
                confirmNewPassword: "",
                currentPassword: "",
                errors: [],
                successMessage: "Updated user information."
            });
        } catch (errors) {
            this.setState({ errors });
        }
    };

    render(): React.ReactNode {
        return (
            <Form onSubmit={this.updateUserInformation} error={this.state.errors.length > 0} success={this.state.successMessage.length > 0}>
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
                <Message success>
                    <Message.Header>Success</Message.Header>
                    <Message.Item>{this.state.successMessage}</Message.Item>
                </Message>
                <Form.Field>
                    <label>Username (no spaces)</label>
                    <input type="text" value={this.state.username} onChange={this.changeUsername} />
                </Form.Field>
                <Form.Field>
                    <label>New Password (minimum 8 characters)</label>
                    <input type="password" value={this.state.newPassword} onChange={this.changeNewPassword} />
                </Form.Field>
                <Form.Field>
                    <label>Confirm New Password</label>
                    <input type="password" value={this.state.confirmNewPassword} onChange={this.changeConfirmNewPassword} />
                </Form.Field>
                <Form.Field>
                    <label>Current Password</label>
                    <input type="password" value={this.state.currentPassword} onChange={this.changeCurrentPassword} />
                </Form.Field>
                <Button primary type="submit">Update</Button>
            </Form>
        );
    }
}
