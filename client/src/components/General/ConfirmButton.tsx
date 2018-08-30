import React from "react";
import { Button, Modal } from "semantic-ui-react";

interface ConfirmButtonProps {
    text?: string;
    icon?: string;
    positive?: boolean;
    negative?: boolean;
    header: string;
    content: string;
    cancel?: string;
    onCancel?: () => void;
    confirm?: string;
    onConfirm?: () => void;
}

interface ConfirmButtonState {
    dialogOpen: boolean;
}

export default class ConfirmButton extends React.Component<ConfirmButtonProps, ConfirmButtonState> {
    state: ConfirmButtonState = {
        dialogOpen: false
    };

    toggleDialog = () => {
        this.setState({ dialogOpen: !this.state.dialogOpen });
    };

    negativeClick = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        this.toggleDialog();
    };

    positiveClick = () => {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
        this.toggleDialog();
    };

    render() {
        return (
            <Modal
                trigger={<Button positive={this.props.positive} negative={this.props.negative} content={this.props.text} icon={this.props.icon} onClick={this.toggleDialog} />} size="mini" open={this.state.dialogOpen} onClose={this.toggleDialog}
            >
                <Modal.Header>{this.props.header}</Modal.Header>
                <Modal.Content>{this.props.content}</Modal.Content>
                <Modal.Actions>
                    <Button negative content={this.props.cancel || "Cancel"} onClick={this.negativeClick} />
                    <Button positive content={this.props.confirm || "OK"} onClick={this.positiveClick} />
                </Modal.Actions>
            </Modal>
        );
    }
}
