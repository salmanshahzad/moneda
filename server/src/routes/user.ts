import express from "express";
import db from "../../db";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/user", async (req, res) => {
    // ensure user is signed in
    if (typeof req.session === "undefined" || typeof req.session.username === "undefined") {
        return res.sendStatus(401);
    }

    const userId = (await db("users").select("id").where({username: req.session.username}))[0].id;
    const user = {
        username: req.session.username,
        income: await db("income").select().where({user_id: userId}).orderBy("name"),
        expenses: await db("expenses").select().where({user_id: userId}).orderBy("name"),
        transactions: await db("transactions").select().where({user_id: userId}).orderBy("date", "desc")
    };
    res.send(user);
});

router.post("/add_transaction", async (req, res) => {
    // ensure user is signed in
    if (typeof req.session === "undefined" || typeof req.session.username === "undefined") {
        return res.sendStatus(401);
    }

    // validate
    const errors = [];
    if (typeof req.body.account === "undefined") {
        errors.push("Please enter an account name.");
    }

    if (typeof req.body.amount !== "number" || req.body.amount <= 0) {
        errors.push("Please enter a positive amount.");
    }

    if (typeof req.body.type === "undefined" || (req.body.type !== "income" && req.body.type !== "expenses")) {
        errors.push("Please enter income or expenses as the type.");
    }

    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    // check that the account exists
    const userId = (await db("users").select("id").where({username: req.session.username}))[0].id;
    const rows = await db(req.body.type).select().where({user_id: userId, name: req.body.account});
    if (rows.length === 0) {
        return res.status(400).send(["Account does not exist."]);
    }

    // add the transaction
    await db("transactions").insert({
        user_id: userId,
        account_id: (await db(req.body.type).select("id").where({user_id: userId, name: req.body.account}))[0].id,
        amount: req.body.amount,
        date: new Date().getTime(),
        note: req.body.note || ""
    });

    // update income or expenses amounts
    if (req.body.type === "income") {
        const income = (await db("income").select("income").where({user_id: userId, name: req.body.account}))[0].income;
        await db("income").update({income: income + req.body.amount}).where({user_id: userId, name: req.body.account});
    } else {
        const spent = (await db("expenses").select("spent").where({user_id: userId, name: req.body.account}))[0].spent;
        await db("expenses").update({spent: spent + req.body.amount}).where({user_id: userId, name: req.body.account});
    }
    res.sendStatus(200);
});

router.post("/update_user", async (req, res) => {
    // ensure user is signed in
    if (typeof req.session === "undefined" || typeof req.session.username === "undefined") {
        return res.sendStatus(401);
    }

    // validate
    if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined" || typeof req.body.confirmPassword === "undefined" || typeof req.body.currentPassword === "undefined") {
        return res.status(400).send(["Please enter a username, password, confirm password, and current password."]);
    }
    const errors = [];
    // if username is not blank or username and not the same as before, check if already exists
    if (req.body.username !== "" && req.body.username !== req.session.username) {
        if (req.body.username.length < 5) {
            errors.push("Please enter a username with at least 5 characters.");
        } else {
            const exists = (await db("users").select("username").where({username: req.body.username})).length > 0;
            if (exists) {
                errors.push("A user with that username already exits.");
            }
        }
    }

    if (req.body.password !== "") {
        if (req.body.password.length < 8) {
            errors.push("Please enter a password with at least 8 characters.");
        } else if (req.body.confirmPassword !== req.body.password) {
            errors.push("Passwords do not match.");
        }
    }

    // check current password against hash
    const hash = (await db("users").select("password").where({username: req.session.username}))[0].password;
    const match = await bcrypt.compare(req.body.currentPassword, hash);
    if (!match) {
        errors.push("Incorrect password.");
    }

    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    if (req.body.username !== "" && req.body.username !== req.session.username) {
        await db("users").update({username: req.body.username}).where({username: req.session.username});
        req.session.username = req.body.username;
    }

    if (req.body.password !== "") {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db("users").update({password: hashedPassword}).where({username: req.session.username});
    }
    
    res.sendStatus(200);
});

export default router;
