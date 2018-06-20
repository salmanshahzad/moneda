import React from "react";
import { Transaction } from "../../../../user";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface RecentTransactionsProps {
    transactions: Transaction[];
    accountIdToName: (id: string) => string;
    show: number;
}

export default (props: RecentTransactionsProps) => {
    const getTransactionsToShow = (): Transaction[] => {
        // return an array of transactions of length min(props.show, props.transactions.length)
        const length = props.transactions.length;
        const toShow = Math.min(length, props.show);
        const transactions = [];
        for (let i = 0; i < toShow; i++) {
            transactions.push(props.transactions[i]);
        }
        return transactions;
    };
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>To</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    getTransactionsToShow().map((transaction, i) => {
                        const name = props.accountIdToName(transaction.account_id);
                        return (
                            <Table.Row key={i}>
                                <Table.Cell><Link to={"/expense/" + name}>{name}</Link></Table.Cell>
                                <Table.Cell>${transaction.amount.toFixed(2)}</Table.Cell>
                                <Table.Cell>{new Date(transaction.date).toLocaleString()}</Table.Cell>
                            </Table.Row>
                        );
                    })
                }
            </Table.Body>
        </Table>
    );
}
