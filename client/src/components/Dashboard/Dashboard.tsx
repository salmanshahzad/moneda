import React from "react";
import axios from "axios";
import { User } from "../../../../user";
import { Header, Grid, Segment } from "semantic-ui-react";
import ExpenseChart from "../Budget/ExpenseChart";
import AddTransaction from "./AddTransaction";
import RecentTransactions from "./RecentTransactions";
import UpcomingTransactions from "../Budget/UpcomingTransactions";

interface DashboardProps {
    user: User;
    onUpdate: () => void;
}

export default (props: DashboardProps) => {
    const onAddIncomeTransaction = (name: string, amount: number, note: string): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/add_transaction", {account: name, amount, note, type: "income"});
                resolve();
                props.onUpdate();
            } catch (e) {
                reject(e.response.data);
            }
        });
    };

    const onAddExpenseTransaction = (name: string, amount: number, note: string, date: number): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/add_transaction", {account: name, amount, note, date, type: "expenses"});
                resolve();
                props.onUpdate();
            } catch (e) {
                reject(e.response.data);
            }
        });
    };

    const getAccountNames = (type: "income" | "expenses"): string[] => {
        if (type === "income") {
            return props.user.income.map(income => income.name);
        } else if (type === "expenses") {
            return props.user.expenses.map(expense => expense.name);
        }
    };

    const accountInfo = (id: string): {type: string, name: string} => {
        const income = props.user.income.filter(income => income.id === id);
        if (income.length > 0) {
            return {
                type: "income",
                name: income[0].name
            };
        }
        const expenses = props.user.expenses.filter(expense => expense.id === id);
        if (expenses.length > 0) {
            return {
                type: "expense",
                name: expenses[0].name
            };
        }
    };

    const onPaidTransaction = async (id: string) => {
        await axios.post("/api/pay_upcoming_transaction", {id});
        props.onUpdate();
    };

    const onDeleteTransaction = async (id: string) => {
        await axios.post("/api/delete_transaction", {id});
        props.onUpdate();
    };

    return (
        <Grid columns={16} style={{padding: "1rem"}}>
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Header as="h1">Dashboard</Header>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment style={{height: "50vh"}}>
                    {/* need marginTop because for some reason Header has an extra margin when it is placed before a chart */}
                    <Header style={{marginTop: "-.14285714em"}}>Expenses Chart</Header>
                    <ExpenseChart expenses={props.user.expenses} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    <Header>Add Transaction</Header>
                    <AddTransaction incomeNames={getAccountNames("income")} onAddIncomeTransaction={onAddIncomeTransaction} expenseNames={getAccountNames("expenses")} onAddExpenseTransaction={onAddExpenseTransaction} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    <Header>Recent Transactions</Header>
                    <RecentTransactions transactions={props.user.transactions} accountInfo={accountInfo} show={5} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    <Header>Upcoming Transactions</Header>
                    <UpcomingTransactions transactions={props.user.upcomingTransactions} accountInfo={accountInfo} onPaidTransaction={onPaidTransaction} onDeleteTransaction={onDeleteTransaction} detail={false} />
                </Segment>
            </Grid.Column>
        </Grid>
    );
}
