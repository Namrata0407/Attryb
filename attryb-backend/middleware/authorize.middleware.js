const jwt = require("jsonwebtoken")
const authorize = async(req,res,next)=>{
    if(req.method==="POST" || req.method==="DELETE" || req.method==="PATCH"){
        try{
            let token = req.headers.authorization.split(' ')[1]
            const data = await jwt.decode(token)
            req.body = {...req.body,author:data._id}
            next()
        }catch(err){
            res.status(400).send("you are not authorized to enter this route")
        }
    }else{
        next()
    }
        
}

module.exports = authorize