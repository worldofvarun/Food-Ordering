import User from "../model/User.js";


export const createCurrentUser = async  (req, res) => {
    // 1) check user is exist (or) not
    try{
        const {auth0Id} = req.body;
        const isExistingUser = await User.findOne({auth0Id: auth0Id})
        if(isExistingUser){
            return res.status(200).json();
        }
        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).json(newUser.toObject())
    }catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Error in Creating User"
        })
    }
}

export const updateCurrentUser = async (req, res) => {
    try {
        const {name, address, city, country} = req.body;
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({message: "user not found"})
        }

        user.name = name;
        user.address = address;
        user.city = city;
        user.country = country;

        await user.save();

        res.send(user);

    }catch (e){
        console.log(e)
        res.status(500).send({
            message: "Error in Updating User"
        })
    }
}

export const getCurrentUser = async (req, res) => {
    try{
        const user = await User.findOne({_id: req.userId});
         if(!user){
            return res.status(404).json({message: "user not found"})
         }
         res.status(200).json(user)

    }catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Error in getting User"
        })
    }
}