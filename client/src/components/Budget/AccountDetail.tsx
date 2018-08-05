import React from "react";
import { Income, Expense, Transaction } from "../../../../user";
import axios from "axios";
import { Grid, Header, Segment } from "semantic-ui-react";
import ProgressBar from "./ProgressBar";
import TransactionHistoryChart from "./TransactionHistoryChart";
import TransactionsThisMonth from "../Budget/TransactionsThisMonth";

interface AccountDetail {
    account: Income | Expense;
    transactions: Transaction[];
}

interface AccountDetailProps {
    account: AccountDetail;
    onUpdate: () => void;
}

export default (props: AccountDetailProps) => {
    const isExpense = Object.keys(props.account.account).indexOf("spent") > -1;
    const onDeleteTransaction = async (id: string) => {
        await axios.post("/api/delete_transaction", {id});
        props.onUpdate();
    };

    return (
        <Grid columns={16} style={{padding: "1rem"}}>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Header as="h1">{props.account.account.name}</Header>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={8} computer={8}>
                <Header as="h2" textAlign="right">
                    {
                        isExpense &&
                        `$${(props.account.account as Expense).spent.toFixed(2)} of $${(props.account.account as Expense).budget.toFixed(2)}`
                    }
                    {
                        !isExpense &&
                        `$${(props.account.account as Income).income.toFixed(2)}`
                    }
                </Header>
            </Grid.Column>
            {
                isExpense &&
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <ProgressBar value={(props.account.account as Expense).spent} total={(props.account.account as Expense).budget} />
                </Grid.Column>
            }
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    {/* need marginTop because for some reason Header has an extra margin when it is placed before a chart */}
                    <Header style={{marginTop: "-.14285714em"}}>Past History</Header>
                    <TransactionHistoryChart account={props.account.account} transactions={props.account.transactions} monthsToShow={6} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    <Header>Transactions This Month</Header>
                    <TransactionsThisMonth transactions={props.account.transactions} show={10} onDeleteTransaction={onDeleteTransaction} />
                </Segment>
            </Grid.Column>
        </Grid>
    );
}
