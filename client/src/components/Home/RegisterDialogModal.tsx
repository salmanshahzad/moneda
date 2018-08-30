import React from "react";
import { Modal, Header } from "semantic-ui-react";
import RegisterDialog from "./RegisterDialog";

interface RegisterDialogModalProps {
    open: boolean;
    onClose: () => void;
    onRegister: (username: string, password: string, confirmPassword: string) => Promise<{}>;
}

export default (props: RegisterDialogModalProps): JSX.Element => {
    const close = () => {
        props.onClose();
    };

    // RegisterDialog is a separate component inside the Modal because Modals cannot be tested; see https://github.com/Semantic-Org/Semantic-UI-React/issues/1518
    return (
        <Modal size="mini" open={props.open} onClose={close}>
            <Header>Register</Header>
            <RegisterDialog onRegister={props.onRegister} />
        </Modal>
    );
}
