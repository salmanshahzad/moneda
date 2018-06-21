import React from "react";
import axios from "axios";
import { User } from "../../../../user";
import { Header, Grid, Segment } from "semantic-ui-react";
import ExpenseChart from "../Budget/ExpenseChart";
import AddTransaction from "./AddTransaction";
import RecentTransactions from "./RecentTransactions";

interface DashboardProps {
    user: User;
    onUpdate: () => void;
}

export default class Dashboard extends React.Component<DashboardProps, {}> {
    onAddIncomeTransaction = (name: string, amount: number, note: string): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/add_transaction", {account: name, amount, note, type: "income"});
                resolve();
                this.props.onUpdate();
            } catch (e) {
                reject(e.response.data)
            }
        });
    };

    onAddExpenseTransaction = (name: string, amount: number, note: string): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/add_transaction", {account: name, amount, note, type: "expenses"});
                resolve();
                this.props.onUpdate();
            } catch (e) {
                reject(e.response.data)
            }
        });
    };

    getAccountNames = (type: "income" | "expenses"): string[] => {
        if (type === "income") {
            return this.props.user.income.map(income => income.name);
        } else if (type === "expenses") {
            return this.props.user.expenses.map(expense => expense.name);
        }
    };

    accountIdToName = (id: string): string => {
        const income = this.props.user.income.filter(income => income.id === id);
        if (income.length > 0) {
            return income[0].name;
        }
        const expenses = this.props.user.expenses.filter(expense => expense.id === id);
        if (expenses.length > 0) {
            return expenses[0].name;
        }
    };

    render(): React.ReactNode {
        return (
            <Grid columns={16} style={{padding: "1rem"}}>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Header as="h1">Dashboard</Header>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Segment>
                        {/* need marginTop because for some reason Header has an extra margin when it is placed before a chart */}
                        <Header style={{marginTop: "-.14285714em"}}>Expenses Chart</Header>
                        <ExpenseChart expenses={this.props.user.expenses} />
                    </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Segment>
                        <Header>Add Transaction</Header>
                        <AddTransaction incomeNames={this.getAccountNames("income")} onAddIncomeTransaction={this.onAddIncomeTransaction} expenseNames={this.getAccountNames("expenses")} onAddExpenseTransaction={this.onAddExpenseTransaction} />
                    </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Segment>
                        <Header>Recent Transactions</Header>
                        <RecentTransactions transactions={this.props.user.transactions} accountIdToName={this.accountIdToName} show={5} />
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}
