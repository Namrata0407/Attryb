const express = require("express")
const MarketPlace = require("../model/Marketplace_Inventory.model")
const marketplaceRoute = express.Router()

//-------------------------- POST car data  ----------------------------------------------//
marketplaceRoute.post("/add", async (req, res) => {
    try {
        const newCar = new MarketPlace(req.body)
        let data = await newCar.save()
        res.status(200).send({ message: "car added successfully", data })
    } catch (err) {
        res.status(400).send("someting went wrong")
    }
})
//-------------------------- GET all cars data  ----------------------------------------------//
marketplaceRoute.get("/", async (req, res) => {
    try {
        // Create a query object to filter by "original_paint" and "mileage"
        const query = {};

        if (req.query.original_paint) {
            // query.original_paint = req.query.original_paint;
            query.original_paint = {
                $regex: new RegExp(req.query.original_paint, 'i') // 'i' for case-insensitive search
            };
        }


        // Sort by "dealer_price"
        let sort;
        if (req.query.dealer_price) {
            sort = { dealer_price: Number(req?.query?.dealer_price) };
            // console.log(sort);
        }


        const allData = await MarketPlace.find(query)
            .populate({
                path: "author",
                select: "name _id"
            })
            .populate({
                path: "car_data",
            })
            .sort(sort);

        res.status(200).send(allData);
    } catch (err) {
        res.status(400).send("Something went wrong");
        console.log(err.message)
    }
});

//--------------------------Update car data --------------------------------------------------//

marketplaceRoute.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    //    console.log(id);

    try {
        // console.log(id,payload);
        const findData = await MarketPlace.findById(id)
        // console.log(findData);
        if (findData) {
            if (findData.author == req.body.author) {
                const UpdatedData = await MarketPlace.findByIdAndUpdate(id, payload);
                res.status(200).send("Updated Successfully")
            }
            else {
                res.send("Not Authorized to Update")
            }
        }
        else {
            res.status(400).send("Data not found")
        }
    } catch (err) {
        res.status(400).send("someting went wrong")
    }
})


//-------------------------- DELETE car data  ----------------------------------------------//
marketplaceRoute.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const findData = await MarketPlace.findById({ "_id": id })

        if (findData) {
            if (findData.author == req.body.author) {
                const DeleteData = await MarketPlace.findByIdAndDelete({ _id: id });
                res.status(200).send("Deleted Successfully")
            }
            else {
                res.send("Not Authorized to delete")
            }
        }
        else {
            res.status(400).send("Data not found")
        }
    } catch (err) {
        res.status(400).send("someting went wrong")
    }
})

module.exports = marketplaceRoute;