import React from "react";
import { User } from "../../../../user";
import axios from "axios";
import { Grid, Segment, Header } from "semantic-ui-react";
import UserInformation from "./UserInformation";
import IncomeAccounts from "./IncomeAccounts";

interface SettingsProps {
    user: User;
    onUpdate: () => void;
}

export default (props: SettingsProps) => {
    const onUpdateUserInformation = (username: string, password: string, confirmPassword: string, currentPassword: string): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/update_user", {username, password, confirmPassword, currentPassword});
                resolve();
            } catch (e) {
                reject(e.response.data);
            }
        });
    };

    const onUpdateIncomeAccount = (id: string, name: string, colour: string): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/update_income_account", {id, name, colour});
                resolve();
            } catch (e) {
                reject(e.response.data);
            }
        });
    };
    return (
        <Grid columns={16} style={{padding: "1rem"}}>
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Header as="h1">Settings</Header>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Segment>
                    <Header>User Information</Header>
                    <UserInformation user={props.user} onUpdateUserInformation={onUpdateUserInformation} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Segment>
                    <Header>Income Accounts</Header>
                    <IncomeAccounts accounts={props.user.income} onUpdateIncomeAccount={onUpdateIncomeAccount} />
                </Segment>
            </Grid.Column>
        </Grid>
    );
};
