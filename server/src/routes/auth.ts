import express from "express";
import bcrypt from "bcrypt";
import db from "../../db";

const router = express.Router();

const generateRandomColour = (): string => {
    const letters = "0123456789ABCDEF";
    let colour = "#";
    for (let i = 0; i < 6; i++) {
        colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
};

const createExpense = (userId: string, name: string) => {
    return {
        user_id: userId,
        name,
        colour: generateRandomColour(),
        spent: 0,
        budget: 0
    };
};

const expenses = [
    "Mortgage",
    "Utilities",
    "Home Maintenance",
    "Groceries",
    "Restaurant",
    "Car Payment",
    "Car Maintenance",
    "Gas",
    "Public Transportation",
    "Phone",
    "Travel",
    "Entertainment",
    "Electronics",
    "Gym",
    "Clothing",
    "Childcare",
    "Gifts",
    "Medical",
    "Insurance",
    "Other"
];

router.post("/register", async (req, res) => {
    // validate
    const errors = [];
    if (typeof req.body.username === "undefined" || req.body.username.length < 5) {
        errors.push("Please enter a username with at least 5 characters.");
    } else {
        const rows = await db("users").select().where({username: req.body.username});
        if (rows.length > 0) {
            errors.push("A user that that username already exists.");
        }
    }

    if (typeof req.body.password === "undefined" || req.body.password.length < 8) {
        errors.push("Please enter a password with at least 8 characters.");
    } else if (typeof req.body.confirmPassword === "undefined" || req.body.confirmPassword !== req.body.password) {
        errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
        return res.status(400).send(errors);
    }
    // hash password and insert
    const hash = await bcrypt.hash(req.body.password, 10);
    const userId = (await db("users").insert({
        username: req.body.username,
        password: hash
    }, "id"))[0];
    await db("income").insert({
        user_id: userId,
        name: "Primary Income",
        colour: generateRandomColour(),
        income: 0
    });
    for (let i = 0; i < expenses.length; i++) {
        await db("expenses").insert(createExpense(userId, expenses[i]));
    }
    req.session.username = req.body.username;
    res.sendStatus(200);
});

router.post("/sign_in", async (req, res) => {
    // validate
    if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined") {
        return res.status(400).send(["Incorrect username/password."]);
    }

    // check if username exists and password compares to hash
    const rows = await db("users").select("password").where({username: req.body.username});
    if (rows.length === 0) {
        return res.status(400).send(["Incorrect username/password."]);
    }
    const compareSuccess = await bcrypt.compare(req.body.password, rows[0].password);
    if (!compareSuccess) {
        return res.status(400).send(["Incorrect username/password."]);
    }
    req.session.username = req.body.username;
    res.sendStatus(200);
});

router.post("/sign_out", (req, res) => {
    req.session.destroy(() => res.sendStatus(200));
});

export default router;
