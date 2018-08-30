import React from "react";
import { Category, Expense } from "../../user";
import { ColorResult, SketchPicker } from "react-color";
import { InputOnChangeData, Grid, Input, Button, Icon, Message, Modal } from "semantic-ui-react";
import ConfirmButton from "../General/ConfirmButton";

interface EditCategoryProps {
    category: Category;
    onUpdateCategory: (id: string, name: string, type: string, colour: string, budget?: number) => Promise<{}>;
    onDeleteCategory: (id: string) => Promise<{}>;
}

interface EditCategoryState {
    colour: string;
    name: string;
    budget: string;
    editing: boolean;
    error: string;
}

export default class EditCategory extends React.Component<EditCategoryProps, EditCategoryState> {
    defaultState: EditCategoryState = {
        colour: this.props.category.colour,
        name: this.props.category.name,
        budget: this.props.category.type === "expense" ? (this.props.category as Expense).budget.toFixed(2) : "0",
        editing: false,
        error: ""
    };

    state = this.defaultState;

    changeColour = (colour: ColorResult) => {
        this.setState({ colour: colour.hex });
    };

    changeName = (e: React.SyntheticEvent<HTMLElement>, data: InputOnChangeData) => {
        this.setState({ name: data.value });
    };

    changeBudget = (e: React.SyntheticEvent<HTMLElement>, data: InputOnChangeData) => {
        this.setState({ budget: data.value });
    };

    makeBudgetTwoDecimalPlaces = () => {
        this.setState({ budget: parseFloat(this.state.budget).toFixed(2) });
    };

    save = async () => {
        try {
            await this.props.onUpdateCategory(this.props.category.id, this.state.name, this.props.category.type, this.state.colour, parseFloat(this.state.budget));
            this.setState({ editing: false, error: "" });
        } catch (errors) {
            this.setState({ error: errors[0] });
        }
    };

    cancelEdit = () => {
        this.setState(this.defaultState);
    };

    edit = () => {
        this.setState({ editing: !this.state.editing });
    };

    delete = () => {
        this.props.onDeleteCategory(this.props.category.id);
    };

    render(): React.ReactNode {
        if (this.state.editing) {
            return (
                <Grid columns={16}>
                    <Grid.Column mobile={3} tablet={2} computer={2}>
                        <Button.Group>
                            <Button primary icon="save" onClick={this.save} />
                            <Button negative icon="undo" onClick={this.cancelEdit} />
                        </Button.Group>
                    </Grid.Column>
                    <Grid.Column mobile={9} tablet={4} computer={4}>
                        <SketchPicker color={this.state.colour} onChangeComplete={this.changeColour} />
                    </Grid.Column>
                    <Grid.Column mobile={6} tablet={5} computer={5}>
                        <Input type="text" value={this.state.name} onChange={this.changeName} fluid />
                    </Grid.Column>
                    {
                        this.props.category.type === "expense" &&
                        <Grid.Column mobile={6} tablet={5} computer={5}>
                            <Input type="number" min="0" step="0.01" label="$" value={this.state.budget} onChange={this.changeBudget} onBlur={this.makeBudgetTwoDecimalPlaces} fluid />
                        </Grid.Column>
                    }
                    <Grid.Column mobile={12} tablet={12} computer={12}>
                        <Message error hidden={this.state.error.length === 0}>{this.state.error}</Message>
                    </Grid.Column>
                </Grid>
            );
        } else {
            return (
                <Grid columns={16}>
                    <Grid.Column mobile={6} tablet={2} computer={2}>
                        <Button.Group>
                            <Button primary icon="pencil" onClick={this.edit} />
                            <ConfirmButton icon="delete" negative header="Delete Category" content="Are you sure you want to delete this category? This action cannot be reversed and all transaction history related to this category will be lost." confirm="Delete" onConfirm={this.delete} />
                        </Button.Group>
                    </Grid.Column>
                    <Grid.Column mobile={6} tablet={1} computer={1}>
                        <Icon name="circle" circular style={{ backgroundColor: this.state.colour, color: this.state.colour }} />
                    </Grid.Column>
                    <Grid.Column mobile={6} tablet={7} computer={7}>
                        <span>{this.state.name}</span>
                    </Grid.Column>
                    {
                        this.props.category.type === "expense" &&
                        <Grid.Column mobile={6} tablet={6} computer={6}>
                            <span>Budget: ${this.state.budget}</span>
                        </Grid.Column>
                    }
                </Grid>
            );
        }
    }
}
