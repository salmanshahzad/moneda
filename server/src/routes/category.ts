import { Router } from "express";
import moment from "moment";
import verifyToken from "../verifyToken";
import db from "../../db";

const router = Router();

router.get("/category", verifyToken, async (req, res) => {
    const monthStart = moment().startOf("month").valueOf();
    const monthEnd = moment().endOf("month").valueOf();

    const income = await db("category").select().where({ user_id: req["user"].id, type: "income" }).orderBy("name");
    for (let i = 0; i < income.length; i++) {
        income[i].income = (await db("transaction").sum("amount").where({ user_id: req["user"].id, category_id: income[i].id, upcoming: false }).andWhereBetween("date", [monthStart, monthEnd]))[0].sum || 0;
    }

    const expenses = await db("category").select().where({ user_id: req["user"].id, type: "expense" }).orderBy("name");
    for (let i = 0; i < expenses.length; i++) {
        expenses[i].spent = (await db("transaction").sum("amount").where({ user_id: req["user"].id, category_id: expenses[i].id, upcoming: false }).andWhereBetween("date", [monthStart, monthEnd]))[0].sum || 0;
    }

    res.send({ income, expenses });
});

router.get("/category/:id", verifyToken, async (req, res) => {
    const monthStart = moment().startOf("month").valueOf();
    const monthEnd = moment().endOf("month").valueOf();

    // check valid uuid
    if (!/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(req.params.id)) {
        return res.status(400).send({ errors: ["Invalid id."] });
    }

    // check account exist
    const rows = await db("category").select().where({ user_id: req["user"].id, id: req.params.id });
    if (rows.length === 0) {
        return res.status(404).send({ errors: ["A category with that id does not exist."] });
    }

    const category = rows[0];
    category[category.type === "income" ? "income" : "spent"] = (await db("transaction").sum("amount").where({ user_id: req["user"].id, category_id: category.id, upcoming: false }).andWhereBetween("date", [monthStart, monthEnd]))[0].sum || 0;

    res.send({ category });
});

router.post("/category", verifyToken, async (req, res) => {
    // validate required parameters
    const errors = [];
    if (typeof req.body.type !== "string" || (req.body.type !== "income" && req.body.type !== "expense")) {
        errors.push("Type must be income or expense.");
    }

    if (typeof req.body.name !== "string" || req.body.name.length === 0) {
        errors.push("Name is required.");
    }

    if (typeof req.body.colour !== "string" || !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(req.body.colour)) {
        errors.push("Colour must be a hex string.");
    }

    // budget must be given if type is expenses
    if (req.body.type === "expense" && (typeof req.body.budget !== "number" || req.body.budget < 0)) {
        errors.push("Budget must be non-negative.");
    }

    if (errors.length > 0) {
        return res.status(400).send({ errors });
    }

    // check if name already exists
    const rows = await db("category").select("name").where({ user_id: req["user"].id, name: req.body.name, type: req.body.type });
    if (rows.length > 0) {
        return res.status(422).send({ errors: ["A category with that name already exists."] });
    }

    // insert
    const category = (await db("category").insert({ user_id: req["user"].id, name: req.body.name, colour: req.body.colour.toUpperCase(), budget: req.body.budget, type: req.body.type }, ["id", "user_id", "name", "colour", "budget", "type"]))[0];
    res.send({ category });
});

router.put("/category/:id", verifyToken, async (req, res) => {
    // validate required parameters
    const errors = [];
    if (!/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(req.params.id)) {
        errors.push("Invalid id.");
    }

    if (typeof req.body.type !== "string" || (req.body.type !== "income" && req.body.type !== "expense")) {
        errors.push("Type must be income or expense.");
    }

    if (typeof req.body.name !== "string" || req.body.name.length === 0) {
        errors.push("Name is required.");
    }

    if (typeof req.body.colour !== "string" || !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(req.body.colour)) {
        errors.push("Colour must be a hex string.");
    }

    // budget must be given if type is expenses
    if (req.body.type === "expense" && (typeof req.body.budget !== "number" || req.body.budget < 0)) {
        errors.push("Budget must be non-negative.");
    }

    if (errors.length > 0) {
        return res.status(400).send({ errors });
    }

    // check id exists
    const categoryExists = (await db("category").select("id").where({ user_id: req["user"].id, id: req.params.id })).length > 0;
    if (!categoryExists) {
        return res.status(404).send({ errors: ["A category with that id does not exist."] });
    }

    // check name does not exist
    const rows = await db("category").select("id", "name").where({ user_id: req["user"].id, name: req.body.name, type: req.body.type });
    if (rows.length > 0 && rows[0].id !== req.params.id) {
        return res.status(422).send({ errors: ["A category with that name already exists."] });
    }

    // update
    const category = (await db("category").update({ name: req.body.name, colour: req.body.colour.toUpperCase(), budget: req.body.budget, type: req.body.type }, ["id", "user_id", "name", "colour", "budget", "type"]).where({ user_id: req["user"].id, id: req.params.id }))[0];
    res.send({ category });
});

router.delete("/category/:id", verifyToken, async (req, res) => {
    // check valid uuid
    if (!/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(req.params.id)) {
        return res.status(400).send({ errors: ["Invalid id."] });
    }

    // check id exists
    const categoryExists = (await db("category").select().where({ user_id: req["user"].id, id: req.params.id })).length > 0;
    if (!categoryExists) {
        return res.status(404).send({ errors: ["A category with that id does not exist."] });
    }

    // delete
    await db("category").delete().where({ user_id: req["user"].id, id: req.params.id });
    await db("transaction").delete().where({ user_id: req["user"].id, category_id: req.params.id });
    res.sendStatus(204);
});

export default router;
