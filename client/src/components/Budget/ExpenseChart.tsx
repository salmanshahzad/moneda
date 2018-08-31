import React from "react";
import { Expense } from "../../user";
import { Pie } from "react-chartjs-2";

interface ExpenseChartProps {
    expenses: Expense[];
}

export default (props: ExpenseChartProps): JSX.Element => {
    const data = {
        // return the data in the format needed for the Pie component
        labels: props.expenses.map(expense => expense.name),
        datasets: [
            {
                data: props.expenses.map(expense => expense.spent),
                backgroundColor: props.expenses.map(expense => expense.colour)
            }
        ]
    };

    const expenseSum = props.expenses.map(expense => expense.spent).reduce((a, b) => a + b);

    const options = {
        layout: {
            padding: {
                bottom: 20
            }
        },
        maintainAspectRatio: false,
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const index = tooltipItem.index;
                    const expense = data.labels[index];
                    const amount = data.datasets[tooltipItem.datasetIndex].data[index];
                    return `${expense}: $${amount.toFixed(2)} (${(amount / expenseSum * 100).toFixed(2)}%)`;
                }
            }
        }
    };

    return <Pie data={data} options={options} />;
}
