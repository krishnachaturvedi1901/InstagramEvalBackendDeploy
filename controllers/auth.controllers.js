const jwt=require('jsonwebtoken')
const config = require('../config/config')
const { UserModel } = require('../models/userModel')
const jwt_secret=config.jwt_secret

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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
        const hash = bcrypt.hashSync(password, salt);
        user=await UserModel.create({name,gender,email,password:hash})
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
        let user = await UserModel.findOne({email:{$eq:email}})
        if(!user){
          return res.status(400).send({error:'User with email doesnot exist please register'})
        }
        if(!bcrypt.compareSync(password, user.password)){
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
