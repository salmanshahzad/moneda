import { User } from "../src/user";
import moment from "moment";

const user: User = {
    username: "test",
    income: [
        {
            id: "1",
            user_id: "s",
            name: "Test Income 1",
            colour: "#FF0000",
            type: "income",
            income: 0
        }
    ],
    expenses: [
        {
            id: "2",
            user_id: "s",
            name: "Test Expense 1",
            colour: "#FF0000",
            type: "expense",
            spent: 0,
            budget: 0
        },
        {
            id: "3",
            user_id: "s",
            name: "Test Expense 2",
            colour: "#FF0000",
            type: "expense",
            spent: 0,
            budget: 0
        }
    ],
    transactions: [
        {
            id: "3",
            user_id: "s",
            category_id: "3",
            amount: 3,
            note: "Test 3",
            date: moment().startOf("day").valueOf(),
            upcoming: false
        },
        {
            id: "2",
            user_id: "s",
            category_id: "2",
            amount: 2,
            note: "Test 2",
            date: moment().startOf("month").valueOf(),
            upcoming: false
        },
        {
            id: "1",
            user_id: "s",
            category_id: "1",
            amount: 1,
            note: "Test 1",
            date: moment().startOf("month").subtract(1, "months").valueOf(),
            upcoming: false
        }
    ],
    upcomingTransactions: [
        {
            id: "4",
            user_id: "s",
            category_id: "2",
            amount: 4,
            note: "Test 4",
            date: moment().startOf("day").add(1, "day").valueOf(),
            upcoming: true
        }
    ],
    categoryInfo: (id: string) => {
        const income = user.income.filter(income => income.id === id);
        if (income.length > 0) {
            return {
                type: "income",
                name: income[0].name
            };
        }
        const expenses = user.expenses.filter(expense => expense.id === id);
        if (expenses.length > 0) {
            return {
                type: "expense",
                name: expenses[0].name
            };
        }
    }
};

export default user;
