import Restaurant from "../model/Restaurant.js";
import * as cloudinary from "cloudinary";
import mongoose from "mongoose";
import {body} from "express-validator";


export const getRestaurant = async (req, res) => {
    try{
        const restaurant = await Restaurant.findOne({user: {_id: req.userId}})

        if(!restaurant){
            return res.status(404).json({message: "Restaurant Not Found!"})
        }

        res.status(200).send(restaurant)


    }catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong"})
    }
}

export const createRestaurant = async (req, res)=> {
    try{
            const isExisting = await Restaurant.findOne({user: req.userId});
            if(isExisting) {
                return res.status(409).json({message: "User restaurant is already existing"});
            }

            const imageUrl = await uploadImage(req.file);
            const restaurant = await new Restaurant({
                ...req.body,
                imageUrl: imageUrl,
                user: new mongoose.Types.ObjectId(req.userId),
                lastUpdated: new Date(),
            });


            await restaurant.save();

            res.status(201).json(restaurant);

    }catch (e) {
        console.log(e)
        res.status(500).send({message: "something went wrong"})
        
    }
}

export const updateRestaurant = async (req, res) => {
    try{

        const restaurant = await Restaurant.findOne({user: req.userId});


        if(!restaurant){
            return res.status(404).send({message: "restaurant not found!"})
        }

        if(req.file){
            restaurant.imageUrl = await uploadImage(req.file)
        }

        const updateRestaurant = await Restaurant.findOneAndUpdate(
            {user: req.userId},
            {
                ...req.body,
                imageUrl: req.file ? await uploadImage(req.file) : req.body.imageUrl,
                lastUpdated: new Date(),

            })

        await restaurant.save();

        res.status(200).json(restaurant)

    }catch (e) {
        console.log(e)
        res.status(500).send({message: "something went wrong"})
    }
}

const uploadImage = async (image) => {
    const base64ofImg = image.buffer.toString('base64');
    const dataUrl = "data:" + image.mimetype + ";base64," + base64ofImg;
    const uploadimage = await cloudinary.v2.uploader.upload(dataUrl)
    return uploadimage.url
}