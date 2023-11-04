const mongoose = require("mongoose")
const OEMSchema = mongoose.Schema({
    mfg_year:{type:String},
    model:{type:String},
    og_price:{type:String},
    colors:[{type:String}],
    mileage:{type:String},
    power:{type:String},
    max_speed:{type:String}
},{versionKey:false})
const OEM_Data = mongoose.model("oem_data",OEMSchema)
module.exports = OEM_Data;