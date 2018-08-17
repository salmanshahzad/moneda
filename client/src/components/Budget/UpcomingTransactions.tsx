import React from "react";
import { Transaction } from "../../../../user";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import ConfirmButton from "../General/ConfirmButton";

interface UpcomingTransactionsProps {
    transactions: Transaction[];
    accountInfo: (id: string) => {type: string, name: string};
    onPaidTransaction: (id: string) => void;
    onDeleteTransaction: (id: string) => void;
    detail: boolean; // should be false when using on the Dashboard
}

export default (props: UpcomingTransactionsProps) => (
    <Table celled striped>
        <Table.Header>
            <Table.Row>
                {
                    !props.detail && <Table.HeaderCell>To</Table.HeaderCell>
                }
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                {
                    props.detail && <Table.HeaderCell>Note</Table.HeaderCell>
                }
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {
                props.transactions.map((transaction, i) => {
                    const account = props.detail ? null : props.accountInfo(transaction.account_id);
                    const payTransaction = () => props.onPaidTransaction(transaction.id);
                    const deleteTransaction = () => props.onDeleteTransaction(transaction.id);
                    return (
                        <Table.Row key={i}>
                            {
                                !props.detail && <Table.Cell><Link to={`${account.type}/${account.name}`}>{account.name}</Link></Table.Cell>
                            }
                            <Table.Cell collapsing={props.detail}>{moment(transaction.date).format("MMMM D")}</Table.Cell>
                            <Table.Cell collapsing={props.detail}>${transaction.amount.toFixed(2)}</Table.Cell>
                            {
                                props.detail && <Table.Cell>{transaction.note}</Table.Cell>
                            }
                            <Table.Cell collapsing>
                                <Button.Group>
                                    <Button positive onClick={payTransaction}>Paid</Button>
                                    <ConfirmButton negative text="Delete" header="Delete Transaction" content="Are you sure you want to delete this transaction?" confirm="Delete" onConfirm={deleteTransaction} />
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    );
                })
            }
        </Table.Body>
    </Table>
);
