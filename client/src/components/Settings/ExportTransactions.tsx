import React from "react";
import { User } from "../../user";
import { unparse } from "papaparse";
import download from "../../download";
import { Form, Checkbox, Button } from "semantic-ui-react";
import moment from "moment";

interface ExportTransactionsProps {
    user: User;
}

interface ExportTransactionsState {
    includeUpcoming: boolean;
}

export default class ExportTransactions extends React.Component<ExportTransactionsProps, ExportTransactionsState> {
    state: ExportTransactionsState = {
        includeUpcoming: false
    };

    changeIncludeUpcoming = () => {
        this.setState({ includeUpcoming: !this.state.includeUpcoming });
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
            const info = this.props.user.categoryInfo(t.category_id);
            return {
                date: moment(t.date).format("MMMM DD, YYYY"),
                category: info.name,
                amount: t.amount,
                note: t.note,
                type: info.type
            };
        });

        download(unparse(t), `${this.props.user.username}-moneda-transactions-${moment().format("DD-MMM-YYYY")}.csv`, "text/csv");
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
