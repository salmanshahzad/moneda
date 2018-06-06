import React from "react";
import { Modal, Header } from "semantic-ui-react";

interface SignInDialogProps {
    open: boolean;
    close: Function;
}

export default class SignInDialog extends React.Component<SignInDialogProps, {}> {
    close = () => {
        this.props.close();
    };

    render(): React.ReactNode {
        return (
            <Modal open={this.props.open} onClose={this.close}>
                <Header>Sign In</Header>
            </Modal>
        );
    }
}
