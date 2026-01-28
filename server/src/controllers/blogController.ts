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
        const imageFile = ( req as any ).file;

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
                isPublished : ispublished,
            }
        })

        res.json({ success: true, message: "Blog added successfully" });

    } catch (error) {
        if (error instanceof Error) {
            res.json({ success: false, message: error.message });
        } else {
            res.json({ success: false, message: "Something went wrong" });
        }
    }
};