import React from "react";
import { User } from "../../../../user";
import Papa from "papaparse";
import download from "../../download";
import { CheckboxProps, Form, Checkbox, Button } from "semantic-ui-react";
import moment from "moment";

interface ExportDataProps {
    user: User;
}

interface ExportDataState {
    data: string;
    includeUpcoming: boolean;
    format: string;
}

export default class ExportData extends React.Component<ExportDataProps, ExportDataState> {
    state: ExportDataState = {
        data: "transactions",
        includeUpcoming: false,
        format: "csv"
    };

    changeData = (e: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        // if the data is account, the format must be json
        if (data.value === "account") {
            this.setState({format: "json"});
        }
        this.setState({data: data.value.toString()});
    };

    changeIncludeUpcoming = () => {
        this.setState({includeUpcoming: !this.state.includeUpcoming});
    };

    changeFormat = (e: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        this.setState({format: data.value.toString()});
    };

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

    export = () => {
        const formattedDate = moment().format("DD-MMM-YYYY");

        // if data is account, format must be json
        if (this.state.data === "account") {
            download(JSON.stringify(this.props.user), `moneda-account-${formattedDate}.json`, "application/json");
        } else if (this.state.data === "transactions") {
            // transactions will be in reverse chronological order
            let transactions = this.props.user.transactions;
            // add upcoming transactions to the front
            if (this.state.includeUpcoming) {
                transactions.unshift(...this.props.user.upcomingTransactions.reverse());
            }
            // remove unneeded information like id, user_id etc...
            const t = transactions.map(t => {
                return {
                    date: moment(t.date).format("MMMM DD, YYYY"),
                    account: this.accountIdToName(t.account_id),
                    amount: t.amount,
                    note: t.note
                };
            });

            if (this.state.format === "json") {
                download(JSON.stringify(t), `moneda-transactions-${formattedDate}.json`, "application/json");
            } else if (this.state.format === "csv") {
                download(Papa.unparse(t), `moneda-transactions-${formattedDate}.csv`, "text/csv");
            }
        }
    };

    render(): React.ReactNode {
        return (
            <Form onSubmit={this.export}>
                <Form.Field>
                    <Checkbox radio label="Transactions Only" name="data" value="transactions" checked={this.state.data === "transactions"} onChange={this.changeData} />
                </Form.Field>
                <Form.Field>
                    <Checkbox label="Include upcoming transactions" value="includeUpcoming" onChange={this.changeIncludeUpcoming} disabled={this.state.data !== "transactions"} />
                </Form.Field>
                <Form.Field>
                    <Checkbox radio label="All Account Data" name="data" value="account" checked={this.state.data === "account"} onChange={this.changeData} />
                </Form.Field>
                <Form.Field>
                    <Checkbox radio label="CSV" name="format" value="csv" checked={this.state.format === "csv"} onChange={this.changeFormat} disabled={this.state.data === "account"} />
                </Form.Field>
                <Form.Field>
                    <Checkbox radio label="JSON" name="format" value="json" checked={this.state.format === "json"} onChange={this.changeFormat} />
                </Form.Field>
                <Button primary type="submit">Export</Button>
            </Form>
        );
    }
}
