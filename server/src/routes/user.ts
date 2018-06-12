import * as express from "express";
import { User } from "../models/user";

const router = express.Router();

router.get("/user", (req, res) => {
    if (typeof req.session === "undefined" || typeof req.session.username === "undefined") {
        return res.sendStatus(401);
    }
    User.findOne({username: req.session.username}).then(doc => res.send(doc));
});

export default router;
