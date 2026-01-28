import jwt from "jsonwebtoken";
import { Request, Response } from "express"

export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ succes: false, message: "Invalid admin credentials" })
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT secret not defined");
        }
        const token = jwt.sign({ email }, jwtSecret);

        res.json({ success: true, token });

    } catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        } else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
}