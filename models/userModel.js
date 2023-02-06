const  mongoose  = require("mongoose");

const UserSchema=new mongoose.Schema({
    name:String,
    gender:String,
    email:String,
    password:String,
    image:String
},{
    timestamps:false,
    versionKey:false
})

const UserModel=mongoose.model('users',UserSchema)

module.exports={UserModel}