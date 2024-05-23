import express, {json} from "express";
import cors from "cors";
import 'dotenv/config.js';
import mongoose from "mongoose";

const app = express();

app.use(express.json())
app.use(cors({

}))


app.get('/test', async (req, res) => {
    res.json({message: "Server running!"});
})


mongoose.connect(process.env.MONGODB_URL).then(() =>  {
    console.log('Database is Connected...');
    app.listen(process.env.PORT,() => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
