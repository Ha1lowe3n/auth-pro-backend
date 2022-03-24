import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

(async function () {
    await connectDB();
    app.listen(PORT, console.log(`Server running on port ${PORT}`));
})();
