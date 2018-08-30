import React from "react";
import { User } from "../../user";
import axios from "axios";
import getAxiosHeaderConfig from "../../axiosHeaderConfig";
import { Grid, Segment, Header, Button } from "semantic-ui-react";
import UserInformation from "./UserInformation";
import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";
import ImportTransactions from "./ImportTransactions";
import ExportTransactions from "./ExportTransactions";
import ConfirmButton from "../General/ConfirmButton";

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

    onUpdateUserInformation = (username: string, newPassword: string, confirmNewPassword: string, currentPassword: string): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                const response = await axios.put("/api/user", { username, newPassword, confirmNewPassword, currentPassword }, getAxiosHeaderConfig());
                const token = response.data.token;
                localStorage.setItem("token", token);
                resolve();
                this.props.onUpdate();
            } catch (e) {
                reject(e.response.data.errors);
            }
        });
    };

    onUpdateCategory = (id: string, name: string, type: string, colour: string, budget?: number): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.put(`/api/user/category/${id}`, { name, type, colour, budget }, getAxiosHeaderConfig());
                resolve();
                this.props.onUpdate();
            } catch (e) {
                reject(e.response.data.errors);
            }
        });
    };

    onDeleteCategory = (id: string): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.delete(`/api/user/category/${id}`, getAxiosHeaderConfig());
                resolve();
                this.props.onUpdate();
            } catch (e) {
                reject(e.response.data.errors);
            }
        });
    };

    toggleAddIncome = () => {
        this.setState({ addIncome: !this.state.addIncome });
    };

    toggleAddExpense = () => {
        this.setState({ addExpense: !this.state.addExpense });
    };

    onAddCategory = (name: string, type: string, colour: string, budget?: number): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/user/category", { name, type, colour, budget }, getAxiosHeaderConfig());
                resolve();
                if (type === "income") {
                    this.setState({ addIncome: false });
                } else if (type === "expense") {
                    this.setState({ addExpense: false });
                }
                this.props.onUpdate();
            } catch (e) {
                reject(e.response.data.errors);
            }
        });
    };

    onImportTransactions = (transactions: any[]): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/user/transaction/import", { transactions }, getAxiosHeaderConfig());
                resolve();
                this.props.onUpdate();
            } catch (e) {
                reject(e.response.data.errors);
            }
        });
    };

    onDeleteUser = async () => {
        await axios.delete("/api/user", getAxiosHeaderConfig());
        this.props.onUpdate();
    };

    render(): React.ReactNode {
        return (
            <Grid columns={16} style={{ padding: "1rem" }}>
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
                                <EditCategory category={income} onUpdateCategory={this.onUpdateCategory} onDeleteCategory={this.onDeleteCategory} key={income.name} />
                            ))
                        }
                        {
                            this.state.addIncome ?
                                <AddCategory type="income" onAddCategory={this.onAddCategory} onCancel={this.toggleAddIncome} /> :
                                <div style={{ paddingTop: "2rem" }}><Button positive icon="plus" onClick={this.toggleAddIncome} /></div>
                        }
                    </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Segment>
                        <Header>Expense Accounts</Header>
                        {
                            this.props.user.expenses.map(expense => (
                                <EditCategory category={expense} onUpdateCategory={this.onUpdateCategory} onDeleteCategory={this.onDeleteCategory} key={expense.name} />
                            ))
                        }
                        {
                            this.state.addExpense ?
                                <AddCategory type="expense" onAddCategory={this.onAddCategory} onCancel={this.toggleAddExpense} /> :
                                <div style={{ paddingTop: "2rem" }}><Button positive icon="plus" onClick={this.toggleAddExpense} /></div>
                        }
                    </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Segment>
                        <Header>Import Transactions</Header>
                        <ImportTransactions onImportTransactions={this.onImportTransactions} />
                    </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Segment>
                        <Header>Export Transactions</Header>
                        <ExportTransactions user={this.props.user} />
                    </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Segment>
                        <ConfirmButton text="Delete Your Account" negative header="Delete User Account" content="Are you sure you want to delete your user account? This action cannot be reversed and everything will be erased." confirm="Delete" onConfirm={this.onDeleteUser} />
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}
