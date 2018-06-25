import React from "react";
import { Income } from "../../../../user";
import { ColorResult, SketchPicker } from "react-color";
import { InputOnChangeData, Grid, Input, Button, Icon, Message } from "semantic-ui-react";

interface IncomeAccountItemProps {
    account: Income;
    onUpdateIncomeAccount: (id: string, name: string, colour: string) => Promise<{}>;
}

interface IncomeAccountItemState {
    colour: string;
    name: string;
    editing: boolean;
    error: string;
}

export default class IncomeAccountItem extends React.Component<IncomeAccountItemProps, IncomeAccountItemState> {
    state: IncomeAccountItemState = {
        colour: this.props.account.colour,
        name: this.props.account.name,
        editing: false,
        error: ""
    };

    changeColour = (colour: ColorResult) => {
        this.setState({colour: colour.hex});
    };

    changeName = (e: React.SyntheticEvent<HTMLElement>, data: InputOnChangeData) => {
        this.setState({name: data.value});
    };

    save = async () => {
        try {
            await this.props.onUpdateIncomeAccount(this.props.account.id, this.state.name, this.state.colour);
            this.setState({editing: false, error: ""});
        } catch (errors) {
            this.setState({error: errors[0]});
        }
    };

    edit = () => {
        this.setState({editing: true});
    };

    render(): React.ReactNode {
        if (this.state.editing) {
            return (
                <Grid columns={16}>
                    <Grid.Column mobile={1} tablet={1} computer={1}>
                        <Button onClick={this.save}>
                            <Button.Content><Icon name="save" /></Button.Content>
                        </Button>
                    </Grid.Column>
                    <Grid.Column mobile={2} tablet={2} computer={2}>
                        <SketchPicker color={this.state.colour} onChangeComplete={this.changeColour} />
                    </Grid.Column>
                    <Grid.Column mobile={6} tablet={6} computer={6}>
                        <Input value={this.state.name} onChange={this.changeName} fluid />
                    </Grid.Column>
                    <Grid.Column mobile={7} tablet={7} computer={7}>
                        <Message error hidden={this.state.error.length === 0}>{this.state.error}</Message>
                    </Grid.Column>
                </Grid>
            );
        } else {
            return (
                <Grid columns={16}>
                    <Grid.Column mobile={1} tablet={1} computer={1}>
                        <Button onClick={this.edit}>
                            <Button.Content><Icon name="pencil" /></Button.Content>
                        </Button>
                    </Grid.Column>
                    <Grid.Column mobile={1} tablet={1} computer={1}>
                        <Icon name="circle" circular style={{backgroundColor: this.state.colour, color: this.state.colour}} />
                    </Grid.Column>
                    <Grid.Column mobile={14} tablet={14} computer={14}>
                        <span>{this.state.name}</span>
                    </Grid.Column>
                </Grid>
            );
        }
    }
}
