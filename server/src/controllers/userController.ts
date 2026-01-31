import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Request, Response } from "express"
import { prisma } from "../lib/prisma.js";

export const userCreate = async (req: Request, res: Response) => {
    try {
        const { email, password, name, role } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })
        if (existingUser) {
            return res.json({ success: false, message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role
            }
        })
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT secret not defined");
        }
        const token = jwt.sign({ email , role , name  }, jwtSecret);

        res.json({ success: true,message: 'User Created successful', token });

    } catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        } else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT secret not defined");
        }
        const token = jwt.sign({ email: user.email, role: user.role , name:user.name }, jwtSecret);

        res.json({ success: true, message: 'Login successful',token });

    } catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        } else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
}