import React from "react";
import { User } from "../../../../user";
import axios from "axios";
import moment from "moment";
import { Grid, Header} from "semantic-ui-react";
import ReactTable, { Filter } from "react-table";
import "react-table/react-table.css";
import ConfirmButton from "../General/ConfirmButton";

interface TransactionsProps {
    user: User;
    onUpdate: () => void;
}

// even though this component does not have state, ReactTable does not seem to work if this component is stateless
export default class Transactions extends React.Component<TransactionsProps, {}> {
    accountIdToName = (id: string): string => {
        const income = this.props.user.income.filter(income => income.id === id);
        if (income.length > 0) {
            return income[0].name;
        }
        const expenses = this.props.user.expenses.filter(expense => expense.id === id);
        if (expenses.length > 0) {
            return expenses[0].name;
        }
    };

    deleteTransaction = async (id: string) => {
        await axios.post("/api/delete_transaction", {id});
        this.props.onUpdate();
    };

    getColumns = () => [
        {
            Header: "Date",
            accessor: "date",
            Cell: row => moment(row.value).format("MMMM DD, YYYY")
        },
        {
            Header: "Account",
            accessor: "account"
        },
        {
            Header: "Amount",
            accessor: "amount"
        },
        {
            Header: "Note",
            accessor: "note"
        },
        {
            accessor: "id",
            Cell: row => <ConfirmButton icon="delete" negative header="Delete Transaction" content="Are you sure you want to delete this transaction?" confirm="Delete" onConfirm={() => this.deleteTransaction(row.value)} />,
            filterable: false,
            width: 50
        }
    ];

    getData = () => this.props.user.transactions.map(t => {
        return {
            date: t.date,
            account: this.accountIdToName(t.account_id),
            amount: `$${t.amount.toFixed(2)}`,
            note: t.note,
            id: t.id
        };
    });

    // when filtering, only check if what the user typed is contained in the row
    // check docs for function signature
    filterMethod = (filter: Filter, row: any) => row[filter.id].toLowerCase().indexOf(filter.value) >= 0;

    render(): React.ReactNode {
        return (
            <Grid columns={16} style={{padding: "1rem"}}>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Header as="h1">Transactions</Header>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <ReactTable columns={this.getColumns()} data={this.getData()} filterable={true} defaultFilterMethod={this.filterMethod} resizable={false} showPageSizeOptions={false} />
                </Grid.Column>
            </Grid>
        );
    }
}
