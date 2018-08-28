import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import db from "../db";

export default async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf("Bearer ") === -1) {
        return res.status(401).send({ errors: ["No authorization token."] });
    }

    const token = req.headers.authorization.split(" ")[1];
    let payload;
    try {
        payload = verify(token, process.env.SECRET);
    } catch {
        return res.status(401).send({ errors: ["Invalid token."] });
    }

    if (!(payload.id || payload.password)) {
        return res.status(401).send({ errors: ["Invalid token."] });
    }

    const rows = await db("user").select("password").where({ id: payload.id });
    if (rows.length === 0 || payload.password !== rows[0].password) {
        return res.status(401).send({ errors: ["Invalid token."] });
    }

    req["user"] = payload;
    next();
};
