import React from "react";
import { Modal, Header } from "semantic-ui-react";

interface RegisterDialogProps {
    open: boolean;
    close: Function;
}

export default class RegisterDialog extends React.Component<RegisterDialogProps, {}> {
    close = () => {
        this.props.close();
    };

    render(): React.ReactNode {
        return (
            <Modal open={this.props.open} onClose={this.close}>
                <Header>Register</Header>
            </Modal>
        );
    }
}