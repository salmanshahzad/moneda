import React from "react";
import { Category, Expense, Transaction } from "../../user";
import moment from "moment";
import { Line } from "react-chartjs-2";

interface TransactionHistoryChartProps {
    category: Category;
    transactions: Transaction[];
    monthsToShow: number;
}

export default (props: TransactionHistoryChartProps): JSX.Element => {
    const getMonthLabels = (): string[] => {
        // return month strings for the last props.monthsToShow months
        const months = [moment()];
        for (let i = 1; i < props.monthsToShow; i++) {
            months.push(moment().subtract(i, "months"));
        }
        return months.reverse().map(m => m.format("MMMM"));
    };

    const getAmountsPerMonth = (): number[] => {
        // return the total amounts for the last props.monthsToShow months
        const amounts = new Array<number>(props.monthsToShow).fill(0);
        let pointerDate = moment().startOf("month");
        let pointer = 0;
        for (let i = 0; i < props.transactions.length; i++) {
            if (pointer > props.monthsToShow - 1) {
                break;
            }
            const transactionDate = moment(props.transactions[i].date).startOf("month");
            pointer += pointerDate.diff(transactionDate, "months");
            amounts[pointer] += props.transactions[i].amount;
            pointerDate = transactionDate;
        }
        return amounts.reverse();
    };

    const getData = (): { labels: string[], datasets: object[] } => {
        // return the data in the format needed for the Line component
        const data = {
            labels: getMonthLabels(),
            datasets: [
                {
                    label: "Spent",
                    backgroundColor: props.category.colour,
                    borderColor: props.category.colour,
                    fill: true,
                    data: getAmountsPerMonth()
                }
            ]
        };

        // if the account is an expense, add a straight line representing the budget
        if (props.category.type === "expense") {
            const expense = props.category as Expense;
            data.datasets.push({
                label: "Budget",
                backgroundColor: "#FF0000",
                borderColor: "#FF0000",
                fill: false,
                data: new Array<number>(props.monthsToShow).fill(expense.budget)
            });
        }

        return data;
    };

    const options = {
        layout: {
            padding: {
                bottom: 20
            }
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        callback: value => `$${value.toFixed(2)}`
                    }
                }
            ]
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const index = tooltipItem.index;
                    const amount = data.datasets[tooltipItem.datasetIndex].data[index];
                    return `$${amount.toFixed(2)}`;
                }
            }
        }
    };

    return <Line data={getData()} options={options} />;
}
