import * as express from "express";
import { User } from "../models/user";

const router = express.Router();

router.get("/user", (req, res) => {
    // ensure user is signed in
    if (typeof req.session === "undefined" || typeof req.session.username === "undefined") {
        return res.sendStatus(401);
    }
    User.findOne({username: req.session.username}).then(doc => res.send(doc));
});

router.post("/add_transaction", (req, res) => {
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

    User.findOne({username: req.session.username}).then(doc => {
        // check that the account exists
        const accounts = doc.get(req.body.type);
        let index = -1;
        accounts.forEach((account, i) => {
            if (account.name === req.body.account) {
                index = i;
            } 
        });
        if (index === -1) {
            return res.status(400).send(["Account does not exist."]);
        }

        // add the transaction
        accounts[index].transactions.push({
            account: req.body.account,
            amount: req.body.amount,
            note: req.body.note,
            date: new Date().getTime()
        });
        if (req.body.type === "income") {
            accounts[index].income += req.body.amount;
            User.updateOne({username: req.session.username}, {income: accounts}).then(() => res.sendStatus(200));
        } else {
            accounts[index].spent += req.body.amount;
            User.updateOne({username: req.session.username}, {expenses: accounts}).then(() => res.sendStatus(200));
        }
    });
});

export default router;
