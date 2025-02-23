import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from "./routes/userRoutes.js";
import path from "path"


const port = process.env.PORT || 3000;
const app = express();



app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});


app.listen(port, async () => {
    await connectDB();
    console.log(`App listens on: http://localhost:${port}`);
});
