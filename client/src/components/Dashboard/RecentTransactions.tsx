import React from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface Transaction {
    amount: number;
    to: string;
    date: number;
}

interface RecentTransactionsProps {
    transactions: Transaction[];
    show: number;
}

export default (props: RecentTransactionsProps) => {
    const getTransactionsToShow = (): Transaction[] => {
        // return an array of transactions of length min(props.show, props.transactions.length)
        const length = props.transactions.length;
        const toShow = Math.min(length, props.show);
        const transactions = [];
        for (let i = length - 1; i >= length - toShow; i--) {
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
                    getTransactionsToShow().map((transaction, i) => (
                        <Table.Row key={i}>
                            <Table.Cell><Link to={"/expense/" + transaction.to}>{transaction.to}</Link></Table.Cell>
                            <Table.Cell>${transaction.amount.toFixed(2)}</Table.Cell>
                            <Table.Cell>{new Date(transaction.date).toLocaleString()}</Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table>
    );
}
