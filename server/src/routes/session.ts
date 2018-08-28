import { Router } from "express";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import db from "../../db";

const router = Router();

router.post("/session", async (req, res) => {
    // validate required parameters
    if (typeof req.body.username !== "string" || typeof req.body.password !== "string") {
        return res.status(400).send({ errors: ["Incorrect username/password."] });
    }

    // check if username exists
    const rows = await db("user").select("id", "password").where({ username: req.body.username });
    const usernameExists = rows.length > 0;
    if (!usernameExists) {
        return res.status(422).send({ errors: ["Incorrect username/password."] });
    }

    // check if password matches hash
    const passwordMatchesHash = await compare(req.body.password, rows[0].password);
    if (!passwordMatchesHash) {
        return res.status(422).send({ errors: ["Incorrect username/password."] });
    }

    // send token
    const token = await sign({ id: rows[0].id, password: rows[0].password }, process.env.SECRET, { expiresIn: "12h" });
    res.send({ token });
});

export default router;
