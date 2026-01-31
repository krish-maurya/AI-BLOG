import jwt from "jsonwebtoken";
import { Request, Response ,NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
                role: string;
                name: string;
            };
        }
    }
}

const userAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {
        email: string;
        role: string;
        name: string;
    };

    // Check if role is USER
    console.log(decoded)
    if (decoded.role !== 'USER') {
        return res.status(403).json({ 
            success: false, 
            message: 'Only users with USER role can access this resource' 
        });
    }

    // Continue with your logic
    req.user = decoded;
    next();
    } catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: "Invalid token" });
        }
    }
}

export default userAuth;