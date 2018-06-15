import mongoose from "mongoose";
import { Expense, User as UserModel } from "../../../user";

const generateRandomColour = (): string => {
    const letters = "0123456789ABCDEF";
    let colour = "#";
    for (let i = 0; i < 6; i++) {
        colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
};

const createExpense = (name: string): Expense => {
    return {
        name,
        colour: generateRandomColour(),
        spent: 0,
        budget: 0,
        transactions: []
    };
};

export const createUser = (username: string, password: string): UserModel => {
    return {
        username,
        password,
        income: [
            {
                name: "Primary Income",
                colour: generateRandomColour(),
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
