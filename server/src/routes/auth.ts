import * as express from "express";
import * as bcrypt from "bcrypt";
import { createUser, User } from "../models/user";

const router = express.Router();

router.get("/signed_in", (req, res) => {
    res.send(typeof req.session !== "undefined" && typeof req.session.username !== "undefined");
});

router.post("/register", async (req, res) => {
    // validate
    const errors = [];
    if (typeof req.body.username === "undefined" || req.body.username.length < 5) {
        errors.push("Please enter a username with at least 5 characters.");
    } else if (await User.findOne({username: req.body.username})) {
        errors.push("A user that that username already exists.");
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
    await new User(createUser(req.body.username, await bcrypt.hash(req.body.password, 10))).save();
    req.session.username = req.body.username;
    res.sendStatus(200);
});

router.post("/sign_in", async (req, res) => {
    // validate
    if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined") {
        return res.status(400).send(["Incorrect username/password."]);
    }

    // check if username exists and password compares to hash
    const user = await User.findOne({username: req.body.username});
    if (!user || !(await bcrypt.compare(req.body.password, user.get("password")))) {
        return res.status(400).send(["Incorrect username/password."]);
    }

    req.session.username = req.body.username;
    res.sendStatus(200);
});

router.post("/sign_out", (req, res) => {
    req.session.destroy(() => res.sendStatus(200));
});

export default router;
