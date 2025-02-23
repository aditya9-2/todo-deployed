import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from "./routes/userRoutes.js";
import path from "path"
import { fileURLToPath } from 'url'


const port = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRouter);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});


app.listen(port, async () => {
    await connectDB();
    console.log(`App listens on: http://localhost:${port}`);
});
