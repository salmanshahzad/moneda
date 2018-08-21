import React from "react";
import Papa from "papaparse";
import { Message, Input } from "semantic-ui-react";

interface ImportDataProps {
    onImportData: (data: any[]) => Promise<{}>;
}

interface ImportDataState {
    message: string;
}

export default class ImportData extends React.Component<ImportDataProps, ImportDataState> {
    state: ImportDataState = {
        message: ""
    };

    importData = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files[0];
        if (file.name.endsWith(".csv")) {
            const reader = new FileReader();
            reader.onload = async e => {
                const text = (e.target as any).result;
                try {
                    await this.props.onImportData(Papa.parse(text, {header: true}).data);
                    this.setState({message: "Successfully imported data."});
                } catch (error) {
                    this.setState({message: error});
                }
            };
            reader.readAsText(file);
        } else {
            this.setState({message: "Invalid file type."});
        }
    };

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Message hidden={this.state.message === ""} success={this.state.message.startsWith("Success")} error={!this.state.message.startsWith("Success")}>{this.state.message}</Message>
                <p>CSV data must include date, account, and amount headers. Note and type headers are optional. Any invalid rows will be skipped. Accounts that do not exist will be created as specified by their type. If there is no type, expenses will be used as the default.</p>
                <Input type="file" accept=".csv" onChange={this.importData} />
            </React.Fragment>
        );
    }
}
