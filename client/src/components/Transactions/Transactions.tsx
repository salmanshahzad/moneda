import React from "react";
import { User } from "../../user";
import axios, { getAxiosHeaderConfig } from "../../api";
import { Grid, Header, Table } from "semantic-ui-react";
import moment from "moment";
import ConfirmButton from "../General/ConfirmButton";

interface TransactionsProps {
    user: User;
    onUpdate: () => void;
}

export default (props: TransactionsProps): JSX.Element => {
    const deleteTransaction = async (id: string) => {
        await axios.delete(`/user/transaction/${id}`, getAxiosHeaderConfig());
        props.onUpdate();
    };

    return (
        <Grid columns={16} style={{ padding: "1rem" }}>
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Header as="h1">Transactions</Header>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Category</Table.HeaderCell>
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
                                    <Table.Cell>{props.user.categoryInfo(t.category_id).name}</Table.Cell>
                                    <Table.Cell>${t.amount.toFixed(2)}</Table.Cell>
                                    <Table.Cell>{t.note}</Table.Cell>
                                    <Table.Cell>
                                        <ConfirmButton icon="delete" negative header="Delete Transaction" content="Are you sure you want to delete this transaction? This action cannot be reversed." confirm="Delete" onConfirm={() => deleteTransaction(t.id)} />
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
