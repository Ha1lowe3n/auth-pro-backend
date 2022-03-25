import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import router from "./router/index.js";
import { middlewareError } from "./middlewares/error.middleware.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", router);
app.use(middlewareError);

const start = async () => {
    await connectDB();
    app.listen(PORT, console.log(`Server running on port ${PORT}`));
};
start();
