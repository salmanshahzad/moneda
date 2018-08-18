import React from "react";
import AddIncomeTransaction from "./AddIncomeTransaction";
import AddExpenseTransaction from "./AddExpenseTransaction";
import { Tab } from "semantic-ui-react";

interface AddTransactionProps {
    incomeNames: string[];
    onAddIncomeTransaction: (name: string, amount: number, note: string, date: number) => Promise<{}>;
    expenseNames: string[];
    onAddExpenseTransaction: (name: string, amount: number, note: string, date: number) => Promise<{}>;
}

export default (props: AddTransactionProps) => {
    const panes = [
        {
            menuItem: "Income",
            render: () => <AddIncomeTransaction incomeNames={props.incomeNames} onAddIncomeTransaction={props.onAddIncomeTransaction} />
        },
        {
            menuItem: "Expense",
            render: () => <AddExpenseTransaction expenseNames={props.expenseNames} onAddExpenseTransaction={props.onAddExpenseTransaction} />
        }
    ];
    return <Tab panes={panes} />;
}
