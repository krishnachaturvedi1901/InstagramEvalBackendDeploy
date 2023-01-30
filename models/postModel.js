const  mongoose  = require("mongoose");

const PostSchema=new mongoose.Schema({
    title:String,
    body:String,
    device:String,
    user:{
        userId:String,
        name:String
    }
},{
    timestamps:false,
    versionKey:false
})

const PostModel=mongoose.model('posts',PostSchema)

module.exports={PostModel}
