import React from "react";
import { Expense } from "../../../../user";
import { Pie } from "react-chartjs-2";

interface ExpenseChartProps {
    expenses: Expense[];
}

export default class ExpenseChart extends React.Component<ExpenseChartProps, {}> {
    getData = () => {
        // return the data in the format needed for the Pie component
        return {
            labels: this.props.expenses.map(expense => expense.name),
            datasets: [
                {
                    data: this.props.expenses.map(expense => expense.spent),
                    backgroundColor: this.props.expenses.map(expense => expense.colour)
                }
            ]
        };
    };

    options = {
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const index = tooltipItem.index;
                    const expense = data.labels[index];
                    const amount = data.datasets[tooltipItem.datasetIndex].data[index];
                    return `${expense}: $${amount.toFixed(2)}`;
                }
            }
        }
    };

    render(): React.ReactNode {
        return <Pie data={this.getData()} options={this.options} />;
    }
}
