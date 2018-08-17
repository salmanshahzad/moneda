import { User } from "../../user";
import moment from "moment";

const user: User = {
    username: "test",
    income: [
        {
            id: "1",
            name: "Test Income 1",
            colour: "#FF0000",
            income: 0
        }
    ],
    expenses: [
        {
            id: "2",
            name: "Test Expense 1",
            colour: "#FF0000",
            spent: 0,
            budget: 0
        },
        {
            id: "3",
            name: "Test Expense 2",
            colour: "#FF0000",
            spent: 0,
            budget: 0
        }
    ],
    transactions: [
        {
            id: "1",
            account_id: "1",
            amount: 1,
            note: "Test 1",
            date: moment().startOf("month").subtract(1, "months").valueOf()
        },
        {
            id: "2",
            account_id: "2",
            amount: 2,
            note: "Test 2",
            date: moment().startOf("month").valueOf()
        },
        {
            id: "3",
            account_id: "3",
            amount: 3,
            note: "Test 3",
            date: moment().startOf("day").valueOf()
        }
    ],
    upcomingTransactions: [
        {
            id: "4",
            account_id: "2",
            amount: 4,
            note: "Test 4",
            date: moment().startOf("day").add(1, "day").valueOf()
        }
    ]
};

export default user;
