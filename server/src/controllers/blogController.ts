import fs from "fs";
import { Request, Response } from "express";
import imagekit from "../config/ImageKit.js";
import { prisma } from "../lib/prisma.js";

interface transformation {
    quality: number;
    format: "jpg" | "png" | "webp";
    width: number;
}

interface BuildUrlOptions {
    src: string; // full URL
    transformation?: transformation[];
}


export const addBlog = async (req: Request, res: Response) => {
    try {
        const { title, subtitle, description, category, author, ispublished } = JSON.parse(req.body.blog);
        const imageFile = (req as any).file;

        // all field validation
        if (!title || !subtitle || !description || !category || !author) {
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
        })

        if (!response.filePath) {
            throw new Error("File path is undefined");
        }

        //opmtimization through ImageKit URL transformation
        const optimizedImageUrl: string = imagekit.helper.buildSrc({
            src: response.filePath,
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
            transformation: [{ quality: 80, format: "webp", width: 1280 } as transformation],
        })

        const image = optimizedImageUrl;

        await prisma.blog.create({
            data: {
                title,
                subTitle: subtitle,
                description,
                category,
                author,
                image,
                isPublished: ispublished,
            }
        })

        res.json({ success: true, message: "Blog added successfully", blog: { title, subtitle, description, category, author, image, isPublished: ispublished } });

    } catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        } else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
};

export const getAllBlogs = async (req: Request, res: Response) => {
    try {

        const blogs = await prisma.blog.findMany({
            where: {
                isPublished: true
            }
        })

        if(!blogs){
            res.json({ success: false, message: "no blogs" });
        }

        res.json({ success: true, blogs });
    } catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        } else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
}

export const getBlogById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.json({ success: false, message: "Valid blog id is required" });
        }
        const blog = await prisma.blog.findUnique({
            where: { id }
        })

        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        res.json({ success: true, blog });
    } catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        } else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
}

export const deleteBlogById = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        await prisma.blog.delete({
            where: {id}
        })
        res.json({ success: true, message:"Blog deleted successfully" });
    } catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        } else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
}


export const togglePublished = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const Blog = await prisma.blog.findUnique({
            where: {id} 
        })
        if (!Blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        Blog.isPublished=!Blog.isPublished;
        res.json({ success: true, message:"Blog status updated successfully" });
    } catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        } else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
}