import React from "react";
import { Transaction } from "../../user";
import { Table } from "semantic-ui-react";
import moment from "moment";
import ConfirmButton from "../General/ConfirmButton";

interface TransactionsThisMonthProps {
    transactions: Transaction[];
    show: number;
    onDeleteTransaction: (id: string) => void;
}

export default (props: TransactionsThisMonthProps) => {
    const getTransactionsThisMonth = (): Transaction[] => {
        const monthStart = moment().startOf("month");
        const monthEnd = moment().endOf("month");
        return props.transactions.filter(transaction => moment(transaction.date).isBetween(monthStart, monthEnd, null, "[]"));
    };

    const getTransactionsToShow = (): Transaction[] => {
        // return an array of transactions of length min(props.show, props.transactions.length)
        const transactionsThisMonth = getTransactionsThisMonth();
        const toShow = Math.min(transactionsThisMonth.length, props.show);
        const transactions = [];
        for (let i = 0; i < toShow; i++) {
            transactions.push(transactionsThisMonth[i]);
        }
        return transactions;
    };
    
    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Note</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    getTransactionsToShow().map((transaction, i) => (
                        <Table.Row key={i}>
                            <Table.Cell collapsing>{moment(transaction.date).format("MMMM D")}</Table.Cell>
                            <Table.Cell collapsing>${transaction.amount.toFixed(2)}</Table.Cell>
                            <Table.Cell>{transaction.note}</Table.Cell>
                            <Table.Cell collapsing>
                                <ConfirmButton negative icon="delete" header="Delete Transaction" content="Are you sure you want to delete this transaction? This action cannot be reversed." confirm="Delete" onConfirm={() => props.onDeleteTransaction(transaction.id)} />
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table>
    );
}
