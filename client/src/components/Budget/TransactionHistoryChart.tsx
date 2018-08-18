import React from "react";
import { Income, Expense, Transaction } from "../../../../user";
import moment from "moment";
import { Line } from "react-chartjs-2";

interface TransactionHistoryChartProps {
    account: Income | Expense;
    transactions: Transaction[];
    monthsToShow: number;
}

export default (props: TransactionHistoryChartProps) => {
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

    const getData = () => {
        // return the data in the format needed for the Line component
        return {
            labels: getMonthLabels(),
            datasets: [
                {
                    label: "Total",
                    backgroundColor: props.account.colour,
                    data: getAmountsPerMonth()
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
        scales: {
            yAxes: [
                {
                    display: true,
                    ticks: {
                        beginAtZero: true
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
