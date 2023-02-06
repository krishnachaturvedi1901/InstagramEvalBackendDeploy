const express=require('express')
const { getPostsByUserID, createPost, updatePost, deletePost, getAllPosts } = require('../controllers/post.controllers')
const postRouter=express.Router()

const authMiddleware=require('../middlewares/auth.middleware')

postRouter.get('/',getAllPosts)
postRouter.get('/myPosts',authMiddleware,getPostsByUserID)
postRouter.post('/create',authMiddleware,createPost)
postRouter.patch('/update/:postId',authMiddleware,updatePost)
postRouter.delete('/delete/:postId',authMiddleware,deletePost)


module.exports=postRouter