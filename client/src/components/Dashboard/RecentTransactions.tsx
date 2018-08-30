import React from "react";
import { Transaction } from "../../user";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

interface RecentTransactionsProps {
    transactions: Transaction[];
    categoryInfo: (id: string) => { type: string, name: string };
    show: number;
}

export default (props: RecentTransactionsProps): JSX.Element => {
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
        <Table celled striped>
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
                        const category = props.categoryInfo(transaction.category_id);
                        return (
                            <Table.Row key={i}>
                                <Table.Cell><Link to={`${category.type}/${category.name}`}>{category.name}</Link></Table.Cell>
                                <Table.Cell>${transaction.amount.toFixed(2)}</Table.Cell>
                                <Table.Cell>{moment(transaction.date).format("MMMM D")}</Table.Cell>
                            </Table.Row>
                        );
                    })
                }
            </Table.Body>
        </Table>
    );
}
