import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const auth = (req: Request, res: Response, next: Function) => {
    const token = req.headers.authorization;
    try {
        jwt.verify(token!, process.env.JWT_SECRET!);
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: "Invalid token" });
        }
    }
}

export default auth;