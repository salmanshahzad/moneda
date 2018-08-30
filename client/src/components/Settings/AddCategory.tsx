import React from "react";
import { ColorResult, SketchPicker } from "react-color";
import { InputOnChangeData, Grid, Input, Button, Icon, Message, Modal } from "semantic-ui-react";

interface AddCategoryProps {
    type: string;
    onAddCategory: (name: string, type: string, colour: string, budget?: number) => Promise<{}>;
    onCancel: () => void;
}

interface AddCategoryState {
    colour: string;
    name: string;
    budget: string;
    error: string;
}

export default class AddCategory extends React.Component<AddCategoryProps, AddCategoryState> {
    state: AddCategoryState = {
        colour: "#FF0000",
        name: "",
        budget: "0",
        error: ""
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
            await this.props.onAddCategory(this.state.name, this.props.type, this.state.colour, parseFloat(this.state.budget));
            this.setState({error: ""});
        } catch (errors) {
            this.setState({error: errors[0]});
        }
    };

    cancel = () => this.props.onCancel();

    render(): React.ReactNode {
        return (
            <Grid columns={16}>
                <Grid.Column mobile={3} tablet={2} computer={2}>
                    <Button.Group>
                        <Button primary icon="save" onClick={this.save} />
                        <Button negative icon="undo" onClick={this.cancel} />
                    </Button.Group>
                </Grid.Column>
                <Grid.Column mobile={9} tablet={4} computer={4}>
                    <SketchPicker color={this.state.colour} onChangeComplete={this.changeColour} />
                </Grid.Column>
                <Grid.Column mobile={6} tablet={5} computer={5}>
                    <Input type="text" value={this.state.name} onChange={this.changeName} fluid />
                </Grid.Column>
                {
                    this.props.type === "expense" &&
                    <Grid.Column mobile={6} tablet={5} computer={5}>
                        <Input type="number" min="0" step="0.01" label="$" value={this.state.budget} onChange={this.changeBudget} onBlur={this.makeBudgetTwoDecimalPlaces} fluid />
                    </Grid.Column>
                }
                <Grid.Column mobile={12} tablet={12} computer={12}>
                    <Message error hidden={this.state.error.length === 0}>{this.state.error}</Message>
                </Grid.Column>
            </Grid>
        );
    }
}
