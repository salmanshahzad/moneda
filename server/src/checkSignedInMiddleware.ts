import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    if (req.session === undefined || req.session.userId === undefined) {
        res.sendStatus(401);
    } else {
        next();
    }
}
