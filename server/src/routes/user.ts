import express from "express";
import checkSignedIn from "../checkSignedInMiddleware";
import db from "../../db";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/user", checkSignedIn, async (req, res) => {
    const username = (await db("users").select("username").where({id: req.session.userId}))[0].username;
    const user = {
        username,
        income: await db("income").select().where({user_id: req.session.userId}).orderBy("name"),
        expenses: await db("expenses").select().where({user_id: req.session.userId}).orderBy("name"),
        transactions: await db("transactions").select().where({user_id: req.session.userId}).orderBy("date", "desc")
    };
    res.send(user);
});

router.post("/add_transaction", checkSignedIn ,async (req, res) => {
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
    const rows = await db(req.body.type).select().where({user_id: req.session.userId, name: req.body.account});
    if (rows.length === 0) {
        return res.status(400).send(["Account does not exist."]);
    }

    // add the transaction
    await db("transactions").insert({
        user_id: req.session.userId,
        account_id: (await db(req.body.type).select("id").where({user_id: req.session.userId, name: req.body.account}))[0].id,
        amount: req.body.amount,
        date: new Date().getTime(),
        note: req.body.note || ""
    });

    // update income or expenses amounts
    if (req.body.type === "income") {
        const income = (await db("income").select("income").where({user_id: req.session.userId, name: req.body.account}))[0].income;
        await db("income").update({income: income + req.body.amount}).where({user_id: req.session.userId, name: req.body.account});
    } else {
        const spent = (await db("expenses").select("spent").where({user_id: req.session.userId, name: req.body.account}))[0].spent;
        await db("expenses").update({spent: spent + req.body.amount}).where({user_id: req.session.userId, name: req.body.account});
    }
    res.sendStatus(200);
});

router.post("/delete_transaction", checkSignedIn, async (req, res) => {
    // validate
    if (typeof req.body.id === "undefined" || !/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(req.body.id)) {
        return res.status(400).send(["Please enter a valid transaction id."]);
    }

    const rows = await db("transactions").select("account_id", "amount", "date").where({user_id: req.session.userId, id: req.body.id});
    if (rows.length > 0) {
        const accountId = rows[0].account_id;
        const amount = rows[0].amount;
        const date = rows[0].date;
        await db("transactions").delete().where({user_id: req.session.userId, id: req.body.id});

        const transactionDate = new Date(date);
        const today = new Date();

        if (transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear()) {
            // check whether the account is an expense or income
            let account, type;
            let exp = await db("expenses").select("spent").where({user_id: req.session.userId, id: accountId});
            if (exp.length > 0) {
                account = exp[0];
                type = "expenses";
            }
            let inc = await db("income").select("income").where({user_id: req.session.userId, id: accountId});
            if (inc.length > 0) {
                account = inc[0];
                type = "income";
            }

            // adjust amount
            if (type === "income") {
                await db("income").update({income: account.income - amount}).where({user_id: req.session.userId, id: accountId});
            } else if (type === "expenses") {
                await db("expenses").update({spent: account.spent - amount}).where({user_id: req.session.userId, id: accountId});
            }
        }
    }
    res.sendStatus(200);
});

router.post("/update_user", checkSignedIn, async (req, res) => {
    // validate
    if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined" || typeof req.body.confirmPassword === "undefined" || typeof req.body.currentPassword === "undefined") {
        return res.status(400).send(["Please enter a username, password, confirm password, and current password."]);
    }

    const currentUsername = (await db("users").select("username").where({id: req.session.userId}))[0].username;
    const errors = [];
    // if username is not blank or username and not the same as before, check if already exists
    if (req.body.username !== "" && req.body.username !== currentUsername) {
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
    const hash = (await db("users").select("password").where({id: req.session.userId}))[0].password;
    const match = await bcrypt.compare(req.body.currentPassword, hash);
    if (!match) {
        errors.push("Incorrect password.");
    }

    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    if (req.body.username !== "" && req.body.username !== currentUsername) {
        await db("users").update({username: req.body.username}).where({id: req.session.userId});
        req.session.username = req.body.username;
    }

    if (req.body.password !== "") {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db("users").update({password: hashedPassword}).where({id: req.session.userId});
    }
    
    res.sendStatus(200);
});

