import React from "react";
import Papa from "papaparse";
import { Message, Input } from "semantic-ui-react";

interface ImportTransactionsProps {
    onImportTransactions: (transactions: any[]) => Promise<{}>;
}

interface ImportTransactionsState {
    errorMessage: string;
    successMessage: string;
}

export default class ImportTransactions extends React.Component<ImportTransactionsProps, ImportTransactionsState> {
    state: ImportTransactionsState = {
        errorMessage: "",
        successMessage: ""
    };

    importTransactions = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files[0];
        if (file.name.endsWith(".csv")) {
            const reader = new FileReader();
            reader.onload = async e => {
                const text = (e.target as any).result;
                try {
                    await this.props.onImportTransactions(Papa.parse(text, {header: true}).data);
                    this.setState({successMessage: "Imported transactions.", errorMessage: ""});
                } catch (error) {
                    this.setState({successMessage: "", errorMessage: error});
                }
            };
            reader.readAsText(file);
        } else {
            this.setState({successMessage: "", errorMessage: "Invalid file type."});
        }
    };

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Message hidden={this.state.successMessage.length + this.state.errorMessage.length === 0} success={this.state.successMessage.length > 0} error={this.state.errorMessage.length > 0}>
                    <Message.Header>{this.state.successMessage.length > 0 ? "Success" : "Error"}</Message.Header>
                    <Message.List>
                        <Message.Item>{this.state.successMessage.length > 0 ? this.state.successMessage : this.state.errorMessage}</Message.Item>
                    </Message.List>
                </Message>
                <p>CSV data must include date, category, and amount headers. Note and type headers are optional. Any invalid rows will be skipped. Categories that do not exist will be created as specified by their type. If there is no type, expense will be used as the default.</p>
                <Input type="file" accept=".csv" onChange={this.importTransactions} />
            </React.Fragment>
        );
    }
}
