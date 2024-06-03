import express from "express";
import {param} from "express-validator";
import * as RestaurantController from "../controller/RestaurantController.js";

const router = express.Router();

router.get('/search/:city',
           param("city")
               .isString()
               .trim()
               .notEmpty(),
            RestaurantController.searchRestaurant
    );

router.get('/:restaurantId',
    param("restaurantId")
        .isString()
        .trim()
        .notEmpty(),
    RestaurantController.getRestaurant
    )


export default router;
