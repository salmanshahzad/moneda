import React from "react";
import axios from "axios";
import { Grid, Input, InputOnChangeData, Button } from "semantic-ui-react";

interface SignInDialogState {
    username: string;
    password: string;
}

export default class SignInDialog extends React.Component<{}, SignInDialogState> {
    state: SignInDialogState = {
        username: "",
        password: ""
    };

    changeUsername = (e: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({username: data.value});
    };

    changePassword = (e: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({password: data.value});
    };

    submit = () => {
        axios.post("/api/sign_in", {
            username: this.state.username,
            password: this.state.password
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
                    <Input type="text" placeholder="Username" value={this.state.username} onChange={this.changeUsername} style={{width: "90%", marginTop: "0.5rem"}} />
                </Grid.Row>
                <Grid.Row>
                    <Input type="password" placeholder="Password" value={this.state.password} onChange={this.changePassword} style={{width: "90%"}} />
                </Grid.Row>
                <Grid.Row>
                    <Button primary onClick={this.submit} style={{marginBottom: "0.5rem"}}>Sign In</Button>
                </Grid.Row>
            </Grid>
        );
    }
}
