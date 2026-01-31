import jwt from "jsonwebtoken";
const userAuth = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Check if role is USER
        if (decoded.role !== 'USER') {
            return res.status(403).json({
                success: false,
                message: 'Only users with USER role can access this resource'
            });
        }
        // Continue with your logic
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: "Invalid token" });
        }
    }
};
export default userAuth;
