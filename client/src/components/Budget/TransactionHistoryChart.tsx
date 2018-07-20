import React from "react";
import { Income, Expense, Transaction } from "../../../../user";
import { Line } from "react-chartjs-2";

interface TransactionHistoryChartProps {
    account: Income | Expense;
    transactions: Transaction[];
    monthsToShow: number;
}

export default (props: TransactionHistoryChartProps) => {
    const getMonthLabels = (): string[] => {
        // return month strings for the last props.monthsToShow months
        const currentMonth = new Date().getMonth();
        const monthNumbers = [currentMonth];
        for (let i = 1; i < props.monthsToShow; i++) {
            monthNumbers.push((currentMonth - i) % 12);
        }
        const convertMonthNumberToName = (num: number) => new Date(2018, num).toLocaleString("en-us", {month: "long"});
        return monthNumbers.reverse().map(num => convertMonthNumberToName(num));
    };

    const getAmountsPerMonth = (): number[] => {
        // return the total amounts for the last props.monthsToShow months
        const amounts = new Array<number>(props.monthsToShow).fill(0);
        let currentMonth = new Date().getMonth();
        let pointer = 0;
        for (let i = 0; i < props.transactions.length; i++) {
            if (pointer > props.monthsToShow - 1) {
                break;
            }
            const month = new Date(props.transactions[i].date).getMonth();
            if (month < currentMonth) {
                // increment the pointer by the difference (how many months back we went)
                pointer += currentMonth - month;
            } else if (month > currentMonth) {
                // went back one year, add 11 to pointer to deal with wrapping
                pointer += 11 + currentMonth - month;
            }
            amounts[pointer] += props.transactions[i].amount;
            currentMonth = month;
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
