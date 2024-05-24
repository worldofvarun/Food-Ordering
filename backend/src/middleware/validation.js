import {body, validationResult} from "express-validator";


export const handelValidationErrors = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    next()
}

export const validateMyUserRequest = [
    body('name').isString().notEmpty(),
    body('address').isString().notEmpty(),
    body('city').isString().notEmpty(),
    body('country').isString().notEmpty(),
    handelValidationErrors
]
