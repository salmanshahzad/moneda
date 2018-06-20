import express from "express";
import db from "../../db";

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

export default router;
