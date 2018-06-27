import React from "react";
import { Income, Expense } from "../../../../user";
import { ColorResult, SketchPicker } from "react-color";
import { InputOnChangeData, Grid, Input, Button, Icon, Message, Modal } from "semantic-ui-react";

interface AccountProps {
    type: "income" | "expenses";
    account: Income | Expense;
    onUpdateAccount: (type: "income" | "expenses", id: string, name: string, colour: string, budget?: number) => Promise<{}>;
    onDeleteAccount: (type: "income" | "expenses", id: string) => Promise<{}>;
}

interface AccountState {
    colour: string;
    name: string;
    budget: string;
    editing: boolean;
    error: string;
    deleteDialogOpen: boolean;
}

export default class Account extends React.Component<AccountProps, AccountState> {
    state: AccountState = {
        colour: this.props.account.colour,
        name: this.props.account.name,
        budget: this.props.type === "expenses" ? (this.props.account as Expense).budget.toFixed(2) : "0",
        editing: false,
        error: "",
        deleteDialogOpen: false
    };

    changeColour = (colour: ColorResult) => {
        this.setState({colour: colour.hex});
    };

    changeName = (e: React.SyntheticEvent<HTMLElement>, data: InputOnChangeData) => {
        this.setState({name: data.value});
    };

    changeBudget = (e: React.SyntheticEvent<HTMLElement>, data: InputOnChangeData) => {
        this.setState({budget: data.value});
    };

    makeBudgetTwoDecimalPlaces = () => {
        this.setState({budget: parseFloat(this.state.budget).toFixed(2)});
    };

    save = async () => {
        try {
            await this.props.onUpdateAccount(this.props.type, this.props.account.id, this.state.name, this.state.colour, parseFloat(this.state.budget));
            this.setState({editing: false, error: ""});
        } catch (errors) {
            this.setState({error: errors[0]});
        }
    };

    edit = () => {
        this.setState({editing: true});
    };

    toggleDeleteDialog = () => {
        this.setState({deleteDialogOpen: !this.state.deleteDialogOpen});
    };

    delete = () => {
        this.setState({deleteDialogOpen: false});
        this.props.onDeleteAccount(this.props.type, this.props.account.id);
    };

    render(): React.ReactNode {
        if (this.state.editing) {
            return (
                <Grid columns={16}>
                    <Grid.Column mobile={1} tablet={1} computer={1}>
                        <Button primary icon="save" onClick={this.save} />
                    </Grid.Column>
                    <Grid.Column mobile={2} tablet={2} computer={2}>
                        <SketchPicker color={this.state.colour} onChangeComplete={this.changeColour} />
                    </Grid.Column>
                    <Grid.Column mobile={4} tablet={4} computer={4}>
                        <Input type="text" value={this.state.name} onChange={this.changeName} fluid />
                    </Grid.Column>
                    {
                        this.props.type === "expenses" &&
                        <Grid.Column mobile={4} tablet={4} computer={4}>
                            <Input type="number" min="0" step="0.01" label="$" value={this.state.budget} onChange={this.changeBudget} onBlur={this.makeBudgetTwoDecimalPlaces} fluid />
                        </Grid.Column>
                    }
                    <Grid.Column mobile={5} tablet={5} computer={5}>
                        <Message error hidden={this.state.error.length === 0}>{this.state.error}</Message>
                    </Grid.Column>
                </Grid>
            );
        } else {
            return (
                <Grid columns={16}>
                    <Grid.Column mobile={1} tablet={1} computer={1}>
                        <Button primary icon="pencil" onClick={this.edit} />
                    </Grid.Column>
                    <Grid.Column mobile={1} tablet={1} computer={1}>
                        <Button negative icon="delete" onClick={this.toggleDeleteDialog} />
                    </Grid.Column>
                    <Grid.Column mobile={1} tablet={1} computer={1}>
                        <Icon name="circle" circular style={{backgroundColor: this.state.colour, color: this.state.colour}} />
                    </Grid.Column>
                    <Grid.Column mobile={7} tablet={7} computer={7}>
                        <span>{this.state.name}</span>
                    </Grid.Column>
                    {
                        this.props.type === "expenses" &&
                        <Grid.Column mobile={6} tablet={6} computer={6}>
                            <span>Budget: ${this.state.budget}</span>
                        </Grid.Column>
                    }
                    <Modal size="mini" open={this.state.deleteDialogOpen} onClose={this.toggleDeleteDialog}>
                        <Modal.Header>Delete Account</Modal.Header>
                        <Modal.Content>
                            Are you sure you want to delete this account? This action cannot be reversed and all transaction history related to this account will be lost.
                        </Modal.Content>
                        <Modal.Actions>
                            <Button positive content="No" onClick={this.toggleDeleteDialog} />
                            <Button negative content="Yes" onClick={this.delete} />
                        </Modal.Actions>
                    </Modal>
                </Grid>
            );
        }
    }
}
