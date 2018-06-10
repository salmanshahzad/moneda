import React from "react";
import { Modal, Header } from "semantic-ui-react";
import SignInDialog from "./SignInDialog";

interface SignInDialogModalProps {
    open: boolean;
    onClose: () => void;
    onSignIn: (username: string, password: string) => Promise<{}>;
}

export default class SignInDialogModal extends React.Component<SignInDialogModalProps, {}> {
    close = () => {
        this.props.onClose();
    };

    render(): React.ReactNode {
        // SignInDialog is a separate component inside the Modal because Modals cannot be tested; see https://github.com/Semantic-Org/Semantic-UI-React/issues/1518
        return (
            <Modal size="mini" open={this.props.open} onClose={this.close}>
                <Header>Sign In</Header>
                <SignInDialog onSignIn={this.props.onSignIn} />
            </Modal>
        );
    }
}
