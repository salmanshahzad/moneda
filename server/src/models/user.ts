import * as mongoose from "mongoose";

interface User {
    username: string;
    password: string;
    income: Income[];
    expenses: Expense[];
}

interface Income {
    name: string;
    income: number;
    transactions: Transaction[];
}

interface Expense {
    name: string;
    spent: number;
    budget: number;
    transactions: Transaction[];
}

interface Transaction {
    note: string;
    date: number;
    amount: number;
}

const createExpense = (name: string) => {
    return {
        name,
        spent: 0,
        budget: 0,
        transactions: []
    };
};

export const createUser = (username: string, password: string): User => {
    return {
        username,
        password,
        income: [
            {
                name: "Primary Income",
                income: 0,
                transactions: []
            }
        ],
        expenses: [
            createExpense("Mortgage"),
            createExpense("Utilities"),
            createExpense("Home Maintenance"),
            createExpense("Groceries"),
            createExpense("Restaurant"),
            createExpense("Car Payment"),
            createExpense("Car Maintenance"),
            createExpense("Gas"),
            createExpense("Public Transportation"),
            createExpense("Phone"),
            createExpense("Travel"),
            createExpense("Entertainment"),
            createExpense("Electronics"),
            createExpense("Gym"),
            createExpense("Clothing"),
            createExpense("Childcare"),
            createExpense("Gifts"),
            createExpense("Medical"),
            createExpense("Insurance"),
            createExpense("Other")
        ]
    };
};

export const User = mongoose.model("User", new mongoose.Schema({
    username: String,
    password: String,
    income: Array,
    expenses: Array
}));
