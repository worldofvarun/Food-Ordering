import express from "express";
import {jwtCheck, jwtParse} from "../middleware/auth.js";
import * as OrderController from "../controller/OrderController.js";

const router = express.Router()


router.get("/", jwtCheck, jwtParse, OrderController.getMyOrders);
router.post('/checkout/create-checkout-session', jwtCheck, jwtParse, OrderController.createCheckOutSession);

router.post('/checkout/webhook', OrderController.StripeWebhookHandler)

export default router;
