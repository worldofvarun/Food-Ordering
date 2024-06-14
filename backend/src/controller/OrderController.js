import Stripe from 'stripe'
import Restaurant from "../model/Restaurant.js";
import Order from "../model/Order.js";

const stripe = new Stripe(process.env.STRIPE_SK);
const FRONTEND = process.env.FRONTEND_URL;
const STRIPE_WEBHOOK = process.env.STRIPE_WEBHOOK;

export const createCheckOutSession = async (req, res) => {
    try{
        const  checkoutsession = req.body;
        const restaurant = await Restaurant.findById(checkoutsession.restaurantId)

        if(!restaurant){
            throw new Error("Restaurant not found")
        }

        const newOrder = await  new Order({
            restaurant: checkoutsession.restaurantId,
            user: req.userId,
            cartItems: checkoutsession.cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                ...cartItem
            })),
            deliveryDetails: checkoutsession.deliveryDetails,
            status: "placed",
            createdAt: new Date()
        })



        const lineItems = createLineItems(checkoutsession, restaurant.menuItems);
        const session = await createSession(
            lineItems,
             newOrder._id.toString(),
            restaurant.deliveryPrice,
            restaurant._id.toString(),

            )



        if(!session.url){
            return res.status(500).json({message: "error in creating strip session"})
        }


        await newOrder.save()
        return res.json({url: session.url})

    }catch (e){
        console.log(e)
        res.status(500).send({message: e.raw})
    }
}


export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId })
            .sort({ createdAt: -1 })
            .populate("user")
            .populate("restaurant")


        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
};


function createLineItems(CheckOutSessionRequest, menuItems) {
    return CheckOutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item) => item._id.toString() === cartItem._id)
        if (!menuItem) {
            throw new Error(`Menu item not Found: ${cartItem._id}`)
        }

        return {
            price_data: {
                currency: 'USD',
                unit_amount: parseInt(menuItem.price) * 100,
                product_data: {
                    name: menuItem.name
                }
            },
            quantity: cartItem.quantity
        };
    });
}


async function createSession(lineItems, orderId, deliveryPrice, restaurantId){

    const sessionData = await stripe.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Delivery",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: deliveryPrice * 100,
                        currency: "USD"
                    }
                }
            }
        ],
        mode: "payment",
        payment_method_types: ['card'],
        metadata:{
            orderId,
            restaurantId
        },
        success_url: `${FRONTEND}order-status?success=true`,
        cancel_url: `${FRONTEND}details/${restaurantId}?cancelled=true`
    })

    return sessionData;
}


export const StripeWebhookHandler = async (req, res) => {
    let event;
    try {
        const sig = req.headers['stripe-signature'];
        event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK);
    } catch (error) {
        console.error(error);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
        try {
            const orderId = event.data.object.metadata?.orderId;
            if (!orderId) {
                throw new Error("Order ID is missing in metadata");
            }

            const order = await Order.findById(orderId);

            if (!order) {
                return res.status(404).json({ error: { message: "Order not found" } });
            }

            order.totalAmount = event.data.object.amount_total;
            order.status = "paid";

            await order.save();

            return res.status(200).json({ message: "Order updated successfully" });
        } catch (error) {
            console.error("Error updating order:", error);
            return res.status(500).json({ error: { message: "Internal server error" } });
        }
    }

    // Handle other event types if needed
    return res.status(200).json({ message: "Received" });
};
