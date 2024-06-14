import express from "express";
import multer from "multer";
import * as MyRestaurantController from "../controller/MyRestaurantController.js";
import {jwtCheck, jwtParse} from "../middleware/auth.js";
import {validateMyRestarentRequest} from "../middleware/validation.js";
import {updateRestaurant} from "../controller/MyRestaurantController.js";

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5mb
    }
})

router.get('/',
    jwtCheck,
    jwtParse,
    MyRestaurantController.getRestaurant
);

router.post('/',
    jwtCheck,
    jwtParse,
    validateMyRestarentRequest,
    upload.single('imageFile'),
    MyRestaurantController.createRestaurant);

router.put(
    "/",
    upload.single("imageFile"),
    validateMyRestarentRequest,
    jwtCheck,
    jwtParse,
    MyRestaurantController.updateRestaurant
);

router.get('/order',  jwtCheck, jwtParse, MyRestaurantController.getOrder)

router.patch('/order/:id/status', jwtCheck, jwtParse, MyRestaurantController.updateOrderStatus)

export default router;
