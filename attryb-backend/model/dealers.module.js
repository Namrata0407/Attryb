const mongoose = require("mongoose")

const dealerSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String, required:true}
},{verisonKey:false})

const Dealer = mongoose.model("dealer",dealerSchema)
module.exports = Dealer