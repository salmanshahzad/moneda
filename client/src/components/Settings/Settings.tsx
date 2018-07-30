import React from "react";
import { User } from "../../../../user";
import axios from "axios";
import { Grid, Segment, Header, Button } from "semantic-ui-react";
import UserInformation from "./UserInformation";
import Account from "./Account";
import DeleteUser from "./DeleteUser";

interface SettingsProps {
    user: User;
    onUpdate: () => void;
}

interface SettingsState {
    addIncome: boolean;
    addExpense: boolean;
}

export default class Settings extends React.Component<SettingsProps, SettingsState> {
    state: SettingsState = {
        addIncome: false,
        addExpense: false
    };

    onUpdateUserInformation = (username: string, password: string, confirmPassword: string, currentPassword: string): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/update_user", {username, password, confirmPassword, currentPassword});
                resolve();
                this.props.onUpdate();
            } catch (e) {
                reject(e.response.data);
            }
        });
    };

    onUpdateAccount = (type: "income" | "expenses", id: string, name: string, colour: string, budget?: number): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/update_account", {type, id, name, colour, budget});
                resolve();
                this.props.onUpdate();
            } catch (e) {
                reject(e.response.data);
            }
        });
    };

    onDeleteAccount = (type: "income" | "expenses", id: string): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/delete_account", {type, id});
                resolve();
                this.props.onUpdate();
            } catch (e) {
                reject(e.response.data);
            }
        });
    };

    showAddIncome = () => {
        this.setState({addIncome: true});
    };
    
    showAddExpense = () => {
        this.setState({addExpense: true});
    };

    // has the same parameters as onUpdateAccount because this function is passed to the Account component as the prop onUpdateAccount for adding a new account
    onAddAccount = (type: "income" | "expenses", id: string, name: string, colour: string, budget?: number): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/add_account", {type, name, colour, budget});
                resolve();
                if (type === "income") {
                    this.setState({addIncome: false});
                } else if (type === "expenses") {
                    this.setState({addExpense: false});
                }
                this.props.onUpdate();
            } catch (e) {
                reject(e.response.data);
            }
        });
    };

    onDeleteUser = (): Promise<{}> => {
        return new Promise<{}>(async resolve => {
            await axios.post("/api/delete_user");
            resolve();
            this.props.onUpdate();
        });
    };

    render(): React.ReactNode {
        return (
            <Grid columns={16} style={{padding: "1rem"}}>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Header as="h1">Settings</Header>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Segment>
                        <Header>User Information</Header>
                        <UserInformation user={this.props.user} onUpdateUserInformation={this.onUpdateUserInformation} />
                    </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Segment>
                        <Header>Income Accounts</Header>
                        {
                            this.props.user.income.map(income => (
                                <Account type="income" account={income} onUpdateAccount={this.onUpdateAccount} onDeleteAccount={this.onDeleteAccount} key={income.name} />
                            ))
                        }
                        {
                            !this.state.addIncome && <div style={{paddingTop: "2rem"}}><Button positive icon="plus" onClick={this.showAddIncome} /></div>
                        }
                        {
                            this.state.addIncome && <Account type="income" account={{
                                id: "",
                                name: "",
                                colour: "#FF0000",
                                income: 0
                            }} onUpdateAccount={this.onAddAccount} onDeleteAccount={null} editing />
                        }
                    </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Segment>
                        <Header>Expense Accounts</Header>
                        {
                            this.props.user.expenses.map(expense => (
                                <Account type="expenses" account={expense} onUpdateAccount={this.onUpdateAccount} onDeleteAccount={this.onDeleteAccount} key={expense.name} />
                            ))
                        }
                        {
                            !this.state.addExpense && <div style={{paddingTop: "2rem"}}><Button positive icon="plus" onClick={this.showAddExpense} /></div>
                        }
                        {
                            this.state.addExpense && <Account type="expenses" account={{
                                id: "",
                                name: "",
                                colour: "#FF0000",
                                spent: 0,
                                budget: 0
                            }} onUpdateAccount={this.onAddAccount} onDeleteAccount={null} editing />
                        }
                    </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Segment>
                        <DeleteUser onDeleteUser={this.onDeleteUser} />
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}
