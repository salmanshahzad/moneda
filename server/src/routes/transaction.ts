import { Router } from "express";
import moment from "moment";
import verifyToken from "../verifyToken";
import db from "../../db";

const router = Router();

router.get("/transaction", verifyToken, async (req, res) => {
    const transactions = await db("transaction").select().where({ user_id: req["user"].id, upcoming: req.query.upcoming }).orderBy("date", req.query.upcoming ? "asc" : "desc");
    res.send({ transactions });
});

router.get("/transaction/:id", verifyToken, async (req, res) => {
    // check valid uuid
    if (!/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(req.params.id)) {
        return res.status(400).send({ errors: ["Invalid id."] });
    }

    // check transaction exist
    const rows = await db("transaction").select().where({ user_id: req["user"].id, id: req.params.id });
    if (rows.length === 0) {
        return res.status(404).send({ errors: ["A transaction with that id does not exist."] });
    }

    const transaction = rows[0];
    res.send({ transaction });
});

router.post("/transaction", verifyToken, async (req, res) => {
    // validate required parameters
    const errors = [];
    if (!/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(req.body.categoryId)) {
        errors.push("Invalid category id.");
    }

    if (typeof req.body.amount !== "number" || req.body.amount <= 0) {
        errors.push("Amount must be positive.");
    }

    if (errors.length > 0) {
        return res.status(400).send({ errors });
    }

    // add the transaction
    const today = moment().startOf("day").valueOf();
    const transaction = (await db("transaction").insert({
        user_id: req["user"].id,
        category_id: req.body.categoryId,
        amount: req.body.amount,
        date: req.body.date || today,
        note: req.body.note || "",
        upcoming: (req.body.date || today) > today
    }, ["id", "user_id", "category_id", "amount", "date", "note", "upcoming"]))[0];
    res.send({ transaction });
});

// currently only used for paying upcoming transactions
router.put("/transaction/:id", verifyToken, async (req, res) => {
    // check valid uuid
    if (!/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(req.params.id)) {
        return res.status(400).send({ errors: ["Invalid id."] });
    }

    // check transaction exist
    const rows = await db("transaction").select().where({ user_id: req["user"].id, id: req.params.id });
    if (rows.length === 0) {
        return res.status(404).send({ errors: ["A transaction with that id does not exist."] });
    }

    const transaction = (await db("transaction").update({ date: moment().startOf("day").valueOf(), upcoming: false }, ["id", "user_id", "category_id", "amount", "date", "note", "upcoming"]).where({ id: req.params.id }))[0];
    res.send({ transaction });
});

router.delete("/transaction/:id", verifyToken, async (req, res) => {
    // check valid uuid
    if (!/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(req.params.id)) {
        return res.status(400).send({ errors: ["Invalid id."] });
    }

    // check transaction exist
    const rows = await db("transaction").select().where({ user_id: req["user"].id, id: req.params.id });
    if (rows.length === 0) {
        return res.status(404).send({ errors: ["A transaction with that id does not exist."] });
    }

    await db("transaction").delete().where({ user_id: req["user"].id, id: req.params.id });
    res.sendStatus(204);
});

export default router;
