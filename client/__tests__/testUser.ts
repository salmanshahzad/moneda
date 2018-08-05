import { User } from "../../user";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

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
            date: new Date(currentYear, 0, 1).getTime()
        },
        {
            id: "2",
            account_id: "2",
            amount: 2,
            note: "Test 2",
            date: new Date(currentYear, currentMonth, 1).getTime()
        },
        {
            id: "3",
            account_id: "3",
            amount: 3,
            note: "Test 3",
            date: new Date(currentYear, currentMonth, 2).getTime()
        }
    ]
};

export default user;
