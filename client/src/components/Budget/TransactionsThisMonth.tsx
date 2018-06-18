import React from "react";
import { Transaction } from "../../../../user";
import { Table } from "semantic-ui-react";

interface TransactionsThisMonthProps {
    transactions: Transaction[];
    show: number;
}

export default (props: TransactionsThisMonthProps) => {
    const getTransactionsThisMonth = (): Transaction[] => {
        return props.transactions.filter(transaction => {
            const date = new Date(transaction.date);
            const today = new Date();
            if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
                return transaction;
            }
        });
    }

    const getTransactionsToShow = (): Transaction[] => {
        // return an array of transactions of length min(props.show, props.transactions.length)
        const transactionsThisMonth = getTransactionsThisMonth();
        const length = transactionsThisMonth.length;
        const toShow = Math.min(length, props.show);
        const transactions = [];
        for (let i = length - 1; i >= length - toShow; i--) {
            transactions.push(transactionsThisMonth[i]);
        }
        return transactions;
    };
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Note</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    getTransactionsToShow().map((transaction, i) => (
                        <Table.Row key={i}>
                            <Table.Cell>{new Date(transaction.date).toLocaleString()}</Table.Cell>
                            <Table.Cell>${transaction.amount.toFixed(2)}</Table.Cell>
                            <Table.Cell>{transaction.note}</Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table>
    );
}
