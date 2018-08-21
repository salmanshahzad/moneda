import React from "react";
import Papa from "papaparse";
import { Message, Input } from "semantic-ui-react";

interface ImportDataProps {
    onImportData: (data: object) => Promise<{}>;
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
        if (file.name.endsWith(".csv") || file.name.endsWith(".json")) {
            const reader = new FileReader();
            reader.onload = async e => {
                const text = (e.target as any).result;
                if (file.name.endsWith(".csv")) {
                    try {
                        await this.props.onImportData(Papa.parse(text, {header: true}).data);
                        this.setState({message: "Successfully imported data."});
                    } catch (error) {
                        this.setState({message: error});
                    }
                } else {
                    try {
                        await this.props.onImportData(JSON.parse(text));
                        this.setState({message: "Successfully imported data."});
                    } catch (error) {
                        this.setState({message: error});
                    }
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
                <p>CSV data must be formatted as: date,account,amount,note</p>
                <p>JSON data must be formatted the same way it was exported</p>
                <Input type="file" accept=".csv,.json" onChange={this.importData} />
            </React.Fragment>
        );
    }
}
