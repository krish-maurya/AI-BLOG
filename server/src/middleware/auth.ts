import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'No token provided' 
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            email: string;
            role: string;
            name: string;
        };

        // Fetch user from database to get current role
        const user = await prisma.user.findUnique({
            where: { email: decoded.email },
            select: { id: true, email: true, role: true, name: true }
        });

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        // Check role from database (case-insensitive)
        if (user.role.toLowerCase() === 'user') {
            return res.json({ 
                success: false, 
                message: 'Users are not allowed to access this route' 
            });
        }
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: "Invalid token" });
        }
    }
}

export default auth;