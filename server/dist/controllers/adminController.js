import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ succes: false, message: "Invalid admin credentials" });
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT secret not defined");
        }
        const token = jwt.sign({ email }, jwtSecret);
        res.json({ success: true, token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
};
export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        res.json({ success: true, blogs });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
};
export const getAllCommentsAdmin = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                blog: true, // Include related blog data
            },
        });
        res.json({ success: true, comments });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
};
export const getDashboardData = async (req, res) => {
    try {
        const recentBlogs = await prisma.blog.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 5, // Get the 5 most recent blogs
        });
        const blogs = await prisma.blog.count();
        const comments = await prisma.comment.count();
        const draft = await prisma.blog.count({
            where: { isPublished: false }
        });
        const dashboardData = {
            recentBlogs,
            blogs,
            comments,
            draft
        };
        res.json({ success: true, dashboardData });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
};
export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await prisma.comment.delete({
            where: { id }
        });
        res.json({ success: true, message: "Comment deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
};
export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await prisma.comment.update({
            where: { id },
            data: { isApproved: true }
        });
        res.json({ success: true, message: "Comment approved successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        }
        else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
};
