const mongoose = require("mongoose")

const MarketplaceInventorySchema = mongoose.Schema({
    author:{type:mongoose.Types.ObjectId,ref:"dealer",required:true},
    car_data:{type:mongoose.Types.ObjectId,ref:"oem_data"},
    km_odoMeter:{type:String,required:true},
    major_scratches:{type:String,required:true},
    original_paint:{type:String,required:true},
    accidents_reported:{type:String,required:true},
    previous_buyers:{type:String,required:true},
    registration_place:{type:String,required:true},
    dealer_price:{type:String,required:true},
    imgUrl:{type:String,required:true}
},{versionKey:false})

const MarketPlace = mongoose.model("marketplace",MarketplaceInventorySchema)
module.exports = MarketPlace