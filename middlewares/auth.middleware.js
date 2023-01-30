const jwt=require('jsonwebtoken')
const config=require('../config/config')
const { UserModel } = require('../models/userModel')
const jwt_secret=config.jwt_secret
async function authMiddleware(req,res,next){
    const authorization=req.headers['authorization']
    if(authorization){
        const token=authorization.split(' ').pop()
        if(token){
           try {
             jwt.verify(token,jwt_secret)
             let user=await jwt.decode(token)
             user=await UserModel.findById(user._id)
            //  user=user.toJson()
             delete user.password
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