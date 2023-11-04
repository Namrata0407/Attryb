const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authRoute = require("./routes/auth.route");
const oemspecsRoute = require("./routes/oem_specs.route");
const marketplaceRoute = require("./routes/marketplace.route");
const authorize = require("./middleware/authorize.middleware");
const app = express();
require("dotenv").config()
app.use(express.json())
app.use(cors());

app.use('/auth',authRoute)
app.use("/oemspecs",oemspecsRoute)
app.use("/marketplace",authorize)
app.use("/marketplace",marketplaceRoute)

const PORT = process.env.PORT||4500
app.listen(PORT, async()=>{
    try{
        const mongoURL = process.env.MONGO_URL
       await mongoose.connect(mongoURL)
        console.log("connected to DB")
    }catch(err){
        console.log("error while connecting to db!",err)
    }
})