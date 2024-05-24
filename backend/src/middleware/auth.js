import {auth} from "express-oauth2-jwt-bearer";
import * as jwt from 'jsonwebtoken';
import User from "../model/User.js";
export const jwtCheck = auth({
    audience: 'mern-food-ordering-api',
    issuerBaseURL: 'https://dev-5i2jtfo5pedzltz8.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

export const jwtParse = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization || !authorization.toString().startsWith('Bearer')){
        return res.sendStatus(404);
    }

    const token = authorization.split(" ")[1];
    
    try {
        const decoded = jwt.decode(token);
        const auth0Id = decoded.sub;

        const user = await User.findOne({auth0Id: auth0Id});
        if(!user){
            return res.sendStatus(401)
        }

        req.auth0Id = auth0Id;
        req.userId = user._id.toString();
        next()
    }catch (e) {
        res.sendStatus(401)
    }

}
