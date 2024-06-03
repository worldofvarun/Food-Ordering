import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import 'dotenv/config.js';
import {v2 as cloudinary} from  'cloudinary'
import myUserRoutes from "./router/myUserRoutes.js";
import myRestaurantRoutes from "./router/myRestaurantRoutes.js";
import restaurantRoutes from "./router/RestaurantRoutes.js"
import orderRoutes from "./router/OrderRoutes.js";
import {StripeWebhookHandler} from "./controller/OrderController.js";

const app = express();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use(cors({
    originalUrl: process.env.FRONTEND_URL,
    credentials: true
}))
app.use('/api/order/checkout/webhook', express.raw({ type: '*/*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//: health check
app.get('/health', async (req, res) => {
    res.json({message: "health OK!"});
})

app.use('/api/my/user', myUserRoutes);
app.use('/api/my/restaurant', myRestaurantRoutes);
app.use('/api/restaurant' , restaurantRoutes);
app.use('/api/order', orderRoutes)


mongoose.connect(process.env.MONGODB_URL).then(() =>  {
    console.log('Database is Connected...');
    app.listen(process.env.PORT,() => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
