import React from "react";
import { Button, Modal } from "semantic-ui-react";

interface DeleteDialogProps {
    onDeleteUser: () => Promise<{}>;
}

interface DeleteUserState {
    dialogOpen: boolean;
}

export default class DeleteUser extends React.Component<DeleteDialogProps, DeleteUserState> {
    state: DeleteUserState = {
        dialogOpen: false
    };

    toggleDialog = () => {
        this.setState({dialogOpen: !this.state.dialogOpen});
    };

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Button negative onClick={this.toggleDialog}>Delete User Account</Button>
                <Modal size="mini" open={this.state.dialogOpen} onClose={this.toggleDialog}>
                    <Modal.Header>Delete User Account</Modal.Header>
                    <Modal.Content>
                        Are you sure you want to delete your user account? This action cannot be reversed and everything will be erased.
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive content="No" onClick={this.toggleDialog} />
                        <Button negative content="Yes" onClick={this.props.onDeleteUser} />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}
