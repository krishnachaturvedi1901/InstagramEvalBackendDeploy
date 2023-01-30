const { PostModel } = require("../models/postModel")

async function getPostsByUserID(req,res){
  const {userId}=req.params
  try {
    const posts= await PostModel.find({_id:userId})
    const totalPosts=await PostModel.count({_id:userId})
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
        user:{
          userId:user._id,
          name:user.name
        }

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
      post={...post,...content}
      await post.save()
      post=post.toJSON()
      return res.status(200).send({post})

    } catch (error) {
      console.log(error)
      return res.status(500).send({error:'Something wrong with db'})
  
    }
  }

  async function deletePost(req,res){
     const {postId}=req.params
    try {
      let post =await PostModel.findByIdAndDelete({_id:postId})
      return res.status(200).send({message:'Post deleted successfully',data:post})

    } catch (error) {
      console.log(error)
      return res.status(500).send({error:'Something wrong with db'})
  
    }
  }
  
  module.exports={getPostsByUserID,createPost,updatePost,deletePost}