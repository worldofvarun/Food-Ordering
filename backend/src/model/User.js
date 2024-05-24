import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    auth0Id: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String},
    address: {type: String},
    city: {type: String},
    country: {type: String},
})

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;