const jwt=require('jsonwebtoken')
const config=require('../config/config')
const { UserModel } = require('../models/userModel')
const jwt_secret=config.jwt_secret

async function authMiddleware(req,res,next){
    const authorization=req.headers['Authorization']
    if(authorization){
        const token=authorization.split(' ').pop()
        if(token){
           try {
             jwt.verify(token,jwt_secret)
             let user=jwt.decode(token)
             console.log("user after token decode",user)
             user=await UserModel.findById(user._id)
             console.log("user after findById in auth middleware before toJson()-",user)
             user=user.toJson()
             delete user.password
             console.log("user after deleting password in auth middleware after toJson()-",user)

             req.user=user
             next()
           } catch (error) {
            return res.status(401).send({error:'Invalid token please login again'})
           }
        }
        else{
            return res.status(401).send({error:'No token present'})
        }
    }
    else{
        return res.status(401).send({message:'User is not logged in no authorization key present'})
    }
}

module.exports=authMiddleware