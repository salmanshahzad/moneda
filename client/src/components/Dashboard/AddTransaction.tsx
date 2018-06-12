import React from "react";
import AddIncomeTransaction from "./AddIncomeTransaction";
import AddExpenseTransaction from "./AddExpenseTransaction";
import { Tab } from "semantic-ui-react";

interface AddTransactionProps {
    incomeNames: string[];
    onAddIncomeTransaction: (name: string, amount: number, note: string) => Promise<{}>;
    expenseNames: string[];
    onAddExpenseTransaction: (name: string, amount: number, note: string) => Promise<{}>;
}

export default class AddTransaction extends React.Component<AddTransactionProps, {}> {
    panes = [
        {
            menuItem: "Income",
            render: () => <AddIncomeTransaction incomeNames={this.props.incomeNames} onAddIncomeTransaction={this.props.onAddIncomeTransaction} />
        },
        {
            menuItem: "Expense",
            render: () => <AddExpenseTransaction expenseNames={this.props.expenseNames} onAddExpenseTransaction={this.props.onAddExpenseTransaction} />
        }
    ];

    render(): React.ReactNode {
        return <Tab panes={this.panes} />;
    }
}
