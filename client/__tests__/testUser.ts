import { User } from "../../user";

const user: User = {
    username: "test",
    password: "test",
    income: [
        {
            name: "Test Income 1",
            colour: "#FF0000",
            income: 0,
            transactions: []
        }
    ],
    expenses: [
        {
            name: "Test Expense 1",
            colour: "#FF0000",
            spent: 0,
            budget: 0,
            transactions: []
        },
        {
            name: "Test Expense 2",
            colour: "#FF0000",
            spent: 0,
            budget: 0,
            transactions: []
        }
    ]
};

export default user;
