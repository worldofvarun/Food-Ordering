import express from "express";
import cors from "cors";
import 'dotenv/config.js';
import mongoose from "mongoose";
import myUserRoutes from "./router/myUserRoutes.js";

const app = express();

app.use(express.json())
app.use(cors({
    originalUrl: process.env.FRONTEND_URL,
    credentials: true
}))


app.get('/health', async (req, res) => {
    res.json({message: "health OK!"});
})

app.use('/api/my/user', myUserRoutes);


mongoose.connect(process.env.MONGODB_URL).then(() =>  {
    console.log('Database is Connected...');
    app.listen(process.env.PORT,() => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
