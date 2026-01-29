import express from "express";
import { addBlog, deleteBlogById, getAllBlogs, getBlogById, togglePublished } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add",upload.single("image"),auth,addBlog);
blogRouter.get("/all",getAllBlogs);
blogRouter.get('/:id',getBlogById);
blogRouter.post('/delete',auth,deleteBlogById);
blogRouter.post('/toggle-published',auth,togglePublished);


export default blogRouter;