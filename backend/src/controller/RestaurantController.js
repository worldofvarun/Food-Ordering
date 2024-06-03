import Restaurant from "../model/Restaurant.js";

export const searchRestaurant = async (req, res) => {
    try{
        const city = req.params.city;
        const searchQuery = req.query.search || "";
        const selectedCuisines = req.query.cuisines || "";
        const sortOption = req.query.sortBy || "lastUpdated";
        const page = parseInt(req.query.page);


        const query = {};
        query['city'] = new RegExp(city, 'i');
        const cityCount =  await Restaurant.countDocuments({city: query['city']})

        if(cityCount === 0){
            return res.status(404).send({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1
                }

            })
        }

        if(selectedCuisines){
            const cuisinesArray = selectedCuisines
                .split(',')
                .map((cuisines) => new RegExp(cuisines,'i'));

            query['cuisines'] = {$all: cuisinesArray}
        }

        if(searchQuery){
            const searchRegex = new RegExp(searchQuery, 'i');
            query["$or"] = [
                {restaurantName: searchRegex},
                {cuisines: {'$in': [searchRegex]}
            }];
        }

        const pageSize = 10;
        const skip = (page -1) * pageSize

        const restaurants = await Restaurant.find(query)
                                                                                     .sort({[sortOption]: 1})
                                                                                     .skip(skip)
                                                                                     .limit(pageSize).lean()

        const total = await Restaurant.countDocuments(query)

        const response = {
            data: restaurants,
            pagination: {
                total,
                page,
                pages: Math.ceil(total/ pageSize)
            }

        }
        res.json(response)



    }catch (e) {
        console.log(e);
        res.status(500).send({message: "something went wrong"})

    }
}

export const getRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const restaurant = await Restaurant.findOne({_id: restaurantId});
        if(!restaurant){
            return res.status(404).send({message: "Restaurant Not Found"})
        }

        res.send(restaurant)

    }catch (e) {
        console.log(e);
        res.status(500).send({message: "something went wrong"})
    }
}