router.post("/delete_user", checkSignedIn, async (req, res) => {
    await db("users").delete().where({id: req.session.userId});
    await db("income").delete().where({user_id: req.session.userId});
    await db("expenses").delete().where({user_id: req.session.userId});
    await db("transactions").delete().where({user_id: req.session.userId});
    req.session.destroy(() => res.sendStatus(200));
});

router.post("/update_account", checkSignedIn, async (req, res) => {
    // validate
    const errors = [];
    if (typeof req.body.type === "undefined" || (req.body.type !== "income" && req.body.type !== "expenses")) {
        errors.push("Please enter income or expenses as the type.");
    }

    if (typeof req.body.id === "undefined" || !/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(req.body.id)) {
        errors.push("Please enter a valid account id.");
    }
    
    if (typeof req.body.name === "undefined" || (typeof req.body.name === "string" && req.body.name.length === 0)) {
        errors.push("Please enter the new account name.");
    }

    if (typeof req.body.colour === "undefined" || (typeof req.body.colour === "string" && req.body.colour.indexOf("#") !== 0)) {
        errors.push("Please enter the new account colour as a hex string.");
    }

    // budget must be given if type is expenses
    if (req.body.type === "expenses" && (typeof req.body.budget !== "number" || req.body.budget < 0)) {
        errors.push("Please enter a non-negative budget.");
    }

    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    // check that account with id exists
    const accountExists = (await db(req.body.type).select().where({user_id: req.session.userId, id: req.body.id})).length > 0;
    if (!accountExists) {
        errors.push("An account with that id does not exist.");
    }

    const rows = await db(req.body.type).select("id", "name").where({user_id: req.session.userId, name: req.body.name});
    if (rows.length > 0 && rows[0].id !== req.body.id && rows[0].name === req.body.name) {
        errors.push("An account with that name already exists.");
    }

    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    if (req.body.type === "income") {
        await db("income").update({name: req.body.name, colour: req.body.colour.toUpperCase()}).where({user_id: req.session.userId, id: req.body.id});
    } else {
        await db("expenses").update({name: req.body.name, colour: req.body.colour.toUpperCase(), budget: req.body.budget}).where({user_id: req.session.userId, id: req.body.id});
    }
    res.sendStatus(200);
});

router.post("/add_account", checkSignedIn, async (req, res) => {
    // validate
    const errors = [];
    if (typeof req.body.type === "undefined" || (req.body.type !== "income" && req.body.type !== "expenses")) {
        errors.push("Please enter income or expenses as the type.");
    }
    
    if (typeof req.body.name === "undefined" || (typeof req.body.name === "string" && req.body.name.length === 0)) {
        errors.push("Please enter the new account name.");
    }

    if (typeof req.body.colour === "undefined" || (typeof req.body.colour === "string" && req.body.colour.indexOf("#") !== 0)) {
        errors.push("Please enter the new account colour as a hex string.");
    }

    // budget must be given if type is expenses
    if (req.body.type === "expenses" && (typeof req.body.budget !== "number" || req.body.budget < 0)) {
        errors.push("Please enter a non-negative budget.");
    }

    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    const rows = await db(req.body.type).select("name").where({user_id: req.session.userId, name: req.body.name});
    if (rows.length > 0 && rows[0].name === req.body.name) {
        errors.push("An account with that name already exists.");
    }

    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    if (req.body.type === "income") {
        await db("income").insert({user_id: req.session.userId, name: req.body.name, colour: req.body.colour.toUpperCase(), income: 0});
    } else {
        await db("expenses").insert({user_id: req.session.userId, name: req.body.name, colour: req.body.colour.toUpperCase(), spent: 0, budget: req.body.budget});
    }
    res.sendStatus(200);
});

router.post("/delete_account", checkSignedIn, async (req, res) => {
    // validate
    const errors = [];
    if (typeof req.body.type === "undefined" || (req.body.type !== "income" && req.body.type !== "expenses")) {
        errors.push("Please enter income or expenses as the type.");
    }

    if (typeof req.body.id === "undefined" || !/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(req.body.id)) {
        errors.push("Please enter a valid account id.");
    }

    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    // check that account with id exists
    const accountExists = (await db(req.body.type).select().where({user_id: req.session.userId, id: req.body.id})).length > 0;
    if (!accountExists) {
        errors.push("An account with that id does not exist.");
    }

    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    await db(req.body.type).delete().where({user_id: req.session.userId, id: req.body.id});
    await db("transactions").delete().where({user_id: req.session.userId, account_id: req.body.id});
    res.sendStatus(200);
});

export default router;
