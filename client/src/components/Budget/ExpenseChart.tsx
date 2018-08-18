import React from "react";
import { Expense } from "../../../../user";
import { Pie } from "react-chartjs-2";

interface ExpenseChartProps {
    expenses: Expense[];
}

export default (props: ExpenseChartProps) => {
    const getExpensesSum = (): number => {
        let sum = 0;
        props.expenses.forEach(expense => sum += expense.spent);
        return sum;
    }

    const getData = () => {
        // return the data in the format needed for the Pie component
        return {
            labels: props.expenses.map(expense => expense.name),
            datasets: [
                {
                    data: props.expenses.map(expense => expense.spent),
                    backgroundColor: props.expenses.map(expense => expense.colour)
                }
            ]
        };
    };

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
                    return `${expense}: $${amount.toFixed(2)} (${(amount / getExpensesSum() * 100).toFixed(2)}%)`;
                }
            }
        }
    };

    return <Pie data={getData()} options={options} />;
}
