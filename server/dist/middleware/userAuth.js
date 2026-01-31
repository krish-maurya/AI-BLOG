import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
const userAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }
    try {
        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
        console.log("User from database:", user);
        // Check role from database (case-insensitive)
        if (user.role.toLowerCase() !== 'user') {
            return res.status(403).json({
                success: false,
                message: 'Only users with USER role can access this resource'
            });
        }
        // Attach user to request with database values
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        };
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }
    }
};
export default userAuth;
