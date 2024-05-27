import {body, validationResult} from "express-validator";


export const handelValidationErrors = async (req, res, next) => {
    const errors = validationResult(req.body);
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

export const validateMyRestarentRequest = [
    body('restaurantName')
        .isString()
        .notEmpty(),

    body('city')
        .isString()
        .withMessage('City must be a string')
        .notEmpty()
        .withMessage('City is required'),

    body('country')
        .isString()
        .withMessage('Country must be a string')
        .notEmpty()
        .withMessage('Country is required'),

    body('deliveryPrice')
        .isFloat({min: 0})
        .withMessage('Delivery price must be a number')
        .notEmpty()
        .withMessage('Delivery price is required'),

    body('estimatedDeliveryTime')
        .isFloat({min: 0})
        .withMessage('Estimated delivery time must be a number')
        .notEmpty()
        .withMessage('Estimated delivery time is required'),

    body('cuisines')
        .isArray()
        .withMessage('Cuisines must be an array')
        .notEmpty()
        .withMessage('Cuisines are required'),

    body('menuItems')
        .isArray()
        .withMessage('Menu items must be an array'),

    body('menuItems.*.name').isString(),
    body('menuItems.*.price').isFloat({min: 0}),
    handelValidationErrors
]
