import React from "react";
import { Category, Income, Expense, Transaction } from "../../user";
import axios from "axios";
import getAxiosHeaderConfig from "../../axiosHeaderConfig";
import { Grid, Header, Segment } from "semantic-ui-react";
import ProgressBar from "../General/ProgressBar";
import TransactionHistoryChart from "./TransactionHistoryChart";
import TransactionsThisMonth from "./TransactionsThisMonth";
import UpcomingTransactions from "../Dashboard/UpcomingTransactions";

interface CategoryDetail {
    category: Category;
    transactions: Transaction[];
    upcomingTransactions: Transaction[];
}

interface CategoryDetailProps {
    categoryDetail: CategoryDetail;
    onUpdate: () => void;
}

export default (props: CategoryDetailProps): JSX.Element => {
    const isExpense = props.categoryDetail.category.type === "expense";

    const onPayTransaction = async (id: string) => {
        await axios.put(`/api/user/transaction/${id}`, null, getAxiosHeaderConfig());
        props.onUpdate();
    };

    const onDeleteTransaction = async (id: string) => {
        await axios.delete(`/api/user/transaction/${id}`, getAxiosHeaderConfig());
        props.onUpdate();
    };

    return (
        <Grid columns={16} style={{ padding: "1rem" }}>
            <Grid.Column mobile={8} tablet={8} computer={8}>
                <Header as="h1">{props.categoryDetail.category.name}</Header>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={8} computer={8}>
                <Header as="h2" textAlign="right">
                    {
                        isExpense &&
                        `$${(props.categoryDetail.category as Expense).spent.toFixed(2)} of $${(props.categoryDetail.category as Expense).budget.toFixed(2)}`
                    }
                    {
                        !isExpense &&
                        `$${(props.categoryDetail.category as Income).income.toFixed(2)}`
                    }
                </Header>
            </Grid.Column>
            {
                isExpense &&
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <ProgressBar value={(props.categoryDetail.category as Expense).spent} total={(props.categoryDetail.category as Expense).budget} />
                </Grid.Column>
            }
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Segment style={{ height: "50vh" }}>
                    {/* need marginTop because for some reason Header has an extra margin when it is placed before a chart */}
                    <Header style={{ marginTop: "-.14285714em" }}>Past History</Header>
                    <TransactionHistoryChart category={props.categoryDetail.category} transactions={props.categoryDetail.transactions} monthsToShow={6} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    <Header>Transactions This Month</Header>
                    <TransactionsThisMonth transactions={props.categoryDetail.transactions} onDeleteTransaction={onDeleteTransaction} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    <Header>Upcoming Transactions</Header>
                    <UpcomingTransactions transactions={props.categoryDetail.upcomingTransactions} onPayTransaction={onPayTransaction} onDeleteTransaction={onDeleteTransaction} detail={true} categoryInfo={null} />
                </Segment>
            </Grid.Column>
        </Grid>
    );
}
