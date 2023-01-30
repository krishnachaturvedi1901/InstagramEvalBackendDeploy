const jwt=require('jsonwebtoken')
// const brcypt=require('bcrypt')
const config = require('../config/config')
const { UserModel } = require('../models/userModel')
const jwt_secret=config.jwt_secret


function generateJwtToken(user){
  const {_id,name,email,password,ip}=user
  return jwt.sign({
    _id,name,email,password,ip
  },jwt_secret)
}

async function signup(req,res){
    try {
        
        const {name,email,password,gender}=req.body
        if(email==""||password==""||!name||!gender){
            return res.status(400).send({error:'Registration details are incomplete'})  
        }

        let user=await UserModel.findOne({email})
       
        if(user){
           return res.status(400).send({error:'User with emailid already exists'})
        }
        user=UserModel.create({...req.body})
        return res.send({message:'Registration successfully done'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({error:'Something wrong with db'})
    }

}

async function login(req,res){
    const {email,password}=req.body
    try {
        if(!email||!password){
            return res.status(400).send({error:'Email or password not present'})  
        }
        let user = await UserModel.find({password})
        
        if(!user){
          return res.status(400).send({error:'User with email doesnot exist please register'})
        }
        if(password!==user.password){
            return res.status(400).send({error:'Incorrect password'})
        }
        const token=generateJwtToken(user)
        const { _id,name,gender }=user

        return res.status(200).send({
            message:'Login successfull',
            data:{
                token,
                user:{_id,name,email,gender}
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({error:'Something wrong with db'})

    }
}

async function loggedInUser(req,res){
   try {
    const user=req.user
    return res.send({data:user})
   } catch (error) {
    console.log(error)
    return res.status(500).send({error:'Something wrong with db'})
   }
}

module.exports={signup,login,loggedInUser}
