import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: () => {
            return new mongoose.Types.ObjectId()
        }},
    name: {type: String, required: true},
    price: {type: Number, required: true}
})

const restaurantSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    restaurantName: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    deliveryPrice: {type: Number, required: true},
    estimatedDeliveryTime: {type: Number, required: true},
    cuisines: [{type: String, required: true}],
    menuItems: [menuSchema],
    imageUrl: {type: String, required: true},
    lastUpdated: {type: Date, required: true}
})

const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);

export default RestaurantModel;