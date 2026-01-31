import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import userRouter from "./routes/userRoutes.js";

// database connection test

const connectDB = async () =>{
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (error) {
    console.log(error)
  }
}
connectDB();

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("server running");
});

app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 5000;

// app.listen(PORT)
export default app;

