import React from "react";
import axios from "axios";
import { User } from "../../user";
import getAxiosHeaderConfig from "../../axiosHeaderConfig";
import { Header, Grid, Segment, Tab } from "semantic-ui-react";
import ExpenseChart from "../Budget/ExpenseChart";
import AddTransaction from "./AddTransaction";
import RecentTransactions from "./RecentTransactions";
import UpcomingTransactions from "../Budget/UpcomingTransactions";

interface DashboardProps {
    user: User;
    onUpdate: () => void;
}

export default (props: DashboardProps) => {
    const onAddTransaction = (categoryId: string, amount: number, note: string, date: number): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/user/transaction", {categoryId, amount, note, date}, getAxiosHeaderConfig());
                resolve();
                props.onUpdate();
            } catch (e) {
                reject(e.response.data.errors);
            }
        });
    };

    const categoryInfo = (id: string): {type: string, name: string} => {
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

    const onPayTransaction = async (id: string) => {
        await axios.put(`/api/user/transaction/${id}`, null, getAxiosHeaderConfig());
        props.onUpdate();
    };

    const onDeleteTransaction = async (id: string) => {
        await axios.delete(`/api/user/transaction/${id}`, getAxiosHeaderConfig());
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
                    <Tab panes={[
                        {
                            menuItem: "Expense",
                            render: () => <AddTransaction categories={props.user.expenses} onAddTransaction={onAddTransaction} key={0} />
                        },
                        {
                            menuItem: "Income",
                            render: () => <AddTransaction categories={props.user.income} onAddTransaction={onAddTransaction} key={1} />
                        }
                    ]} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    <Header>Recent Transactions</Header>
                    <RecentTransactions transactions={props.user.transactions} categoryInfo={categoryInfo} show={5} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    <Header>Upcoming Transactions</Header>
                    <UpcomingTransactions transactions={props.user.upcomingTransactions} categoryInfo={categoryInfo} onPayTransaction={onPayTransaction} onDeleteTransaction={onDeleteTransaction} detail={false} />
                </Segment>
            </Grid.Column>
        </Grid>
    );
}
