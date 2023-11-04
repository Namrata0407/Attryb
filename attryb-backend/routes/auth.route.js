const express = require("express")
const authRoute = express.Router()
const Dealer = require("../model/dealers.module")
const bcrypt = require("bcrypt")
const jwt = require ('jsonwebtoken')

authRoute.post("/register",async(req,res)=>{
    const {password} = req.body;
    const saltRounds = +process.env.SALT_ROUNDS||6
    try{    
        const hashed_pass = await bcrypt.hash(password,saltRounds)
        const userData = {...req.body, password:hashed_pass}
        const newDealer = new Dealer(userData)
        let data = await newDealer.save()
        console.log(data)
        res.status(200).send({message:"Dealer regestred successfully"})
    }catch(err){
        res.status(400).send({message:"Dealer cannot register",error:err.message})
    }
})

authRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const exist = await Dealer.findOne({email})
        if(exist){
            let passMatch = await bcrypt.compare(password,exist.password)
            if(passMatch){
                const mySecKey = process.env.SECRET_KEY||"mainahibataunga"
                let token = jwt.sign({name:exist.name,_id:exist._id},mySecKey)
                res.status(200).send({message:"login Successful",token})
            }else{
                res.status(400).send({message:"Invalid Credentials"})
            }
        }else{
            res.status(400).send({message:"Invalid Credentials"})
        }
    }catch(err){
        res.status(400).send({message:"invalid credentials"})
    }
})

module.exports = authRoute