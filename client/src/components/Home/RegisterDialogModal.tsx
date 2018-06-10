import React from "react";
import { Modal, Header } from "semantic-ui-react";
import RegisterDialog from "./RegisterDialog";

interface RegisterDialogModalProps {
    open: boolean;
    onClose: Function;
    onRegister: Function;
}

export default class RegisterDialogModal extends React.Component<RegisterDialogModalProps, {}> {
    close = () => {
        this.props.onClose();
    };

    render(): React.ReactNode {
        // RegisterDialog is a separate component inside the Modal because Modals cannot be tested; see https://github.com/Semantic-Org/Semantic-UI-React/issues/1518
        return (
            <Modal size="mini" open={this.props.open} onClose={this.close}>
                <Header>Register</Header>
                <RegisterDialog onRegister={this.props.onRegister} />
            </Modal>
        );
    }
}
