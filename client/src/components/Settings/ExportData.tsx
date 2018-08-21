import React from "react";
import { User } from "../../../../user";
import Papa from "papaparse";
import download from "../../download";
import { Form, Checkbox, Button } from "semantic-ui-react";
import moment from "moment";

interface ExportDataProps {
    user: User;
}

interface ExportDataState {
    includeUpcoming: boolean;
}

export default class ExportData extends React.Component<ExportDataProps, ExportDataState> {
    state: ExportDataState = {
        includeUpcoming: false
    };

    changeIncludeUpcoming = () => {
        this.setState({includeUpcoming: !this.state.includeUpcoming});
    };

    accountInfo = (id: string): {type: string, name: string} => {
        const income = this.props.user.income.filter(income => income.id === id);
        if (income.length > 0) {
            return {
                type: "income",
                name: income[0].name
            };
        }
        const expenses = this.props.user.expenses.filter(expense => expense.id === id);
        if (expenses.length > 0) {
            return {
                type: "expense",
                name: expenses[0].name
            };
        }
    };

    export = () => {
        // transactions will be in reverse chronological order
        let transactions = this.props.user.transactions;
        // add upcoming transactions to the front
        if (this.state.includeUpcoming) {
            transactions.unshift(...this.props.user.upcomingTransactions.reverse());
        }
        
        // format transaction information
        const t = transactions.map(t => {
            const info = this.accountInfo(t.account_id);
            return {
                date: moment(t.date).format("MMMM DD, YYYY"),
                account: info.name,
                amount: t.amount,
                note: t.note,
                type: info.type
            };
        });

        download(Papa.unparse(t), `${this.props.user.username}-moneda-transactions-${moment().format("DD-MMM-YYYY")}.csv`, "text/csv");
    };

    render(): React.ReactNode {
        return (
            <Form onSubmit={this.export}>
                <Form.Field>
                    <Checkbox label="Include upcoming transactions" value="includeUpcoming" onChange={this.changeIncludeUpcoming} />
                </Form.Field>
                <Button primary type="submit">Export</Button>
            </Form>
        );
    }
}
