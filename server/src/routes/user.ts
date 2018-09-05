import { Router } from "express";
import moment from "moment";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import verifyToken from "../verifyToken";
import db from "../../db";
import { generateRandomColour, createExpense, expenses } from "../userUtils";

const router = Router();

router.get("/user", verifyToken, async (req, res) => {
    const monthStart = moment().startOf("month").valueOf();
    const monthEnd = moment().endOf("month").valueOf();

    const username = (await db("user").select("username").where({ id: req["user"].id }))[0].username;

    const income = await db("category").select().where({ user_id: req["user"].id, type: "income" }).orderBy("name");
    for (const i of income) {
        i.income = (await db("transaction").sum("amount").where({ user_id: req["user"].id, category_id: i.id, upcoming: false }).andWhereBetween("date", [monthStart, monthEnd]))[0].sum || 0;
    }

    const expenses = await db("category").select().where({ user_id: req["user"].id, type: "expense" }).orderBy("name");
    for (const e of expenses) {
        e.spent = (await db("transaction").sum("amount").where({ user_id: req["user"].id, category_id: e.id, upcoming: false }).andWhereBetween("date", [monthStart, monthEnd]))[0].sum || 0;
    }

    const user = {
        username,
        income,
        expenses,
        transactions: await db("transaction").select().where({ user_id: req["user"].id, upcoming: false }).orderBy("date", "desc"),
        upcomingTransactions: await db("transaction").select().where({ user_id: req["user"].id, upcoming: true }).orderBy("date", "asc")
    };
    res.send({ user });
});

router.post("/user", async (req, res) => {
    // validate required parameters
    const errors = [];
    if (typeof req.body.username !== "string" || req.body.username.indexOf(" ") > -1) {
        errors.push("Username cannot be blank or contain spaces.");
    }

    if (typeof req.body.password !== "string" || req.body.password.length < 8) {
        errors.push("Password must contain at least eight characters.");
    } else if (typeof req.body.confirmPassword !== "string" || req.body.confirmPassword !== req.body.password) {
        errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
        return res.status(400).send({ errors });
    }

    // ensure username does not already exist    
    const usernameExists = (await db("user").select().where({ username: req.body.username })).length > 0;
    if (usernameExists) {
        return res.status(422).send({ errors: ["A user with that username already exists."] });
    }

    // hash password and insert
    const hashedPassword = await hash(req.body.password, 10);
    const userId = (await db("user").insert({
        username: req.body.username,
        password: hashedPassword
    }, "id"))[0];

    await db("category").insert({
        user_id: userId,
        name: "Primary Income",
        colour: generateRandomColour(),
        type: "income"
    });

    for (let i = 0; i < expenses.length; i++) {
        await db("category").insert(createExpense(userId, expenses[i]));
    }

    // send token
    const token = await sign({ id: userId, password: hashedPassword }, process.env.SECRET, { expiresIn: "12h" });
    res.send({ token });
});

router.put("/user", verifyToken, async (req, res) => {
    // validate required parameters
    const errors = [];
    if (typeof req.body.username !== "string" || req.body.username.trim() === "") {
        errors.push("Username cannot be blank or contain spaces.");
    }

    if (typeof req.body.currentPassword !== "string") {
        errors.push("Current password is required.");
    }

    // if a new password is given, ensure it has a matching confirmation
    if (typeof req.body.newPassword === "string") {
        if (req.body.newPassword.length < 8) {
            errors.push("New password must contain at least eight characters.");
        }

        if (typeof req.body.confirmNewPassword !== "string" || req.body.confirmNewPassword !== req.body.newPassword) {
            errors.push("New passwords do not match.");
        }
    }

    if (errors.length > 0) {
        return res.status(400).send({ errors });
    }

    // if the username is not the same, check if it already exists
    const currentUsername = (await db("user").select("username").where({ id: req["user"].id }))[0].username;
    if (req.body.username !== currentUsername) {
        const usernameExists = (await db("user").select("username").where({ username: req.body.username })).length > 0;
        if (usernameExists) {
            errors.push("A user with that username already exists.");
        }
    }

    // check current password against hash
    const match = await compare(req.body.currentPassword, req["user"].password);
    if (!match) {
        errors.push("Incorrect password.");
    }

    if (errors.length > 0) {
        return res.status(422).send({ errors });
    }

    // if the username is not the same, update it
    if (req.body.username !== currentUsername) {
        await db("user").update({ username: req.body.username }).where({ id: req["user"].id });
    }

    // if new password is given, update it
    let hashedPassword = req["user"].password;
    if (typeof req.body.newPassword === "string") {
        hashedPassword = await hash(req.body.newPassword, 10);
        await db("user").update({ password: hashedPassword }).where({ id: req["user"].id });
    }

    // send a new token
    const token = await sign({ id: req["user"].id, password: hashedPassword }, process.env.SECRET, { expiresIn: "12h" });
    res.send({ token });
});

router.delete("/user", verifyToken, async (req, res) => {
    await db("user").delete().where({ id: req["user"].id });
    await db("category").delete().where({ user_id: req["user"].id });
    await db("transaction").delete().where({ user_id: req["user"].id });
    res.sendStatus(204);
});

export default router;
