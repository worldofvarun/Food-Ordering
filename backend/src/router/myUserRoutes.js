import express from "express";
import * as MyUserController from "../controller/MyUserController.js";
import {jwtCheck, jwtParse} from "../middleware/auth.js";
import {validateMyUserRequest} from "../middleware/validation.js";

const router = express.Router();



router.post('/', jwtCheck, MyUserController.createCurrentUser)
router.put('/', jwtCheck, jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser)
router.get('/', jwtCheck, jwtParse, MyUserController.getCurrentUser);

export default router;
