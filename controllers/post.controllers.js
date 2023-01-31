const { default: mongoose } = require("mongoose")
const { PostModel } = require("../models/postModel")

async function getPostsByUserID(req,res){
  let {_id}=req.user
  try {
    const posts= await PostModel.find({userId:_id})
    const totalPosts=await PostModel.count({userId:_id})
    return res.status(200).send({data:{totalPosts,posts}})

  } catch (error) {
    console.log(error)
    return res.status(500).send({error:'Something wrong with db'})

  }
}

async function createPost(req,res){
  const user=req.user
  const {title,body,device}=req.body
    try {
      const post=await PostModel.create({
        title,body,device,
        userId:user._id,
        name:user.name
      })
      return res.status(200).send({data:post})
    } catch (error) {
      console.log(error)
      return res.status(500).send({error:'Something wrong with db'})
  
    }
  }

  async function updatePost(req,res){
      const content=req.body
      const {postId}=req.params
    try {
      let post=await PostModel.find({_id:postId})
      if(post){
        for(const[key,value] of Object.entries(content)){
          post[0][key]=value
         }
        post=post[0]
        await PostModel.updateOne({_id:post._id},{$set:{...post}})
        post=await PostModel.find({_id:postId})
        return res.status(200).send({updatedPost:post[0]})
      }
      else { return res.send(null)}


    } catch (error) {
      console.log(error)
      return res.status(500).send({error:'Something wrong with db or postId not exist'})
  
    }
  }

  async function deletePost(req,res){
     const {postId}=req.params
     let post=null
    try {
      post =await PostModel.findByIdAndDelete({_id:postId})

    } catch (error) {
      console.log(error)
      return res.status(500).send({error:'Something wrong with db'})
  
    }
    if(post){
      return res.status(200).send({message:'Post deleted successfully',data:post})
    }
    else{ 
      return res.status(400).send({error:'Post with given postId does not exist'})
    }
  }
  
  module.exports={getPostsByUserID,createPost,updatePost,deletePost}