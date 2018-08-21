import React from "react";
import { User } from "../../../../user";
import axios from "axios";
import { Grid, Header, Table } from "semantic-ui-react";
import moment from "moment";
import ConfirmButton from "../General/ConfirmButton";

interface TransactionsProps {
    user: User;
    onUpdate: () => void;
}

export default (props: TransactionsProps) => {
    const accountIdToName = (id: string): string => {
        const income = props.user.income.filter(income => income.id === id);
        if (income.length > 0) {
            return income[0].name;
        }
        const expenses = props.user.expenses.filter(expense => expense.id === id);
        if (expenses.length > 0) {
            return expenses[0].name;
        }
    };

    const deleteTransaction = async (id: string) => {
        await axios.post("/api/delete_transaction", {id});
        props.onUpdate();
    };

    return (
        <Grid columns={16} style={{padding: "1rem"}}>
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Header as="h1">Transactions</Header>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Account</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Amount</Table.HeaderCell>
                            <Table.HeaderCell width={7}>Note</Table.HeaderCell>
                            <Table.HeaderCell width={1}></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            props.user.transactions.map(t => (
                                <Table.Row key={t.id}>
                                    <Table.Cell>{moment(t.date).format("MMMM DD, YYYY")}</Table.Cell>
                                    <Table.Cell>{accountIdToName(t.account_id)}</Table.Cell>
                                    <Table.Cell>${t.amount.toFixed(2)}</Table.Cell>
                                    <Table.Cell>{t.note}</Table.Cell>
                                    <Table.Cell>
                                        <ConfirmButton icon="delete" negative header="Delete Account" content="Are you sure you want to delete this account? This action cannot be reversed and all transaction history related to this account will be lost." confirm="Delete" onConfirm={() => deleteTransaction(t.id)} />
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
            </Grid.Column>
        </Grid>
    );
}
