import React from "react";
import axios from "axios";
import { Grid, Input, InputOnChangeData, Button } from "semantic-ui-react";

interface RegisterDialogState {
    username: string;
    password: string;
    confirmPassword: string;
}

export default class RegisterDialog extends React.Component<{}, RegisterDialogState> {
    state: RegisterDialogState = {
        username: "",
        password: "",
        confirmPassword: ""
    };

    changeUsername = (e: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({username: data.value});
    };

    changePassword = (e: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({password: data.value});
    };

    changeConfirmPassword = (e: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({confirmPassword: data.value});
    };

    submit = () => {
        axios.post("/api/register", {
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }).then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e.response);
        })
    };

    render(): React.ReactNode {
        // inputs have width 90% because fluid prop doesn't seem to work
        return (
            <Grid columns={1} centered>
                <Grid.Row>
                    <Input type="text" placeholder="Username (minimum 5 characters)" value={this.state.username} onChange={this.changeUsername} style={{width: "90%", marginTop: "0.5rem"}} />
                </Grid.Row>
                <Grid.Row>
                    <Input type="password" placeholder="Password (minimum 8 characters)" value={this.state.password} onChange={this.changePassword} style={{width: "90%"}} />
                </Grid.Row>
                <Grid.Row>
                    <Input type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.changeConfirmPassword} style={{width: "90%"}} />
                </Grid.Row>
                <Grid.Row>
                    <Button primary onClick={this.submit} style={{marginBottom: "0.5rem"}}>Register</Button>
                </Grid.Row>
            </Grid>
        );
    }
}