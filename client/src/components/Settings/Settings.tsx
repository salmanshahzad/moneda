import React from "react";
import { User } from "../../../../user";
import axios from "axios";
import { Grid, Segment, Header } from "semantic-ui-react";
import UserInformation from "./UserInformation";
import Account from "./Account";

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
                props.onUpdate();
            } catch (e) {
                reject(e.response.data);
            }
        });
    };

    const onUpdateAccount = (type: "income" | "expenses", id: string, name: string, colour: string, budget?: number): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/update_account", {type, id, name, colour, budget});
                resolve();
                props.onUpdate();
            } catch (e) {
                reject(e.response.data);
            }
        });
    };

    const onDeleteAccount = (type: "income" | "expenses", id: string): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/delete_account", {type, id});
                resolve();
                props.onUpdate();
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
                    {
                        props.user.income.map(income => (
                            <Account type="income" account={income} onUpdateAccount={onUpdateAccount} onDeleteAccount={onDeleteAccount} key={income.name} />
                        ))
                    }
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Segment>
                    <Header>Expense Accounts</Header>
                    {
                        props.user.expenses.map(expense => (
                            <Account type="expenses" account={expense} onUpdateAccount={onUpdateAccount} onDeleteAccount={onDeleteAccount} key={expense.name} />
                        ))
                    }
                </Segment>
            </Grid.Column>
        </Grid>
    );
};
