import React from "react";
import { Form, Message, Input, Select, Button, DropdownProps, InputOnChangeData } from "semantic-ui-react";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface AddExpenseTransactionProps {
    expenseNames: string[];
    onAddExpenseTransaction: (name: string, amount: number, note: string, date: number) => Promise<{}>;
}

interface AddExpenseTransactionState {
    name: string;
    amount: string;
    note: string;
    date: moment.Moment;
    errors: string[];
}

export default class AddExpenseTransaction extends React.Component<AddExpenseTransactionProps, AddExpenseTransactionState> {
    state: AddExpenseTransactionState = {
        name: this.props.expenseNames[0],
        amount: "0.00",
        note: "",
        date: moment().startOf("day"),
        errors: []
    };

    getOptions = () => {
        // returns expense names in the format needed for the Select component
        return this.props.expenseNames.map((name, i) => {
            return {
                key: i,
                value: name,
                text: name
            };
        });
    };

    changeName = (e: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        this.setState({name: data.value as string});
    };

    changeAmount = (e: React.SyntheticEvent<HTMLElement>, data: InputOnChangeData) => {
        this.setState({amount: data.value});
    };

    makeAmountTwoDecimalPlaces = () => {
        this.setState({amount: parseFloat(this.state.amount).toFixed(2)});
    };

    changeNote = (e: React.SyntheticEvent<HTMLElement>, data: InputOnChangeData) => {
        this.setState({note: data.value});
    };

    changeDate = (date: moment.Moment, e: React.SyntheticEvent<any>) => {
        this.setState({date});
    };

    submit = async () => {
        try {
            const date = this.state.date || moment().startOf("day");
            await this.props.onAddExpenseTransaction(this.state.name, parseFloat(this.state.amount), this.state.note, date.valueOf());
            this.setState({
                name: this.props.expenseNames[0],
                amount: "0.00",
                note: "",
                date: moment().startOf("day"),
                errors: []
            });
        } catch (errors) {
            this.setState({errors});
        }
    };

    render(): React.ReactNode {
        return (
            <Form onSubmit={this.submit} error={this.state.errors.length > 0} style={{paddingTop: "1rem"}}>
                <Message error>
                    <Message.Header>Error</Message.Header>
                    <Message.List>
                        {
                            this.state.errors.map((error, i) => (
                                <Message.Item key={i}>{error}</Message.Item>
                            ))
                        }
                    </Message.List>
                </Message>
                <Form.Field>
                    <Select options={this.getOptions()} value={this.state.name} onChange={this.changeName} fluid />
                </Form.Field>
                <Form.Field>
                    <Input type="number" min="0" step="0.01" label="$" value={this.state.amount} onChange={this.changeAmount} onBlur={this.makeAmountTwoDecimalPlaces} fluid />
                </Form.Field>
                <Form.Field>
                    <Input type="text" placeholder="Note (optional)" value={this.state.note} onChange={this.changeNote} fluid />
                </Form.Field>
                <Form.Field>
                    <DatePicker selected={this.state.date} onChange={this.changeDate} dateFormat="MMMM DD, YYYY" todayButton="Today" />
                </Form.Field>
                <Button primary type="submit">Add</Button>
            </Form>
        );
    }
}
