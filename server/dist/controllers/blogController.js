import fs from "fs";
import imagekit from "../config/ImageKit.js";
import { prisma } from "../lib/prisma.js";
import main from "../config/Gemini.js";
export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, author, ispublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;
        // all field validation
        if (!title || !subTitle || !description || !category || !author) {
            return res.json({ success: false, message: "All fields are required" });
        }
        if (!imageFile) {
            return res.json({ success: false, message: "Image is required" });
        }
        const fileBuffer = fs.readFileSync(imageFile.path);
        const base64String = fileBuffer.toString("base64");
        // Upload image to ImageKit
        const response = await imagekit.files.upload({
            file: base64String,
            fileName: imageFile.originalname,
            folder: "/blogs",
        });
        if (!response.filePath) {
            throw new Error("File path is undefined");
        }
        //opmtimization through ImageKit URL transformation
        const optimizedImageUrl = imagekit.helper.buildSrc({
            src: response.filePath,
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
            transformation: [{ quality: 80, format: "webp", width: 1280 }],
        });
        const image = optimizedImageUrl;
        await prisma.blog.create({
            data: {
                title,
                subTitle,
                description,
                category,
                author,
                image,
                isPublished: ispublished,
            }
        });
        res.json({ success: true, message: "Blog added successfully" });
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
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                isPublished: true
            }
        });
        if (!blogs) {
            res.json({ success: false, message: "no blogs" });
        }
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
export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.json({ success: false, message: "Valid blog id is required" });
        }
        const blog = await prisma.blog.findUnique({
            where: { id }
        });
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, blog });
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
export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        //  Delete related comments FIRST
        await prisma.comment.deleteMany({
            where: { blogId: id }
        });
        await prisma.blog.delete({
            where: { id }
        });
        res.json({ success: true, message: "Blog deleted successfully" });
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
export const togglePublished = async (req, res) => {
    try {
        const { id } = req.body;
        const Blog = await prisma.blog.findUnique({
            where: { id }
        });
        if (!Blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        await prisma.blog.update({
            where: { id },
            data: {
                isPublished: !Blog.isPublished
            }
        });
        res.json({ success: true, message: "Blog status updated successfully" });
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
export const addComment = async (req, res) => {
    try {
        const { blogId, name, content } = req.body;
        await prisma.comment.create({
            data: {
                blog: {
                    connect: { id: blogId }, //  relation connect
                },
                name,
                content
            }
        });
        res.json({ success: true, message: "Comment added for review" });
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
export const getBlogComment = async (req, res) => {
    try {
        const { blogId } = req.body;
        if (!blogId) {
            return res.json({ success: false, message: "Valid blog id is required" });
        }
        const comment = await prisma.comment.findMany({
            where: { blogId: blogId, isApproved: true },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json({ success: true, comment });
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
export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        const content = await main(prompt + `Generate a detailed blog article on the given topic in simple and easy-to-understand language.
Return the content using common HTML tags only.
Use <h1> for the main title, <h2> for section headings, and <p> for paragraphs.
Explain concepts clearly for beginners, use short paragraphs, and include real-life examples where possible.
Do not use markdown, emojis, or advanced HTML tags.
Return only valid HTML content.
`);
        res.json({ success: true, content });
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
