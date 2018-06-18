import React from "react";
import { Income, Expense } from "../../../../user";
import { Grid, Header, Segment } from "semantic-ui-react";
import ProgressBar from "./ProgressBar";
import { Line } from "react-chartjs-2";
import TransactionsThisMonth from "../Budget/TransactionsThisMonth";

interface AccountDetailProps {
    account: Income | Expense;
}

export default (props: AccountDetailProps) => {
    const isExpense = Object.keys(props.account).indexOf("spent") > -1;
    return (
        <Grid columns={16} style={{padding: "1rem"}}>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Header as="h1">{props.account.name}</Header>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={8} computer={8}>
                <Header as="h2" textAlign="right">
                    {
                        isExpense &&
                        `$${(props.account as Expense).spent.toFixed(2)} of $${(props.account as Expense).budget.toFixed(2)}`
                    }
                    {
                        !isExpense &&
                        `$${(props.account as Income).income.toFixed(2)}`
                    }
                </Header>
            </Grid.Column>
            {
                isExpense &&
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <ProgressBar value={(props.account as Expense).spent} total={(props.account as Expense).spent} />
                </Grid.Column>
            }
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    <Header>Past History</Header>
                    <Line data={{}} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    <Header>Transactions This Month</Header>
                    <TransactionsThisMonth transactions={props.account.transactions} show={10} />
                </Segment>
            </Grid.Column>
        </Grid>
    );
}
