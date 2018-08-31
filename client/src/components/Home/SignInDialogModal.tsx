import React from "react";
import { Modal, Header } from "semantic-ui-react";
import SignInDialog from "./SignInDialog";

interface SignInDialogModalProps {
    open: boolean;
    onClose: () => void;
    onSignIn: (username: string, password: string) => Promise<{}>;
}

// SignInDialog is a separate component inside the Modal because Modals cannot be tested; see https://github.com/Semantic-Org/Semantic-UI-React/issues/1518
export default (props: SignInDialogModalProps): JSX.Element => (
    <Modal size="mini" open={props.open} onClose={props.onClose}>
        <Header>Sign In</Header>
        <SignInDialog onSignIn={props.onSignIn} />
    </Modal>
);
