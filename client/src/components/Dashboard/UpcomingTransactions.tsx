import React from "react";
import { Transaction } from "../../user";
import { Table, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import ConfirmButton from "../General/ConfirmButton";

interface UpcomingTransactionsProps {
    transactions: Transaction[];
    categoryInfo: (id: string) => { type: string, name: string };
    onPayTransaction: (id: string) => void;
    onDeleteTransaction: (id: string) => void;
    detail: boolean; // should be false when using on the Dashboard
}

export default (props: UpcomingTransactionsProps): JSX.Element => (
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
                    const difference = moment(transaction.date).diff(moment().startOf("day"), "days");
                    const category = props.detail ? null : props.categoryInfo(transaction.category_id);
                    return (
                        <Table.Row error={difference < 0} warning={difference >= 0 && difference <= 3} key={i}>
                            {
                                !props.detail && <Table.Cell><Link to={`${category.type}/${category.name}`}>{category.name}</Link></Table.Cell>
                            }
                            <Table.Cell collapsing={props.detail}>
                                {difference < 0 && <Icon name="attention" />}
                                {moment(transaction.date).format("MMMM D")}
                            </Table.Cell>
                            <Table.Cell collapsing={props.detail}>${transaction.amount.toFixed(2)}</Table.Cell>
                            {
                                props.detail && <Table.Cell>{transaction.note}</Table.Cell>
                            }
                            <Table.Cell collapsing>
                                <Button.Group>
                                    <Button positive onClick={() => props.onPayTransaction(transaction.id)}>Paid</Button>
                                    <ConfirmButton negative text="Delete" header="Delete Transaction" content="Are you sure you want to delete this transaction?" confirm="Delete" onConfirm={() => props.onDeleteTransaction(transaction.id)} />
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    );
                })
            }
        </Table.Body>
    </Table>
);
