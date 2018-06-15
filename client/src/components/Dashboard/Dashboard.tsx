import React from "react";
import axios from "axios";
import { Transaction, User } from "../../../../user";
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

    getTransactions = (): Transaction[] => {
        const allTransactions: Transaction[] = [];
        this.props.user.income.forEach(income => {
            allTransactions.push(...income.transactions);
        });
        this.props.user.expenses.forEach(expense => {
            allTransactions.push(...expense.transactions);
        });
        allTransactions.sort((a, b) => {
            if (a.date > b.date) {
                return 1;
            } else {
                return -1;
            }
        });
        return allTransactions;
    };

    render(): React.ReactNode {
        return (
            <Grid columns={16} style={{padding: "1rem"}}>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Header as="h1">Dashboard</Header>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Segment>
                        <Header>Expenses Chart</Header>
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
                        <RecentTransactions transactions={this.getTransactions()} show={5} />
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}
